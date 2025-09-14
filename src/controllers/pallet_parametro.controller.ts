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
    const query = `SELECT COUNT(*) AS count FROM pallet_parametro${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
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
                          pallet_id as palletId,
                          parametro_id as parametroId,
                          valor,
                          texto_libre as textoLibre,
                          fecha_creacion as fechaCreacion,
                          fecha_modificacion as fechaModificacion,
                          usuario_creacion as usuarioCreacion,
                          usuario_modificacion as usuarioModificacion
                     FROM pallet_parametro${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
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
