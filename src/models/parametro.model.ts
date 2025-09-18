import {Entity, model, property, hasMany} from '@loopback/repository';
import {PalletParametro} from './pallet_parametro.model';

@model({
  settings: {
    mysql: {
      table: 'parametro'
    }
  }
})
export class Parametro extends Entity {
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
    length: 50,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 500,
    mysql: {
      columnName: 'valor_disponible',
      dataType: 'varchar',
      dataLength: 500,
      nullable: 'Y'
    }
  })
  valorDisponible?: string;

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
      nullable: 'N'
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

  @property({
    type: 'string',
    length: 1,
    mysql: {
      columnName: 'activo_sn',
      dataType: 'varchar',
      dataLength: 1,
      nullable: 'Y'
    }
  })
  activoSn?: string;

  @hasMany(() => PalletParametro, {keyTo: 'parametroId'})
  palletParametros: PalletParametro[];

  constructor(data?: Partial<Parametro>) {
    super(data);
  }
}

export interface ParametroRelations {
  palletParametros?: PalletParametro[];
}

export type ParametroWithRelations = Parametro & ParametroRelations;