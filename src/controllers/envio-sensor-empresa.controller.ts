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
import {EnvioSensorEmpresa} from '../models';
import {EnvioSensorEmpresaRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class EnvioSensorEmpresaController {
  constructor(
    @repository(EnvioSensorEmpresaRepository)
    public envioSensorEmpresaRepository : EnvioSensorEmpresaRepository,
  ) {}

  @post('/envio-sensor-empresas')
  @response(200, {
    description: 'EnvioSensorEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioSensorEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {
            title: 'NewEnvioSensorEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    envioSensorEmpresa: Omit<EnvioSensorEmpresa, 'id'>,
  ): Promise<EnvioSensorEmpresa> {
    return this.envioSensorEmpresaRepository.create(envioSensorEmpresa);
  }

  @get('/envio-sensor-empresas/count')
  @response(200, {
    description: 'EnvioSensorEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioSensorEmpresa) where?: Where<EnvioSensorEmpresa>,
  ): Promise<Count> {
    const dataSource = this.envioSensorEmpresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_tipo_sensor_empresa', where);
  }

  @get('/envio-sensor-empresas')
  @response(200, {
    description: 'Array of EnvioSensorEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioSensorEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioSensorEmpresa) filter?: Filter<EnvioSensorEmpresa>,
  ): Promise<EnvioSensorEmpresa[]> {
    const dataSource = this.envioSensorEmpresaRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_tipo_sensor_empresa', filter, camposSelect);
  }

  @patch('/envio-sensor-empresas')
  @response(200, {
    description: 'EnvioSensorEmpresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {partial: true}),
        },
      },
    })
    envioSensorEmpresa: EnvioSensorEmpresa,
    @param.where(EnvioSensorEmpresa) where?: Where<EnvioSensorEmpresa>,
  ): Promise<Count> {
    return this.envioSensorEmpresaRepository.updateAll(envioSensorEmpresa, where);
  }

  @get('/envio-sensor-empresas/{id}')
  @response(200, {
    description: 'EnvioSensorEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioSensorEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioSensorEmpresa, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioSensorEmpresa>
  ): Promise<EnvioSensorEmpresa> {
    return this.envioSensorEmpresaRepository.findById(id, filter);
  }

  @patch('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioSensorEmpresa, {partial: true}),
        },
      },
    })
    envioSensorEmpresa: EnvioSensorEmpresa,
  ): Promise<void> {
    await this.envioSensorEmpresaRepository.updateById(id, envioSensorEmpresa);
  }

  @put('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envioSensorEmpresa: EnvioSensorEmpresa,
  ): Promise<void> {
    await this.envioSensorEmpresaRepository.replaceById(id, envioSensorEmpresa);
  }

  @del('/envio-sensor-empresas/{id}')
  @response(204, {
    description: 'EnvioSensorEmpresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioSensorEmpresaRepository.deleteById(id);
  }

  @post('/crear-envio-sensor-empresa-desde-tipo-sensor')
  @response(204, {
    description: 'Crear sensores de empresa desde tipos de sensor',
  })
  async crearSensoresDesdetipoSensor(
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
    const dataSource = this.envioSensorEmpresaRepository.dataSource;
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
