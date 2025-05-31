import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {LogUsuario} from '../models';
import {LogUsuarioRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class LogUsuarioController {
  constructor(
    @repository(LogUsuarioRepository)
    public logUsuarioRepository : LogUsuarioRepository,
  ) {}

  @post('/log-usuarios')
  @response(200, {
    description: 'LogUsuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(LogUsuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {
            title: 'NewLogUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    logUsuario: Omit<LogUsuario, 'id'>,
  ): Promise<LogUsuario> {
    return this.logUsuarioRepository.create(logUsuario);
  }

  @get('/log-usuarios/count')
  @response(200, {
    description: 'LogUsuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LogUsuario) where?: Where<LogUsuario>,
  ): Promise<Count> {
    return this.logUsuarioRepository.count(where);
  }

  @get('/log-usuarios')
  @response(200, {
    description: 'Array of LogUsuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LogUsuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LogUsuario) filter?: Filter<LogUsuario>,
  ): Promise<LogUsuario[]> {
    return this.logUsuarioRepository.find(filter);
  }

  @patch('/log-usuarios')
  @response(200, {
    description: 'LogUsuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {partial: true}),
        },
      },
    })
    logUsuario: LogUsuario,
    @param.where(LogUsuario) where?: Where<LogUsuario>,
  ): Promise<Count> {
    return this.logUsuarioRepository.updateAll(logUsuario, where);
  }

  @get('/log-usuarios/{id}')
  @response(200, {
    description: 'LogUsuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LogUsuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LogUsuario, {exclude: 'where'}) filter?: FilterExcludingWhere<LogUsuario>
  ): Promise<LogUsuario> {
    return this.logUsuarioRepository.findById(id, filter);
  }

  @patch('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {partial: true}),
        },
      },
    })
    logUsuario: LogUsuario,
  ): Promise<void> {
    await this.logUsuarioRepository.updateById(id, logUsuario);
  }

  @put('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() logUsuario: LogUsuario,
  ): Promise<void> {
    await this.logUsuarioRepository.replaceById(id, logUsuario);
  }

  @del('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.logUsuarioRepository.deleteById(id);
  }

  @get('/vistaLogUsuarioUsuario')
  @response(200, {
    description: 'Devuelve los logs de usuario con sus nombres',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaLogUsuarioUsuario(@param.filter(LogUsuario) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.logUsuarioRepository.dataSource;
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
    const query = `SELECT * FROM vista_log_usuario_usuario${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/vistaLogUsuarioUsuarioCount')
  @response(200, {
    description: 'Devuelve los tipos de extras y el nombre de la empresa',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaLogUsuarioUsuarioCount(@param.where(LogUsuario) where?: Where<LogUsuario>,): Promise<LogUsuario[]> {
    const dataSource = this.logUsuarioRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_log_usuario_usuario${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }
}
