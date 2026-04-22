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
import {TipoSensor} from '../models';
import {TipoSensorRepository} from '../repositories';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class TipoSensorController {
  constructor(
    @repository(TipoSensorRepository)
    public tipoSensorRepository : TipoSensorRepository,
  ) {}

  @post('/tipo-sensores')
  @response(200, {
    description: 'TipoSensor model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoSensor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSensor, {
            title: 'NewTipoSensor',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoSensor: Omit<TipoSensor, 'id'>,
  ): Promise<TipoSensor> {
    return this.tipoSensorRepository.create(tipoSensor);
  }

  @get('/tipo-sensores/count')
  @response(200, {
    description: 'TipoSensor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoSensor) where?: Where<TipoSensor>,
  ): Promise<Count> {
    const dataSource = this.tipoSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'tipo_sensor', where);
  }

  @get('/tipo-sensores')
  @response(200, {
    description: 'Array of TipoSensor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoSensor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoSensor) filter?: Filter<TipoSensor>,
  ): Promise<TipoSensor[]> {
        const dataSource = this.tipoSensorRepository.dataSource;
        const camposSelect = "*"
        return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'tipo_sensor', filter, camposSelect);
  }

  @get('/tipo-sensores/{id}')
  @response(200, {
    description: 'TipoSensor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoSensor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoSensor, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoSensor>
  ): Promise<TipoSensor> {
    return this.tipoSensorRepository.findById(id, filter);
  }

  @patch('/tipo-sensores/{id}')
  @response(204, {
    description: 'TipoSensor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSensor, {partial: true}),
        },
      },
    })
    tipoSensor: TipoSensor,
  ): Promise<void> {
    await this.tipoSensorRepository.updateById(id, tipoSensor);
  }

  @del('/tipo-sensores/{id}')
  @response(204, {
    description: 'TipoSensor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoSensorRepository.deleteById(id);
  }
}