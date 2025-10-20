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
import {EnvioSensorEmpresa} from '../models';
import {EnvioSensorEmpresaRepository} from '../repositories';

export class EnvioSensorEmpresaController {
  constructor(
    @repository(EnvioSensorEmpresaRepository)
    public envioSensorEmpresaRepository : EnvioSensorEmpresaRepository,
  ) {}

  @post('/envio-sensor-empresas')
  @response(200, {
    description: 'EnvioSensorEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioSensorEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {
            title: 'NewEnvioSensorEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    envioSensorEmpresa: Omit<EnvioSensorEmpresa, 'id'>,
  ): Promise<EnvioSensorEmpresa> {
    return this.envioSensorEmpresaRepository.create(envioSensorEmpresa);
  }

  @get('/envio-sensor-empresas/count')
  @response(200, {
    description: 'EnvioSensorEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioSensorEmpresa) where?: Where<EnvioSensorEmpresa>,
  ): Promise<Count> {
    const dataSource = this.envioSensorEmpresaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_envio_tipo_sensor_empresa${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio-sensor-empresas')
  @response(200, {
    description: 'Array of EnvioSensorEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioSensorEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioSensorEmpresa) filter?: Filter<EnvioSensorEmpresa>,
  ): Promise<EnvioSensorEmpresa[]> {
    const dataSource = this.envioSensorEmpresaRepository.dataSource;
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
    const query = `SELECT * FROM vista_envio_tipo_sensor_empresa${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/envio-sensor-empresas')
  @response(200, {
    description: 'EnvioSensorEmpresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {partial: true}),
        },
      },
    })
    envioSensorEmpresa: EnvioSensorEmpresa,
    @param.where(EnvioSensorEmpresa) where?: Where<EnvioSensorEmpresa>,
  ): Promise<Count> {
    return this.envioSensorEmpresaRepository.updateAll(envioSensorEmpresa, where);
  }

  @get('/envio-sensor-empresas/{id}')
  @response(200, {
    description: 'EnvioSensorEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioSensorEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioSensorEmpresa, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioSensorEmpresa>
  ): Promise<EnvioSensorEmpresa> {
    return this.envioSensorEmpresaRepository.findById(id, filter);
  }

  @patch('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {partial: true}),
        },
      },
    })
    envioSensorEmpresa: EnvioSensorEmpresa,
  ): Promise<void> {
    await this.envioSensorEmpresaRepository.updateById(id, envioSensorEmpresa);
  }

  @put('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioSensorEmpresa: EnvioSensorEmpresa,
  ): Promise<void> {
    await this.envioSensorEmpresaRepository.replaceById(id, envioSensorEmpresa);
  }

  @del('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioSensorEmpresaRepository.deleteById(id);
  }
}
