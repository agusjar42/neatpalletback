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
import {EmpresaPallet} from '../models';
import {EmpresaPalletRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';
import {authorize} from '@loopback/authorization';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class EmpresaPalletController {
  constructor(
    @repository(EmpresaPalletRepository)
    public empresaPalletRepository: EmpresaPalletRepository,
  ) {}

  @post('/empresa-pallets')
  @response(200, {
    description: 'EmpresaPallet model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpresaPallet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaPallet, {
            title: 'NewEmpresaPallet',
            exclude: ['id'],
          }),
        },
      },
    })
    empresaPallet: Omit<EmpresaPallet, 'id'>,
  ): Promise<EmpresaPallet> {
    return this.empresaPalletRepository.create(empresaPallet);
  }

  @get('/empresa-pallets/count')
  @response(200, {
    description: 'EmpresaPallet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpresaPallet) where?: Where<EmpresaPallet>,
  ): Promise<Count> {
    const dataSource = this.empresaPalletRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'empresa_pallet', where);
  }

  @get('/empresa-pallets')
  @response(200, {
    description: 'Array of EmpresaPallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpresaPallet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpresaPallet) filter?: Filter<EmpresaPallet>,
  ): Promise<EmpresaPallet[]> {
    const dataSource = this.empresaPalletRepository.dataSource;
    const camposSelect = '*';
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'empresa_pallet', filter, camposSelect);
  }

  @patch('/empresa-pallets')
  @response(200, {
    description: 'EmpresaPallet PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaPallet, {partial: true}),
        },
      },
    })
    empresaPallet: EmpresaPallet,
    @param.where(EmpresaPallet) where?: Where<EmpresaPallet>,
  ): Promise<Count> {
    return this.empresaPalletRepository.updateAll(empresaPallet, where);
  }

  @get('/empresa-pallets/{id}')
  @response(200, {
    description: 'EmpresaPallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpresaPallet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpresaPallet, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpresaPallet>,
  ): Promise<EmpresaPallet> {
    return this.empresaPalletRepository.findById(id, filter);
  }

  @patch('/empresa-pallets/{id}')
  @response(204, {
    description: 'EmpresaPallet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaPallet, {partial: true}),
        },
      },
    })
    empresaPallet: EmpresaPallet,
  ): Promise<void> {
    await this.empresaPalletRepository.updateById(id, empresaPallet);
  }

  @put('/empresa-pallets/{id}')
  @response(204, {
    description: 'EmpresaPallet PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresaPallet: EmpresaPallet,
  ): Promise<void> {
    await this.empresaPalletRepository.replaceById(id, empresaPallet);
  }

  @del('/empresa-pallets/{id}')
  @response(204, {
    description: 'EmpresaPallet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresaPalletRepository.deleteById(id);
  }
}
