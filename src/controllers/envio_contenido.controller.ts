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
import {EnvioContenido} from '../models';
import {EnvioContenidoRepository} from '../repositories';

export class EnvioContenidoController {
  constructor(
    @repository(EnvioContenidoRepository)
    public enviocontenidoRepository : EnvioContenidoRepository,
  ) {}

  @post('/enviocontenido')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioContenido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {
            title: 'NewEnvioContenido',
            exclude: ['id'],
          }),
        },
      },
    })
    enviocontenido: Omit<EnvioContenido, 'id'>,
  ): Promise<EnvioContenido> {
    return this.enviocontenidoRepository.create(enviocontenido);
  }

  @get('/enviocontenido/count')
  @response(200, {
    description: 'EnvioContenido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioContenido) where?: Where<EnvioContenido>,
  ): Promise<Count> {
    const dataSource = this.enviocontenidoRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM envio_contenido${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;  }

  @get('/enviocontenido')
  @response(200, {
    description: 'Array of EnvioContenido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioContenido) filter?: Filter<EnvioContenido>,
  ): Promise<EnvioContenido[]> {
    const dataSource = this.enviocontenidoRepository.dataSource;
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
                          producto,
                          referencia,
                          peso_kgs as pesoKgs,
                          peso_total as pesoTotal,
                          medidas,
                          foto_producto as fotoProducto,
                          foto_pallet as fotoPallet,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM envio_contenido${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/enviocontenido/{id}')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioContenido, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioContenido>
  ): Promise<EnvioContenido> {
    return this.enviocontenidoRepository.findById(id, filter);
  }

  @patch('/enviocontenido/{id}')
  @response(204, {
    description: 'EnvioContenido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {partial: true}),
        },
      },
    })
    enviocontenido: EnvioContenido,
  ): Promise<void> {
    await this.enviocontenidoRepository.updateById(id, enviocontenido);
  }

  @del('/enviocontenido/{id}')
  @response(204, {
    description: 'EnvioContenido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enviocontenidoRepository.deleteById(id);
  }
}
