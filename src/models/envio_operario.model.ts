import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Envio} from './envio.model';
import {Operario} from './operario.model';

@model({
  settings: {
    mysql: {
      table: 'envio_operario'
    }
  }
})
export class EnvioOperario extends Entity {
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
  envioId?: number;

  @belongsTo(() => Operario, {name: 'operario'}, {mysql: {columnName: 'operarioId'}})
  operarioId?: number;

  @property({
    type: 'date',
    mysql: {
      columnName: 'fechaCreacion',
      dataType: 'timestamp',
      nullable: 'Y'
    }
  })
  fechaCreacion?: string;

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
      columnName: 'usuCreacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuCreacion?: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'usuModificacion',
      dataType: 'int',
      dataLength: 11,
      nullable: 'Y'
    }
  })
  usuModificacion?: number;

  constructor(data?: Partial<EnvioOperario>) {
    super(data);
  }
}

export interface EnvioOperarioRelations {
  envio?: Envio;
  operario?: Operario;
}

export type EnvioOperarioWithRelations = EnvioOperario & EnvioOperarioRelations;
