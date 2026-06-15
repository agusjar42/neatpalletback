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
import {SensorEmpresa} from '../models';
import {SensorEmpresaRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';
import {authorize} from '@loopback/authorization';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class SensorEmpresaController {
  constructor(
    @repository(SensorEmpresaRepository)
    public sensorEmpresaRepository: SensorEmpresaRepository,
  ) {}

  @post('/sensor-empresas')
  @response(200, {
    description: 'SensorEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(SensorEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SensorEmpresa, {
            title: 'NewSensorEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    sensorEmpresa: Omit<SensorEmpresa, 'id'>,
  ): Promise<SensorEmpresa> {
    return this.sensorEmpresaRepository.create(sensorEmpresa);
  }

  @get('/sensor-empresas/count')
  @response(200, {
    description: 'SensorEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SensorEmpresa) where?: Where<SensorEmpresa>,
  ): Promise<Count> {
    const dataSource = this.sensorEmpresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(
      dataSource,
      'vista_sensor_empresa_tipo_sensor',
      where,
    );
  }

  @get('/sensor-empresas')
  @response(200, {
    description: 'Array of SensorEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SensorEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SensorEmpresa) filter?: Filter<SensorEmpresa>,
  ): Promise<SensorEmpresa[]> {
    const dataSource = this.sensorEmpresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      'vista_sensor_empresa_tipo_sensor',
      filter,
      '*',
    );
  }

  @patch('/sensor-empresas')
  @response(200, {
    description: 'SensorEmpresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SensorEmpresa, {partial: true}),
        },
      },
    })
    sensorEmpresa: SensorEmpresa,
    @param.where(SensorEmpresa) where?: Where<SensorEmpresa>,
  ): Promise<Count> {
    return this.sensorEmpresaRepository.updateAll(sensorEmpresa, where);
  }

  @get('/sensor-empresas/{id}')
  @response(200, {
    description: 'SensorEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SensorEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SensorEmpresa, {exclude: 'where'})
    filter?: FilterExcludingWhere<SensorEmpresa>,
  ): Promise<SensorEmpresa> {
    return this.sensorEmpresaRepository.findById(id, filter);
  }

  @patch('/sensor-empresas/{id}')
  @response(204, {
    description: 'SensorEmpresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SensorEmpresa, {partial: true}),
        },
      },
    })
    sensorEmpresa: SensorEmpresa,
  ): Promise<void> {
    await this.sensorEmpresaRepository.updateById(id, sensorEmpresa);
  }

  @put('/sensor-empresas/{id}')
  @response(204, {
    description: 'SensorEmpresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sensorEmpresa: SensorEmpresa,
  ): Promise<void> {
    await this.sensorEmpresaRepository.replaceById(id, sensorEmpresa);
  }

  @del('/sensor-empresas/{id}')
  @response(204, {
    description: 'SensorEmpresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sensorEmpresaRepository.deleteById(id);
  }

  @post('/crear-sensor-empresa-desde-tipo-sensor')
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
    const dataSource = this.sensorEmpresaRepository.dataSource;
    await dataSource.execute(
      `DELETE FROM sensor_empresa WHERE empresaId = ${dto.empresaId}`,
    );
    await dataSource.execute(
      `INSERT INTO sensor_empresa (empresaId, tipoSensorId, orden, valor, usuarioCreacion)
       SELECT ${dto.empresaId}, ts.id, ts.orden, COALESCE(ts.valorDefecto, '0'), ${dto.usuarioCreacion ?? 0}
       FROM tipo_sensor ts
       WHERE (ts.activoSn = 'S' OR ts.activoSn IS NULL)`,
    );
  }
}
