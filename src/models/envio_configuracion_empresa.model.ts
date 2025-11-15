import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';

@model({
  settings: {
    mysql: {
      table: 'envio_configuracion_empresa'
    }
  }
})
export class EnvioConfiguracionEmpresa extends Entity {
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

  @belongsTo(() => Empresa, {name: 'empresa'}, {mysql: {columnName: 'empresaId'}})
  empresaId: number;

  @property({
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'nombre',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'Y'
    }
  })
  nombre?: string;

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
    length: 50,
    mysql: {
      columnName: 'unidadMedida',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  unidadMedida?: string;

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

  constructor(data?: Partial<EnvioConfiguracionEmpresa>) {
    super(data);
  }
}

export interface EnvioConfiguracionEmpresaRelations {
  empresa?: Empresa;
}

export type EnvioConfiguracionEmpresaWithRelations = EnvioConfiguracionEmpresa & EnvioConfiguracionEmpresaRelations;