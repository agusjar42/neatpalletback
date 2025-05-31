import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import { authenticate } from '@loopback/authentication';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import { UsuarioCredenciales } from '../models';
import { UsuarioCredencialesRepository } from '../repositories';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class UsuarioCredencialesController {
  constructor(
    @repository(UsuarioCredencialesRepository)
    public usuarioCredencialesRepository: UsuarioCredencialesRepository,
  ) { }

  @post('/usuario-credenciales')
  @response(200, {
    description: 'UsuarioCredenciales model instance',
    content: { 'application/json': { schema: getModelSchemaRef(UsuarioCredenciales) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCredenciales, {
            title: 'NewUsuarioCredenciales',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioCredenciales: Omit<UsuarioCredenciales, 'id'>,
  ): Promise<UsuarioCredenciales> {
    return this.usuarioCredencialesRepository.create(usuarioCredenciales);
  }

  @get('/usuario-credenciales/count')
  @response(200, {
    description: 'UsuarioCredenciales model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(UsuarioCredenciales) where?: Where<UsuarioCredenciales>,
  ): Promise<Count> {
    return this.usuarioCredencialesRepository.count(where);
  }

  @get('/usuario-credenciales')
  @response(200, {
    description: 'Array of UsuarioCredenciales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioCredenciales, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioCredenciales) filter?: Filter<UsuarioCredenciales>,
  ): Promise<UsuarioCredenciales[]> {
    return this.usuarioCredencialesRepository.find(filter);
  }

  @patch('/usuario-credenciales')
  @response(200, {
    description: 'UsuarioCredenciales PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCredenciales, { partial: true }),
        },
      },
    })
    usuarioCredenciales: UsuarioCredenciales,
    @param.where(UsuarioCredenciales) where?: Where<UsuarioCredenciales>,
  ): Promise<Count> {
    return this.usuarioCredencialesRepository.updateAll(usuarioCredenciales, where);
  }

  @get('/usuario-credenciales/{id}')
  @response(200, {
    description: 'UsuarioCredenciales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioCredenciales, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioCredenciales, { exclude: 'where' }) filter?: FilterExcludingWhere<UsuarioCredenciales>
  ): Promise<UsuarioCredenciales> {
    return this.usuarioCredencialesRepository.findById(id, filter);
  }

  @patch('/usuario-credenciales/{id}')
  @response(204, {
    description: 'UsuarioCredenciales PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCredenciales, { partial: true }),
        },
      },
    })
    usuarioCredenciales: UsuarioCredenciales,
  ): Promise<void> {
    await this.usuarioCredencialesRepository.updateById(id, usuarioCredenciales);
  }

  @put('/usuario-credenciales/{id}')
  @response(204, {
    description: 'UsuarioCredenciales PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioCredenciales: UsuarioCredenciales,
  ): Promise<void> {
    await this.usuarioCredencialesRepository.replaceById(id, usuarioCredenciales);
  }

  @del('/usuario-credenciales/{id}')
  @response(204, {
    description: 'UsuarioCredenciales DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioCredencialesRepository.deleteById(id);
  }
}
