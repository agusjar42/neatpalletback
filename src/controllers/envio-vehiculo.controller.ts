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
import {EnvioVehiculo} from '../models';
import {EnvioVehiculoRepository} from '../repositories';

export class EnvioVehiculoController {
  constructor(
    @repository(EnvioVehiculoRepository)
    public envioVehiculoRepository : EnvioVehiculoRepository,
  ) {}

  @post('/envio-vehiculos')
  @response(200, {
    description: 'EnvioVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioVehiculo, {
            title: 'NewEnvioVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    envioVehiculo: Omit<EnvioVehiculo, 'id'>,
  ): Promise<EnvioVehiculo> {
    return this.envioVehiculoRepository.create(envioVehiculo);
  }

  @get('/envio-vehiculos/count')
  @response(200, {
    description: 'EnvioVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioVehiculo) where?: Where<EnvioVehiculo>,
  ): Promise<Count> {
    return this.envioVehiculoRepository.count(where);
  }

  @get('/envio-vehiculos')
  @response(200, {
    description: 'Array of EnvioVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioVehiculo) filter?: Filter<EnvioVehiculo>,
  ): Promise<EnvioVehiculo[]> {
    return this.envioVehiculoRepository.find(filter);
  }

  @patch('/envio-vehiculos')
  @response(200, {
    description: 'EnvioVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioVehiculo, {partial: true}),
        },
      },
    })
    envioVehiculo: EnvioVehiculo,
    @param.where(EnvioVehiculo) where?: Where<EnvioVehiculo>,
  ): Promise<Count> {
    return this.envioVehiculoRepository.updateAll(envioVehiculo, where);
  }

  @get('/envio-vehiculos/{id}')
  @response(200, {
    description: 'EnvioVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioVehiculo>
  ): Promise<EnvioVehiculo> {
    return this.envioVehiculoRepository.findById(id, filter);
  }

  @patch('/envio-vehiculos/{id}')
  @response(204, {
    description: 'EnvioVehiculo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioVehiculo, {partial: true}),
        },
      },
    })
    envioVehiculo: EnvioVehiculo,
  ): Promise<void> {
    await this.envioVehiculoRepository.updateById(id, envioVehiculo);
  }

  @put('/envio-vehiculos/{id}')
  @response(204, {
    description: 'EnvioVehiculo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioVehiculo: EnvioVehiculo,
  ): Promise<void> {
    await this.envioVehiculoRepository.replaceById(id, envioVehiculo);
  }

  @del('/envio-vehiculos/{id}')
  @response(204, {
    description: 'EnvioVehiculo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioVehiculoRepository.deleteById(id);
  }
}