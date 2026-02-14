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
import {service} from '@loopback/core';
import {Envio} from '../models';
import {CrearEnvioConfiguracionDto} from '../models/crear-envio-configuracion.dto';
import {CrearEnvioSensorDto} from '../models/crear-envio-sensor.dto';
import {EnvioRepository} from '../repositories';
import {EnvioConfiguracionService} from '../services/envio-configuracion.service';
import {EnvioSensorService} from '../services/envio-sensor.service';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class EnvioController {
  constructor(
    @repository(EnvioRepository)
    public envioRepository : EnvioRepository,
    @service(EnvioConfiguracionService)
    public envioConfiguracionService: EnvioConfiguracionService,
    @service(EnvioSensorService)
    public envioSensorService: EnvioSensorService,
  ) {}

  @post('/envios')
  @response(200, {
    description: 'Envio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Envio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {
            title: 'NewEnvio',
            exclude: ['id'],
          }),
        },
      },
    })
    envio: Omit<Envio, 'id'>,
  ): Promise<Envio> {
    //
    //Inserto el envio
    //
    const resultado = await this.envioRepository.create(envio);
    //
    //Inserto las configuraciones por defecto de la empresa
    //
    await this.envioConfiguracionService.insertEnvioConfiguracion(resultado.id!, envio.empresaId, envio.usuarioCreacion!);
    //
    //Inserto los sensores por defecto de la empresa
    //
    await this.envioSensorService.insertEnvioSensor(resultado.id!, envio.empresaId, envio.usuarioCreacion!);

    return resultado;
    }

  @post('/crear-envio-configuracion-desde-empresa')
  @response(204, {
    description: 'Crear envío y configuración desde empresa',
  })
  async crearEnvioConfiguracionDesdeEmpresa(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrearEnvioConfiguracionDto, {
            title: 'CrearEnvioConfiguracionDto'
          }),
        },
      },
    })
    dto: CrearEnvioConfiguracionDto,
  ): Promise<void> {
    //
    //Borro e inserto las configuraciones por defecto de la empresa
    //
    await this.envioConfiguracionService.insertEnvioConfiguracion(dto.envioId, dto.empresaId, dto.usuarioCreacion);
  }

  @post('/crear-envio-sensor-desde-empresa')
  @response(204, {
    description: 'Crear envío y sensores desde empresa',
  })
  async crearEnvioSensorDesdeEmpresa(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrearEnvioSensorDto, {
            title: 'CrearEnvioSensorDto'
          }),
        },
      },
    })
    dto: CrearEnvioSensorDto,
  ): Promise<void> {
    //
    //Borro e inserto los sensores por defecto de la empresa
    //
    await this.envioSensorService.insertEnvioSensor(dto.envioId, dto.empresaId, dto.usuarioCreacion);
  }

  @get('/envios/count')
  @response(200, {
    description: 'Envio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Envio) where?: Where<Envio>,
  ): Promise<Count> {
    const dataSource = this.envioRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_empresa_envio_cliente', where);
  }

  @get('/resumen-envio/count')
  @response(200, {
    description: 'Resumen de envío count',
    content: {'application/json': {schema: CountSchema}},
  })
  async resumenEnvioCount(): Promise<Count> {
    // Datos fijos de ejemplo - más adelante se implementará la funcionalidad real
    return {count: 25};
  }

  @get('/resumen-envio-pallet/count')
  @response(200, {
    description: 'Resumen de envío pallet count',
    content: {'application/json': {schema: CountSchema}},
  })
  async resumenEnvioPalletCount(): Promise<Count> {
    // Datos fijos de ejemplo - más adelante se implementará la funcionalidad real
    return {count: 18};
  }

  @get('/envios')
  @response(200, {
    description: 'Array of Envio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Envio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Envio) filter?: Filter<Envio>,
  ): Promise<Envio[]> {
    const dataSource = this.envioRepository.dataSource;
    const camposSelect = "*,\n                          DATE_FORMAT(fechaSalida, '%d/%m/%Y %H:%i') AS fechaSalidaEspanol,\n                          DATE_FORMAT(fechaLlegada, '%d/%m/%Y %H:%i') AS fechaLlegadaEspanol"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_empresa_envio_cliente', filter, camposSelect);
  }

  @patch('/envios')
  @response(200, {
    description: 'Envio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {partial: true}),
        },
      },
    })
    envio: Envio,
    @param.where(Envio) where?: Where<Envio>,
  ): Promise<Count> {
    return this.envioRepository.updateAll(envio, where);
  }

  @get('/envios/{id}')
  @response(200, {
    description: 'Envio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Envio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Envio, {exclude: 'where'}) filter?: FilterExcludingWhere<Envio>
  ): Promise<Envio> {
    return this.envioRepository.findById(id, filter);
  }

  @patch('/envios/{id}')
  @response(204, {
    description: 'Envio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envio, {partial: true}),
        },
      },
    })
    envio: Envio,
  ): Promise<void> {
    await this.envioRepository.updateById(id, envio);
  }

  @put('/envios/{id}')
  @response(204, {
    description: 'Envio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envio: Envio,
  ): Promise<void> {
    await this.envioRepository.replaceById(id, envio);
  }

  @del('/envios/{id}')
  @response(204, {
    description: 'Envio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioRepository.deleteById(id);
  }

  @get('/resumen-envio/{id}')
  @response(200, {
    description: 'Resumen de envío con eventos y alarmas',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              eventosGuardados: {type: 'number'},
              eventosEnviados: {type: 'number'},
              totalAlarmas: {type: 'number'},
              bateriaActual: {type: 'number'}
            }
          }
        }
      }
    }
  })
  async resumenEnvio(
    @param.path.number('id') id: number,
  ): Promise<{eventosGuardados: number, eventosEnviados: number, totalAlarmas: number, bateriaActual: number}[]> {
    // Datos fijos de ejemplo - más adelante se implementará la funcionalidad real
    return [
      {
        eventosGuardados: 1250,
        eventosEnviados: 1180,
        totalAlarmas: 5,
        bateriaActual: 85
      },
      {
        eventosGuardados: 980,
        eventosEnviados: 920,
        totalAlarmas: 2,
        bateriaActual: 67
      },
      {
        eventosGuardados: 1450,
        eventosEnviados: 1380,
        totalAlarmas: 8,
        bateriaActual: 92
      }
    ];
  }

  @get('/resumen-envio-pallet/{id}')
  @response(200, {
    description: 'Resumen de envío pallet con eventos y alarmas',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              eventosGuardados: {type: 'number'},
              eventosEnviados: {type: 'number'},
              totalAlarmas: {type: 'number'},
              bateriaActual: {type: 'number'}
            }
          }
        }
      }
    }
  })
  async resumenEnvioPallet(
    @param.path.number('id') id: number,
  ): Promise<{eventosGuardados: number, eventosEnviados: number, totalAlarmas: number, bateriaActual: number}[]> {
    // Datos fijos de ejemplo - más adelante se implementará la funcionalidad real
    return [
      {
        eventosGuardados: 950,
        eventosEnviados: 890,
        totalAlarmas: 3,
        bateriaActual: 72
      },
      {
        eventosGuardados: 750,
        eventosEnviados: 710,
        totalAlarmas: 1,
        bateriaActual: 58
      }
    ];
  }
}