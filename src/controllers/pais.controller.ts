import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import { Pais } from '../models';
import { PaisRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class PaisController {
  constructor(
    @repository(PaisRepository)
    public paisRepository: PaisRepository,
  ) { }

  @post('/paises')
  @response(200, {
    description: 'Pais model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Pais) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {
            title: 'NewPais',
            exclude: ['id'],
          }),
        },
      },
    })
    pais: Omit<Pais, 'id'>,
  ): Promise<Pais> {
    return this.paisRepository.create(pais);
  }

  @get('/paises/count')
  @response(200, {
    description: 'Pais model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    const dataSource = this.paisRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM pais${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/paises')
  @response(200, {
    description: 'Array of Pais model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pais, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Pais) filter?: Filter<Pais>,
  ): Promise<Pais[]> {
    const dataSource = this.paisRepository.dataSource;
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
                          iso,
                          nombre,
                          activoSn,
                          fechaCreacion,
                          fechaModificacion,
                          usuCreacion,
                          usuModificacion
                     FROM pais${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/paises')
  @response(200, {
    description: 'Pais PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, { partial: true }),
        },
      },
    })
    pais: Pais,
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    return this.paisRepository.updateAll(pais, where);
  }

  @get('/paises/{id}')
  @response(200, {
    description: 'Pais model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pais, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pais, { exclude: 'where' }) filter?: FilterExcludingWhere<Pais>
  ): Promise<Pais> {
    return this.paisRepository.findById(id, filter);
  }

  @patch('/paises/{id}')
  @response(204, {
    description: 'Pais PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, { partial: true }),
        },
      },
    })
    pais: Pais,
  ): Promise<void> {
    await this.paisRepository.updateById(id, pais);
    
  }

  @put('/paises/{id}')
  @response(204, {
    description: 'Pais PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pais: Pais,
  ): Promise<void> {
    await this.paisRepository.replaceById(id, pais);
  }

  @del('/paises/{id}')
  @response(204, {
    description: 'Pais DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paisRepository.deleteById(id);
  }


}
