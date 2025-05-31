import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {ListaPermisos} from '../models';
import {ListaPermisosRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class ListaPermisosController {
  constructor(
    @repository(ListaPermisosRepository)
    public listaPermisosRepository : ListaPermisosRepository,
  ) {}

  @post('/lista-permisos')
  @response(200, {
    description: 'ListaPermisos model instance',
    content: {'application/json': {schema: getModelSchemaRef(ListaPermisos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ListaPermisos, {
            title: 'NewListaPermisos',
            exclude: ['id'],
          }),
        },
      },
    })
    listaPermisos: Omit<ListaPermisos, 'id'>,
  ): Promise<ListaPermisos> {
    return this.listaPermisosRepository.create(listaPermisos);
  }

  @get('/lista-permisos/count')
  @response(200, {
    description: 'ListaPermisos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ListaPermisos) where?: Where<ListaPermisos>,
  ): Promise<Count> {
    const dataSource = this.listaPermisosRepository.dataSource;

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
                  filtros += ` ${key} LIKE '%${subValue}%'`;
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

    const query = `SELECT COUNT(*) AS count FROM lista_permisos${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/lista-permisos')
  @response(200, {
    description: 'Array of ListaPermisos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ListaPermisos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ListaPermisos) filter?: Filter<ListaPermisos>,
  ): Promise<ListaPermisos[]> {
    const dataSource = this.listaPermisosRepository.dataSource;

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
                  filtros += ` ${key} LIKE '%${subValue}%'`;
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
    const query = `SELECT * FROM lista_permisos${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/lista-permisos')
  @response(200, {
    description: 'ListaPermisos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ListaPermisos, {partial: true}),
        },
      },
    })
    listaPermisos: ListaPermisos,
    @param.where(ListaPermisos) where?: Where<ListaPermisos>,
  ): Promise<Count> {
    return this.listaPermisosRepository.updateAll(listaPermisos, where);
  }

  @get('/lista-permisos/{id}')
  @response(200, {
    description: 'ListaPermisos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ListaPermisos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ListaPermisos, {exclude: 'where'}) filter?: FilterExcludingWhere<ListaPermisos>
  ): Promise<ListaPermisos> {
    return this.listaPermisosRepository.findById(id, filter);
  }

  @patch('/lista-permisos/{id}')
  @response(204, {
    description: 'ListaPermisos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ListaPermisos, {partial: true}),
        },
      },
    })
    listaPermisos: ListaPermisos,
  ): Promise<void> {
    await this.listaPermisosRepository.updateById(id, listaPermisos);
  }

  @put('/lista-permisos/{id}')
  @response(204, {
    description: 'ListaPermisos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() listaPermisos: ListaPermisos,
  ): Promise<void> {
    await this.listaPermisosRepository.replaceById(id, listaPermisos);
  }

  @del('/lista-permisos/{id}')
  @response(204, {
    description: 'ListaPermisos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.listaPermisosRepository.deleteById(id);
  }
}
