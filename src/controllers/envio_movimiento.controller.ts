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
import {EnvioMovimiento} from '../models';
import {EnvioMovimientoRepository} from '../repositories';
import { ImageService } from '../services/image.service';
import { ImageProcessingService } from '../services/procesarImagenesBase64.service';
import { service } from '@loopback/core';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class EnvioMovimientoController {
  constructor(
    @repository(EnvioMovimientoRepository)
    public envioMovimientoRepository : EnvioMovimientoRepository,
    @service(ImageService) private imageService: ImageService,
    @service(ImageProcessingService) private imageProcessingService: ImageProcessingService,
  ) {}

  //
  // Configuración de imágenes para este controlador
  //
  private readonly imageConfigs = [
    {
      base64Field: 'imagenBase64',
      typeField: 'imagenTipo',
      nameField: 'imagenNombre',
      outputField: 'imagen',
      folder: 'envio-contenido'
    }
  ];

  @post('/envio-movimientos')
  @response(200, {
    description: 'EnvioMovimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioMovimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioMovimiento, {
            title: 'NewEnvioMovimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    envioMovimiento: Omit<EnvioMovimiento, 'id'>,
  ): Promise<EnvioMovimiento> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(envioMovimiento, this.imageConfigs);
    return this.envioMovimientoRepository.create(dataProcesada);
  }

  @get('/envio-movimientos/count')
  @response(200, {
    description: 'EnvioMovimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioMovimiento) where?: Where<EnvioMovimiento>,
  ): Promise<Count> {
    const dataSource = this.envioMovimientoRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_movimiento_envio_tipo_sensor', where);
  }

  @get('/envio-movimientos')
  @response(200, {
    description: 'Array of EnvioMovimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioMovimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioMovimiento) filter?: Filter<EnvioMovimiento>,
  ): Promise<EnvioMovimiento[]> {
    const dataSource = this.envioMovimientoRepository.dataSource;
    const registros = await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_movimiento_envio_tipo_sensor', filter, '*, DATE_FORMAT(fecha, \'%d/%m/%Y\') AS fechaEspanol');
    //
    // Procesar URLs de imágenes en los resultados
    //
    const registrosProcesados = registros.map((registro: any) => {
      return {
        ...registro,
        imagen: this.imageService.procesarUrlImagen(registro.imagen)
      };
    });
    return registrosProcesados;
  }

  @get('/envio-movimientos/{id}')
  @response(200, {
    description: 'EnvioMovimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioMovimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioMovimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioMovimiento>
  ): Promise<EnvioMovimiento> {
    const registro = await this.envioMovimientoRepository.findById(id, filter);
    //
    // Procesar URLs de imágenes para el registro individual
    //
    const registroProcesado = Object.assign(
      new EnvioMovimiento(),
      registro,
      {
        imaggen: this.imageService.procesarUrlImagen(registro.imagen)
      }
    );
    return registroProcesado;

  }

  @patch('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioMovimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioMovimiento, {partial: true}),
        },
      },
    })
    envioMovimiento: EnvioMovimiento,
  ): Promise<void> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(envioMovimiento, this.imageConfigs);
    await this.envioMovimientoRepository.updateById(id, dataProcesada);
  }

  @del('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioMovimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioMovimientoRepository.deleteById(id);
  }
}