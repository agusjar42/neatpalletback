import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {RefrescarToken} from '../models';
import {RefrescarTokenRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class RefrescarTokenController {
  constructor(
    @repository(RefrescarTokenRepository)
    public refrescarTokenRepository : RefrescarTokenRepository,
  ) {}

  @post('/refrescar-tokens')
  @response(200, {
    description: 'RefrescarToken model instance',
    content: {'application/json': {schema: getModelSchemaRef(RefrescarToken)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RefrescarToken, {
            title: 'NewRefrescarToken',
            exclude: ['id'],
          }),
        },
      },
    })
    refrescarToken: Omit<RefrescarToken, 'id'>,
  ): Promise<RefrescarToken> {
    return this.refrescarTokenRepository.create(refrescarToken);
  }

  @get('/refrescar-tokens/count')
  @response(200, {
    description: 'RefrescarToken model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RefrescarToken) where?: Where<RefrescarToken>,
  ): Promise<Count> {
    const dataSource = this.refrescarTokenRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'refrescar_token', where);
  }

  @get('/refrescar-tokens')
  @response(200, {
    description: 'Array of RefrescarToken model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RefrescarToken, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RefrescarToken) filter?: Filter<RefrescarToken>,
  ): Promise<RefrescarToken[]> {
    const dataSource = this.refrescarTokenRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'refrescar_token', filter, '*');
  }

  @patch('/refrescar-tokens')
  @response(200, {
    description: 'RefrescarToken PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RefrescarToken, {partial: true}),
        },
      },
    })
    refrescarToken: RefrescarToken,
    @param.where(RefrescarToken) where?: Where<RefrescarToken>,
  ): Promise<Count> {
    return this.refrescarTokenRepository.updateAll(refrescarToken, where);
  }

  @get('/refrescar-tokens/{id}')
  @response(200, {
    description: 'RefrescarToken model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RefrescarToken, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RefrescarToken, {exclude: 'where'}) filter?: FilterExcludingWhere<RefrescarToken>
  ): Promise<RefrescarToken> {
    return this.refrescarTokenRepository.findById(id, filter);
  }

  @patch('/refrescar-tokens/{id}')
  @response(204, {
    description: 'RefrescarToken PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RefrescarToken, {partial: true}),
        },
      },
    })
    refrescarToken: RefrescarToken,
  ): Promise<void> {
    await this.refrescarTokenRepository.updateById(id, refrescarToken);
  }

  @put('/refrescar-tokens/{id}')
  @response(204, {
    description: 'RefrescarToken PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() refrescarToken: RefrescarToken,
  ): Promise<void> {
    await this.refrescarTokenRepository.replaceById(id, refrescarToken);
  }

  @del('/refrescar-tokens/{id}')
  @response(204, {
    description: 'RefrescarToken DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.refrescarTokenRepository.deleteById(id);
  }
}
