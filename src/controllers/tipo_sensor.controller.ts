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
import {TipoSensor} from '../models';
import {TipoSensorRepository} from '../repositories';

export class TipoSensorController {
  constructor(
    @repository(TipoSensorRepository)
    public tipoSensorRepository : TipoSensorRepository,
  ) {}

  @post('/tipo-sensores')
  @response(200, {
    description: 'TipoSensor model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoSensor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSensor, {
            title: 'NewTipoSensor',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoSensor: Omit<TipoSensor, 'id'>,
  ): Promise<TipoSensor> {
    return this.tipoSensorRepository.create(tipoSensor);
  }

  @get('/tipo-sensores/count')
  @response(200, {
    description: 'TipoSensor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoSensor) where?: Where<TipoSensor>,
  ): Promise<Count> {
    const dataSource = this.tipoSensorRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM tipo_sensor${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;  }

  @get('/tipo-sensores')
  @response(200, {
    description: 'Array of TipoSensor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoSensor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoSensor) filter?: Filter<TipoSensor>,
  ): Promise<TipoSensor[]> {
    const dataSource = this.tipoSensorRepository.dataSource;
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
                          empresa_id as empresaId,
                          nombre,
                          activo_sn as activoSn,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM tipo_sensor${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/tipo-sensores/{id}')
  @response(200, {
    description: 'TipoSensor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoSensor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoSensor, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoSensor>
  ): Promise<TipoSensor> {
    return this.tipoSensorRepository.findById(id, filter);
  }

  @patch('/tipo-sensores/{id}')
  @response(204, {
    description: 'TipoSensor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSensor, {partial: true}),
        },
      },
    })
    tipoSensor: TipoSensor,
  ): Promise<void> {
    await this.tipoSensorRepository.updateById(id, tipoSensor);
  }

  @del('/tipo-sensores/{id}')
  @response(204, {
    description: 'TipoSensor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoSensorRepository.deleteById(id);
  }
}