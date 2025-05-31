import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {UsuarioPasswordHistorico} from '../models';
import {UsuarioPasswordHistoricoRepository} from '../repositories';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class UsuarioPasswordHistoricoController {
  constructor(
    @repository(UsuarioPasswordHistoricoRepository)
    public usuarioPasswordHistoricoRepository : UsuarioPasswordHistoricoRepository,
  ) {}

  @post('/usuario-password-historicos')
  @response(200, {
    description: 'UsuarioPasswordHistorico model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioPasswordHistorico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPasswordHistorico, {
            title: 'NewUsuarioPasswordHistorico',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioPasswordHistorico: Omit<UsuarioPasswordHistorico, 'id'>,
  ): Promise<UsuarioPasswordHistorico> {
    return this.usuarioPasswordHistoricoRepository.create(usuarioPasswordHistorico);
  }

  @get('/usuario-password-historicos/count')
  @response(200, {
    description: 'UsuarioPasswordHistorico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioPasswordHistorico) where?: Where<UsuarioPasswordHistorico>,
  ): Promise<Count> {
    //return this.usuarioPasswordHistoricoRepository.count(where);
    const dataSource = this.usuarioPasswordHistoricoRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM usuario_password_historico${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/usuario-password-historicos')
  @response(200, {
    description: 'Array of UsuarioPasswordHistorico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioPasswordHistorico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioPasswordHistorico) filter?: Filter<UsuarioPasswordHistorico>,
  ): Promise<UsuarioPasswordHistorico[]> {
    const dataSource = this.usuarioPasswordHistoricoRepository.dataSource;
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
    const query = `SELECT * FROM usuario_password_historico${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @patch('/usuario-password-historicos')
  @response(200, {
    description: 'UsuarioPasswordHistorico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPasswordHistorico, {partial: true}),
        },
      },
    })
    usuarioPasswordHistorico: UsuarioPasswordHistorico,
    @param.where(UsuarioPasswordHistorico) where?: Where<UsuarioPasswordHistorico>,
  ): Promise<Count> {
    return this.usuarioPasswordHistoricoRepository.updateAll(usuarioPasswordHistorico, where);
  }

  @get('/usuario-password-historicos/{id}')
  @response(200, {
    description: 'UsuarioPasswordHistorico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioPasswordHistorico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioPasswordHistorico, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioPasswordHistorico>
  ): Promise<UsuarioPasswordHistorico> {
    return this.usuarioPasswordHistoricoRepository.findById(id, filter);
  }

  @patch('/usuario-password-historicos/{id}')
  @response(204, {
    description: 'UsuarioPasswordHistorico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPasswordHistorico, {partial: true}),
        },
      },
    })
    usuarioPasswordHistorico: UsuarioPasswordHistorico,
  ): Promise<void> {
    await this.usuarioPasswordHistoricoRepository.updateById(id, usuarioPasswordHistorico);
  }

  @put('/usuario-password-historicos/{id}')
  @response(204, {
    description: 'UsuarioPasswordHistorico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioPasswordHistorico: UsuarioPasswordHistorico,
  ): Promise<void> {
    await this.usuarioPasswordHistoricoRepository.replaceById(id, usuarioPasswordHistorico);
  }

  @del('/usuario-password-historicos/{id}')
  @response(204, {
    description: 'UsuarioPasswordHistorico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioPasswordHistoricoRepository.deleteById(id);
  }
}
