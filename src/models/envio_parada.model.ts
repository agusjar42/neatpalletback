import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_parada'
    }
  }
})
export class EnvioParada extends Entity {
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
    length: 20,
    mysql: {
      columnName: 'fecha',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  fecha?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'lugar_parada',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  lugarParada?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'lugar_parada_gps',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  lugarParadaGps?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'direccion',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  direccion?: string;

  @property({
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'nombre_operario',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y'
    }
  })
  nombreOperario?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'telefono_operario',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  telefonoOperario?: string;

  @property({
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'email_operario',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y'
    }
  })
  emailOperario?: string;

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

  constructor(data?: Partial<EnvioParada>) {
    super(data);
  }
}

export interface EnvioParadaRelations {
  envio?: Envio;
}

export type EnvioParadaWithRelations = EnvioParada & EnvioParadaRelations;