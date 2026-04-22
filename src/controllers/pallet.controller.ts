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
import {Pallet} from '../models';
import {PalletRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class PalletController {
  constructor(
    @repository(PalletRepository)
    public palletRepository : PalletRepository,
  ) {}

  @post('/pallet')
  @response(200, {
    description: 'Pallet model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pallet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pallet, {
            title: 'NewPallet',
            exclude: ['id'],
          }),
        },
      },
    })
    pallet: Omit<Pallet, 'id'>,
  ): Promise<Pallet> {
    return this.palletRepository.create(pallet);
  }

  @get('/pallet/count')
  @response(200, {
    description: 'Pallet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pallet) where?: Where<Pallet>,
  ): Promise<Count> {
    const dataSource = this.palletRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'pallet', where);
  }

  @get('/pallet')
  @response(200, {
    description: 'Array of Pallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pallet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pallet) filter?: Filter<Pallet>,
  ): Promise<Pallet[]> {
      const dataSource = this.palletRepository.dataSource;
      const camposSelect = "*, DATE_FORMAT(fechaImpresion, '%d/%m/%Y') AS fechaImpresionEspanol"
      return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'pallet', filter, camposSelect);
  }

  @patch('/pallet')
  @response(200, {
    description: 'Pallet PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pallet, {partial: true}),
        },
      },
    })
    pallet: Pallet,
    @param.where(Pallet) where?: Where<Pallet>,
  ): Promise<Count> {
    return this.palletRepository.updateAll(pallet, where);
  }

  @get('/pallet/{id}')
  @response(200, {
    description: 'Pallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pallet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pallet, {exclude: 'where'}) filter?: FilterExcludingWhere<Pallet>
  ): Promise<Pallet> {
    return this.palletRepository.findById(id, filter);
  }

  @patch('/pallet/{id}')
  @response(204, {
    description: 'Pallet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pallet, {partial: true}),
        },
      },
    })
    pallet: Pallet,
  ): Promise<void> {
    await this.palletRepository.updateById(id, pallet);
  }

  @put('/pallet/{id}')
  @response(204, {
    description: 'Pallet PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pallet: Pallet,
  ): Promise<void> {
    await this.palletRepository.replaceById(id, pallet);
  }

  @del('/pallet/{id}')
  @response(204, {
    description: 'Pallet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletRepository.deleteById(id);
  }
}