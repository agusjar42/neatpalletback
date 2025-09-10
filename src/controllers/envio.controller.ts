import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where, } from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response, } from '@loopback/rest';
import {Envio} from '../models';
import {EnvioRepository} from '../repositories';

export class EnvioController {
  constructor(
    @repository(EnvioRepository)
    public envioRepository : EnvioRepository,
  ) {}

  @post('/envio')
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
    return this.envioRepository.create(envio);
  }

  @get('/envio/count')
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
    const query = `SELECT COUNT(*) AS count FROM envio${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/envio')
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
    //return this.envioRepository.find(filter);
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
                          empresa_id AS empresaId,
                          anyo,
                          origen,
                          origen_coordenadas_gps as origenCoordenadasGps,
                          destino,
                          destino_coordenadas_gps as destinoCoordenadasGps,
                          fecha_salida AS fechaSalida,
                          fecha_llegada AS fechaLlegada,
                          paradas_previstas AS paradasPrevistas
                     FROM envio${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;

  }

  @patch('/envio')
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

  @get('/envio/{id}')
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

  @patch('/envio/{id}')
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

  @put('/envio/{id}')
  @response(204, {
    description: 'Envio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() envio: Envio,
  ): Promise<void> {
    await this.envioRepository.replaceById(id, envio);
  }

  @del('/envio/{id}')
  @response(204, {
    description: 'Envio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.envioRepository.deleteById(id);
  }
}
