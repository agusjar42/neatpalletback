import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoSensor} from './tipo_sensor.model';
import {Empresa} from './empresa.model';

@model({
  settings: {
    mysql: {
      table: 'envio_sensor_empresa'
    }
  }
})
export class EnvioSensorEmpresa extends Entity {
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

  @belongsTo(() => Empresa, {name: 'empresa'}, {mysql: {columnName: 'empresaId'}})
  empresaId: number;

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

  constructor(data?: Partial<EnvioSensorEmpresa>) {
    super(data);
  }
}

export interface EnvioSensorEmpresaRelations {
  tipoSensor?: TipoSensor;
  empresa?: Empresa;
}

export type EnvioSensorEmpresaWithRelations = EnvioSensorEmpresa & EnvioSensorEmpresaRelations;
