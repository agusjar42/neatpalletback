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
import { Archivo } from '../models';
import { ArchivoRepository } from '../repositories';
import { CompruebaImagenController } from './compruebaImagen.controller';
import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class ArchivoController {
  constructor(
    @repository(ArchivoRepository)
    public archivoRepository: ArchivoRepository,
    @inject('services.CompruebaImagenController') public compruebaImagenController: CompruebaImagenController,
  ) { }

  @post('/archivos')
  @response(200, {
    description: 'Archivo model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Archivo) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, {
            title: 'NewArchivo',
            exclude: ['id'],
          }),
        },
      },
    })
    archivo: Omit<Archivo, 'id'>,
  ): Promise<Archivo> {
    return this.archivoRepository.create(archivo);
  }

  
  @get('/archivos/count')
  @response(200, {
    description: 'Archivo model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Archivo) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.archivoRepository.count(where);
  }

  @get('/archivos')
  @response(200, {
    description: 'Array of Archivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Archivo, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Archivo) filter?: Filter<Archivo>,
  ): Promise<Archivo[]> {
    return this.archivoRepository.find(filter);
  }

  @patch('/archivos')
  @response(200, {
    description: 'Archivo PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, { partial: true }),
        },
      },
    })
    archivo: Archivo,
    @param.where(Archivo) where?: Where<Archivo>,
  ): Promise<Count> {
    return this.archivoRepository.updateAll(archivo, where);
  }

  @get('/archivos/{id}')
  @response(200, {
    description: 'Archivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Archivo, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Archivo, { exclude: 'where' }) filter?: FilterExcludingWhere<Archivo>
  ): Promise<Archivo> {
    return this.archivoRepository.findById(id, filter);
  }

  @patch('/archivos/{id}')
  @response(204, {
    description: 'Archivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Archivo, { partial: true }),
        },
      },
    })
    archivo: Archivo,
  ): Promise<void> {
    await this.archivoRepository.updateById(id, archivo);
  }

  @put('/archivos/{id}')
  @response(204, {
    description: 'Archivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() archivo: Archivo,
  ): Promise<void> {
    await this.archivoRepository.replaceById(id, archivo);
  }

  @del('/archivos/{id}')
  @response(204, {
    description: 'Archivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      //Borra el archivo
      await this.archivoRepository.deleteById(id);
    } catch (e) {
      if (e.errno === 1451) {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro porque tiene otros registros relacionados.');
      } else {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro.');
      }
    }
  }

  @get('/vistaArchivoEmpresa')
  @response(200, {
    description: 'Devuelve archivos con su empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaArchivoEmpresa(@param.filter(Archivo) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.archivoRepository.dataSource;
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
    const query = `SELECT * FROM vista_archivo_empresa${filtros}`;
    const registros = await dataSource.execute(query);
    //Comprobamos que las imagenes existan
    for (const registro of registros) {
      registro['url'] = await this.compruebaImagenController.compruebaImagen(registro['url']);
    }
    return registros;

  };

  @get('/vistaArchivoEmpresaCount')
  @response(200, {
    description: 'Devuelve archivos con su empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaArchivoEmpresaCount(@param.where(Archivo) where?: Where<Archivo>,): Promise<Archivo[]> {
    const dataSource = this.archivoRepository.dataSource;
    //Aplicamos filtros
    let filtros = '';
    if (where !== undefined) {
      filtros += ` WHERE 1=1`
      //Obtiene los filtros
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
      const query = `SELECT COUNT(*) AS count FROM vista_archivo_empresa${filtros}`;
      const registros = await dataSource.execute(query, []);
      return registros[0];
    }
    return [];
  }
}
