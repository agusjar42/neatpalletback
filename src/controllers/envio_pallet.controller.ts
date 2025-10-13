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
import {EnvioPallet} from '../models';
import {EnvioPalletRepository} from '../repositories';

export class EnvioPalletController {
  constructor(
    @repository(EnvioPalletRepository)
    public envioPalletRepository : EnvioPalletRepository,
  ) {}

  @post('/envio-pallets')
  @response(200, {
    description: 'EnvioPallet model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioPallet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPallet, {
            title: 'NewEnvioPallet',
            exclude: ['id'],
          }),
        },
      },
    })
    envioPallet: Omit<EnvioPallet, 'id'>,
  ): Promise<EnvioPallet> {
    return this.envioPalletRepository.create(envioPallet);
  }

  @get('/envio-pallets/count')
  @response(200, {
    description: 'EnvioPallet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioPallet) where?: Where<EnvioPallet>,
  ): Promise<Count> {
    const dataSource = this.envioPalletRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_envio_pallet_contenido${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio-pallets')
  @response(200, {
    description: 'Array of EnvioPallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioPallet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioPallet) filter?: Filter<EnvioPallet>,
  ): Promise<EnvioPallet[]> {
    const dataSource = this.envioPalletRepository.dataSource;
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
                     FROM vista_envio_pallet_contenido${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/envio-pallets/{id}')
  @response(200, {
    description: 'EnvioPallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioPallet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioPallet, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioPallet>
  ): Promise<EnvioPallet> {
    return this.envioPalletRepository.findById(id, filter);
  }

  @patch('/envio-pallets/{id}')
  @response(204, {
    description: 'EnvioPallet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPallet, {partial: true}),
        },
      },
    })
    envioPallet: EnvioPallet,
  ): Promise<void> {
    await this.envioPalletRepository.updateById(id, envioPallet);
  }

  @del('/envio-pallets/{id}')
  @response(204, {
    description: 'EnvioPallet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioPalletRepository.deleteById(id);
  }
}