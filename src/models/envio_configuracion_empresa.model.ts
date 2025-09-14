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

  @belongsTo(() => Empresa, {name: 'empresa'}, {mysql: {columnName: 'empresa_id'}})
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
      columnName: 'unidad_medida',
      dataType: 'varchar',
      dataLength: 50,
      nullable: 'Y'
    }
  })
  unidadMedida?: string;

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

  constructor(data?: Partial<EnvioConfiguracionEmpresa>) {
    super(data);
  }
}

export interface EnvioConfiguracionEmpresaRelations {
  empresa?: Empresa;
}

export type EnvioConfiguracionEmpresaWithRelations = EnvioConfiguracionEmpresa & EnvioConfiguracionEmpresaRelations;