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
import {EnvioSensor} from '../models';
import {EnvioSensorRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioSensorController {
  constructor(
    @repository(EnvioSensorRepository)
    public envioSensorRepository : EnvioSensorRepository,
  ) {}

  @post('/envio-sensores')
  @response(200, {
    description: 'EnvioSensor model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioSensor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensor, {
            title: 'NewEnvioSensor',
            exclude: ['id'],
          }),
        },
      },
    })
    envioSensor: Omit<EnvioSensor, 'id'>,
  ): Promise<EnvioSensor> {
    return this.envioSensorRepository.create(envioSensor);
  }

  @get('/envio-sensores/count')
  @response(200, {
    description: 'EnvioSensor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioSensor) where?: Where<EnvioSensor>,
  ): Promise<Count> {
    const dataSource = this.envioSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_sensor_envio_tipo_sensor', where);
  }

  @get('/envio-sensores')
  @response(200, {
    description: 'Array of EnvioSensor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioSensor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioSensor) filter?: Filter<EnvioSensor>,
  ): Promise<EnvioSensor[]> {
    const dataSource = this.envioSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_sensor_envio_tipo_sensor', filter, '*');
  }

  @patch('/envio-sensores')
  @response(200, {
    description: 'EnvioSensor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensor, {partial: true}),
        },
      },
    })
    envioSensor: EnvioSensor,
    @param.where(EnvioSensor) where?: Where<EnvioSensor>,
  ): Promise<Count> {
    return this.envioSensorRepository.updateAll(envioSensor, where);
  }

  @get('/envio-sensores/{id}')
  @response(200, {
    description: 'EnvioSensor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioSensor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioSensor, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioSensor>
  ): Promise<EnvioSensor> {
    return this.envioSensorRepository.findById(id, filter);
  }

  @patch('/envio-sensores/{id}')
  @response(204, {
    description: 'EnvioSensor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensor, {partial: true}),
        },
      },
    })
    envioSensor: EnvioSensor,
  ): Promise<void> {
    await this.envioSensorRepository.updateById(id, envioSensor);
  }

  @put('/envio-sensores/{id}')
  @response(204, {
    description: 'EnvioSensor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioSensor: EnvioSensor,
  ): Promise<void> {
    await this.envioSensorRepository.replaceById(id, envioSensor);
  }

  @del('/envio-sensores/{id}')
  @response(204, {
    description: 'EnvioSensor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioSensorRepository.deleteById(id);
  }
}