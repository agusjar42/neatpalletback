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
import {Envio} from '../models';
import {EnvioRepository} from '../repositories';

export class EnvioController {
  constructor(
    @repository(EnvioRepository)
    public envioRepository : EnvioRepository,
  ) {}

  @post('/envios')
  @response(200, {
    description: 'Envio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Envio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {
            title: 'NewEnvio',
            exclude: ['id'],
          }),
        },
      },
    })
    envio: Omit<Envio, 'id'>,
  ): Promise<Envio> {
    return this.envioRepository.create(envio);
  }

  @get('/envios/count')
  @response(200, {
    description: 'Envio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Envio) where?: Where<Envio>,
  ): Promise<Count> {
    return this.envioRepository.count(where);
  }

  @get('/envios')
  @response(200, {
    description: 'Array of Envio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Envio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Envio) filter?: Filter<Envio>,
  ): Promise<Envio[]> {
    return this.envioRepository.find(filter);
  }

  @patch('/envios')
  @response(200, {
    description: 'Envio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {partial: true}),
        },
      },
    })
    envio: Envio,
    @param.where(Envio) where?: Where<Envio>,
  ): Promise<Count> {
    return this.envioRepository.updateAll(envio, where);
  }

  @get('/envios/{id}')
  @response(200, {
    description: 'Envio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Envio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Envio, {exclude: 'where'}) filter?: FilterExcludingWhere<Envio>
  ): Promise<Envio> {
    return this.envioRepository.findById(id, filter);
  }

  @patch('/envios/{id}')
  @response(204, {
    description: 'Envio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {partial: true}),
        },
      },
    })
    envio: Envio,
  ): Promise<void> {
    await this.envioRepository.updateById(id, envio);
  }

  @put('/envios/{id}')
  @response(204, {
    description: 'Envio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envio: Envio,
  ): Promise<void> {
    await this.envioRepository.replaceById(id, envio);
  }

  @del('/envios/{id}')
  @response(204, {
    description: 'Envio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioRepository.deleteById(id);
  }
}
