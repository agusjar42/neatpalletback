import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {UsuarioPasswordHistorico} from '../models';
import {UsuarioPasswordHistoricoRepository} from '../repositories';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class UsuarioPasswordHistoricoController {
  constructor(
    @repository(UsuarioPasswordHistoricoRepository)
    public usuarioPasswordHistoricoRepository : UsuarioPasswordHistoricoRepository,
  ) {}

  @authenticate.skip()
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

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/usuario-password-historicos/count')
  @response(200, {
    description: 'UsuarioPasswordHistorico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioPasswordHistorico) where?: Where<UsuarioPasswordHistorico>,
  ): Promise<Count> {
    const dataSource = this.usuarioPasswordHistoricoRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'usuario_password_historico', where);
  }

  @authenticate.skip()  
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
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'usuario_password_historico', filter, camposSelect);
  }
  
  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

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

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

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

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

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
  
  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

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
  
  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @del('/usuario-password-historicos/{id}')
  @response(204, {
    description: 'UsuarioPasswordHistorico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioPasswordHistoricoRepository.deleteById(id);
  }
}
