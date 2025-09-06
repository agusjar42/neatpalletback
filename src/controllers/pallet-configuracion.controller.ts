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
import {PalletConfiguracion} from '../models';
import {PalletConfiguracionRepository} from '../repositories';

export class PalletConfiguracionController {
  constructor(
    @repository(PalletConfiguracionRepository)
    public palletConfiguracionRepository : PalletConfiguracionRepository,
  ) {}

  @post('/pallet-configuraciones')
  @response(200, {
    description: 'PalletConfiguracion model instance',
    content: {'application/json': {schema: getModelSchemaRef(PalletConfiguracion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracion, {
            title: 'NewPalletConfiguracion',
            exclude: ['id'],
          }),
        },
      },
    })
    palletConfiguracion: Omit<PalletConfiguracion, 'id'>,
  ): Promise<PalletConfiguracion> {
    return this.palletConfiguracionRepository.create(palletConfiguracion);
  }

  @get('/pallet-configuraciones/count')
  @response(200, {
    description: 'PalletConfiguracion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PalletConfiguracion) where?: Where<PalletConfiguracion>,
  ): Promise<Count> {
    return this.palletConfiguracionRepository.count(where);
  }

  @get('/pallet-configuraciones')
  @response(200, {
    description: 'Array of PalletConfiguracion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletConfiguracion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PalletConfiguracion) filter?: Filter<PalletConfiguracion>,
  ): Promise<PalletConfiguracion[]> {
    return this.palletConfiguracionRepository.find(filter);
  }

  @patch('/pallet-configuraciones')
  @response(200, {
    description: 'PalletConfiguracion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracion, {partial: true}),
        },
      },
    })
    palletConfiguracion: PalletConfiguracion,
    @param.where(PalletConfiguracion) where?: Where<PalletConfiguracion>,
  ): Promise<Count> {
    return this.palletConfiguracionRepository.updateAll(palletConfiguracion, where);
  }

  @get('/pallet-configuraciones/{id}')
  @response(200, {
    description: 'PalletConfiguracion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PalletConfiguracion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PalletConfiguracion, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletConfiguracion>
  ): Promise<PalletConfiguracion> {
    return this.palletConfiguracionRepository.findById(id, filter);
  }

  @patch('/pallet-configuraciones/{id}')
  @response(204, {
    description: 'PalletConfiguracion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracion, {partial: true}),
        },
      },
    })
    palletConfiguracion: PalletConfiguracion,
  ): Promise<void> {
    await this.palletConfiguracionRepository.updateById(id, palletConfiguracion);
  }

  @put('/pallet-configuraciones/{id}')
  @response(204, {
    description: 'PalletConfiguracion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() palletConfiguracion: PalletConfiguracion,
  ): Promise<void> {
    await this.palletConfiguracionRepository.replaceById(id, palletConfiguracion);
  }

  @del('/pallet-configuraciones/{id}')
  @response(204, {
    description: 'PalletConfiguracion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletConfiguracionRepository.deleteById(id);
  }
}