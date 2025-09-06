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
import {EnvioContenido} from '../models';
import {EnvioContenidoRepository} from '../repositories';

export class EnvioContenidoController {
  constructor(
    @repository(EnvioContenidoRepository)
    public envioContenidoRepository : EnvioContenidoRepository,
  ) {}

  @post('/envio-contenidos')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioContenido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {
            title: 'NewEnvioContenido',
            exclude: ['id'],
          }),
        },
      },
    })
    envioContenido: Omit<EnvioContenido, 'id'>,
  ): Promise<EnvioContenido> {
    return this.envioContenidoRepository.create(envioContenido);
  }

  @get('/envio-contenidos/count')
  @response(200, {
    description: 'EnvioContenido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioContenido) where?: Where<EnvioContenido>,
  ): Promise<Count> {
    return this.envioContenidoRepository.count(where);
  }

  @get('/envio-contenidos')
  @response(200, {
    description: 'Array of EnvioContenido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioContenido) filter?: Filter<EnvioContenido>,
  ): Promise<EnvioContenido[]> {
    return this.envioContenidoRepository.find(filter);
  }

  @patch('/envio-contenidos')
  @response(200, {
    description: 'EnvioContenido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {partial: true}),
        },
      },
    })
    envioContenido: EnvioContenido,
    @param.where(EnvioContenido) where?: Where<EnvioContenido>,
  ): Promise<Count> {
    return this.envioContenidoRepository.updateAll(envioContenido, where);
  }

  @get('/envio-contenidos/{id}')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioContenido, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioContenido>
  ): Promise<EnvioContenido> {
    return this.envioContenidoRepository.findById(id, filter);
  }

  @patch('/envio-contenidos/{id}')
  @response(204, {
    description: 'EnvioContenido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {partial: true}),
        },
      },
    })
    envioContenido: EnvioContenido,
  ): Promise<void> {
    await this.envioContenidoRepository.updateById(id, envioContenido);
  }

  @put('/envio-contenidos/{id}')
  @response(204, {
    description: 'EnvioContenido PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioContenido: EnvioContenido,
  ): Promise<void> {
    await this.envioContenidoRepository.replaceById(id, envioContenido);
  }

  @del('/envio-contenidos/{id}')
  @response(204, {
    description: 'EnvioContenido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioContenidoRepository.deleteById(id);
  }
}