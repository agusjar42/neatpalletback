import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoSensor} from './tipo_sensor.model';
import {Envio} from './envio.model';

@model({
  settings: {
    mysql: {
      table: 'envio_movimiento'
    }
  }
})
export class EnvioMovimiento extends Entity {
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

  @belongsTo(() => TipoSensor, {name: 'tipoSensor'}, {mysql: {columnName: 'tipo_sensor_id'}})
  tipoSensorId: number;

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envio_id'}})
  envioId: number;

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

  constructor(data?: Partial<EnvioMovimiento>) {
    super(data);
  }
}

export interface EnvioMovimientoRelations {
  tipoSensor?: TipoSensor;
  envio?: Envio;
}

export type EnvioMovimientoWithRelations = EnvioMovimiento & EnvioMovimientoRelations;