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
import {TipoTransporte} from '../models';
import {TipoTransporteRepository} from '../repositories';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class TipoTransporteController {
  constructor(
    @repository(TipoTransporteRepository)
    public tipoTransporteRepository : TipoTransporteRepository,
  ) {}

  @post('/tipo-transportes')
  @response(200, {
    description: 'TipoTransporte model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoTransporte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransporte, {
            title: 'NewTipoTransporte',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoTransporte: Omit<TipoTransporte, 'id'>,
  ): Promise<TipoTransporte> {
    return this.tipoTransporteRepository.create(tipoTransporte);
  }

  @get('/tipo-transportes/count')
  @response(200, {
    description: 'TipoTransporte model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoTransporte) where?: Where<TipoTransporte>,
  ): Promise<Count> {
    const dataSource = this.tipoTransporteRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'empresa_tipo_transporte', where);
  }

  @get('/tipo-transportes')
  @response(200, {
    description: 'Array of TipoTransporte model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoTransporte, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoTransporte) filter?: Filter<TipoTransporte>,
  ): Promise<TipoTransporte[]> {
    const dataSource = this.tipoTransporteRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'empresa_tipo_transporte', filter, camposSelect);
    
  }

  @get('/tipo-transportes/{id}')
  @response(200, {
    description: 'TipoTransporte model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoTransporte, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoTransporte, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoTransporte>
  ): Promise<TipoTransporte> {
    return this.tipoTransporteRepository.findById(id, filter);
  }

  @patch('/tipo-transportes/{id}')
  @response(204, {
    description: 'TipoTransporte PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransporte, {partial: true}),
        },
      },
    })
    tipoTransporte: TipoTransporte,
  ): Promise<void> {
    await this.tipoTransporteRepository.updateById(id, tipoTransporte);
  }

  @del('/tipo-transportes/{id}')
  @response(204, {
    description: 'TipoTransporte DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoTransporteRepository.deleteById(id);
  }
}
