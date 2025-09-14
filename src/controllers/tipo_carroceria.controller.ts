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
import {TipoCarroceria} from '../models';
import {TipoCarroceriaRepository} from '../repositories';

export class TipoCarroceriaController {
  constructor(
    @repository(TipoCarroceriaRepository)
    public tipoCarroceriaRepository : TipoCarroceriaRepository,
  ) {}

  @post('/tipo-carrocerias')
  @response(200, {
    description: 'TipoCarroceria model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCarroceria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCarroceria, {
            title: 'NewTipoCarroceria',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCarroceria: Omit<TipoCarroceria, 'id'>,
  ): Promise<TipoCarroceria> {
    return this.tipoCarroceriaRepository.create(tipoCarroceria);
  }

  @get('/tipo-carrocerias/count')
  @response(200, {
    description: 'TipoCarroceria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCarroceria) where?: Where<TipoCarroceria>,
  ): Promise<Count> {
    const dataSource = this.tipoCarroceriaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM tipo_carroceria${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;  }

  @get('/tipo-carrocerias')
  @response(200, {
    description: 'Array of TipoCarroceria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCarroceria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCarroceria) filter?: Filter<TipoCarroceria>,
  ): Promise<TipoCarroceria[]> {
    const dataSource = this.tipoCarroceriaRepository.dataSource;
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
                          nombre,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM tipo_carroceria${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/tipo-carrocerias/{id}')
  @response(200, {
    description: 'TipoCarroceria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCarroceria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoCarroceria, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCarroceria>
  ): Promise<TipoCarroceria> {
    return this.tipoCarroceriaRepository.findById(id, filter);
  }

  @patch('/tipo-carrocerias/{id}')
  @response(204, {
    description: 'TipoCarroceria PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCarroceria, {partial: true}),
        },
      },
    })
    tipoCarroceria: TipoCarroceria,
  ): Promise<void> {
    await this.tipoCarroceriaRepository.updateById(id, tipoCarroceria);
  }

  @del('/tipo-carrocerias/{id}')
  @response(204, {
    description: 'TipoCarroceria DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoCarroceriaRepository.deleteById(id);
  }
}