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
import {TipoVehiculo} from '../models';
import {TipoVehiculoRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class TipoVehiculoController {
  constructor(
    @repository(TipoVehiculoRepository)
    public tipoVehiculoRepository: TipoVehiculoRepository,
  ) {}

  @post('/tipo-vehiculos')
  @response(200, {
    description: 'TipoVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {
            title: 'NewTipoVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoVehiculo: Omit<TipoVehiculo, 'id'>,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoRepository.create(tipoVehiculo);
  }

  @get('/tipo-vehiculos/count')
  @response(200, {
    description: 'TipoVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoVehiculo) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    const dataSource = this.tipoVehiculoRepository.dataSource;
    if (!(await SqlFilterUtil.existeTabla(dataSource, 'tipo_vehiculo'))) {
      return {count: 0};
    }
    return SqlFilterUtil.ejecutarQueryCount(dataSource, 'tipo_vehiculo', where);
  }

  @get('/tipo-vehiculos')
  @response(200, {
    description: 'Array of TipoVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoVehiculo) filter?: Filter<TipoVehiculo>,
  ): Promise<TipoVehiculo[]> {
    const dataSource = this.tipoVehiculoRepository.dataSource;
    if (!(await SqlFilterUtil.existeTabla(dataSource, 'tipo_vehiculo'))) {
      return [];
    }
    return SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      'tipo_vehiculo',
      filter,
      '*',
    );
  }

  @get('/tipo-vehiculos/{id}')
  @response(200, {
    description: 'TipoVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoVehiculo, {exclude: 'where'})
    filter?: FilterExcludingWhere<TipoVehiculo>,
  ): Promise<TipoVehiculo> {
    return this.tipoVehiculoRepository.findById(id, filter);
  }

  @patch('/tipo-vehiculos/{id}')
  @response(204, {
    description: 'TipoVehiculo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {partial: true}),
        },
      },
    })
    tipoVehiculo: TipoVehiculo,
  ): Promise<void> {
    await this.tipoVehiculoRepository.updateById(id, tipoVehiculo);
  }

  @put('/tipo-vehiculos/{id}')
  @response(204, {
    description: 'TipoVehiculo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoVehiculo: TipoVehiculo,
  ): Promise<void> {
    await this.tipoVehiculoRepository.replaceById(id, tipoVehiculo);
  }

  @del('/tipo-vehiculos/{id}')
  @response(204, {
    description: 'TipoVehiculo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoVehiculoRepository.deleteById(id);
  }
}
