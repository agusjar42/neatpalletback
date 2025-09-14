import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pallet} from './pallet.model';
import {Parametro} from './parametro.model';

@model({
  settings: {
    mysql: {
      table: 'pallet_parametro'
    }
  }
})
export class PalletParametro extends Entity {
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

  @belongsTo(() => Parametro, {name: 'parametro'}, {mysql: {columnName: 'parametro_id'}})
  parametroId: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'valor',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  valor?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'texto_libre',
      dataType: 'varchar',
      dataLength: 500,
      nullable: 'Y'
    }
  })
  textoLibre?: string;

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

  constructor(data?: Partial<PalletParametro>) {
    super(data);
  }
}

export interface PalletParametroRelations {
  pallet?: Pallet;
  parametro?: Parametro;
}

export type PalletParametroWithRelations = PalletParametro & PalletParametroRelations;