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
import {EnvioContenidoPallet} from '../models';
import {EnvioContenidoPalletRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioContenidoPalletController {
  constructor(
    @repository(EnvioContenidoPalletRepository)
    public envioContenidoPalletRepository : EnvioContenidoPalletRepository,
  ) {}

  @post('/envio-contenido-pallets')
  @response(200, {
    description: 'EnvioContenidoPallet model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioContenidoPallet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenidoPallet, {
            title: 'NewEnvioContenidoPallet',
            exclude: ['id'],
          }),
        },
      },
    })
    envioContenidoPallet: Omit<EnvioContenidoPallet, 'id'>,
  ): Promise<EnvioContenidoPallet> {
    return this.envioContenidoPalletRepository.create(envioContenidoPallet);
  }

  @get('/envio-contenido-pallets/count')
  @response(200, {
    description: 'EnvioContenidoPallet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioContenidoPallet) where?: Where<EnvioContenidoPallet>,
  ): Promise<Count> {
    const dataSource = this.envioContenidoPalletRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'envio_contenido_pallet', where);
  }

  @get('/envio-contenido-pallets')
  @response(200, {
    description: 'Array of EnvioContenidoPallet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioContenidoPallet, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioContenidoPallet) filter?: Filter<EnvioContenidoPallet>,
  ): Promise<EnvioContenidoPallet[]> {
    const dataSource = this.envioContenidoPalletRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'envio_contenido_pallet', filter, camposSelect);
  }

  @patch('/envio-contenido-pallets')
  @response(200, {
    description: 'EnvioContenidoPallet PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenidoPallet, {partial: true}),
        },
      },
    })
    envioContenidoPallet: EnvioContenidoPallet,
    @param.where(EnvioContenidoPallet) where?: Where<EnvioContenidoPallet>,
  ): Promise<Count> {
    return this.envioContenidoPalletRepository.updateAll(envioContenidoPallet, where);
  }

  @get('/envio-contenido-pallets/{id}')
  @response(200, {
    description: 'EnvioContenidoPallet model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioContenidoPallet, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioContenidoPallet, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioContenidoPallet>
  ): Promise<EnvioContenidoPallet> {
    return this.envioContenidoPalletRepository.findById(id, filter);
  }

  @patch('/envio-contenido-pallets/{id}')
  @response(204, {
    description: 'EnvioContenidoPallet PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenidoPallet, {partial: true}),
        },
      },
    })
    envioContenidoPallet: EnvioContenidoPallet,
  ): Promise<void> {
    await this.envioContenidoPalletRepository.updateById(id, envioContenidoPallet);
  }

  @put('/envio-contenido-pallets/{id}')
  @response(204, {
    description: 'EnvioContenidoPallet PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioContenidoPallet: EnvioContenidoPallet,
  ): Promise<void> {
    await this.envioContenidoPalletRepository.replaceById(id, envioContenidoPallet);
  }

  @del('/envio-contenido-pallets/{id}')
  @response(204, {
    description: 'EnvioContenidoPallet DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioContenidoPalletRepository.deleteById(id);
  }

  @del('/envio-contenido-pallets/by-envio-contenido/{envioContenidoId}')
  @response(204, {
    description: 'EnvioContenidoPallet DELETE by envioContenidoId success',
  })
  async deleteByEnvioContenidoId(
    @param.path.number('envioContenidoId') envioContenidoId: number,
  ): Promise<void> {
    await this.envioContenidoPalletRepository.deleteAll({envioContenidoId});
  }

  @del('/envio-contenido-pallets/by-envio/{envioId}')
  @response(204, {
    description: 'EnvioContenidoPallet DELETE by envioId success - deletes all pallets from all contenidos of an envio',
  })
  async deleteByEnvioId(
    @param.path.number('envioId') envioId: number,
  ): Promise<void> {
    await this.envioContenidoPalletRepository.deleteByEnvioId(envioId);
  }
}
