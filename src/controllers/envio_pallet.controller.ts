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
import {EnvioPallet} from '../models';
import {EnvioPalletRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class EnvioPalletController {
  constructor(
    @repository(EnvioPalletRepository)
    public envioPalletRepository : EnvioPalletRepository,
  ) {}

  @post('/envio-pallets')
  @response(200, {
    description: 'EnvioPallet model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioPallet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPallet, {
            title: 'NewEnvioPallet',
            exclude: ['id'],
          }),
        },
      },
    })
    envioPallet: Omit<EnvioPallet, 'id'>,
  ): Promise<EnvioPallet> {
    return this.envioPalletRepository.create(envioPallet);
  }

  @get('/envio-pallets/count')
  @response(200, {
    description: 'EnvioPallet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioPallet) where?: Where<EnvioPallet>,
  ): Promise<Count> {
    const dataSource = this.envioPalletRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_pallet_contenido', where);
  }

  @get('/envio-pallets')
  @response(200, {
    description: 'Array of EnvioPallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioPallet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioPallet) filter?: Filter<EnvioPallet>,
  ): Promise<EnvioPallet[]> {
    const dataSource = this.envioPalletRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_pallet_contenido', filter, '*');
  }

  @get('/envio-pallets/{id}')
  @response(200, {
    description: 'EnvioPallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioPallet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioPallet, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioPallet>
  ): Promise<EnvioPallet> {
    return this.envioPalletRepository.findById(id, filter);
  }

  @patch('/envio-pallets/{id}')
  @response(204, {
    description: 'EnvioPallet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPallet, {partial: true}),
        },
      },
    })
    envioPallet: EnvioPallet,
  ): Promise<void> {
    await this.envioPalletRepository.updateById(id, envioPallet);
  }

  @del('/envio-pallets/{id}')
  @response(204, {
    description: 'EnvioPallet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioPalletRepository.deleteById(id);
  }
}