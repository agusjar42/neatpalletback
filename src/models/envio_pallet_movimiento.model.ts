import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoSensor} from './tipo_sensor.model';
import {EnvioPallet} from './envio_pallet.model';

@model({
  settings: {
    mysql: {
      table: 'envio_pallet_movimiento'
    }
  }
})
export class EnvioPalletMovimiento extends Entity {
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

  @belongsTo(() => TipoSensor, {name: 'tipoSensor'}, {mysql: {columnName: 'tipoSensorId'}})
  tipoSensorId: number;

  @belongsTo(() => EnvioPallet, {name: 'envioPallet'}, {mysql: {columnName: 'envioPalletId'}})
  envioPalletId: number;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'fecha',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  fecha?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'gps',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  gps?: string;

  @property({
    type: 'string',
    length: 250,
    mysql: {
      columnName: 'imagen',
      dataType: 'varchar',
      dataLength: 250,
      nullable: 'Y'
    }
  })
  imagen?: string;

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

  // ===== CAMPOS TEMPORALES PARA PROCESAR IMÁGENES =====
  // Estos campos NO se mapean a la base de datos
  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  imagenBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  imagenNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  imagenTipo?: string;

  // ===== FIN CAMPOS TEMPORALES =====

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

  constructor(data?: Partial<EnvioPalletMovimiento>) {
    super(data);
  }
}

export interface EnvioPalletMovimientoRelations {
  tipoSensor?: TipoSensor;
  envioPallet?: EnvioPallet;
}

export type EnvioPalletMovimientoWithRelations = EnvioPalletMovimiento & EnvioPalletMovimientoRelations;
