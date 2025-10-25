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
