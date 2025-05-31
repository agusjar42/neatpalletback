import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import { Empresa } from '../models';
import { EmpresaRepository } from '../repositories';
import { CompruebaImagenController } from './compruebaImagen.controller';
import { inject } from '@loopback/core';
import path, { join } from 'path';
import { log } from 'console';
import { promises as fs } from 'fs';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
//
//Cambiamos el modelo por defecto de la bbdd para añadir el campo calculado AlergiaConMiniatura
//
interface EmpresaConImagenMiniatura extends Empresa {
  imagenMiniatura?: string;
}
interface EmpresaConLogoMiniatura extends EmpresaConImagenMiniatura {
  logoMiniatura?: string;
}

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class EmpresaController {
  constructor(
    @repository(EmpresaRepository) public empresaRepository: EmpresaRepository,
    @inject('services.CompruebaImagenController') public compruebaImagenController: CompruebaImagenController,
  ) { }

  @post('/empresas')
  @response(200, {
    description: 'Empresa model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Empresa) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.empresaRepository.create(empresa);
  }

  @get('/empresas/count')
  @response(200, {
    description: 'Empresa model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.count(where);
  }

  @get('/empresas')
  @response(200, {
    description: 'Array of Empresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empresa, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Empresa) filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    //
    // Recuperamos los registros y llamamos a la función procesaRegistrosConImagenMiniatura que nos incluye las imagenMiniatura en la consulta
    //
    const registros = await this.empresaRepository.find(filter);
    return registros
  }

  @patch('/empresas')
  @response(200, {
    description: 'Empresa PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, { partial: true }),
        },
      },
    })
    empresa: Empresa,
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.updateAll(empresa, where);
  }

  @get('/empresas/{id}')
  @response(200, {
    description: 'Empresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empresa, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Empresa, { exclude: 'where' }) filter?: FilterExcludingWhere<Empresa>
  ): Promise<Empresa> {
    //
    // Recuperamos el registro y llamamos a la función procesaRegistrosConImagenMiniatura que nos incluye las imagenMiniatura en la consulta
    //
    const registroFind = await this.empresaRepository.findById(id, filter);
    return registroFind;

  }

  @del('/empresas/{id}')
  @response(204, {
    description: 'Empresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      const dataSource = this.empresaRepository.dataSource;
      // Borrar las imagenes de empresa
      let query = `DELETE FROM archivo WHERE id_tabla = ${id}`;
      await dataSource.execute(query);
      //Borra la empresa
      await this.empresaRepository.deleteById(id);
    } catch (e) {
      if (e.errno === 1451) {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro porque tiene otros registros relacionados.');
      } else {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro.');
      }
    }
  }

  @patch('/empresas/{id}')
  @response(204, {
    description: 'Empresa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, { partial: true }),
        },
      },
    })
    empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.updateById(id, empresa);
  }

  @put('/empresas/{id}')
  @response(204, {
    description: 'Empresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.replaceById(id, empresa);
  }

  @get('/vistaEmpresaMoneda')
  @response(200, {
    description: 'Devuelve empresas y su moneda',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaMoneda(@param.filter(Empresa) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.empresaRepository.dataSource;
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
    const query = `SELECT * FROM vista_empresa_moneda${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  };

  @get('/vistaEmpresaMonedaCount')
  @response(200, {
    description: 'Devuelve empresas y su moneda',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaMonedaCount(@param.where(Empresa) where?: Where<Empresa>,): Promise<Empresa[]> {
    const dataSource = this.empresaRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_empresa_moneda${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  async compruebaLogo(logo: string): Promise<string> {
    //
    //preparamos la ruta donde debe estar la imagen
    //
    const publicPath = path.resolve(__dirname, '../../public');
    const rutaLogo = join(publicPath, logo);
    //
    //Si la imagen existe la devolvemos, sino devolvemos imagen-no-disponible.jpg
    //
    try {
      await fs.access(rutaLogo);
      return logo;
    } catch (error) {
      return '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
    }
  }

  async devuelveRegistrosTratados(registros: Array<EmpresaConImagenMiniatura>): Promise<Array<EmpresaConLogoMiniatura>> {
    //
    // Tratar cada registro en un bucle
    //
    const registrosTratados = await Promise.all(registros.map(async (registro) => {
      //
      //Añadimos el campo imagenMiniatura al objeto que vamos a devolver
      //
      const registroConLogoMiniatura: EmpresaConLogoMiniatura = {
        ...registro,
        logoMiniatura: '',
        getId: registro.getId,
        getIdObject: registro.getIdObject,
        toJSON: registro.toJSON,
        toObject: registro.toObject,
      };
      //
      // Si el campo imagen está relleno comprobamos que exista en la carpeta, sino devolvemos imágen no disponible
      //
      if (registroConLogoMiniatura.logo) {
        registroConLogoMiniatura.logo = await this.compruebaLogo(registroConLogoMiniatura.logo);
        //
        // Si he encontrado la imagen añadimos el campo logoMiniatura con la ruta de la imagen miniatura
        //
        if (registroConLogoMiniatura.logo.indexOf('imagen-no-disponible.jpeg') < 0) {
          const miniatura = registroConLogoMiniatura.logo.lastIndexOf('/');
          registroConLogoMiniatura.logoMiniatura = registroConLogoMiniatura.logo.slice(0, miniatura + 1) + "1250x850_" + registroConLogoMiniatura.logo.slice(miniatura + 1);
        } else {
          //
          // Si no existía la imagen añadimos el campo logoMiniatura pero con la ruta de imagen-no-disponible
          //
          registroConLogoMiniatura.logoMiniatura = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
        }
      } else {
        registroConLogoMiniatura.logo = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
        registroConLogoMiniatura.logoMiniatura = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
      }
      return registroConLogoMiniatura;
    }));
    //
    //Devolvemos los datos
    //
    return registrosTratados;
  }

}
