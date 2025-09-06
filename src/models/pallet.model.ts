import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {PalletConfiguracion} from './pallet-configuracion.model';
import {EnvioPallet} from './envio-pallet.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'pallet'}}
})
export class Pallet extends Entity {
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
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    generated: false,
    mysql: {columnName: 'codigo', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  codigo?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 150,
    generated: false,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 150, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  nombre?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuario_creacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioCreacion?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuario_modificacion', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioModificacion?: number;

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

  @belongsTo(() => Empresa, {name: 'empresa'})
  empresaId: number;

  @hasOne(() => PalletConfiguracion, {keyTo: 'palletId'})
  configuracion: PalletConfiguracion;

  @hasMany(() => EnvioPallet, {keyTo: 'palletId'})
  envios: EnvioPallet[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pallet>) {
    super(data);
  }
}

export interface PalletRelations {
  empresa?: Empresa;
  configuracion?: PalletConfiguracion;
  envios?: EnvioPallet[];
}

export type PalletWithRelations = Pallet & PalletRelations;