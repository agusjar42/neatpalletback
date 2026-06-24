import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {EnvioOperario} from '../models';
import {EnvioOperarioRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class EnvioOperarioController {
  constructor(
    @repository(EnvioOperarioRepository)
    public envioOperarioRepository: EnvioOperarioRepository,
  ) {}

  @post('/envio-operarios')
  @response(200, {
    description: 'EnvioOperario model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioOperario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioOperario, {
            title: 'NewEnvioOperario',
            exclude: ['id'],
          }),
        },
      },
    })
    envioOperario: Omit<EnvioOperario, 'id'>,
  ): Promise<EnvioOperario> {
    return this.envioOperarioRepository.create(envioOperario);
  }

  @get('/envio-operarios/count')
  @response(200, {
    description: 'EnvioOperario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioOperario) where?: Where<EnvioOperario>,
  ): Promise<Count> {
    const dataSource = this.envioOperarioRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_operario', where);
  }

  @get('/envio-operarios')
  @response(200, {
    description: 'Array of EnvioOperario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioOperario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioOperario) filter?: Filter<EnvioOperario>,
  ): Promise<EnvioOperario[]> {
    const dataSource = this.envioOperarioRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_operario', filter, '*');
  }

  @patch('/envio-operarios')
  @response(200, {
    description: 'EnvioOperario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioOperario, {partial: true}),
        },
      },
    })
    envioOperario: EnvioOperario,
    @param.where(EnvioOperario) where?: Where<EnvioOperario>,
  ): Promise<Count> {
    return this.envioOperarioRepository.updateAll(envioOperario, where);
  }

  @get('/envio-operarios/{id}')
  @response(200, {
    description: 'EnvioOperario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioOperario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioOperario, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioOperario>
  ): Promise<EnvioOperario> {
    return this.envioOperarioRepository.findById(id, filter);
  }

  @patch('/envio-operarios/{id}')
  @response(204, {
    description: 'EnvioOperario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioOperario, {partial: true}),
        },
      },
    })
    envioOperario: EnvioOperario,
  ): Promise<void> {
    await this.envioOperarioRepository.updateById(id, envioOperario);
  }

  @put('/envio-operarios/{id}')
  @response(204, {
    description: 'EnvioOperario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioOperario: EnvioOperario,
  ): Promise<void> {
    await this.envioOperarioRepository.replaceById(id, envioOperario);
  }

  @del('/envio-operarios/{id}')
  @response(204, {
    description: 'EnvioOperario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioOperarioRepository.deleteById(id);
  }
}
