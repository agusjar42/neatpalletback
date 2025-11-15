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
    //Aplicamos filtros
    let filtros = '';
    //Obtiene los filtros
    filtros += ` WHERE 1=1`
    if (where) {
      for (const [key] of Object.entries(where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true
            for (const [subKey, subValue] of Object.entries((where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    filtros += ` AND`;
                  }
                  else {
                    filtros += ` OR`;
                  }
                }
                else {
                  filtros += ' AND ('
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  filtros += ` ${subKey} = ${subValue}`;
                }
                else {
                  filtros += ` ${subKey} LIKE '%${subValue}%'`;
                }
                first = false
              }
            }
            if (!first) {
              filtros += `)`;
            }
          }
        }

      }
    }
    const query = `SELECT COUNT(*) AS count FROM vista_envio_sensor_envio_tipo_sensor${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
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
    //Aplicamos filtros
    let filtros = '';
    //Obtiene los filtros
    filtros += ` WHERE 1=1`
    if (filter?.where) {
      for (const [key] of Object.entries(filter?.where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true
            for (const [subKey, subValue] of Object.entries((filter?.where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    filtros += ` AND`;
                  }
                  else {
                    filtros += ` OR`;
                  }
                }
                else {
                  filtros += ' AND ('
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  filtros += ` ${subKey} = ${subValue}`;
                }
                else {
                  filtros += ` ${subKey} LIKE '%${subValue}%'`;
                }
                first = false
              }
            }
            if (!first) {
              filtros += `)`;
            }
          }
        }

      }
    }
    // Agregar ordenamiento
    if (filter?.order) {
      filtros += ` ORDER BY ${filter.order}`;
    }
    // Agregar paginación
    if (filter?.limit) {
      filtros += ` LIMIT ${filter?.limit}`;
    }
    if (filter?.offset) {
      filtros += ` OFFSET ${filter?.offset}`;
    }
    const query = `SELECT *
                     FROM vista_envio_sensor_envio_tipo_sensor${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
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