import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {EnvioSensor} from './envio_sensor.model';
import {EnvioMovimiento} from './envio_movimiento.model';

@model({
  settings: {
    mysql: {
      table: 'tipo_sensor'
    }
  }
})
export class TipoSensor extends Entity {
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

@belongsTo(() => Empresa, {name: 'empresa'}, {mysql: {columnName: 'empresaId'}})
  empresaId: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 1,
    mysql: {
      columnName: 'activoSn',
      dataType: 'varchar',
      dataLength: 1,
      nullable: 'Y'
    }
  })
  activoSn?: string;

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

  @hasMany(() => EnvioSensor, {keyTo: 'tipoSensorId'})
  envioSensores: EnvioSensor[];

  @hasMany(() => EnvioMovimiento, {keyTo: 'tipoSensorId'})
  envioMovimientos: EnvioMovimiento[];

  constructor(data?: Partial<TipoSensor>) {
    super(data);
  }
}

export interface TipoSensorRelations {
  empresa?: Empresa;
  envioSensores?: EnvioSensor[];
  envioMovimientos?: EnvioMovimiento[];
}

export type TipoSensorWithRelations = TipoSensor & TipoSensorRelations;