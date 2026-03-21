import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Pallet} from './pallet.model';

@model({
  settings: {
    mysql: {
      table: 'empresa_pallet',
    },
  },
})
export class EmpresaPallet extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: 11,
      nullable: 'N',
    },
  })
  id?: number;

  @belongsTo(
    () => Empresa,
    {name: 'empresa'},
    {
      required: false,
      mysql: {columnName: 'empresaId'},
    },
  )
  empresaId?: number;

  @belongsTo(
    () => Pallet,
    {name: 'pallet'},
    {
      required: false,
      mysql: {columnName: 'palletId'},
    },
  )
  palletId?: number;

  constructor(data?: Partial<EmpresaPallet>) {
    super(data);
  }
}

export interface EmpresaPalletRelations {
  empresa?: Empresa;
  pallet?: Pallet;
}

export type EmpresaPalletWithRelations = EmpresaPallet & EmpresaPalletRelations;
