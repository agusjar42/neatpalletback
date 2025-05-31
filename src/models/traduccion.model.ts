import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'traduccion'}}
})
export class Traduccion extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 5,
    scale: 0,
    generated: false,
    mysql: {columnName: 'idioma_id', dataType: 'smallint', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'N', generated: false},
  })
  idiomaId: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 1000,
    generated: false,
    mysql: {columnName: 'clave', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  clave?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 1000,
    generated: false,
    mysql: {columnName: 'valor', dataType: 'varchar', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  valor?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fecha_creacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaCreacion?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fecha_modificacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaModificacion?: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usu_creacion', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: false},
  })
  usuCreacion: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 10,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usu_modificacion', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuModificacion?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Traduccion>) {
    super(data);
  }
}

export interface TraduccionRelations {
  // describe navigational properties here
}

export type TraduccionWithRelations = Traduccion & TraduccionRelations;
