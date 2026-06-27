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
import {EmpresaSensor} from '../models';
import {EmpresaSensorRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';
import {authorize} from '@loopback/authorization';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class EmpresaSensorController {
  constructor(
    @repository(EmpresaSensorRepository)
    public empresaSensorRepository: EmpresaSensorRepository,
  ) {}

  @post('/empresa-sensores')
  @response(200, {
    description: 'EmpresaSensor model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpresaSensor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {
            title: 'NewEmpresaSensor',
            exclude: ['id'],
          }),
        },
      },
    })
    empresaSensor: Omit<EmpresaSensor, 'id'>,
  ): Promise<EmpresaSensor> {
    return this.empresaSensorRepository.create(empresaSensor);
  }

  @get('/empresa-sensores/count')
  @response(200, {
    description: 'EmpresaSensor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpresaSensor) where?: Where<EmpresaSensor>,
  ): Promise<Count> {
    const dataSource = this.empresaSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(
      dataSource,
      'vista_empresa_sensor_tipo_sensor',
      where,
    );
  }

  @get('/empresa-sensores')
  @response(200, {
    description: 'Array of EmpresaSensor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpresaSensor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpresaSensor) filter?: Filter<EmpresaSensor>,
  ): Promise<EmpresaSensor[]> {
    const dataSource = this.empresaSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      'vista_empresa_sensor_tipo_sensor',
      filter,
      '*',
    );
  }

  @patch('/empresa-sensores')
  @response(200, {
    description: 'EmpresaSensor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {partial: true}),
        },
      },
    })
    empresaSensor: EmpresaSensor,
    @param.where(EmpresaSensor) where?: Where<EmpresaSensor>,
  ): Promise<Count> {
    return this.empresaSensorRepository.updateAll(empresaSensor, where);
  }

  @get('/empresa-sensores/{id}')
  @response(200, {
    description: 'EmpresaSensor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpresaSensor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpresaSensor, {exclude: 'where'})
    filter?: FilterExcludingWhere<EmpresaSensor>,
  ): Promise<EmpresaSensor> {
    return this.empresaSensorRepository.findById(id, filter);
  }

  @patch('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {partial: true}),
        },
      },
    })
    empresaSensor: EmpresaSensor,
  ): Promise<void> {
    await this.empresaSensorRepository.updateById(id, empresaSensor);
  }

  @put('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresaSensor: EmpresaSensor,
  ): Promise<void> {
    await this.empresaSensorRepository.replaceById(id, empresaSensor);
  }

  @del('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresaSensorRepository.deleteById(id);
  }

  @post('/crear-empresa-sensor-desde-tipo-sensor')
  @response(204, {
    description: 'Crear sensores de empresa desde tipos de sensor',
  })
  async crearSensoresDesdeTipoSensor(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              empresaId: {type: 'number'},
              usuarioCreacion: {type: 'number'},
            },
            required: ['empresaId'],
          },
        },
      },
    })
    dto: {empresaId: number; usuarioCreacion?: number},
  ): Promise<void> {
    const dataSource = this.empresaSensorRepository.dataSource;
    await dataSource.execute(
      `DELETE FROM empresa_sensor WHERE empresaId = ${dto.empresaId}`,
    );
    await dataSource.execute(
      `INSERT INTO empresa_sensor (empresaId, tipoSensorId, orden, valor, usuarioCreacion)
       SELECT ${dto.empresaId}, ts.id, ts.orden, COALESCE(ts.valorDefecto, '0'), ${dto.usuarioCreacion ?? 0}
       FROM tipo_sensor ts
       WHERE (ts.activoSn = 'S' OR ts.activoSn IS NULL)`,
    );
  }
}
