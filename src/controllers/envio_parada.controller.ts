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
import {EnvioParada} from '../models';
import {EnvioParadaRepository} from '../repositories';

export class EnvioParadaController {
  constructor(
    @repository(EnvioParadaRepository)
    public envioParadaRepository : EnvioParadaRepository,
  ) {}

  @post('/envio-paradas')
  @response(200, {
    description: 'EnvioParada model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioParada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioParada, {
            title: 'NewEnvioParada',
            exclude: ['id'],
          }),
        },
      },
    })
    envioParada: Omit<EnvioParada, 'id'>,
  ): Promise<EnvioParada> {
    return this.envioParadaRepository.create(envioParada);
  }

  @get('/envio-paradas/count')
  @response(200, {
    description: 'EnvioParada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioParada) where?: Where<EnvioParada>,
  ): Promise<Count> {
    const dataSource = this.envioParadaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM envio_parada${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;  
  }

  @get('/envio-paradas')
  @response(200, {
    description: 'Array of EnvioParada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioParada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioParada) filter?: Filter<EnvioParada>,
  ): Promise<EnvioParada[]> {
    const dataSource = this.envioParadaRepository.dataSource;
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
                          fecha,
                          lugar_parada as lugarParada,
                          lugar_parada_gps as lugarParadaGps,
                          direccion,
                          nombre_operario as nombreOperario,
                          telefono_operario as telefonoOperario,
                          email_operario as emailOperario,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM envio_parada${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/envio-paradas/{id}')
  @response(200, {
    description: 'EnvioParada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioParada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioParada, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioParada>
  ): Promise<EnvioParada> {
    return this.envioParadaRepository.findById(id, filter);
  }

  @patch('/envio-paradas/{id}')
  @response(204, {
    description: 'EnvioParada PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioParada, {partial: true}),
        },
      },
    })
    envioParada: EnvioParada,
  ): Promise<void> {
    await this.envioParadaRepository.updateById(id, envioParada);
  }

  @del('/envio-paradas/{id}')
  @response(204, {
    description: 'EnvioParada DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioParadaRepository.deleteById(id);
  }
}