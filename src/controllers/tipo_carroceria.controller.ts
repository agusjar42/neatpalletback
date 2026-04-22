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
import {TipoCarroceria} from '../models';
import {TipoCarroceriaRepository} from '../repositories';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class TipoCarroceriaController {
  constructor(
    @repository(TipoCarroceriaRepository)
    public tipoCarroceriaRepository : TipoCarroceriaRepository,
  ) {}

  @post('/tipo-carrocerias')
  @response(200, {
    description: 'TipoCarroceria model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCarroceria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCarroceria, {
            title: 'NewTipoCarroceria',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCarroceria: Omit<TipoCarroceria, 'id'>,
  ): Promise<TipoCarroceria> {
    return this.tipoCarroceriaRepository.create(tipoCarroceria);
  }

  @get('/tipo-carrocerias/count')
  @response(200, {
    description: 'TipoCarroceria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCarroceria) where?: Where<TipoCarroceria>,
  ): Promise<Count> {
    const dataSource = this.tipoCarroceriaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'empresa_tipo_carroceria', where);
  }

  @get('/tipo-carrocerias')
  @response(200, {
    description: 'Array of TipoCarroceria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCarroceria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCarroceria) filter?: Filter<TipoCarroceria>,
  ): Promise<TipoCarroceria[]> {
      const dataSource = this.tipoCarroceriaRepository.dataSource;
      const camposSelect = "*"
      return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'empresa_tipo_carroceria', filter, camposSelect);
  }

  @get('/tipo-carrocerias/{id}')
  @response(200, {
    description: 'TipoCarroceria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCarroceria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoCarroceria, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCarroceria>
  ): Promise<TipoCarroceria> {
    return this.tipoCarroceriaRepository.findById(id, filter);
  }

  @patch('/tipo-carrocerias/{id}')
  @response(204, {
    description: 'TipoCarroceria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCarroceria, {partial: true}),
        },
      },
    })
    tipoCarroceria: TipoCarroceria,
  ): Promise<void> {
    await this.tipoCarroceriaRepository.updateById(id, tipoCarroceria);
  }

  @del('/tipo-carrocerias/{id}')
  @response(204, {
    description: 'TipoCarroceria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoCarroceriaRepository.deleteById(id);
  }
}
