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

  //
  //Normalizamos una combinacion controlador-accion para poder compararla sin duplicados
  //
  private crearClavePermiso(controlador?: string, accion?: string): string {
    return `${controlador ?? ''}|${accion ?? ''}`;
  }

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

  @post('/permisos/actualizar-matriz')
  @response(200, {
    description: 'Actualiza permisos en bloque para un rol',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            creados: {type: 'number'},
            eliminados: {type: 'number'},
            omitidos: {type: 'number'},
          },
        },
      },
    },
  })
  async actualizarMatriz(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['rolId', 'permisos', 'marcar', 'usuId'],
            properties: {
              rolId: {type: 'number'},
              rolNombre: {type: 'string'},
              marcar: {type: 'boolean'},
              usuId: {type: 'number'},
              permisos: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['controlador', 'accion'],
                  properties: {
                    controlador: {type: 'string'},
                    accion: {type: 'string'},
                  },
                },
              },
            },
          },
        },
      },
    })
    cuerpo: {
      rolId: number;
      rolNombre?: string;
      marcar: boolean;
      usuId: number;
      permisos: Array<{controlador: string; accion: string;}>;
    },
  ): Promise<{creados: number; eliminados: number; omitidos: number;}> {
    //
    //Validamos los datos minimos para evitar operaciones peligrosas
    //
    if (!cuerpo?.rolId || !Array.isArray(cuerpo?.permisos) || cuerpo.permisos.length === 0) {
      throw new HttpErrors.UnprocessableEntity('No se recibieron permisos validos para actualizar');
    }

    //
    //Protegemos el rol de sistemas igual que ya hace el frontend en el borrado individual
    //
    if (!cuerpo.marcar && cuerpo.rolNombre === 'Sistemas') {
      throw new HttpErrors.UnprocessableEntity('No se puede eliminar permisos del rol de Sistemas');
    }

    //
    //Eliminamos permisos repetidos y descartamos combinaciones incompletas
    //
    const permisosNormalizados = cuerpo.permisos.reduce((acumulado, permiso) => {
      if (!permiso?.controlador || !permiso?.accion) {
        return acumulado;
      }

      const clave = this.crearClavePermiso(permiso.controlador, permiso.accion);
      if (!acumulado.mapa.has(clave)) {
        acumulado.mapa.add(clave);
        acumulado.lista.push({
          controlador: permiso.controlador,
          accion: permiso.accion,
        });
      }

      return acumulado;
    }, {
      mapa: new Set<string>(),
      lista: [] as Array<{controlador: string; accion: string;}>,
    }).lista;

    //
    //Leemos solo los permisos existentes del rol para las combinaciones afectadas
    //
    const whereExistentes: Where<Permiso> = {
      rolId: cuerpo.rolId,
      modulo: 'Neatpallet',
      or: permisosNormalizados.map((permiso) => ({
        controlador: permiso.controlador,
        accion: permiso.accion,
      })),
    };

    const permisosExistentes = await this.permisoRepository.find({where: whereExistentes});
    const permisosExistentesMap = new Map(
      permisosExistentes.map((permiso) => [
        this.crearClavePermiso(permiso.controlador, permiso.accion),
        permiso,
      ]),
    );

    //
    //Si hay que marcar, insertamos solo lo que falte
    //
    if (cuerpo.marcar) {
      const permisosCrear = permisosNormalizados
        .filter((permiso) => !permisosExistentesMap.has(this.crearClavePermiso(permiso.controlador, permiso.accion)))
        .map((permiso) => ({
          rolId: cuerpo.rolId,
          modulo: 'Neatpallet',
          controlador: permiso.controlador,
          accion: permiso.accion,
          usuCreacion: cuerpo.usuId,
        }));

      if (permisosCrear.length > 0) {
        await this.permisoRepository.createAll(permisosCrear);
      }

      return {
        creados: permisosCrear.length,
        eliminados: 0,
        omitidos: permisosNormalizados.length - permisosCrear.length,
      };
    }

    //
    //Si hay que desmarcar, borramos solo los ids existentes en una unica operacion
    //
    const idsEliminar = permisosExistentes
      .map((permiso) => permiso.id)
      .filter((id): id is number => typeof id === 'number');

    if (idsEliminar.length > 0) {
      await this.permisoRepository.deleteAll({
        id: {
          inq: idsEliminar,
        },
      });
    }

    return {
      creados: 0,
      eliminados: idsEliminar.length,
      omitidos: permisosNormalizados.length - idsEliminar.length,
    };
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
    try {
      await this.permisoRepository.deleteById(id);
    } catch (error) {
      console.error('Error deleting permiso:', error);
      throw new Error('Error deleting permiso');
    }
  }

  @get('/vistaEmpresaRolPermiso')
  @response(200, {
    description: 'Devuelve empresas, roles y permisos',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaEmpresaRolPermiso(@param.filter(Permiso) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.permisoRepository.dataSource;
    const camposSelect = "*"
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'vista_empresa_rol_permiso', filter, camposSelect);
  }

  @get('/buscarPermiso')
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
