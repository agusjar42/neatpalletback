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

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envio_id'}})
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
      columnName: 'unidad_medida',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  unidadMedida?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuario_creacion',
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
      columnName: 'fecha_creacion',
      dataType: 'timestamp',
      nullable: 'Y'
    }
  })
  fechaCreacion?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuario_modificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuarioModificacion?: number;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fecha_modificacion',
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