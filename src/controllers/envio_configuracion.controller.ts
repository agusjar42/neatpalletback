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
import {EnvioConfiguracion} from '../models';
import {EnvioConfiguracionRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioConfiguracionController {
  constructor(
    @repository(EnvioConfiguracionRepository)
    public envioConfiguracionRepository : EnvioConfiguracionRepository,
  ) {}

  @post('/envio-configuraciones')
  @response(200, {
    description: 'EnvioConfiguracion model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioConfiguracion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {
            title: 'NewEnvioConfiguracion',
            exclude: ['id'],
          }),
        },
      },
    })
    envioConfiguracion: Omit<EnvioConfiguracion, 'id'>,
  ): Promise<EnvioConfiguracion> {
    return this.envioConfiguracionRepository.create(envioConfiguracion);
  }

  @get('/envio-configuraciones/count')
  @response(200, {
    description: 'EnvioConfiguracion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioConfiguracion) where?: Where<EnvioConfiguracion>,
  ): Promise<Count> {
    const dataSource = this.envioConfiguracionRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_configuracion_envio', where);
  }

  @get('/envio-configuraciones')
  @response(200, {
    description: 'Array of EnvioConfiguracion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioConfiguracion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioConfiguracion) filter?: Filter<EnvioConfiguracion>,
  ): Promise<EnvioConfiguracion[]> {
    const dataSource = this.envioConfiguracionRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_configuracion_envio', filter, camposSelect);
  }

  @patch('/envio-configuraciones')
  @response(200, {
    description: 'EnvioConfiguracion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {partial: true}),
        },
      },
    })
    envioConfiguracion: EnvioConfiguracion,
    @param.where(EnvioConfiguracion) where?: Where<EnvioConfiguracion>,
  ): Promise<Count> {
    return this.envioConfiguracionRepository.updateAll(envioConfiguracion, where);
  }

  @get('/envio-configuraciones/{id}')
  @response(200, {
    description: 'EnvioConfiguracion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioConfiguracion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioConfiguracion, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioConfiguracion>
  ): Promise<EnvioConfiguracion> {
    return this.envioConfiguracionRepository.findById(id, filter);
  }

  @patch('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {partial: true}),
        },
      },
    })
    envioConfiguracion: EnvioConfiguracion,
  ): Promise<void> {
    await this.envioConfiguracionRepository.updateById(id, envioConfiguracion);
  }

  @put('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioConfiguracion: EnvioConfiguracion,
  ): Promise<void> {
    await this.envioConfiguracionRepository.replaceById(id, envioConfiguracion);
  }

  @del('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioConfiguracionRepository.deleteById(id);
  }
}