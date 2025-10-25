import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_configuracion'
    }
  }
})
export class EnvioConfiguracion extends Entity {
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

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envioId'}})
  envioId: number;

  @property({
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y'
    }
  })
  nombre?: string;

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
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'unidadMedida',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  unidadMedida?: string;

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

  constructor(data?: Partial<EnvioConfiguracion>) {
    super(data);
  }
}

export interface EnvioConfiguracionRelations {
  envio?: Envio;
}

export type EnvioConfiguracionWithRelations = EnvioConfiguracion & EnvioConfiguracionRelations;