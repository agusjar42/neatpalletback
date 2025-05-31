import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'usuario_restablecer_password'}}
})
export class UsuarioRestablecerPassword extends Entity {
  @property({
    type: 'number',
    //jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: true,
    id: true,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: true},
  })
  id?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 10,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuario_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: false},
  })
  usuarioId?: number;

  @property({
    type: 'string',
    //jsonSchema: {nullable: true},
    length: 250,
    generated: false,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  email?: string;

  @property({
    type: 'string',
    //jsonSchema: {nullable: true},
    length: 100,
    generated: false,
    mysql: {columnName: 'codigoRecuperacion', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  codigoRecuperacion?: string;

  @property({
    type: 'date',
    //jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'expiraEn', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  expiraEn?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UsuarioRestablecerPassword>) {
    super(data);
  }
}

export interface UsuarioRestablecerPasswordRelations {
  // describe navigational properties here
}

export type UsuarioRestablecerPasswordWithRelations = UsuarioRestablecerPassword & UsuarioRestablecerPasswordRelations;
