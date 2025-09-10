import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {EnvioContenido} from './envio-contenido.model';
import {EnvioParada} from './envio-parada.model';
import {EnvioVehiculo} from './envio-vehiculo.model';
import {EnvioPallet} from './envio-pallet.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'neatpallet', table: 'envio'}}
})
export class Envio extends Entity {
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
    length: 4,
    generated: false,
    mysql: {columnName: 'anyo', dataType: 'varchar', dataLength: 4, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  anyo?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 500,
    generated: false,
    mysql: {columnName: 'origen', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  origen?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 500,
    generated: false,
    mysql: {columnName: 'origen_coordenadas_gps', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  origenCoordenadasGps?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 500,
    generated: false,
    mysql: {columnName: 'destino', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  destino?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 500,
    generated: false,
    mysql: {columnName: 'destino_coordenadas_gps', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  destinoCoordenadasGps?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 19,
    generated: false,
    mysql: {columnName: 'fecha_salida', dataType: 'varchar', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaSalida?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 19,
    generated: false,
    mysql: {columnName: 'fecha_llegada', dataType: 'varchar', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaLlegada?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    generated: false,
    mysql: {columnName: 'paradas_previstas', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  paradasPrevistas?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 11,
    scale: 0,
    generated: false,
    mysql: {columnName: 'usuario_creacoin', dataType: 'int', dataLength: null, dataPrecision: 11, dataScale: 0, nullable: 'Y', generated: false},
  })
  usuarioCreacion?: number;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'fecha_creacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaCreacion?: string;

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
    mysql: {columnName: 'fecha_modificacion', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fechaModificacion?: string;

  @belongsTo(() => Empresa, {name: 'empresa', keyFrom: 'empresaId'}, {mysql: {columnName: 'empresa_id'}})
  empresaId: number;

  @hasMany(() => EnvioContenido, {keyTo: 'envioId'})
  contenidos: EnvioContenido[];

  @hasMany(() => EnvioParada, {keyTo: 'envioId'})
  paradas: EnvioParada[];

  @hasMany(() => EnvioVehiculo, {keyTo: 'envioId'})
  vehiculos: EnvioVehiculo[];

  @hasMany(() => EnvioPallet, {keyTo: 'palletId'})
  pallets: EnvioPallet[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Envio>) {
    super(data);
  }
}

export interface EnvioRelations {
  empresa?: Empresa;
  contenidos?: EnvioContenido[];
  paradas?: EnvioParada[];
  vehiculos?: EnvioVehiculo[];
  pallets?: EnvioPallet[];
}

export type EnvioWithRelations = Envio & EnvioRelations;