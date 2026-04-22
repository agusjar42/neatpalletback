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
import {PalletParametro} from '../models';
import {PalletParametroRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class PalletParametroController {
  constructor(
    @repository(PalletParametroRepository)
    public palletParametroRepository : PalletParametroRepository,
  ) {}

  @post('/pallet-parametros')
  @response(200, {
    description: 'PalletParametro model instance',
    content: {'application/json': {schema: getModelSchemaRef(PalletParametro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletParametro, {
            title: 'NewPalletParametro',
            exclude: ['id'],
          }),
        },
      },
    })
    palletParametro: Omit<PalletParametro, 'id'>,
  ): Promise<PalletParametro> {
    return this.palletParametroRepository.create(palletParametro);
  }

  @get('/pallet-parametros/count')
  @response(200, {
    description: 'PalletParametro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PalletParametro) where?: Where<PalletParametro>,
  ): Promise<Count> {
    const dataSource = this.palletParametroRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'vista_pallet_parametro_parametro_pallet', where);
  }

  @get('/pallet-parametros')
  @response(200, {
    description: 'Array of PalletParametro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PalletParametro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PalletParametro) filter?: Filter<PalletParametro>,
  ): Promise<PalletParametro[]> {
      const dataSource = this.palletParametroRepository.dataSource;
      const camposSelect = "*, DATE_FORMAT(fechaImpresion, '%d/%m/%Y') AS fechaImpresionEspanol"
      return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_pallet_parametro_parametro_pallet', filter, camposSelect);
  }

  @get('/pallet-parametros/{id}')
  @response(200, {
    description: 'PalletParametro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PalletParametro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PalletParametro, {exclude: 'where'}) filter?: FilterExcludingWhere<PalletParametro>
  ): Promise<PalletParametro> {
    return this.palletParametroRepository.findById(id, filter);
  }

  @patch('/pallet-parametros/{id}')
  @response(204, {
    description: 'PalletParametro PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalletParametro, {partial: true}),
        },
      },
    })
    palletParametro: PalletParametro,
  ): Promise<void> {
    await this.palletParametroRepository.updateById(id, palletParametro);
  }

  @del('/pallet-parametros/{id}')
  @response(204, {
    description: 'PalletParametro DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palletParametroRepository.deleteById(id);
  }
}
