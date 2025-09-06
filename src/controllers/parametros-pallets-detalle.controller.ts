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
import {ParametrosPalletsDetalle} from '../models';
import {ParametrosPalletsDetalleRepository} from '../repositories';

export class ParametrosPalletsDetalleController {
  constructor(
    @repository(ParametrosPalletsDetalleRepository)
    public parametrosPalletsDetalleRepository : ParametrosPalletsDetalleRepository,
  ) {}

  @post('/parametros-pallets-detalles')
  @response(200, {
    description: 'ParametrosPalletsDetalle model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParametrosPalletsDetalle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPalletsDetalle, {
            title: 'NewParametrosPalletsDetalle',
            exclude: ['id'],
          }),
        },
      },
    })
    parametrosPalletsDetalle: Omit<ParametrosPalletsDetalle, 'id'>,
  ): Promise<ParametrosPalletsDetalle> {
    return this.parametrosPalletsDetalleRepository.create(parametrosPalletsDetalle);
  }

  @get('/parametros-pallets-detalles/count')
  @response(200, {
    description: 'ParametrosPalletsDetalle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParametrosPalletsDetalle) where?: Where<ParametrosPalletsDetalle>,
  ): Promise<Count> {
    return this.parametrosPalletsDetalleRepository.count(where);
  }

  @get('/parametros-pallets-detalles')
  @response(200, {
    description: 'Array of ParametrosPalletsDetalle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParametrosPalletsDetalle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParametrosPalletsDetalle) filter?: Filter<ParametrosPalletsDetalle>,
  ): Promise<ParametrosPalletsDetalle[]> {
    return this.parametrosPalletsDetalleRepository.find(filter);
  }

  @patch('/parametros-pallets-detalles')
  @response(200, {
    description: 'ParametrosPalletsDetalle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPalletsDetalle, {partial: true}),
        },
      },
    })
    parametrosPalletsDetalle: ParametrosPalletsDetalle,
    @param.where(ParametrosPalletsDetalle) where?: Where<ParametrosPalletsDetalle>,
  ): Promise<Count> {
    return this.parametrosPalletsDetalleRepository.updateAll(parametrosPalletsDetalle, where);
  }

  @get('/parametros-pallets-detalles/{id}')
  @response(200, {
    description: 'ParametrosPalletsDetalle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParametrosPalletsDetalle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParametrosPalletsDetalle, {exclude: 'where'}) filter?: FilterExcludingWhere<ParametrosPalletsDetalle>
  ): Promise<ParametrosPalletsDetalle> {
    return this.parametrosPalletsDetalleRepository.findById(id, filter);
  }

  @patch('/parametros-pallets-detalles/{id}')
  @response(204, {
    description: 'ParametrosPalletsDetalle PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParametrosPalletsDetalle, {partial: true}),
        },
      },
    })
    parametrosPalletsDetalle: ParametrosPalletsDetalle,
  ): Promise<void> {
    await this.parametrosPalletsDetalleRepository.updateById(id, parametrosPalletsDetalle);
  }

  @put('/parametros-pallets-detalles/{id}')
  @response(204, {
    description: 'ParametrosPalletsDetalle PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parametrosPalletsDetalle: ParametrosPalletsDetalle,
  ): Promise<void> {
    await this.parametrosPalletsDetalleRepository.replaceById(id, parametrosPalletsDetalle);
  }

  @del('/parametros-pallets-detalles/{id}')
  @response(204, {
    description: 'ParametrosPalletsDetalle DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parametrosPalletsDetalleRepository.deleteById(id);
  }
}