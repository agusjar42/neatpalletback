import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'refrescar_token'}}
})
export class RefrescarToken extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 11,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuarioId', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioId?: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 300,
    generated: false,
    mysql: {columnName: 'refreshToken', dataType: 'varchar', dataLength: 300, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  refreshToken?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 30,
    generated: false,
    mysql: {columnName: 'tipoToken', dataType: 'varchar', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  tipoToken?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 64,
    generated: false,
    mysql: {columnName: 'hashToken', dataType: 'varchar', dataLength: 64, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  hashToken?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaExpiracion', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaExpiracion?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaUso', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaUso?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 45,
    generated: false,
    mysql: {columnName: 'ipSolicitud', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  ipSolicitud?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 512,
    generated: false,
    mysql: {columnName: 'agenteUsuario', dataType: 'varchar', dataLength: 512, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  agenteUsuario?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuarioCreacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioCreacion?: number;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaCreacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaCreacion?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuarioModificacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioModificacion?: number;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaModificacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaModificacion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RefrescarToken>) {
    super(data);
  }
}

export interface RefrescarTokenRelations {
  // describe navigational properties here
}

export type RefrescarTokenWithRelations = RefrescarToken & RefrescarTokenRelations;
