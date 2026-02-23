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
import {EnvioPalletMovimiento} from '../models';
import {EnvioPalletMovimientoRepository} from '../repositories';
import { ImageService } from '../services/image.service';
import { ImageProcessingService } from '../services/procesarImagenesBase64.service';
import { service } from '@loopback/core';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class EnvioPalletMovimientoController {
  constructor(
    @repository(EnvioPalletMovimientoRepository)
    public envioPalletMovimientoRepository : EnvioPalletMovimientoRepository,
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
    description: 'EnvioPalletMovimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(EnvioPalletMovimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPalletMovimiento, {
            title: 'NewEnvioPalletMovimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    envioPalletMovimiento: Omit<EnvioPalletMovimiento, 'id'>,
  ): Promise<EnvioPalletMovimiento> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(envioPalletMovimiento, this.imageConfigs);
    return this.envioPalletMovimientoRepository.create(dataProcesada);
  }

  @get('/envio-movimientos/count')
  @response(200, {
    description: 'EnvioPalletMovimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EnvioPalletMovimiento) where?: Where<EnvioPalletMovimiento>,
  ): Promise<Count> {
    const dataSource = this.envioPalletMovimientoRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_envio_pallet_movimiento_envio_tipo_sensor', where);
  }

  @get('/envio-movimientos')
  @response(200, {
    description: 'Array of EnvioPalletMovimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EnvioPalletMovimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EnvioPalletMovimiento) filter?: Filter<EnvioPalletMovimiento>,
  ): Promise<EnvioPalletMovimiento[]> {
    const dataSource = this.envioPalletMovimientoRepository.dataSource;
    const registros = await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_envio_pallet_movimiento_envio_tipo_sensor', filter, '*, DATE_FORMAT(fecha, \'%d/%m/%Y %H:%i\') AS fechaEspanol');
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
    description: 'EnvioPalletMovimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EnvioPalletMovimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EnvioPalletMovimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<EnvioPalletMovimiento>
  ): Promise<EnvioPalletMovimiento> {
    const registro = await this.envioPalletMovimientoRepository.findById(id, filter);
    //
    // Procesar URLs de imágenes para el registro individual
    //
    const registroProcesado = Object.assign(
      new EnvioPalletMovimiento(),
      registro,
      {
        imagen: this.imageService.procesarUrlImagen(registro.imagen)
      }
    );
    return registroProcesado;

  }

  @patch('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioPalletMovimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EnvioPalletMovimiento, {partial: true}),
        },
      },
    })
    envioPalletMovimiento: EnvioPalletMovimiento,
  ): Promise<void> {
    //
    // Procesa las imágenes y crea el registro
    //
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(envioPalletMovimiento, this.imageConfigs);
    await this.envioPalletMovimientoRepository.updateById(id, dataProcesada);
  }

  @del('/envio-movimientos/{id}')
  @response(204, {
    description: 'EnvioPalletMovimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioPalletMovimientoRepository.deleteById(id);
  }
}
