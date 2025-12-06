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
import {LugarParada} from '../models';
import {LugarParadaRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class LugarParadaController {
  constructor(
    @repository(LugarParadaRepository)
    public lugarParadaRepository : LugarParadaRepository,
  ) {}

  @post('/lugar-paradas')
  @response(200, {
    description: 'LugarParada model instance',
    content: {'application/json': {schema: getModelSchemaRef(LugarParada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParada, {
            title: 'NewLugarParada',
            exclude: ['id'],
          }),
        },
      },
    })
    lugarParada: Omit<LugarParada, 'id'>,
  ): Promise<LugarParada> {
    return this.lugarParadaRepository.create(lugarParada);
  }

  @get('/lugar-paradas/count')
  @response(200, {
    description: 'LugarParada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LugarParada) where?: Where<LugarParada>,
  ): Promise<Count> {
    const dataSource = this.lugarParadaRepository.dataSource;
    const datos = await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_cliente_lugar_parada', where);
    return datos;
  }

  @get('/lugar-paradas')
  @response(200, {
    description: 'Array of LugarParada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LugarParada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LugarParada) filter?: Filter<LugarParada>,
  ): Promise<LugarParada[]> {
    const dataSource = this.lugarParadaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_cliente_lugar_parada', filter, '*');
  }

  @patch('/lugar-paradas')
  @response(200, {
    description: 'LugarParada PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParada, {partial: true}),
        },
      },
    })
    lugarParada: LugarParada,
    @param.where(LugarParada) where?: Where<LugarParada>,
  ): Promise<Count> {
    return this.lugarParadaRepository.updateAll(lugarParada, where);
  }

  @get('/lugar-paradas/{id}')
  @response(200, {
    description: 'LugarParada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LugarParada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LugarParada, {exclude: 'where'}) filter?: FilterExcludingWhere<LugarParada>
  ): Promise<LugarParada> {
    return this.lugarParadaRepository.findById(id, filter);
  }

  @patch('/lugar-paradas/{id}')
  @response(204, {
    description: 'LugarParada PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParada, {partial: true}),
        },
      },
    })
    lugarParada: LugarParada,
  ): Promise<void> {
    await this.lugarParadaRepository.updateById(id, lugarParada);
  }

  @put('/lugar-paradas/{id}')
  @response(204, {
    description: 'LugarParada PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lugarParada: LugarParada,
  ): Promise<void> {
    await this.lugarParadaRepository.replaceById(id, lugarParada);
  }

  @del('/lugar-paradas/{id}')
  @response(204, {
    description: 'LugarParada DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lugarParadaRepository.deleteById(id);
  }
}
