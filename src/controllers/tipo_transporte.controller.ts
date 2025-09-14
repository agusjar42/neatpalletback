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
import {TipoTransporte} from '../models';
import {TipoTransporteRepository} from '../repositories';

export class TipoTransporteController {
  constructor(
    @repository(TipoTransporteRepository)
    public tipoTransporteRepository : TipoTransporteRepository,
  ) {}

  @post('/tipo-transportes')
  @response(200, {
    description: 'TipoTransporte model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoTransporte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransporte, {
            title: 'NewTipoTransporte',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoTransporte: Omit<TipoTransporte, 'id'>,
  ): Promise<TipoTransporte> {
    return this.tipoTransporteRepository.create(tipoTransporte);
  }

  @get('/tipo-transportes/count')
  @response(200, {
    description: 'TipoTransporte model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoTransporte) where?: Where<TipoTransporte>,
  ): Promise<Count> {
    const dataSource = this.tipoTransporteRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM tipo_transporte${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/tipo-transportes')
  @response(200, {
    description: 'Array of TipoTransporte model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoTransporte, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoTransporte) filter?: Filter<TipoTransporte>,
  ): Promise<TipoTransporte[]> {
    const dataSource = this.tipoTransporteRepository.dataSource;
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
                     FROM tipo_transporte${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/tipo-transportes/{id}')
  @response(200, {
    description: 'TipoTransporte model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoTransporte, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoTransporte, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoTransporte>
  ): Promise<TipoTransporte> {
    return this.tipoTransporteRepository.findById(id, filter);
  }

  @patch('/tipo-transportes/{id}')
  @response(204, {
    description: 'TipoTransporte PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransporte, {partial: true}),
        },
      },
    })
    tipoTransporte: TipoTransporte,
  ): Promise<void> {
    await this.tipoTransporteRepository.updateById(id, tipoTransporte);
  }

  @del('/tipo-transportes/{id}')
  @response(204, {
    description: 'TipoTransporte DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoTransporteRepository.deleteById(id);
  }
}