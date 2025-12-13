import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Cliente} from './cliente.model';

@model({
  settings: {
    mysql: {
      table: 'envio'
    }
  }
})
export class Envio extends Entity {
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

  @belongsTo(() => Empresa, {name: 'empresa'}, {mysql: {columnName: 'empresaId'}})
  empresaId: number;

  @belongsTo(() => Cliente, {name: 'cliente'}, {mysql: {columnName: 'clienteId'}})
  clienteId: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'numero',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N'
    }
  })
  numero?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'origenRuta',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  origenRuta?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'fechaLlegada',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  fechaLlegada?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'gpsRutaOrigen',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  gpsRutaOrigen?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'destinoRuta',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  destinoRuta?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'gpsRutaDestino',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  gpsRutaDestino?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'fechaSalida',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  fechaSalida?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'paradasPrevistas',
      dataType: 'int',
      dataLength: 3,
      nullable: 'Y'
    }
  })
  paradasPrevistas?: number;

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
      nullable: 'Y'
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

  constructor(data?: Partial<Envio>) {
    super(data);
  }
}

export interface EnvioRelations {
  empresa?: Empresa;
  cliente?: Cliente;
}

export type EnvioWithRelations = Envio & EnvioRelations;