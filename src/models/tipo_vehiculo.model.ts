import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'tipo_vehiculo',
    },
  },
})
export class TipoVehiculo extends Entity {
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

  @property({
    type: 'number',
    mysql: {
      columnName: 'orden',
      dataType: 'int',
      dataLength: 11,
      nullable: 'N',
    },
  })
  orden: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N',
    },
  })
  nombre: string;

  @property({
    type: 'string',
    length: 1,
    default: 'S',
    mysql: {
      columnName: 'activoSn',
      dataType: 'varchar',
      dataLength: 1,
      nullable: 'Y',
    },
  })
  activoSn?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
    mysql: {
      columnName: 'fechaCreacion',
      dataType: 'timestamp',
      nullable: 'Y',
    },
  })
  fechaCreacion?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fechaModificacion',
      dataType: 'timestamp',
      nullable: 'Y',
    },
  })
  fechaModificacion?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuCreacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y',
    },
  })
  usuCreacion?: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuModificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y',
    },
  })
  usuModificacion?: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'tipo_vehiculocol',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y',
    },
  })
  tipoVehiculocol?: string;

  constructor(data?: Partial<TipoVehiculo>) {
    super(data);
  }
}

export interface TipoVehiculoRelations {}

export type TipoVehiculoWithRelations = TipoVehiculo & TipoVehiculoRelations;
