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
import {Envio} from '../models';
import {EnvioRepository} from '../repositories';

export class EnvioController {
  constructor(
    @repository(EnvioRepository)
    public envioRepository : EnvioRepository,
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
    const resultado =  this.envioRepository.create(envio);
    //
    //Inserto las configuraciones por defecto de la empresa
    //
    await this.insertEnvioConfiguracion(envio);

    return resultado;
    }

    /**
     * Inserta en envio_configuracion los datos de envio_configuracion_empresa para la empresa indicada.
     * @param envio El objeto Envio recién creado.
     */
    private async insertEnvioConfiguracion(envio: Omit<Envio, 'id'>): Promise<void> {
    const dataSource = this.envioRepository.dataSource;
    //
    //Primero borramos las configuraciones anteriores por si acaso
    //
    const deleteQuery = `DELETE FROM envio_configuracion WHERE envio_id = ${envio.empresaId}`;
    await dataSource.execute(deleteQuery);
    //
    //Luego insertamos las configuraciones por defecto de la empresa
    //
    const insert = `insert into envio_configuracion (envio_id, 
                                                     nombre, 
                                                     valor, 
                                                     unidad_medida, 
                                                     usuario_creacion) 
                                              SELECT ${envio.empresaId} envio_id, 
                                                     nombre, 
                                                     valor, 
                                                     unidad_medida, 
                                                     ${envio.usuarioCreacion} usuario_creacion 
                                                FROM envio_configuracion_empresa 
                                               where empresa_id = ${envio.empresaId}`;
    await dataSource.execute(insert);
  }

  @post('/crear-envio-configuracion-desde-empresa')
  @response(204, {
    description: 'Crear envío y configuración desde empresa',
  })
  async crearEnvioConfiguracionDesdeEmpresa(
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
  ): Promise<void> {
    //
    //Borro e inserto las configuraciones por defecto de la empresa
    //
    await this.insertEnvioConfiguracion(envio);
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
    //Aplicamos filtros
    let filtros = '';
    //Obtiene los filtros
    filtros += ` WHERE 1=1`
    if (where) {
      for (const [key] of Object.entries(where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true
            for (const [subKey, subValue] of Object.entries((where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    filtros += ` AND`;
                  }
                  else {
                    filtros += ` OR`;
                  }
                }
                else {
                  filtros += ' AND ('
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  filtros += ` ${subKey} = ${subValue}`;
                }
                else {
                  filtros += ` ${subKey} LIKE '%${subValue}%'`;
                }
                first = false
              }
            }
            if (!first) {
              filtros += `)`;
            }
          }
        }

      }
    }
    const query = `SELECT COUNT(*) AS count FROM vista_empresa_envio${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
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
    //Aplicamos filtros
    let filtros = '';
    //Obtiene los filtros
    filtros += ` WHERE 1=1`
    if (filter?.where) {
      for (const [key] of Object.entries(filter?.where)) {
        if (key === 'and' || key === 'or') {
          {
            let first = true
            for (const [subKey, subValue] of Object.entries((filter?.where as any)[key])) {
              if (subValue !== '' && subValue != null) {
                if (!first) {
                  if (key === 'and') {
                    filtros += ` AND`;
                  }
                  else {
                    filtros += ` OR`;
                  }
                }
                else {
                  filtros += ' AND ('
                }
                if (/^-?\d+(\.\d+)?$/.test(subValue as string)) {
                  filtros += ` ${subKey} = ${subValue}`;
                }
                else {
                  filtros += ` ${subKey} LIKE '%${subValue}%'`;
                }
                first = false
              }
            }
            if (!first) {
              filtros += `)`;
            }
          }
        }

      }
    }
    // Agregar ordenamiento
    if (filter?.order) {
      filtros += ` ORDER BY ${filter.order}`;
    }
    // Agregar paginación
    if (filter?.limit) {
      filtros += ` LIMIT ${filter?.limit}`;
    }
    if (filter?.offset) {
      filtros += ` OFFSET ${filter?.offset}`;
    }
    const query = `SELECT id, 
                          empresaId,
                          origenRuta,
                          fechaLlegada,
                          DATE_FORMAT(fechaSalida, '%d/%m/%Y') AS fechaSalidaEspanol,
                          gpsRutaOrigen,
                          destinoRuta,
                          gpsRutaDestino,
                          fechaSalida,
                          DATE_FORMAT(fechaLlegada, '%d/%m/%Y') AS fechaLlegadaEspanol,
                          paradasPrevistas,
                          codigoEmpresa, 
                          nombreEmpresa
                    FROM vista_empresa_envio${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
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
}