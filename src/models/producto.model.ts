import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'producto'}}})
export class Producto extends Entity {
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

  @belongsTo(() => Cliente, {name: 'cliente'}, {mysql: {columnName: 'clienteId'}})
  clienteId: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    generated: false,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  nombre?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaCreacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaCreacion?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fechaModificacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaModificacion?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuCreacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuCreacion?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuModificacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuModificacion?: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 1,
    generated: false,
    mysql: {columnName: 'activoSN', dataType: 'varchar', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  activoSN?: string;

  @property({
    type: 'number',
    precision: 18,
    scale: 2,
    mysql: {columnName: 'pesoKgs', dataType: 'decimal', dataLength: 18, dataPrecision: 18, dataScale: 2, nullable: 'Y'}
  })
  pesoKgs?: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  cliente?: Cliente;
}

export type ProductoWithRelations = Producto & ProductoRelations;
