import {Entity, model, property, hasMany} from '@loopback/repository';
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
    length: 20,
    mysql: {
      columnName: 'adquisicion',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  adquisicion?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    jsonSchema: {nullable: false},
    mysql: {
      columnName: 'codigo',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N'
    }
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    jsonSchema: {nullable: false},
    mysql: {
      columnName: 'alias',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N'
    }
  })
  alias: string;

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
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'estado',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  estado?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'ultimaSenal',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  ultimaSenal?: string;

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
    required: true,
    jsonSchema: {nullable: false},
    mysql: {
      columnName: 'orden',
      dataType: 'int',
      dataLength: 4,
      nullable: 'N'
    }
  })
  orden: number;

  @hasMany(() => EnvioPallet, {keyTo: 'palletId'})
  envioPallets: EnvioPallet[];

  @hasMany(() => PalletParametro, {keyTo: 'palletId'})
  palletParametros: PalletParametro[];

  constructor(data?: Partial<Pallet>) {
    super(data);
  }
}

export interface PalletRelations {
  envioPallets?: EnvioPallet[];
  palletParametros?: PalletParametro[];
}

export type PalletWithRelations = Pallet & PalletRelations;
