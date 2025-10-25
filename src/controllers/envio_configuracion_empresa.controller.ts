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
import {EnvioConfiguracionEmpresa} from '../models';
import {EnvioConfiguracionEmpresaRepository} from '../repositories';

export class EnvioConfiguracionEmpresaController {
  constructor(
    @repository(EnvioConfiguracionEmpresaRepository)
    public envioConfiguracionEmpresaRepository : EnvioConfiguracionEmpresaRepository,
  ) {}

  @post('/envio-configuracion-empresas')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioConfiguracionEmpresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {
            title: 'NewEnvioConfiguracionEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    envioConfiguracionEmpresa: Omit<EnvioConfiguracionEmpresa, 'id'>,
  ): Promise<EnvioConfiguracionEmpresa> {
    return this.envioConfiguracionEmpresaRepository.create(envioConfiguracionEmpresa);
  }

  @get('/envio-configuracion-empresas/count')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioConfiguracionEmpresa) where?: Where<EnvioConfiguracionEmpresa>,
  ): Promise<Count> {
    const dataSource = this.envioConfiguracionEmpresaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM envio_configuracion_empresa${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio-configuracion-empresas')
  @response(200, {
    description: 'Array of EnvioConfiguracionEmpresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioConfiguracionEmpresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioConfiguracionEmpresa) filter?: Filter<EnvioConfiguracionEmpresa>,
  ): Promise<EnvioConfiguracionEmpresa[]> {
    const dataSource = this.envioConfiguracionEmpresaRepository.dataSource;
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
                          nombre,
                          valor,
                          unidadMedida,
                          fechaCreacion,
                          fechaModificacion,
                          usuarioCreacion,
                          usuarioModificacion
                     FROM envio_configuracion_empresa${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  } 

  @get('/envio-configuracion-empresas/{id}')
  @response(200, {
    description: 'EnvioConfiguracionEmpresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioConfiguracionEmpresa, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioConfiguracionEmpresa>
  ): Promise<EnvioConfiguracionEmpresa> {
    return this.envioConfiguracionEmpresaRepository.findById(id, filter);
  }

  @patch('/envio-configuracion-empresas/{id}')
  @response(204, {
    description: 'EnvioConfiguracionEmpresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioConfiguracionEmpresa, {partial: true}),
        },
      },
    })
    envioConfiguracionEmpresa: EnvioConfiguracionEmpresa,
  ): Promise<void> {
    await this.envioConfiguracionEmpresaRepository.updateById(id, envioConfiguracionEmpresa);
  }

  @del('/envio-configuracion-empresas/{id}')
  @response(204, {
    description: 'EnvioConfiguracionEmpresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioConfiguracionEmpresaRepository.deleteById(id);
  }
}