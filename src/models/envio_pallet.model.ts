import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pallet} from './pallet.model';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_pallet'
    }
  }
})
export class EnvioPallet extends Entity {
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

  @belongsTo(() => Pallet, {name: 'pallet'}, {mysql: {columnName: 'palletId'}})
  palletId: number;

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envioId'}})
  envioId: number;

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

  constructor(data?: Partial<EnvioPallet>) {
    super(data);
  }
}

export interface EnvioPalletRelations {
  pallet?: Pallet;
  envio?: Envio;
}

export type EnvioPalletWithRelations = EnvioPallet & EnvioPalletRelations;