import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'evento_configuracion',
    },
  },
})
export class EventoConfiguracion extends Entity {
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
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y',
    },
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'valor',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y',
    },
  })
  valor?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {
      columnName: 'unidadMedida',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y',
    },
  })
  unidadMedida?: string;

  @property({
    type: 'number',
    mysql: {
      columnName: 'orden',
      dataType: 'int',
      dataLength: 4,
      nullable: 'Y',
    },
  })
  orden?: number;

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
    type: 'number',
    mysql: {
      columnName: 'usuarioCreacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y',
    },
  })
  usuarioCreacion?: number;

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
    type: 'number',
    mysql: {
      columnName: 'usuarioModificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y',
    },
  })
  usuarioModificacion?: number;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fechaModificacion',
      dataType: 'timestamp',
      nullable: 'Y',
    },
  })
  fechaModificacion?: string;

  constructor(data?: Partial<EventoConfiguracion>) {
    super(data);
  }
}

export interface EventoConfiguracionRelations {}

export type EventoConfiguracionWithRelations = EventoConfiguracion &
  EventoConfiguracionRelations;
