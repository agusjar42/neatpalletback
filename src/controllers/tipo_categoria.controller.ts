import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {TipoCategoria} from '../models';
import {TipoCategoriaRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class TipoCategoriaController {
  constructor(
    @repository(TipoCategoriaRepository)
    public tipoCategoriaRepository: TipoCategoriaRepository,
  ) {}

  @post('/tipo-categorias')
  @response(200, {
    description: 'TipoCategoria model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCategoria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCategoria, {
            title: 'NewTipoCategoria',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCategoria: Omit<TipoCategoria, 'id'>,
  ): Promise<TipoCategoria> {
    return this.tipoCategoriaRepository.create(tipoCategoria);
  }

  @get('/tipo-categorias/count')
  @response(200, {
    description: 'TipoCategoria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCategoria) where?: Where<TipoCategoria>,
  ): Promise<Count> {
    const dataSource = this.tipoCategoriaRepository.dataSource;
    if (!(await SqlFilterUtil.existeTabla(dataSource, 'tipo_categoria'))) {
      return {count: 0};
    }
    return SqlFilterUtil.ejecutarQueryCount(dataSource, 'tipo_categoria', where);
  }

  @get('/tipo-categorias')
  @response(200, {
    description: 'Array of TipoCategoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCategoria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCategoria) filter?: Filter<TipoCategoria>,
  ): Promise<TipoCategoria[]> {
    const dataSource = this.tipoCategoriaRepository.dataSource;
    if (!(await SqlFilterUtil.existeTabla(dataSource, 'tipo_categoria'))) {
      return [];
    }
    return SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      'tipo_categoria',
      filter,
      '*',
    );
  }

  @get('/tipo-categorias/{id}')
  @response(200, {
    description: 'TipoCategoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCategoria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoCategoria, {exclude: 'where'})
    filter?: FilterExcludingWhere<TipoCategoria>,
  ): Promise<TipoCategoria> {
    return this.tipoCategoriaRepository.findById(id, filter);
  }

  @patch('/tipo-categorias/{id}')
  @response(204, {
    description: 'TipoCategoria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCategoria, {partial: true}),
        },
      },
    })
    tipoCategoria: TipoCategoria,
  ): Promise<void> {
    await this.tipoCategoriaRepository.updateById(id, tipoCategoria);
  }

  @put('/tipo-categorias/{id}')
  @response(204, {
    description: 'TipoCategoria PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoCategoria: TipoCategoria,
  ): Promise<void> {
    await this.tipoCategoriaRepository.replaceById(id, tipoCategoria);
  }

  @del('/tipo-categorias/{id}')
  @response(204, {
    description: 'TipoCategoria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoCategoriaRepository.deleteById(id);
  }
}
