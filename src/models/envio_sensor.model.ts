import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoSensor} from './tipo_sensor.model';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_sensor'
    }
  }
})
export class EnvioSensor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'N'
    }
  })
  id?: number;

  @belongsTo(() => TipoSensor, {name: 'tipoSensor'}, {mysql: {columnName: 'tipoSensorId'}})
  tipoSensorId: number;

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envioId'}})
  envioId: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'valor',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  valor?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuarioCreacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuarioCreacion?: number;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      columnName: 'fechaCreacion',
      dataType: 'timestamp',
      nullable: 'Y'
    }
  })
  fechaCreacion?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuarioModificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuarioModificacion?: number;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fechaModificacion',
      dataType: 'timestamp',
      nullable: 'Y'
    }
  })
  fechaModificacion?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'orden',
      dataType: 'int',
      dataLength: 4,
      nullable: 'Y'
    }
  })
  orden?: number;

  constructor(data?: Partial<EnvioSensor>) {
    super(data);
  }
}

export interface EnvioSensorRelations {
  tipoSensor?: TipoSensor;
  envio?: Envio;
}

export type EnvioSensorWithRelations = EnvioSensor & EnvioSensorRelations;