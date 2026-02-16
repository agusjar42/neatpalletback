import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  IsolationLevel,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import { Empresa, Permiso, Rol, Usuario } from '../models';
import { EmpresaConImagenesDto } from '../models/empresa-con-imagenes.dto';
import { EmpresaRepository, PermisoRepository, RolRepository, UsuarioRepository } from '../repositories';
import { CompruebaImagenController } from './compruebaImagen.controller';
import { inject, service } from '@loopback/core';
import path, { join } from 'path';
import { log } from 'console';
import { promises as fs } from 'fs';
import { ImageService } from '../services/image.service';
import { ImageProcessingService } from '../services/procesarImagenesBase64.service';

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { SqlFilterUtil } from '../utils/sql-filter.util';
import { PasswordHasherBindings } from '../keys';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
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
    @repository(PermisoRepository) public permisoRepository: PermisoRepository,
    @repository(RolRepository) public rolRepository: RolRepository,
    @repository(UsuarioRepository) public usuarioRepository: UsuarioRepository,
    @inject('services.CompruebaImagenController') public compruebaImagenController: CompruebaImagenController,
    @service(ImageService) private imageService: ImageService,
    @service(ImageProcessingService) private imageProcessingService: ImageProcessingService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
  ) { }

  //
  // Configuración de imágenes para este controlador
  //
  private readonly imageConfigs = [
    {
      base64Field: 'imagenBase64',
      typeField: 'imagenTipo',
      nameField: 'imagenNombre',
      outputField: 'imagen',
      folder: 'empresa'
    },
    {
      base64Field: 'logoBase64',
      typeField: 'logoTipo',
      nameField: 'logoNombre',
      outputField: 'logo',
      folder: 'empresa'
    }
  ];

  /**
   * Función helper para procesar imágenes y separar datos
   */
  private async procesarEmpresaConImagenes(empresaDto: EmpresaConImagenesDto): Promise<Empresa> {
    // Procesar imágenes si existen
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(empresaDto, this.imageConfigs);
    
    // Extraer solo los datos de la empresa (sin campos temporales)
    const empresa = empresaDto.toEmpresa();
    
    // Agregar las imágenes procesadas
    if (dataProcesada.imagen) {
      empresa.imagen = dataProcesada.imagen;
    }
    if (dataProcesada.logo) {
      empresa.logo = dataProcesada.logo;
    }
    
    return empresa;
  }

  @post('/empresas')
  @response(200, {
    description: 'Empresa model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Empresa) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'NewEmpresa',
            properties: {
              // Propiedades de Empresa (excluyendo id)
              codigo: {type: 'string'},
              nombre: {type: 'string'},
              descripcion: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              servicio: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              tiempoInactividad: {type: 'number'},
              imagen: {type: 'string'},
              logo: {type: 'string'},
              // Propiedades temporales para imágenes
              imagenBase64: {type: 'string'},
              imagenNombre: {type: 'string'},
              imagenTipo: {type: 'string'},
              logoBase64: {type: 'string'},
              logoNombre: {type: 'string'},
              logoTipo: {type: 'string'},
              // Datos opcionales para usuario por defecto
              usuarioNombre: {type: 'string'},
              usuarioMail: {type: 'string'},
              usuarioPassword: {type: 'string'},
              usuarioIdiomaId: {type: 'number'},
            },
          },
        },
      },
	    })
	    empresaData: any,
	  ): Promise<Empresa> {
	    const {usuarioNombre, usuarioMail, usuarioPassword, usuarioIdiomaId, ...empresaPayload} = empresaData ?? {};
	    const empresaDto = new EmpresaConImagenesDto(empresaPayload);
	    const empresa = await this.procesarEmpresaConImagenes(empresaDto);

	    const mail = usuarioMail ?? empresaPayload?.email;
	    const idiomaId = Number.isFinite(usuarioIdiomaId) ? Number(usuarioIdiomaId) : 1;
	    const nombre = usuarioNombre ?? 'Administrador';

	    const tx = await this.empresaRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);
	    try {
	      const empresaCreada = await this.empresaRepository.create(empresa, {transaction: tx});

        const existingUser = await this.usuarioRepository.findOne({where: {mail}}, {transaction: tx});
        if (existingUser) {
          throw new HttpErrors.UnprocessableEntity(`Ya existe una cuenta de usuario vinculada a este mail: ${mail}`);
        }

        let rolAdmin = await this.rolRepository.findOne(
          {where: {empresaId: empresaCreada.id as number, nombre: 'Administrador'}},
          {transaction: tx},
        );

	        if (!rolAdmin) {
	          rolAdmin = await this.rolRepository.create(
	            {
	              empresaId: empresaCreada.id as number,
	              nombre: 'Administrador',
	              activoSn: 'S',
	              muestraEmpresa: 'S',
	              usuCreacion: empresaCreada.usuCreacion,
                dashboardUrl: '/usuarios/',
                orden: 1,
	            } as Rol,
	            {transaction: tx},
	          );
	        }

	        const permisosDestino = await this.permisoRepository.count({rolId: rolAdmin.id as number}, {transaction: tx});
	        if (permisosDestino.count === 0) {
	          const permisosOrigen = await this.permisoRepository.find({where: {rolId: 1}}, {transaction: tx});
	          const permisosClonados = permisosOrigen.map((p) => {
	            const {id, rolId, ...rest} = p;
	            return {
	              ...rest,
	              rolId: rolAdmin!.id as number,
	              usuCreacion: (rest as any).usuCreacion ?? empresaCreada.usuCreacion,
	            } as Omit<Permiso, 'id'>;
	          });
	          if (permisosClonados.length > 0) {
	            await this.permisoRepository.createAll(permisosClonados, {transaction: tx});
	          }
	        }

	        const usuarioCreado = await this.usuarioRepository.create(
	          {
	            empresaId: empresaCreada.id as number,
	            rolId: rolAdmin.id as number,
            idiomaId,
            nombre,
            mail,
            activoSn: 'S',
          } as Usuario,
          {transaction: tx},
        );

      const hashedPassword = await this.passwordHasher.hashPassword('123456');
        await this.usuarioRepository
          .userCredentials(usuarioCreado.id as number)
          .create({password: hashedPassword}, {transaction: tx});

	      await tx.commit();
	      return empresaCreada;
	    } catch (err) {
	      await tx.rollback();
	      throw err;
	    }
	  }

  @get('/empresas/count')
  @response(200, {
    description: 'Empresa model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    const dataSource = this.empresaRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'empresa', where);    
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
    try{
      const dataSource = this.empresaRepository.dataSource;
      const camposSelect = "*"
      const registros = await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'empresa', filter, camposSelect);
      //
      // Procesar URLs de imágenes en los resultados
      //
      const registrosProcesados = registros.map((registro: any) => {
        return {
          ...registro,
          imagen: this.imageService.procesarUrlImagen(registro.imagen),
          logo: this.imageService.procesarUrlImagen(registro.logo)
        };
      });
      return registrosProcesados;
  
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      throw new HttpErrors.BadRequest('Error al aplicar filtros.');
    }
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
          schema: {
            type: 'object',
            title: 'EmpresaPartial',
            properties: {
              // Propiedades de Empresa (todas opcionales para update)
              codigo: {type: 'string'},
              nombre: {type: 'string'},
              descripcion: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              servicio: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              tiempoInactividad: {type: 'number'},
              imagen: {type: 'string'},
              logo: {type: 'string'},
              // Propiedades temporales para imágenes
              imagenBase64: {type: 'string'},
              imagenNombre: {type: 'string'},
              imagenTipo: {type: 'string'},
              logoBase64: {type: 'string'},
              logoNombre: {type: 'string'},
              logoTipo: {type: 'string'},
            },
          },
        },
      },
    })
    empresaData: any,
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    const empresaDto = new EmpresaConImagenesDto(empresaData);
    const empresa = await this.procesarEmpresaConImagenes(empresaDto);
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
    const registro = await this.empresaRepository.findById(id, filter);
    //
    // Procesar URLs de imágenes para el registro individual
    //
    const registroProcesado = Object.assign(
      new Empresa(),
      registro,
      {
        imagen: this.imageService.procesarUrlImagen(registro.imagen),
        logo: this.imageService.procesarUrlImagen(registro.logo)
      }
    );
    return registroProcesado;

  }

  @del('/empresas/{id}')
  @response(204, {
    description: 'Empresa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
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
          schema: {
            type: 'object',
            title: 'EmpresaPartial',
            properties: {
              // Propiedades de Empresa (todas opcionales para update)
              codigo: {type: 'string'},
              nombre: {type: 'string'},
              descripcion: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              servicio: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              tiempoInactividad: {type: 'number'},
              imagen: {type: 'string'},
              logo: {type: 'string'},
              // Propiedades temporales para imágenes
              imagenBase64: {type: 'string'},
              imagenNombre: {type: 'string'},
              imagenTipo: {type: 'string'},
              logoBase64: {type: 'string'},
              logoNombre: {type: 'string'},
              logoTipo: {type: 'string'},
            },
          },
        },
      },
    })
    empresaData: any,
  ): Promise<void> {
    const empresaDto = new EmpresaConImagenesDto(empresaData);
    const empresa = await this.procesarEmpresaConImagenes(empresaDto);
    await this.empresaRepository.updateById(id, empresa);
  }

  @put('/empresas/{id}')
  @response(204, {
    description: 'Empresa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'Empresa',
            properties: {
              // Propiedades de Empresa
              codigo: {type: 'string'},
              nombre: {type: 'string'},
              descripcion: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              servicio: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              tiempoInactividad: {type: 'number'},
              imagen: {type: 'string'},
              logo: {type: 'string'},
              // Propiedades temporales para imágenes
              imagenBase64: {type: 'string'},
              imagenNombre: {type: 'string'},
              imagenTipo: {type: 'string'},
              logoBase64: {type: 'string'},
              logoNombre: {type: 'string'},
              logoTipo: {type: 'string'},
            },
          },
        },
      },
    })
    empresaData: any,
  ): Promise<void> {
    const empresaDto = new EmpresaConImagenesDto(empresaData);
    const empresa = await this.procesarEmpresaConImagenes(empresaDto);
    await this.empresaRepository.replaceById(id, empresa);
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
      return '/multimedia/sistemaNP/imagen-no-disponible.jpeg';
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
          registroConLogoMiniatura.logoMiniatura = '/multimedia/sistemaNP/imagen-no-disponible.jpeg';
        }
      } else {
        registroConLogoMiniatura.logo = '/multimedia/sistemaNP/imagen-no-disponible.jpeg';
        registroConLogoMiniatura.logoMiniatura = '/multimedia/sistemaNP/imagen-no-disponible.jpeg';
      }
      return registroConLogoMiniatura;
    }));
    //
    //Devolvemos los datos
    //
    return registrosTratados;
  }

}
