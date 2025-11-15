import {Entity, model, property, belongsTo} from '@loopback/repository';
import {EnvioContenido} from './envio_contenido.model';
import {Pallet} from './pallet.model';

@model({
  settings: {
    mysql: {
      table: 'envio_contenido_pallet'
    }
  }
})
export class EnvioContenidoPallet extends Entity {
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

  @belongsTo(() => EnvioContenido, {name: 'envioContenido'}, {mysql: {columnName: 'envioContenidoId'}})
  envioContenidoId: number;

  @belongsTo(() => Pallet, {name: 'pallet'}, {mysql: {columnName: 'palletId'}})
  palletId: number;

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

  constructor(data?: Partial<EnvioContenidoPallet>) {
    super(data);
  }
}

export interface EnvioContenidoPalletRelations {
  envioContenido?: EnvioContenido;
  pallet?: Pallet;
}

export type EnvioContenidoPalletWithRelations = EnvioContenidoPallet & EnvioContenidoPalletRelations;
