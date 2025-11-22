import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import { Rol } from '../models';
import { RolRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class RolController {
  constructor(
    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) { }

  @post('/roles')
  @response(200, {
    description: 'Rol model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Rol) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRol',
            exclude: ['id'],
          }),
        },
      },
    })
    rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  @get('/roles/count')
  @response(200, {
    description: 'Rol model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Rol) where?: Where<Rol>,
  ): Promise<Count> {
    const dataSource = this.rolRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'rol', where);
  }

  @get('/roles')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Rol) filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    const dataSource = this.rolRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'rol', filter, camposSelect);
  }

  @patch('/roles')
  @response(200, {
    description: 'Rol PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, { partial: true }),
        },
      },
    })
    rol: Rol,
    @param.where(Rol) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.updateAll(rol, where);
  }

  @get('/roles/{id}')
  @response(200, {
    description: 'Rol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rol, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rol, { exclude: 'where' }) filter?: FilterExcludingWhere<Rol>
  ): Promise<Rol> {
    return this.rolRepository.findById(id, filter);
  }

  @patch('/roles/{id}')
  @response(204, {
    description: 'Rol PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, { partial: true }),
        },
      },
    })
    rol: Rol,
  ): Promise<void> {
    await this.rolRepository.updateById(id, rol);
  }

  @put('/roles/{id}')
  @response(204, {
    description: 'Rol PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rol: Rol,
  ): Promise<void> {
    await this.rolRepository.replaceById(id, rol);
  }

  @del('/roles/{id}')
  @response(204, {
    description: 'Rol DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolRepository.deleteById(id);
  }

  @get('/vistaEmpresaRol')
  @response(200, {
    description: 'Devuelve empresas, roles',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaRol(@param.filter(Rol) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.rolRepository.dataSource;
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
    const query = `SELECT * FROM vista_empresa_rol${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/vistaEmpresaRolCount')
  @response(200, {
    description: 'Devuelve los roles y su nombre de empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaRolCount(@param.where(Rol) where?: Where<Rol>,): Promise<Rol[]> {
    const dataSource = this.rolRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_empresa_rol${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/buscarIdRol')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, { includeRelations: true }),
        },
      },
    },
  })
  async buscarIdRol(
    @param.query.string('nombre') nombre: string,
    @param.query.number('empresaId') empresaId: number,
  ): Promise<Rol[]> {
    const filter: Filter<Rol> = {
      where: {
        nombre: nombre,
        empresaId: empresaId
      },
    };
    try {
      return await this.rolRepository.find(filter);
    } catch (error) {
      console.error('Error finding roles:', error);
      throw new Error('Error finding roles');
    }
  }
}
