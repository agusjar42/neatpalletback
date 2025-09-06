import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'neatpallet', table: 'usuario_credenciales'}
  }
})
export class UsuarioCredenciales extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 11,
    scale: 0,
    generated: true,
    id: true,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'N', generated: true},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 512,
    generated: false,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 512, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  password: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuario_id', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'N', generated: false},
  })
  usuarioId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UsuarioCredenciales>) {
    super(data);
  }
}

export interface UsuarioCredencialesRelations {
  // describe navigational properties here
}

export type UsuarioCredencialesWithRelations = UsuarioCredenciales & UsuarioCredencialesRelations;
