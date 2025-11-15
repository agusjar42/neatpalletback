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
      columnName: 'pesoKgs',
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
      columnName: 'pesoTotal',
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
      columnName: 'fotoProducto',
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
      columnName: 'fotoPallet',
      dataType: 'varchar',
      dataLength: 250,
      nullable: 'Y'
    }
  })
  fotoPallet?: string;

  // ===== CAMPOS TEMPORALES PARA PROCESAR IMÁGENES =====
  // Estos campos NO se mapean a la base de datos
  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  fotoProductoBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  fotoProductoNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  fotoProductoTipo?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  fotoPalletBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  fotoPalletNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  fotoPalletTipo?: string;
  // ===== FIN CAMPOS TEMPORALES =====

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
      nullable: 'N'
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

  constructor(data?: Partial<EnvioContenido>) {
    super(data);
  }
}

export interface EnvioContenidoRelations {
  envio?: Envio;
}

export type EnvioContenidoWithRelations = EnvioContenido & EnvioContenidoRelations;