import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Envio} from './envio.model';
import {LugarParada} from './lugar-parada.model';
import {Operario} from './operario.model';

@model({
  settings: {
    mysql: {
      table: 'envio_parada'
    }
  }
})
export class EnvioParada extends Entity {
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

  @belongsTo(() => Envio, {name: 'envio'}, {mysql: {columnName: 'envioId'}})
  envioId: number;

  @property({
    type: 'string',
    length: 30,
    mysql: {
      columnName: 'tipo',
      dataType: 'varchar',
      dataLength: 30,
      nullable: 'Y'
    }
  })
  tipo?: string;

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
    length: 20,
    mysql: {
      columnName: 'eta',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  eta?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'horaReal',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  horaReal?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'detencion',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  detencion?: string;

  @property({
    type: 'string',
    length: 20,
    mysql: {
      columnName: 'estado',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'Y'
    }
  })
  estado?: string;

  @belongsTo(() => LugarParada, {name: 'lugarParada'}, {mysql: {columnName: 'lugarParadaId'}})
  lugarParadaId: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'lugarParadaGps',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N'
    }
  })
  lugarParadaGps: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mysql: {
      columnName: 'direccion',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'N'
    }
  })
  direccion: string;

  @belongsTo(() => Operario, {name: 'operario'}, {mysql: {columnName: 'operarioId'}})
  operarioId: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {
      columnName: 'telefonoOperario',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'N'
    }
  })
  telefonoOperario: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mysql: {
      columnName: 'emailOperario',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'N'
    }
  })
  emailOperario: string;

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
    required: true,
    mysql: {
      columnName: 'orden',
      dataType: 'int',
      dataLength: 4,
      nullable: 'N'
    }
  })
  orden: number;

  constructor(data?: Partial<EnvioParada>) {
    super(data);
  }
}

export interface EnvioParadaRelations {
  envio?: Envio;
  lugarParada?: LugarParada;
  operario?: Operario;
}

export type EnvioParadaWithRelations = EnvioParada & EnvioParadaRelations;
