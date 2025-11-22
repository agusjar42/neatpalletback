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
  HttpErrors,
} from '@loopback/rest';
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';

export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository : ProductoRepository,
  ) {}

  @post('/productos')
  @response(200, {
    description: 'Producto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Producto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.productoRepository.create(producto);
  }

  @get('/productos/count')
  @response(200, {
    description: 'Producto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    const dataSource = this.productoRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM producto${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @get('/productos')
  @response(200, {
    description: 'Array of Producto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Producto) filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    try {
      const dataSource = this.productoRepository.dataSource;
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
      const query = `SELECT *
                      FROM producto${filtros}`;
      const registros = await dataSource.execute(query);
      return registros
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      throw new HttpErrors.BadRequest('Error al aplicar filtros.');
    }
  }

  @patch('/productos')
  @response(200, {
    description: 'Producto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoRepository.updateAll(producto, where);
  }

  @get('/productos/{id}')
  @response(200, {
    description: 'Producto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Producto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Producto, {exclude: 'where'}) filter?: FilterExcludingWhere<Producto>
  ): Promise<Producto> {
    return this.productoRepository.findById(id, filter);
  }

  @patch('/productos/{id}')
  @response(204, {
    description: 'Producto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
  ): Promise<void> {
    await this.productoRepository.updateById(id, producto);
  }

  @put('/productos/{id}')
  @response(204, {
    description: 'Producto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() producto: Producto,
  ): Promise<void> {
    await this.productoRepository.replaceById(id, producto);
  }

  @del('/productos/{id}')
  @response(204, {
    description: 'Producto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoRepository.deleteById(id);
  }
}
