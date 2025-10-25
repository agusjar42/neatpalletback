import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import { Idioma } from '../models';
import { IdiomaRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class IdiomaController {
  constructor(
    @repository(IdiomaRepository)
    public idiomaRepository: IdiomaRepository,
  ) { }

  @post('/idiomas')
  @response(200, {
    description: 'Idioma model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Idioma) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idioma, {
            title: 'NewIdioma',
            exclude: ['id'],
          }),
        },
      },
    })
    idioma: Omit<Idioma, 'id'>,
  ): Promise<Idioma> {
    return this.idiomaRepository.create(idioma);
  }

  @get('/idiomas/count')
  @response(200, {
    description: 'Idioma model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Idioma) where?: Where<Idioma>,
  ): Promise<Count> {
    const dataSource = this.idiomaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM idioma${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/idiomas')
  @response(200, {
    description: 'Array of Idioma model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Idioma, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Idioma) filter?: Filter<Idioma>,
  ): Promise<Idioma[]> {
    const dataSource = this.idiomaRepository.dataSource;
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
    const query = `SELECT id, nombre, iso, activoSn FROM idioma${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/idiomas')
  @response(200, {
    description: 'Idioma PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idioma, { partial: true }),
        },
      },
    })
    idioma: Idioma,
    @param.where(Idioma) where?: Where<Idioma>,
  ): Promise<Count> {
    return this.idiomaRepository.updateAll(idioma, where);
  }

  @get('/idiomas/{id}')
  @response(200, {
    description: 'Idioma model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Idioma, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Idioma, { exclude: 'where' }) filter?: FilterExcludingWhere<Idioma>
  ): Promise<Idioma> {
    return this.idiomaRepository.findById(id, filter);
  }

  @patch('/idiomas/{id}')
  @response(204, {
    description: 'Idioma PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Idioma, { partial: true }),
        },
      },
    })
    idioma: Idioma,
  ): Promise<void> {
    await this.idiomaRepository.updateById(id, idioma);
  }

  @put('/idiomas/{id}')
  @response(204, {
    description: 'Idioma PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() idioma: Idioma,
  ): Promise<void> {
    await this.idiomaRepository.replaceById(id, idioma);
  }

  @del('/idiomas/{id}')
  @response(204, {
    description: 'Idioma DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      const dataSource = this.idiomaRepository.dataSource;
      //Borra la tabla con dependencia
      //let query = `DELETE FROM nivel_idioma WHERE idioma_id = ${id}`;
      //await dataSource.execute(query);
      //Borra el gasto
      await this.idiomaRepository.deleteById(id);
    } catch (e) {
      if (e.errno === 1451) {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro porque tiene otros registros relacionados.');
      } else {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro.');
      }
    }

  }
}
