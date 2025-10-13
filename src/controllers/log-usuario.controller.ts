import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,} from '@loopback/rest';
import {LogUsuario} from '../models';
import {LogUsuarioRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import * as fs from 'fs';
import * as path from 'path';

export class LogUsuarioController {
  constructor(
    @repository(LogUsuarioRepository)
    public logUsuarioRepository : LogUsuarioRepository,
  ) {}

  @post('/log-usuarios')
  @response(200, {
    description: 'LogUsuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(LogUsuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {
            title: 'NewLogUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    logUsuario: Omit<LogUsuario, 'id'>,
  ): Promise<LogUsuario> {
    return this.logUsuarioRepository.create(logUsuario);
  }

  @post('/log-usuarios/guardar-archivo')
  @response(200, {
    description: 'Guarda log de login incorrecto en archivo de texto',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async guardarLogEnArchivo(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              tipo: {type: 'string'},
              usuario: {type: 'string'},
              ip: {type: 'string'},
              mensaje: {type: 'string'},
            },
          },
        },
      },
    })
    logData: {tipo: string; usuario: string; ip: string; mensaje: string},
  ): Promise<{success: boolean; message: string; file?: string}> {
    try {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const dia = String(ahora.getDate()).padStart(2, '0');
      const hora = String(ahora.getHours()).padStart(2, '0');
      const minuto = String(ahora.getMinutes()).padStart(2, '0');
      const segundo = String(ahora.getSeconds()).padStart(2, '0');

      const timestamp = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
      const nombreArchivo = `login_errors_${año}_${mes}.txt`;

      // Crear directorio de logs si no existe
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, {recursive: true});
      }

      const rutaArchivo = path.join(logsDir, nombreArchivo);

      // Formatear el mensaje del log
      const lineaLog = `[${timestamp}] [IP: ${logData.ip}] ${logData.tipo.toUpperCase()} - Usuario: ${logData.usuario}${logData.mensaje ? `, Mensaje: ${logData.mensaje}` : ''}\n`;

      // Añadir el log al archivo (append)
      fs.appendFileSync(rutaArchivo, lineaLog, 'utf8');

      return {
        success: true,
        message: 'Log guardado correctamente',
        file: rutaArchivo,
      };
    } catch (error) {
      console.error('Error al guardar log:', error);
      return {
        success: false,
        message: `Error al guardar log: ${error}`,
      };
    }
  }

  @get('/log-usuarios/count')
  @response(200, {
    description: 'LogUsuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LogUsuario) where?: Where<LogUsuario>,
  ): Promise<Count> {
    return this.logUsuarioRepository.count(where);
  }

  @get('/log-usuarios')
  @response(200, {
    description: 'Array of LogUsuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LogUsuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LogUsuario) filter?: Filter<LogUsuario>,
  ): Promise<LogUsuario[]> {
    return this.logUsuarioRepository.find(filter);
  }

  @patch('/log-usuarios')
  @response(200, {
    description: 'LogUsuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {partial: true}),
        },
      },
    })
    logUsuario: LogUsuario,
    @param.where(LogUsuario) where?: Where<LogUsuario>,
  ): Promise<Count> {
    return this.logUsuarioRepository.updateAll(logUsuario, where);
  }

  @get('/log-usuarios/{id}')
  @response(200, {
    description: 'LogUsuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LogUsuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LogUsuario, {exclude: 'where'}) filter?: FilterExcludingWhere<LogUsuario>
  ): Promise<LogUsuario> {
    return this.logUsuarioRepository.findById(id, filter);
  }

  @patch('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LogUsuario, {partial: true}),
        },
      },
    })
    logUsuario: LogUsuario,
  ): Promise<void> {
    await this.logUsuarioRepository.updateById(id, logUsuario);
  }

  @put('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() logUsuario: LogUsuario,
  ): Promise<void> {
    await this.logUsuarioRepository.replaceById(id, logUsuario);
  }

  @del('/log-usuarios/{id}')
  @response(204, {
    description: 'LogUsuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.logUsuarioRepository.deleteById(id);
  }

  @get('/vistaLogUsuarioUsuario')
  @response(200, {
    description: 'Devuelve los logs de usuario con sus nombres',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaLogUsuarioUsuario(@param.filter(LogUsuario) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.logUsuarioRepository.dataSource;
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
    const query = `SELECT * FROM vista_log_usuario_usuario${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }

  @get('/vistaLogUsuarioUsuarioCount')
  @response(200, {
    description: 'Devuelve los tipos de extras y el nombre de la empresa',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async vistaLogUsuarioUsuarioCount(@param.where(LogUsuario) where?: Where<LogUsuario>,): Promise<LogUsuario[]> {
    const dataSource = this.logUsuarioRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_log_usuario_usuario${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  }
}
