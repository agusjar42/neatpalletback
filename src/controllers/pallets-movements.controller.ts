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
import {PalletsMovements} from '../models';
import {PalletsMovementsRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')

export class PalletsMovementsController {
  constructor(
    @repository(PalletsMovementsRepository)
    public palletsMovementsRepository : PalletsMovementsRepository,
  ) {}

  @post('/pallets-movements')
  @response(200, {
    description: 'Array of PalletsMovements model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletsMovements),
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(PalletsMovements, {
              title: 'NewPalletsMovements',
              exclude: ['id'],
            }),
          },
        },
      },
    })
    palletsMovements: Omit<PalletsMovements, 'id'>[],
  ): Promise<PalletsMovements[]> {
    const created: PalletsMovements[] = [];

    for (const movement of palletsMovements) {
      const createdMovement = await this.palletsMovementsRepository.create(movement);
      created.push(createdMovement);
    }

    return created;
  }

  @get('/pallets-movements/count')
  @response(200, {
    description: 'PalletsMovements model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PalletsMovements) where?: Where<PalletsMovements>,
  ): Promise<Count> {
    const dataSource = this.palletsMovementsRepository.dataSource;
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
                  //Corrije el nombre del campo
                  if (subKey !== 'activoSn') {
                    filtros += ` ${subKey} LIKE '%${subValue}%'`;
                  }
                  else {
                    filtros += ` activo_sn LIKE '%${subValue}%'`;
                  }
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
    const query = `SELECT COUNT(*) AS count FROM pallets_movements${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/pallets-movements')
  @response(200, {
    description: 'Array of PalletsMovements model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletsMovements, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PalletsMovements) filter?: Filter<PalletsMovements>,
  ): Promise<PalletsMovements[]> {
    const dataSource = this.palletsMovementsRepository.dataSource;
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
                  //Corrije el nombre del campo
                  if (subKey !== 'activoSn') {
                    filtros += ` ${subKey} LIKE '%${subValue}%'`;
                  }
                  else {
                    filtros += ` activo_sn LIKE '%${subValue}%'`;
                  }
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
    const query = `SELECT * FROM pallets_movements${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/pallets-movements')
  @response(200, {
    description: 'PalletsMovements PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletsMovements, {partial: true}),
        },
      },
    })
    palletsMovements: PalletsMovements,
    @param.where(PalletsMovements) where?: Where<PalletsMovements>,
  ): Promise<Count> {
    return this.palletsMovementsRepository.updateAll(palletsMovements, where);
  }

  @get('/pallets-movements/{id}')
  @response(200, {
    description: 'PalletsMovements model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PalletsMovements, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PalletsMovements, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletsMovements>
  ): Promise<PalletsMovements> {
    return this.palletsMovementsRepository.findById(id, filter);
  }

  @patch('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletsMovements, {partial: true}),
        },
      },
    })
    palletsMovements: PalletsMovements,
  ): Promise<void> {
    await this.palletsMovementsRepository.updateById(id, palletsMovements);
  }

  @put('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() palletsMovements: PalletsMovements,
  ): Promise<void> {
    await this.palletsMovementsRepository.replaceById(id, palletsMovements);
  }

  @del('/pallets-movements/{id}')
  @response(204, {
    description: 'PalletsMovements DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletsMovementsRepository.deleteById(id);
  }
}
