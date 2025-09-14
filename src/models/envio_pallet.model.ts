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

  @belongsTo(() => Pallet, {name: 'pallet'}, {mysql: {columnName: 'pallet_id'}})
  palletId: number;

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envio_id'}})
  envioId: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuario_creacion',
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
      columnName: 'fecha_creacion',
      dataType: 'timestamp',
      nullable: 'Y'
    }
  })
  fechaCreacion?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuario_modificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuarioModificacion?: number;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fecha_modificacion',
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