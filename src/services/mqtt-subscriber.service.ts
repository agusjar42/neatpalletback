import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import mqtt, {
  IClientOptions,
  IDisconnectPacket,
  IPublishPacket,
  MqttClient,
} from 'mqtt';
import crypto from 'crypto';
import os from 'os';
import {MqttMessageLogRepository} from '../repositories';

type MqttSubscriberStatus = {
  enabled: boolean;
  connected: boolean;
  brokerUrl?: string;
  brokerHost?: string;
  clientId?: string;
  topics: string[];
  lastConnectAt?: string;
  lastError?: string;
};

@lifeCycleObserver('services')
export class MqttSubscriberService implements LifeCycleObserver {
  private client?: MqttClient;
  private enabled = false;
  private connected = false;
  private brokerHost?: string;
  private brokerUrl?: string;
  private clientId?: string;
  private topics: string[] = [];
  private lastConnectAt?: string;
  private lastError?: string;
  private recentMessageDedup = new Map<string, number>();
  private dedupWindowMs = 0;

  constructor(
    @repository(MqttMessageLogRepository)
    private mqttMessageLogRepository: MqttMessageLogRepository,
  ) {}

  private buildDefaultClientId(): string {
    const host = os.hostname().replace(/[^a-zA-Z0-9_-]/g, '-');
    const suffix = crypto.randomUUID().slice(0, 8);
    // Mosquitto with MQTT 3.1.1 allows longer client ids, but keep it reasonable.
    return `loopback-backend-${host}-${process.pid}-${suffix}`.slice(0, 64);
  }

  private toMysqlDatetimeSeconds(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  start(): void {
    const enabledEnv = process.env.MQTT_ENABLED?.trim();
    if (enabledEnv === '0' || enabledEnv?.toLowerCase() === 'false') {
      console.log('[MQTT] MQTT_ENABLED is false/0, MQTT subscriber disabled');
      this.enabled = false;
      return;
    }

    const host = process.env.MQTT_HOST?.trim();
    if (!host) {
      console.log('[MQTT] MQTT_HOST not set, MQTT subscriber disabled');
      this.enabled = false;
      return;
    }

    const port = Number(process.env.MQTT_PORT ?? 1883);
    const username = process.env.MQTT_USERNAME;
    const password = process.env.MQTT_PASSWORD;
    const clientIdEnv = process.env.MQTT_CLIENT_ID?.trim();
    const clientId =
      clientIdEnv && clientIdEnv.length > 0
        ? clientIdEnv
        : this.buildDefaultClientId();

    const topicsEnv = process.env.MQTT_TOPICS?.trim();
    const topics =
      topicsEnv && topicsEnv.length > 0
        ? topicsEnv.split(',').map(t => t.trim()).filter(Boolean)
        : ['pallet/+/telemetry', 'pallet/+/cmd/ack', 'pallet/+/status'];

    const brokerUrl = `mqtt://${host}:${port}`;
    this.dedupWindowMs = Math.max(
      Number(process.env.MQTT_DEDUP_WINDOW_MS ?? 0) || 0,
      0,
    );
    const options: IClientOptions = {
      clientId,
      username,
      password,
      protocolVersion: 4,
      reconnectPeriod: 5_000,
      connectTimeout: 30_000,
      keepalive: 30,
      clean: true,
      resubscribe: true,
    };

    this.enabled = true;
    this.brokerHost = host;
    this.brokerUrl = brokerUrl;
    this.clientId = clientId;
    this.topics = topics;

    console.log(`[MQTT] Connecting to ${brokerUrl} as clientId=${clientId}`);
    console.log(
      `[MQTT] Auth configured: username=${username ? username : '(none)'} passwordLen=${
        password ? password.length : 0
      }`,
    );
    this.client = mqtt.connect(brokerUrl, options);
    this.registerClientHandlers(this.client);
  }

  async stop(): Promise<void> {
    if (!this.client) return;

    const client = this.client;
    this.client = undefined;
    this.connected = false;

    await new Promise<void>(resolve => {
      client.end(true, {}, () => resolve());
    });
  }

  getStatus(): MqttSubscriberStatus {
    return {
      enabled: this.enabled,
      connected: this.connected,
      brokerUrl: this.brokerUrl,
      brokerHost: this.brokerHost,
      clientId: this.clientId,
      topics: this.topics,
      lastConnectAt: this.lastConnectAt,
      lastError: this.lastError,
    };
  }

  private registerClientHandlers(client: MqttClient) {
    client.on('connect', packet => {
      this.connected = true;
      this.lastConnectAt = new Date().toISOString();
      this.lastError = undefined;
      const sessionPresent =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (packet as any)?.sessionPresent !== undefined
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            String((packet as any).sessionPresent)
          : '(unknown)';
      const returnCode =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (packet as any)?.returnCode !== undefined
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            String((packet as any).returnCode)
          : '(unknown)';
      console.log(
        `[MQTT] Connected to ${this.brokerUrl} (sessionPresent=${sessionPresent}, returnCode=${returnCode})`,
      );

      if (!this.topics.length) {
        console.log('[MQTT] No topics configured, skipping subscribe');
        return;
      }

      console.log(`[MQTT] Subscribing to topics: ${this.topics.join(', ')}`);
      client.subscribe(this.topics, err => {
        if (err) {
          this.lastError = err.message;
          console.error('[MQTT] Subscribe error:', err.message);
          return;
        }
        console.log(`[MQTT] Subscribed to topics: ${this.topics.join(', ')}`);
      });
    });

    client.on('reconnect', () => {
      console.log('[MQTT] Reconnecting...');
    });

    client.on('disconnect', (packet: IDisconnectPacket) => {
      const reason =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (packet as any)?.reasonCode !== undefined
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            String((packet as any).reasonCode)
          : '(unknown)';
      console.log(`[MQTT] Disconnected (reasonCode=${reason})`);
    });

    client.on('close', () => {
      this.connected = false;
      console.log('[MQTT] Connection closed');
    });

    client.on('offline', () => {
      this.connected = false;
      console.log('[MQTT] Client offline');
    });

    client.on('error', err => {
      this.lastError = err.message;
      console.error('[MQTT] Client error:', err.message);
    });

    client.on('message', (topic, payload, packet) => {
      this.persistIncomingMessage(topic, payload, packet).catch(err => {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[MQTT] Unhandled persist error:', message);
      });
    });
  }

  private async persistIncomingMessage(
    topic: string,
    payload: Buffer,
    packet: IPublishPacket,
  ) {
    const payloadRaw = payload.toString('utf8');
    if (this.dedupWindowMs > 0) {
      const dedupKey = crypto
        .createHash('sha256')
        .update(topic)
        .update('\n')
        .update(payloadRaw)
        .digest('hex');
      const now = Date.now();
      const lastSeenAt = this.recentMessageDedup.get(dedupKey);
      if (lastSeenAt !== undefined && now - lastSeenAt < this.dedupWindowMs) {
        return;
      }
      this.recentMessageDedup.set(dedupKey, now);
      if (this.recentMessageDedup.size > 10_000) {
        for (const [key, ts] of this.recentMessageDedup) {
          if (now - ts > this.dedupWindowMs) this.recentMessageDedup.delete(key);
        }
      }
    }

    let payloadJson: unknown | null = null;
    let parseError: string | null = null;
    try {
      payloadJson = JSON.parse(payloadRaw);
    } catch (err) {
      payloadJson = null;
      parseError = err instanceof Error ? err.message : String(err);
    }

    const deviceIdMatch = /^pallet\/([^/]+)\//.exec(topic);
    const deviceId = deviceIdMatch?.[1] ?? null;
    const receivedAt = this.toMysqlDatetimeSeconds(new Date());
    const dedupKey = crypto
      .createHash('sha256')
      .update(receivedAt)
      .update('\n')
      .update(payloadRaw)
      .digest('hex');

    try {
      await this.mqttMessageLogRepository.create({
        topic,
        dedupKey,
        payloadRaw: payloadRaw,
        payloadJson: payloadJson,
        qos: typeof packet?.qos === 'number' ? packet.qos : null,
        retain: typeof packet?.retain === 'boolean' ? packet.retain : null,
        receivedAt: receivedAt,
        brokerHost: this.brokerHost ?? '',
        clientId: this.clientId ?? null,
        parseError: parseError,
        deviceId: deviceId,
      });
    } catch (err) {
      // MySQL duplicate unique key
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (err as any)?.code;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errno = (err as any)?.errno;
      if (code === 'ER_DUP_ENTRY' || errno === 1062) return;
      const message = err instanceof Error ? err.message : String(err);
      console.error('[MQTT] Failed to persist message:', message);
    }
  }
}
