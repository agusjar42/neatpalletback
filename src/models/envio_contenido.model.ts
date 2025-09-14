import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_contenido'
    }
  }
})
export class EnvioContenido extends Entity {
  @property({
    type: 'number',
    id: true,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'N'
    }
  })
  id: number;

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envio_id'}})
  envioId: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'producto',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  producto?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'referencia',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  referencia?: string;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {
      columnName: 'peso_kgs',
      dataType: 'decimal',
      dataLength: 18,
      dataPrecision: 18,
      dataScale: 2,
      nullable: 'Y'
    }
  })
  pesoKgs?: number;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {
      columnName: 'peso_total',
      dataType: 'decimal',
      dataLength: 18,
      dataPrecision: 18,
      dataScale: 2,
      nullable: 'Y'
    }
  })
  pesoTotal?: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'medidas',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  medidas?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {
      columnName: 'foto_producto',
      dataType: 'varchar',
      dataLength: 250,
      nullable: 'Y'
    }
  })
  fotoProducto?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {
      columnName: 'foto_pallet',
      dataType: 'varchar',
      dataLength: 250,
      nullable: 'Y'
    }
  })
  fotoPallet?: string;

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
      nullable: 'N'
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

  constructor(data?: Partial<EnvioContenido>) {
    super(data);
  }
}

export interface EnvioContenidoRelations {
  envio?: Envio;
}

export type EnvioContenidoWithRelations = EnvioContenido & EnvioContenidoRelations;