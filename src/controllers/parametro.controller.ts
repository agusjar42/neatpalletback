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
import {Parametro} from '../models';
import {ParametroRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class ParametroController {
  constructor(
    @repository(ParametroRepository)
    public parametroRepository : ParametroRepository,
  ) {}

  @post('/parametros')
  @response(200, {
    description: 'Parametro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parametro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {
            title: 'NewParametro',
            exclude: ['id'],
          }),
        },
      },
    })
    parametro: Omit<Parametro, 'id'>,
  ): Promise<Parametro> {
    return this.parametroRepository.create(parametro);
  }

  @get('/parametros/count')
  @response(200, {
    description: 'Parametro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    const dataSource = this.parametroRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM parametro${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/parametros')
  @response(200, {
    description: 'Array of Parametro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parametro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parametro) filter?: Filter<Parametro>,
  ): Promise<Parametro[]> {
    const dataSource = this.parametroRepository.dataSource;
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
                     FROM parametro${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/parametros/{id}')
  @response(200, {
    description: 'Parametro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parametro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parametro, {exclude: 'where'}) filter?: FilterExcludingWhere<Parametro>
  ): Promise<Parametro> {
    return this.parametroRepository.findById(id, filter);
  }

  @patch('/parametros/{id}')
  @response(204, {
    description: 'Parametro PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.updateById(id, parametro);
  }

  @del('/parametros/{id}')
  @response(204, {
    description: 'Parametro DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parametroRepository.deleteById(id);
  }
}