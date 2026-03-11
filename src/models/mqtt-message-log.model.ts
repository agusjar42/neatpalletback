import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'neatpallet', table: 'mqtt_message_log'},
  },
})
export class MqttMessageLog extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 11,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataPrecision: 11,
      dataScale: 0,
      nullable: 'N',
      generated: 1,
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 512,
    mysql: {
      columnName: 'topic',
      dataType: 'varchar',
      dataLength: 512,
      nullable: 'N',
    },
  })
  topic: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 64,
    mysql: {
      columnName: 'dedup_key',
      dataType: 'varchar',
      dataLength: 64,
      nullable: 'N',
    },
  })
  dedupKey: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    mysql: {
      columnName: 'payload_raw',
      dataType: 'longtext',
      nullable: 'N',
    },
  })
  payloadRaw: string;

  @property({
    type: 'object',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'payload_json',
      dataType: 'json',
      nullable: 'Y',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payloadJson?: any | null;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 3,
    scale: 0,
    mysql: {
      columnName: 'qos',
      dataType: 'tinyint',
      dataPrecision: 3,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  qos?: number | null;

  @property({
    type: 'boolean',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'retain',
      dataType: 'tinyint',
      nullable: 'Y',
    },
  })
  retain?: boolean | null;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {nullable: false},
    mysql: {
      columnName: 'received_at',
      dataType: 'datetime',
      nullable: 'N',
    },
  })
  receivedAt: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 255,
    mysql: {
      columnName: 'broker_host',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'N',
    },
  })
  brokerHost: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 255,
    mysql: {
      columnName: 'client_id',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'Y',
    },
  })
  clientId?: string | null;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    mysql: {
      columnName: 'parse_error',
      dataType: 'text',
      nullable: 'Y',
    },
  })
  parseError?: string | null;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 128,
    mysql: {
      columnName: 'device_id',
      dataType: 'varchar',
      dataLength: 128,
      nullable: 'Y',
    },
  })
  deviceId?: string | null;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MqttMessageLog>) {
    super(data);
  }
}

export interface MqttMessageLogRelations {
  // describe navigational properties here
}

export type MqttMessageLogWithRelations = MqttMessageLog & MqttMessageLogRelations;
