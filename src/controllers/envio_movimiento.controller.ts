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
import {EnvioMovimiento} from '../models';
import {EnvioMovimientoRepository} from '../repositories';

export class EnvioMovimientoController {
  constructor(
    @repository(EnvioMovimientoRepository)
    public envioMovimientoRepository : EnvioMovimientoRepository,
  ) {}

  @post('/envio-movimientos')
  @response(200, {
    description: 'EnvioMovimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioMovimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioMovimiento, {
            title: 'NewEnvioMovimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    envioMovimiento: Omit<EnvioMovimiento, 'id'>,
  ): Promise<EnvioMovimiento> {
    return this.envioMovimientoRepository.create(envioMovimiento);
  }

  @get('/envio-movimientos/count')
  @response(200, {
    description: 'EnvioMovimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioMovimiento) where?: Where<EnvioMovimiento>,
  ): Promise<Count> {
    const dataSource = this.envioMovimientoRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM envio_movimiento${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio-movimientos')
  @response(200, {
    description: 'Array of EnvioMovimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioMovimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioMovimiento) filter?: Filter<EnvioMovimiento>,
  ): Promise<EnvioMovimiento[]> {
    const dataSource = this.envioMovimientoRepository.dataSource;
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
    const query = `SELECT id,
                          envio_id as envioId,
                          tipo_sensor_id as tipoSensorId,
                          fecha,
                          gps,
                          imagen,
                          valor,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM envio_movimiento${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/envio-movimientos/{id}')
  @response(200, {
    description: 'EnvioMovimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioMovimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioMovimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioMovimiento>
  ): Promise<EnvioMovimiento> {
    return this.envioMovimientoRepository.findById(id, filter);
  }

  @patch('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioMovimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioMovimiento, {partial: true}),
        },
      },
    })
    envioMovimiento: EnvioMovimiento,
  ): Promise<void> {
    await this.envioMovimientoRepository.updateById(id, envioMovimiento);
  }

  @del('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioMovimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioMovimientoRepository.deleteById(id);
  }
}