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
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})


export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository : ProductoRepository,
  ) {}

  //
  //Normalizamos el campo activoSN para guardar siempre S o N
  //
  private normalizarActivoSN(valor?: unknown): string | undefined {
    if (valor === undefined || valor === null || valor === '') {
      return undefined;
    }

    if (valor === true || valor === 'S' || valor === 's' || valor === '1') {
      return 'S';
    }

    if (valor === false || valor === 'N' || valor === 'n' || valor === '0') {
      return 'N';
    }

    return String(valor).toUpperCase() === 'S' ? 'S' : 'N';
  }

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
    //
    //Normalizamos el valor activo antes de crear el registro
    //
    producto.activoSN = this.normalizarActivoSN(producto.activoSN) ?? 'S';
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
    const tableName = 'empresa_producto';
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, tableName, where);
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
    const dataSource = this.productoRepository.dataSource;
    const tableName = 'empresa_producto';
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, tableName, filter, '*');
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
    //
    //Normalizamos el valor activo antes de actualizar registros
    //
    producto.activoSN = this.normalizarActivoSN(producto.activoSN);
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
    //
    //Normalizamos el valor activo antes de actualizar el registro
    //
    producto.activoSN = this.normalizarActivoSN(producto.activoSN);
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
    //
    //Normalizamos el valor activo antes de reemplazar el registro
    //
    producto.activoSN = this.normalizarActivoSN(producto.activoSN) ?? 'S';
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
