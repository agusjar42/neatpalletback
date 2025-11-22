import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EnvioConfiguracionEmpresa} from '../models';
import {EnvioConfiguracionEmpresaRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioConfiguracionEmpresaController {
  constructor(
    @repository(EnvioConfiguracionEmpresaRepository)
    public envioConfiguracionEmpresaRepository : EnvioConfiguracionEmpresaRepository,
  ) {}

  @post('/envio-configuracion-empresas')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioConfiguracionEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {
            title: 'NewEnvioConfiguracionEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    envioConfiguracionEmpresa: Omit<EnvioConfiguracionEmpresa, 'id'>,
  ): Promise<EnvioConfiguracionEmpresa> {
    return this.envioConfiguracionEmpresaRepository.create(envioConfiguracionEmpresa);
  }

  @get('/envio-configuracion-empresas/count')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioConfiguracionEmpresa) where?: Where<EnvioConfiguracionEmpresa>,
  ): Promise<Count> {
    const dataSource = this.envioConfiguracionEmpresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'envio_configuracion_empresa', where);
  }

  @get('/envio-configuracion-empresas')
  @response(200, {
    description: 'Array of EnvioConfiguracionEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioConfiguracionEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioConfiguracionEmpresa) filter?: Filter<EnvioConfiguracionEmpresa>,
  ): Promise<EnvioConfiguracionEmpresa[]> {
    const dataSource = this.envioConfiguracionEmpresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'envio_configuracion_empresa', filter, '*');
  } 

  @get('/envio-configuracion-empresas/{id}')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioConfiguracionEmpresa, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioConfiguracionEmpresa>
  ): Promise<EnvioConfiguracionEmpresa> {
    return this.envioConfiguracionEmpresaRepository.findById(id, filter);
  }

  @patch('/envio-configuracion-empresas/{id}')
  @response(204, {
    description: 'EnvioConfiguracionEmpresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {partial: true}),
        },
      },
    })
    envioConfiguracionEmpresa: EnvioConfiguracionEmpresa,
  ): Promise<void> {
    await this.envioConfiguracionEmpresaRepository.updateById(id, envioConfiguracionEmpresa);
  }

  @del('/envio-configuracion-empresas/{id}')
  @response(204, {
    description: 'EnvioConfiguracionEmpresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioConfiguracionEmpresaRepository.deleteById(id);
  }
}