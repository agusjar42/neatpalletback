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
import {Parametro} from '../models';
import {ParametroRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class ParametroController {
  constructor(
    @repository(ParametroRepository)
    public parametroRepository : ParametroRepository,
  ) {}

  @post('/parametros')
  @response(200, {
    description: 'Parametro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parametro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {
            title: 'NewParametro',
            exclude: ['id'],
          }),
        },
      },
    })
    parametro: Omit<Parametro, 'id'>,
  ): Promise<Parametro> {
    return this.parametroRepository.create(parametro);
  }

  @get('/parametros/count')
  @response(200, {
    description: 'Parametro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    const dataSource = this.parametroRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'parametro', where);
  }

  @get('/parametros')
  @response(200, {
    description: 'Array of Parametro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parametro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parametro) filter?: Filter<Parametro>,
  ): Promise<Parametro[]> {
      const dataSource = this.parametroRepository.dataSource;
      const camposSelect = "*"
      return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'parametro', filter, camposSelect);
  }

  @get('/parametros/{id}')
  @response(200, {
    description: 'Parametro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parametro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parametro, {exclude: 'where'}) filter?: FilterExcludingWhere<Parametro>
  ): Promise<Parametro> {
    return this.parametroRepository.findById(id, filter);
  }

  @patch('/parametros/{id}')
  @response(204, {
    description: 'Parametro PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.updateById(id, parametro);
  }

  @del('/parametros/{id}')
  @response(204, {
    description: 'Parametro DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parametroRepository.deleteById(id);
  }
}