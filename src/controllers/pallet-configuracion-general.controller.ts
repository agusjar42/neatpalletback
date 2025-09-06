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
import {PalletConfiguracionGeneral} from '../models';
import {PalletConfiguracionGeneralRepository} from '../repositories';

export class PalletConfiguracionGeneralController {
  constructor(
    @repository(PalletConfiguracionGeneralRepository)
    public palletConfiguracionGeneralRepository : PalletConfiguracionGeneralRepository,
  ) {}

  @post('/pallet-configuracion-generales')
  @response(200, {
    description: 'PalletConfiguracionGeneral model instance',
    content: {'application/json': {schema: getModelSchemaRef(PalletConfiguracionGeneral)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracionGeneral, {
            title: 'NewPalletConfiguracionGeneral',
            exclude: ['id'],
          }),
        },
      },
    })
    palletConfiguracionGeneral: Omit<PalletConfiguracionGeneral, 'id'>,
  ): Promise<PalletConfiguracionGeneral> {
    return this.palletConfiguracionGeneralRepository.create(palletConfiguracionGeneral);
  }

  @get('/pallet-configuracion-generales/count')
  @response(200, {
    description: 'PalletConfiguracionGeneral model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PalletConfiguracionGeneral) where?: Where<PalletConfiguracionGeneral>,
  ): Promise<Count> {
    return this.palletConfiguracionGeneralRepository.count(where);
  }

  @get('/pallet-configuracion-generales')
  @response(200, {
    description: 'Array of PalletConfiguracionGeneral model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletConfiguracionGeneral, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PalletConfiguracionGeneral) filter?: Filter<PalletConfiguracionGeneral>,
  ): Promise<PalletConfiguracionGeneral[]> {
    return this.palletConfiguracionGeneralRepository.find(filter);
  }

  @patch('/pallet-configuracion-generales')
  @response(200, {
    description: 'PalletConfiguracionGeneral PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracionGeneral, {partial: true}),
        },
      },
    })
    palletConfiguracionGeneral: PalletConfiguracionGeneral,
    @param.where(PalletConfiguracionGeneral) where?: Where<PalletConfiguracionGeneral>,
  ): Promise<Count> {
    return this.palletConfiguracionGeneralRepository.updateAll(palletConfiguracionGeneral, where);
  }

  @get('/pallet-configuracion-generales/{id}')
  @response(200, {
    description: 'PalletConfiguracionGeneral model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PalletConfiguracionGeneral, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PalletConfiguracionGeneral, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletConfiguracionGeneral>
  ): Promise<PalletConfiguracionGeneral> {
    return this.palletConfiguracionGeneralRepository.findById(id, filter);
  }

  @patch('/pallet-configuracion-generales/{id}')
  @response(204, {
    description: 'PalletConfiguracionGeneral PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletConfiguracionGeneral, {partial: true}),
        },
      },
    })
    palletConfiguracionGeneral: PalletConfiguracionGeneral,
  ): Promise<void> {
    await this.palletConfiguracionGeneralRepository.updateById(id, palletConfiguracionGeneral);
  }

  @put('/pallet-configuracion-generales/{id}')
  @response(204, {
    description: 'PalletConfiguracionGeneral PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() palletConfiguracionGeneral: PalletConfiguracionGeneral,
  ): Promise<void> {
    await this.palletConfiguracionGeneralRepository.replaceById(id, palletConfiguracionGeneral);
  }

  @del('/pallet-configuracion-generales/{id}')
  @response(204, {
    description: 'PalletConfiguracionGeneral DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletConfiguracionGeneralRepository.deleteById(id);
  }
}