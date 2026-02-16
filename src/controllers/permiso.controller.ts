import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import {Permiso, Rol} from '../models';
import {PermisoRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class PermisoController {
  constructor(
    @repository(PermisoRepository)
    public permisoRepository : PermisoRepository,
  ) {}

  @post('/permisos')
  @response(200, {
    description: 'Permiso model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permiso)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {
            title: 'NewPermiso',
            exclude: ['id'],
          }),
        },
      },
    })
    permiso: Omit<Permiso, 'id'>,
  ): Promise<Permiso> {
    return this.permisoRepository.create(permiso);
  }

  @get('/permisos/count')
  @response(200, {
    description: 'Permiso model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permiso) where?: Where<Permiso>,
  ): Promise<Count> {
    const dataSource = this.permisoRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'permiso', where);
  }

  @get('/permisos')
  @response(200, {
    description: 'Array of Permiso model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permiso, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permiso) filter?: Filter<Permiso>,
  ): Promise<Permiso[]> {
    const dataSource = this.permisoRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'permiso', filter, camposSelect);
  }

  @patch('/permisos')
  @response(200, {
    description: 'Permiso PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {partial: true}),
        },
      },
    })
    permiso: Permiso,
    @param.where(Permiso) where?: Where<Permiso>,
  ): Promise<Count> {
    return this.permisoRepository.updateAll(permiso, where);
  }

  @get('/permisos/{id}')
  @response(200, {
    description: 'Permiso model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permiso, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permiso, {exclude: 'where'}) filter?: FilterExcludingWhere<Permiso>
  ): Promise<Permiso> {
    return this.permisoRepository.findById(id, filter);
  }

  @patch('/permisos/{id}')
  @response(204, {
    description: 'Permiso PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {partial: true}),
        },
      },
    })
    permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.updateById(id, permiso);
  }

  @put('/permisos/{id}')
  @response(204, {
    description: 'Permiso PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.replaceById(id, permiso);
  }

  @del('/permisos/{id}')
  @response(204, {
    description: 'Permiso DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permisoRepository.deleteById(id);
  }

  @get('/vistaEmpresaRolPermiso')
  @response(200, {
    description: 'Devuelve empresas, roles y permisos',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaEmpresaRolPermiso(@param.filter(Permiso) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.permisoRepository.dataSource;
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
    const query = `SELECT * FROM vista_empresa_rol_permiso${filtros}`;
    const result = await dataSource.execute(query, []);
    return result;
  }

  @get('/buscarPermiso')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permiso, {includeRelations: true}),
        },
      },
    },
  })
  async buscarPermiso(
    @param.query.string('rolId') rolId: string,
    @param.query.string('modulo') modulo: string,
    @param.query.string('controlador') controlador: string,
    @param.query.string('accion') accion: string,

  ): Promise<boolean> {
    const filter: Filter<Permiso> = {
      where: {
        rolId: rolId,
        modulo: modulo,
        controlador: controlador,
        accion: accion,
      },
    };
    try {
      const count = await this.permisoRepository.count(filter.where);
      return count.count > 0;
    } catch (error) {
      console.error('Error finding roles:', error);
      throw new Error('Error finding roles');
    }
  }

  @get('/findPermisosPorRoles')
  @response(200, {
    description: 'Devuelve los permisos asociados a los roles recibidos',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permiso, { includeRelations: true }),
        },
      },
    },
  })
  async findPermisosPorRoles(
    @param.query.string('roles', {
      description: 'IDs de roles separados por coma (ej: "1,2,3") o como JSON array (ej: "[1,2,3]")',
    })
    roles?: string,
    @param.filter(Permiso) filter?: Filter<Permiso>,
  ): Promise<Permiso[]> {
    const dataSource = this.permisoRepository.dataSource;

    
    const query = `SELECT * FROM permiso WHERE rolId IN (${roles})`;

    return await dataSource.execute(query);
  }

}
