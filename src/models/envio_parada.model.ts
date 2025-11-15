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

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envioId'}})
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
      columnName: 'lugarParada',
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
      columnName: 'lugarParadaGps',
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
      columnName: 'nombreOperario',
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
      columnName: 'telefonoOperario',
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
      columnName: 'emailOperario',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y'
    }
  })
  emailOperario?: string;

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

  constructor(data?: Partial<EnvioParada>) {
    super(data);
  }
}

export interface EnvioParadaRelations {
  envio?: Envio;
}

export type EnvioParadaWithRelations = EnvioParada & EnvioParadaRelations;