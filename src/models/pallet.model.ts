import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {EnvioPallet} from './envio_pallet.model';
import {PalletParametro} from './pallet_parametro.model';

@model({
  settings: {
    mysql: {
      table: 'pallet'
    }
  }
})
export class Pallet extends Entity {
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

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'fechaImpresion',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  fechaImpresion?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'codigo',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  codigo?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'alias',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  alias?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'periodoEnvioMail',
      dataType: 'int',
      dataLength: 4,
      nullable: 'Y'
    }
  })
  periodoEnvioMail?: number;

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
    length: 50,
    mysql: {
      columnName: 'modelo',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  modelo?: string;

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

  @hasMany(() => EnvioPallet, {keyTo: 'palletId'})
  envioPallets: EnvioPallet[];

  @hasMany(() => PalletParametro, {keyTo: 'palletId'})
  palletParametros: PalletParametro[];

  constructor(data?: Partial<Pallet>) {
    super(data);
  }
}

export interface PalletRelations {
  empresa?: Empresa;
  envioPallets?: EnvioPallet[];
  palletParametros?: PalletParametro[];
}

export type PalletWithRelations = Pallet & PalletRelations;