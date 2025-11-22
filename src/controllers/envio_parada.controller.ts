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
import {EnvioParada} from '../models';
import {EnvioParadaRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioParadaController {
  constructor(
    @repository(EnvioParadaRepository)
    public envioParadaRepository : EnvioParadaRepository,
  ) {}

  @post('/envio-paradas')
  @response(200, {
    description: 'EnvioParada model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioParada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioParada, {
            title: 'NewEnvioParada',
            exclude: ['id'],
          }),
        },
      },
    })
    envioParada: Omit<EnvioParada, 'id'>,
  ): Promise<EnvioParada> {
    return this.envioParadaRepository.create(envioParada);
  }

  @get('/envio-paradas/count')
  @response(200, {
    description: 'EnvioParada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioParada) where?: Where<EnvioParada>,
  ): Promise<Count> {
    const dataSource = this.envioParadaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_parada_envio', where);
  }

  @get('/envio-paradas')
  @response(200, {
    description: 'Array of EnvioParada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioParada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioParada) filter?: Filter<EnvioParada>,
  ): Promise<EnvioParada[]> {
    const dataSource = this.envioParadaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_parada_envio', filter, '*, DATE_FORMAT(fecha, \'%d/%m/%Y %H:%i\') AS fechaEspanol');
  }

  @get('/envio-paradas/{id}')
  @response(200, {
    description: 'EnvioParada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioParada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioParada, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioParada>
  ): Promise<EnvioParada> {
    return this.envioParadaRepository.findById(id, filter);
  }

  @patch('/envio-paradas/{id}')
  @response(204, {
    description: 'EnvioParada PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioParada, {partial: true}),
        },
      },
    })
    envioParada: EnvioParada,
  ): Promise<void> {
    await this.envioParadaRepository.updateById(id, envioParada);
  }

  @del('/envio-paradas/{id}')
  @response(204, {
    description: 'EnvioParada DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioParadaRepository.deleteById(id);
  }
}