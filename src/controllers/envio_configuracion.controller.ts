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
import {EnvioConfiguracion} from '../models';
import {EnvioConfiguracionRepository} from '../repositories';

export class EnvioConfiguracionController {
  constructor(
    @repository(EnvioConfiguracionRepository)
    public envioConfiguracionRepository : EnvioConfiguracionRepository,
  ) {}

  @post('/envio-configuraciones')
  @response(200, {
    description: 'EnvioConfiguracion model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioConfiguracion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {
            title: 'NewEnvioConfiguracion',
            exclude: ['id'],
          }),
        },
      },
    })
    envioConfiguracion: Omit<EnvioConfiguracion, 'id'>,
  ): Promise<EnvioConfiguracion> {
    return this.envioConfiguracionRepository.create(envioConfiguracion);
  }

  @get('/envio-configuraciones/count')
  @response(200, {
    description: 'EnvioConfiguracion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioConfiguracion) where?: Where<EnvioConfiguracion>,
  ): Promise<Count> {
    const dataSource = this.envioConfiguracionRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM envio_configuracion${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio-configuraciones')
  @response(200, {
    description: 'Array of EnvioConfiguracion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioConfiguracion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioConfiguracion) filter?: Filter<EnvioConfiguracion>,
  ): Promise<EnvioConfiguracion[]> {
const dataSource = this.envioConfiguracionRepository.dataSource;
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
                          nombre,
                          valor,
                          unidad_medida as unidadMedida,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM envio_configuracion${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/envio-configuraciones')
  @response(200, {
    description: 'EnvioConfiguracion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {partial: true}),
        },
      },
    })
    envioConfiguracion: EnvioConfiguracion,
    @param.where(EnvioConfiguracion) where?: Where<EnvioConfiguracion>,
  ): Promise<Count> {
    return this.envioConfiguracionRepository.updateAll(envioConfiguracion, where);
  }

  @get('/envio-configuraciones/{id}')
  @response(200, {
    description: 'EnvioConfiguracion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioConfiguracion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioConfiguracion, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioConfiguracion>
  ): Promise<EnvioConfiguracion> {
    return this.envioConfiguracionRepository.findById(id, filter);
  }

  @patch('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracion, {partial: true}),
        },
      },
    })
    envioConfiguracion: EnvioConfiguracion,
  ): Promise<void> {
    await this.envioConfiguracionRepository.updateById(id, envioConfiguracion);
  }

  @put('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioConfiguracion: EnvioConfiguracion,
  ): Promise<void> {
    await this.envioConfiguracionRepository.replaceById(id, envioConfiguracion);
  }

  @del('/envio-configuraciones/{id}')
  @response(204, {
    description: 'EnvioConfiguracion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioConfiguracionRepository.deleteById(id);
  }
}