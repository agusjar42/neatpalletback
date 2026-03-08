export type PasswordResetThrottleConfig = {
  maxPerWindow: number;
  windowMs: number;
};

export interface PasswordResetThrottleService {
  allowForgot(ip: string, email: string): boolean;
}

export class InMemoryPasswordResetThrottleService
  implements PasswordResetThrottleService
{
  private readonly ipHits = new Map<string, number[]>();
  private readonly emailHits = new Map<string, number[]>();

  private readonly config: PasswordResetThrottleConfig;

  constructor() {
    const envMax = Number(process.env.RESET_FORGOT_MAX_PER_HOUR ?? '5');
    this.config = {
      maxPerWindow:
        Number.isFinite(envMax) && envMax > 0 ? envMax : 5,
      windowMs: 60 * 60 * 1000,
    };
  }

  allowForgot(ip: string, email: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    const ipAllowed = this.consume(this.ipHits, `ip:${ip}`, windowStart, now);
    const emailAllowed = this.consume(
      this.emailHits,
      `email:${email}`,
      windowStart,
      now,
    );

    return ipAllowed && emailAllowed;
  }

  private consume(
    store: Map<string, number[]>,
    key: string,
    windowStart: number,
    now: number,
  ): boolean {
    const existing = store.get(key) ?? [];
    const recent = existing.filter(ts => ts >= windowStart);
    if (recent.length >= this.config.maxPerWindow) {
      store.set(key, recent);
      return false;
    }
    recent.push(now);
    store.set(key, recent);
    return true;
  }
}
