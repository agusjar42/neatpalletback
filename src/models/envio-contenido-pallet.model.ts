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

  @belongsTo(() => EnvioContenido, {name: 'envioContenido'}, {mysql: {columnName: 'envio_contenido_id'}})
  envioContenidoId: number;

  @belongsTo(() => Pallet, {name: 'pallet'}, {mysql: {columnName: 'pallet_id'}})
  palletId: number;

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

  constructor(data?: Partial<EnvioContenidoPallet>) {
    super(data);
  }
}

export interface EnvioContenidoPalletRelations {
  envioContenido?: EnvioContenido;
  pallet?: Pallet;
}

export type EnvioContenidoPalletWithRelations = EnvioContenidoPallet & EnvioContenidoPalletRelations;
