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
import {PalletsMovements} from '../models';
import {PalletsMovementsRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')

export class PalletsMovementsController {
  constructor(
    @repository(PalletsMovementsRepository)
    public palletsMovementsRepository : PalletsMovementsRepository,
  ) {}

  @post('/pallets-movements')
  @response(200, {
    description: 'PalletsMovements model instance',
    content: {'application/json': {schema: getModelSchemaRef(PalletsMovements)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletsMovements, {
            title: 'NewPalletsMovements',
            exclude: ['id'],
          }),
        },
      },
    })
    palletsMovements: Omit<PalletsMovements, 'id'>,
  ): Promise<PalletsMovements> {
    return this.palletsMovementsRepository.create(palletsMovements);
  }

  @get('/pallets-movements/count')
  @response(200, {
    description: 'PalletsMovements model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PalletsMovements) where?: Where<PalletsMovements>,
  ): Promise<Count> {
    return this.palletsMovementsRepository.count(where);
  }

  @get('/pallets-movements')
  @response(200, {
    description: 'Array of PalletsMovements model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletsMovements, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PalletsMovements) filter?: Filter<PalletsMovements>,
  ): Promise<PalletsMovements[]> {
    return this.palletsMovementsRepository.find(filter);
  }

  @patch('/pallets-movements')
  @response(200, {
    description: 'PalletsMovements PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletsMovements, {partial: true}),
        },
      },
    })
    palletsMovements: PalletsMovements,
    @param.where(PalletsMovements) where?: Where<PalletsMovements>,
  ): Promise<Count> {
    return this.palletsMovementsRepository.updateAll(palletsMovements, where);
  }

  @get('/pallets-movements/{id}')
  @response(200, {
    description: 'PalletsMovements model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PalletsMovements, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PalletsMovements, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletsMovements>
  ): Promise<PalletsMovements> {
    return this.palletsMovementsRepository.findById(id, filter);
  }

  @patch('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletsMovements, {partial: true}),
        },
      },
    })
    palletsMovements: PalletsMovements,
  ): Promise<void> {
    await this.palletsMovementsRepository.updateById(id, palletsMovements);
  }

  @put('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() palletsMovements: PalletsMovements,
  ): Promise<void> {
    await this.palletsMovementsRepository.replaceById(id, palletsMovements);
  }

  @del('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletsMovementsRepository.deleteById(id);
  }
}
