import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'tipo_carroceria'
    }
  }
})
export class TipoCarroceria extends Entity {
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
  
  constructor(data?: Partial<TipoCarroceria>) {
    super(data);
  }
}

export interface TipoCarroceriaRelations {
  // describe navigational properties here
}

export type TipoCarroceriaWithRelations = TipoCarroceria & TipoCarroceriaRelations;