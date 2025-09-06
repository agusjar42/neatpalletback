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
import {ParametrosPallets} from '../models';
import {ParametrosPalletsRepository} from '../repositories';

export class ParametrosPalletsController {
  constructor(
    @repository(ParametrosPalletsRepository)
    public parametrosPalletsRepository : ParametrosPalletsRepository,
  ) {}

  @post('/parametros-pallets')
  @response(200, {
    description: 'ParametrosPallets model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParametrosPallets)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPallets, {
            title: 'NewParametrosPallets',
            exclude: ['id'],
          }),
        },
      },
    })
    parametrosPallets: Omit<ParametrosPallets, 'id'>,
  ): Promise<ParametrosPallets> {
    return this.parametrosPalletsRepository.create(parametrosPallets);
  }

  @get('/parametros-pallets/count')
  @response(200, {
    description: 'ParametrosPallets model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParametrosPallets) where?: Where<ParametrosPallets>,
  ): Promise<Count> {
    return this.parametrosPalletsRepository.count(where);
  }

  @get('/parametros-pallets')
  @response(200, {
    description: 'Array of ParametrosPallets model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParametrosPallets, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParametrosPallets) filter?: Filter<ParametrosPallets>,
  ): Promise<ParametrosPallets[]> {
    return this.parametrosPalletsRepository.find(filter);
  }

  @patch('/parametros-pallets')
  @response(200, {
    description: 'ParametrosPallets PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPallets, {partial: true}),
        },
      },
    })
    parametrosPallets: ParametrosPallets,
    @param.where(ParametrosPallets) where?: Where<ParametrosPallets>,
  ): Promise<Count> {
    return this.parametrosPalletsRepository.updateAll(parametrosPallets, where);
  }

  @get('/parametros-pallets/{id}')
  @response(200, {
    description: 'ParametrosPallets model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParametrosPallets, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParametrosPallets, {exclude: 'where'}) filter?: FilterExcludingWhere<ParametrosPallets>
  ): Promise<ParametrosPallets> {
    return this.parametrosPalletsRepository.findById(id, filter);
  }

  @patch('/parametros-pallets/{id}')
  @response(204, {
    description: 'ParametrosPallets PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPallets, {partial: true}),
        },
      },
    })
    parametrosPallets: ParametrosPallets,
  ): Promise<void> {
    await this.parametrosPalletsRepository.updateById(id, parametrosPallets);
  }

  @put('/parametros-pallets/{id}')
  @response(204, {
    description: 'ParametrosPallets PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parametrosPallets: ParametrosPallets,
  ): Promise<void> {
    await this.parametrosPalletsRepository.replaceById(id, parametrosPallets);
  }

  @del('/parametros-pallets/{id}')
  @response(204, {
    description: 'ParametrosPallets DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parametrosPalletsRepository.deleteById(id);
  }
}