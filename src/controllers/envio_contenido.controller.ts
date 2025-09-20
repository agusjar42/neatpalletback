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
import {EnvioContenido} from '../models';
import {EnvioContenidoRepository} from '../repositories';
import {ImageService} from '../services/image.service';
import { ImageProcessingService } from '../services/procesarImagenesBase64.service'

export class EnvioContenidoController {
  constructor(
    @repository(EnvioContenidoRepository)
    public enviocontenidoRepository: EnvioContenidoRepository,
    @service(ImageService) private imageService: ImageService,
    @service(ImageProcessingService) private imageProcessingService: ImageProcessingService,

  ) {}
  //
  // Configuración de imágenes para este controlador
  //
  private readonly imageConfigs = [
    {
      base64Field: 'fotoProductoBase64',
      typeField: 'fotoProductoTipo',
      nameField: 'fotoProductoNombre',
      outputField: 'fotoProducto',
      folder: 'envio-contenido'
    },
    {
      base64Field: 'fotoPalletBase64',
      typeField: 'fotoPalletTipo',
      nameField: 'fotoPalletNombre',
      outputField: 'fotoPallet',
      folder: 'envio-contenido'
    }
  ];

  @post('/enviocontenido')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioContenido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {
            title: 'NewEnvioContenido',
            exclude: ['id'],
          }),
        },
      },
    })
    enviocontenido: Omit<EnvioContenido, 'id'>,
  ): Promise<EnvioContenido> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(enviocontenido, this.imageConfigs);
    return this.enviocontenidoRepository.create(dataProcesada);
  }

  @get('/enviocontenido/count')
  @response(200, {
    description: 'EnvioContenido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioContenido) where?: Where<EnvioContenido>,
  ): Promise<Count> {
    const dataSource = this.enviocontenidoRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_envio_contenido_envio${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/enviocontenido')
  @response(200, {
    description: 'Array of EnvioContenido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioContenido) filter?: Filter<EnvioContenido>,
  ): Promise<EnvioContenido[]> {
    const dataSource = this.enviocontenidoRepository.dataSource;
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
                          envioId,
                          origenRuta,
                          producto,
                          referencia,
                          pesoKgs,
                          pesoTotal,
                          medidas,
                          fotoProducto,
                          fotoPallet,
                          fechaCreacion,
                          fechaModificacion,
                          usuarioCreacion,
                          usuarioModificacion
                     FROM vista_envio_contenido_envio${filtros}`;
    const registros = await dataSource.execute(query);
    //
    // Procesar URLs de imágenes en los resultados
    //
    const registrosProcesados = registros.map((registro: any) => {
      return {
        ...registro,
        fotoProducto: this.imageService.procesarUrlImagen(registro.fotoProducto),
        fotoPallet: this.imageService.procesarUrlImagen(registro.fotoPallet)
      };
    });    
    return registrosProcesados;
  }

  @get('/enviocontenido/{id}')
  @response(200, {
    description: 'EnvioContenido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioContenido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioContenido, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioContenido>
  ): Promise<EnvioContenido> {
    const registro = await this.enviocontenidoRepository.findById(id, filter);
    //
    // Procesar URLs de imágenes para el registro individual
    //
    const registroProcesado = Object.assign(
      new EnvioContenido(),
      registro,
      {
        fotoProducto: this.imageService.procesarUrlImagen(registro.fotoProducto),
        fotoPallet: this.imageService.procesarUrlImagen(registro.fotoPallet)
      }
    );    
    return registroProcesado;
  }

  @patch('/enviocontenido/{id}')
  @response(204, {
    description: 'EnvioContenido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioContenido, {partial: true}),
        },
      },
    })
    enviocontenido: EnvioContenido,
  ): Promise<void> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(enviocontenido, this.imageConfigs);
    await this.enviocontenidoRepository.updateById(id, dataProcesada);
  }

  @del('/enviocontenido/{id}')
  @response(204, {
    description: 'EnvioContenido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enviocontenidoRepository.deleteById(id);
  }
}