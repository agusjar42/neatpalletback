import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import { inject } from '@loopback/core';
import { Usuario, UsuarioCredenciales } from '../models';
import { UsuarioConImagenesDto } from '../models/usuario-con-imagenes.dto';
import { Credentials, EmpresaRepository, PlantillaEmailRepository, UsuarioCredencialesRepository, UsuarioRepository, UsuarioRestablecerPasswordRepository } from '../repositories';
import { UserRegisterData } from './specs/user-controller.specs';
import { validateCredentials } from '../services/validator';
import { PasswordHasherBindings, TokenServiceBindings, RefreshTokenServiceBindings, UserServiceBindings } from '../keys';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import _ from 'lodash';
import { AuthLoginObject, TokenObject } from '../types';
import { RefrescarTokenService } from '../services/refresh-token.service';
import { authenticate, TokenService, UserService } from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import path from 'path';
import nodemailer from 'nodemailer';
import { authorize } from '@loopback/authorization';
import { ImageService } from '../services/image.service';
import { ImageProcessingService } from '../services/procesarImagenesBase64.service';
import { service } from '@loopback/core';

export class UsuariosController {
  [x: string]: any;
  constructor(
    @repository(PlantillaEmailRepository)
    public plantillaEmailRepository: PlantillaEmailRepository,
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Usuario, Credentials>,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @repository(UsuarioCredencialesRepository)
    public usuarioCredencialesRepository: UsuarioCredencialesRepository,
    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public refreshService: RefrescarTokenService,
    @repository(UsuarioRestablecerPasswordRepository)
    public usuarioRestablecerPasswordRepository: UsuarioRestablecerPasswordRepository,
    @service(ImageService) private imageService: ImageService,
    @service(ImageProcessingService) private imageProcessingService: ImageProcessingService,
  ) { }

  //
  // Configuración de imágenes para este controlador
  //
  private readonly imageConfigs = [
    {
      base64Field: 'avatarBase64',
      typeField: 'avatarTipo',
      nameField: 'avatarNombre',
      outputField: 'avatar',
      folder: 'usuario'
    }
  ];

  /**
   * Función helper para procesar imágenes y separar datos
   */
  private async procesarUsuarioConImagenes(usuarioDto: UsuarioConImagenesDto): Promise<Usuario> {
    // Procesar imágenes si existen
    const dataProcesada = await this.imageProcessingService.procesarImagenesBase64(usuarioDto, this.imageConfigs);
    
    // Extraer solo los datos del usuario (sin campos temporales)
    const usuario = usuarioDto.toUsuario();
    
    // Agregar el avatar procesado
    if (dataProcesada.avatar) {
      usuario.avatar = dataProcesada.avatar;
    }
    
    return usuario;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Usuario) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'NewUsuario',
            properties: {
              // Propiedades del Usuario (excluyendo id)
              empresaId: {type: 'number'},
              rolId: {type: 'number'},
              idiomaId: {type: 'number'},
              nombre: {type: 'string'},
              mail: {type: 'string'},
              activoSn: {type: 'string'},
              telefono: {type: 'string'},
              avatar: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              fechaInactivo: {type: 'string'},
              usuInactivo: {type: 'number'},
              // Propiedades de UsuarioImagenes
              avatarBase64: {type: 'string'},
              avatarNombre: {type: 'string'},
              avatarTipo: {type: 'string'},
            },
          },
        },
      },
    })
    usuarioData: any,
  ): Promise<Usuario> {
    const usuarioDto = new UsuarioConImagenesDto(usuarioData);
    const usuario = await this.procesarUsuarioConImagenes(usuarioDto);
    return this.usuarioRepository.create(usuario);
  }

  @post('/usuarios/login')
  @response(200, {
    description: 'Login de usuario con JWT',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            expiresIn: { type: 'string' },
            refreshToken: { type: 'string' },
            userData: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'Funcion de Login',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['mail', 'password'],
            properties: {
              mail: {
                type: 'string'
              },
              password: {
                type: 'string',
              },
            },
          }
        }
      }
    }) credentials: Credentials,
  ): Promise<AuthLoginObject> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = await this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    const tokens = await this.refreshService.generateToken(
      userProfile,
      token,
    );

    // Procesar avatar URL para la respuesta del login
    const userWithAvatar = {
      ...user,
      avatar: this.imageService.procesarUrlImagen(user.avatar)
    };

    return {
      accessToken: tokens.accessToken,
      expiresIn: tokens.expiresIn ?? undefined,
      refreshToken: tokens.refreshToken ?? undefined,
      userData: userWithAvatar
    };
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @post('/usuarios/register')
  @response(200, {
    description: 'User modelo instancia',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: {
              type: 'object'
            },
            token: {
              type: 'string',
            }
          },
        }
      }
    },
  })
  async register(
    @requestBody({
      description: 'registro del perfil de usuario',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'mail',
              'password',
              'nombre',
              'empresa_id',
              'rol_id'
            ],
            properties: {
              nombre: {
                type: 'string'
              },
              mail: {
                type: 'string'
              },
              password: {
                type: 'string',
              },
              empresaId: {
                type: 'number',
              },
              rolId: {
                type: 'number',
              }
            },
          }
        }
      }
    })
    userData: UserRegisterData,
  ): Promise<Usuario> {
    const user = _.pick(userData, ['nombre', 'mail', 'password', 'empresaId', 'rolId']);
    validateCredentials(user);
    const newUser = {
      nombre: userData.nombre,
      mail: userData.mail,
      empresaId: 1,
      rolId: 1
    };
    const password = await this.passwordHasher.hashPassword(userData.password);
    const foundUser = await this.usuarioRepository.findOne({
      where: { mail: user.mail }
    });
    if (foundUser) {
      throw new HttpErrors.UnprocessableEntity(`Ya existe una cuenta de usuario vinculada a este mail: ${user.mail}`)
    }
    const saveUser = await this.usuarioRepository.create(newUser);
    await this.usuarioRepository.userCredentials(saveUser.id).create({ password });
    return saveUser;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    const registros = await this.usuarioRepository.find(filter);
    //
    // Procesar URLs de imágenes en los resultados
    //
    const registrosProcesados = registros.map((registro: any) => {
      return {
        ...registro,
        avatar: this.imageService.procesarUrlImagen(registro.avatar)
      };
    });
    return registrosProcesados;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @post('/usuarios/recuperarPassword')
  async recuperarPassword(
    @requestBody({
      description: 'Correo electrónico para restablecer contraseña',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
          },
        },
      },
    })
    body: { email: string },
  ): Promise<{ status: string; message: string }> {
    try {
      const { email } = body;

      // Generamos el código de restablecimiento
      const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000).toString();
      const expiraEn = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas desde ahora

      //Comprueba si el email existe
      const dataSource = this.usuarioRestablecerPasswordRepository.dataSource;
      let query = `SELECT * FROM usuario WHERE mail = '${email}'`;
      const registros = await dataSource.execute(query);

      if (registros.length > 0) {
        // Limpiamos los códigos de recuperacion anteriores de la BD
        query = `DELETE FROM usuario_restablecer_password WHERE email = '${email}'`;
        await dataSource.execute(query);

        // Guardamos el código de recuperación en la BD
        await this.usuarioRestablecerPasswordRepository.create({
          email,
          usuarioId: registros[0].id,
          codigoRecuperacion: codigoRecuperacion,
          expiraEn: expiraEn.toISOString(),
        });

        const nombrePlantilla = 'RecuperarContraseña'; // Nombre de la plantilla de correo a utilizar

        // Obtengo la plantilla del correo
        const dataSourcePlantillaEmail = this.plantillaEmailRepository.dataSource;
        query = `SELECT * FROM plantilla_email WHERE nombre_plantilla="${nombrePlantilla}";`;
        const plantillaRegistro = await dataSourcePlantillaEmail.execute(query);
        let htmlContent = plantillaRegistro[0]['cuerpo'];

        //Obtengo la empresa
        const dataSourceEmpresa = this.empresaRepository.dataSource;
        query = `SELECT * FROM empresa WHERE id=${plantillaRegistro[0]['empresa_id']};`;
        const empresaRegistro = await dataSourceEmpresa.execute(query);

        // Preparo la configuración para enviar el correo
        const transporter = nodemailer.createTransport({
          host: empresaRegistro[0]['servicio'],// Servidor SMTP de Outlook
          port: 587,                 // Puerto estándar para conexiones seguras con STARTTLS
          secure: false,             // false para STARTTLS
          requireTLS: true,
          auth: {
            user: empresaRegistro[0]['email'], // Dirección de correo de Outlook
            pass: empresaRegistro[0]['password'], // Contraseña
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        // Incluyo las imágenes insertadas en la plantilla
        const base64Images = htmlContent.match(/src="data:image\/[^;]+;base64[^"]+"/g) || [];
        const attachments = base64Images.map((img: { match: (arg0: RegExp) => any[]; }, index: any) => {
          const base64Data = img.match(/base64,([^"]+)/)[1];
          const cid = `image${index}@nodemailer.com`;
          htmlContent = htmlContent.replace(img, `src="cid:${cid}"`);
          return {
            filename: `image${index}.png`,
            content: base64Data,
            encoding: 'base64',
            cid: cid
          };
        });

        // Encapsula el string de htmlContent dentro de las etiquetas html <html> y <body> para que servicios de correo acepten el contenido
        htmlContent = `<html><body>${htmlContent}</body></html>`;

        // Reemplaza el marcador de posición {{codigoRecuperacion}} con el código de recuperación real
        htmlContent = htmlContent.replace('{{codigoRecuperacion}}', codigoRecuperacion);

        const publicPath = path.resolve(__dirname, '../../public');


        if (empresaRegistro[0]['email'] && empresaRegistro[0]['email'].length > 0 &&
          empresaRegistro[0]['password'] && empresaRegistro[0]['password'].length) {
          // Opciones del email
          let parametrosMail = {
            from: empresaRegistro[0]['email'],
            to: email,
            subject: plantillaRegistro[0]['titulo'],
            html: htmlContent,
            attachments: attachments
          };

          // Envio el correo
          transporter.sendMail(parametrosMail, (error, info) => {
            if (error) {
              console.error('Error al enviar el email:', error);
              // Aquí puedes implementar lógica para reintentos, notificaciones, etc.
              return;
            }
          })

          return { status: 'OK', message: 'Correo enviado con éxito.' };
        }
        else {
          return { status: 'ERROR', message: 'No se pudo enviar el correo. Por favor, intenta nuevamente.' };
        }

      }
      else {
        return { status: 'ERROR', message: 'No se encontró un usuario con el correo proporcionado.' };
      }

    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return { status: 'ERROR', message: 'No se pudo enviar el correo. Por favor, intenta nuevamente.' };
    }
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'UsuarioPartial',
            properties: {
              // Propiedades del Usuario (todas opcionales para update)
              empresaId: {type: 'number'},
              rolId: {type: 'number'},
              idiomaId: {type: 'number'},
              nombre: {type: 'string'},
              mail: {type: 'string'},
              activoSn: {type: 'string'},
              telefono: {type: 'string'},
              avatar: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              fechaInactivo: {type: 'string'},
              usuInactivo: {type: 'number'},
              // Propiedades de UsuarioImagenes
              avatarBase64: {type: 'string'},
              avatarNombre: {type: 'string'},
              avatarTipo: {type: 'string'},
            },
          },
        },
      },
    })
    usuarioData: any,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    const usuarioDto = new UsuarioConImagenesDto(usuarioData);
    const usuario = await this.procesarUsuarioConImagenes(usuarioDto);
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, { exclude: 'where' }) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    const registro = await this.usuarioRepository.findById(id, filter);
    //
    // Procesar URLs de imágenes para el registro individual
    //
    const registroProcesado = Object.assign(
      new Usuario(),
      registro,
      {
        avatar: this.imageService.procesarUrlImagen(registro.avatar)
      }
    );
    return registroProcesado;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/usuarios/validarCodigoRecuperacion/{codigoRecuperacion}')
  @response(200, {
    description: 'Código de recuperación validado',
    content: {
      'application/json': {
        schema: {
          type: 'number',
        }
      },
    },
  })
  async validarCodigoRecuperacion(
    @param.path.number('codigoRecuperacion') codigoRecuperacion: number,
  ): Promise<Number> {
    const dataSource = this.usuarioRestablecerPasswordRepository.dataSource;
    let query = `SELECT usuario_id FROM usuario_restablecer_password WHERE codigoRecuperacion = '${codigoRecuperacion}'`;
    const registros = await dataSource.execute(query);
    //Si existe el registro, devolvemos el id del usuario
    if (registros.length > 0) {
      return registros[0]['usuario_id'];
    }
    return -1;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'UsuarioPartial',
            properties: {
              // Propiedades del Usuario (todas opcionales para update)
              empresaId: {type: 'number'},
              rolId: {type: 'number'},
              idiomaId: {type: 'number'},
              nombre: {type: 'string'},
              mail: {type: 'string'},
              activoSn: {type: 'string'},
              telefono: {type: 'string'},
              avatar: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              fechaInactivo: {type: 'string'},
              usuInactivo: {type: 'number'},
              // Propiedades de UsuarioImagenes
              avatarBase64: {type: 'string'},
              avatarNombre: {type: 'string'},
              avatarTipo: {type: 'string'},
            },
          },
        },
      },
    })
    usuarioData: any,
  ): Promise<void> {
    const usuarioDto = new UsuarioConImagenesDto(usuarioData);
    const usuario = await this.procesarUsuarioConImagenes(usuarioDto);
    await this.usuarioRepository.updateById(id, usuario);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'Usuario',
            properties: {
              // Propiedades del Usuario
              empresaId: {type: 'number'},
              rolId: {type: 'number'},
              idiomaId: {type: 'number'},
              nombre: {type: 'string'},
              mail: {type: 'string'},
              activoSn: {type: 'string'},
              telefono: {type: 'string'},
              avatar: {type: 'string'},
              fechaCreacion: {type: 'string'},
              fechaModificacion: {type: 'string'},
              usuCreacion: {type: 'number'},
              usuModificacion: {type: 'number'},
              fechaInactivo: {type: 'string'},
              usuInactivo: {type: 'number'},
              // Propiedades de UsuarioImagenes
              avatarBase64: {type: 'string'},
              avatarNombre: {type: 'string'},
              avatarTipo: {type: 'string'},
            },
          },
        },
      },
    }) 
    usuarioData: any,
  ): Promise<void> {
    const usuarioDto = new UsuarioConImagenesDto(usuarioData);
    const usuario = await this.procesarUsuarioConImagenes(usuarioDto);
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/vistaEmpresaRolUsuario')
  @response(200, {
    description: 'Devuelve usuarios y su rol con la empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaRolUsuario(@param.filter(Usuario) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.usuarioRepository.dataSource;
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
                if (!isNaN(parseFloat(subValue as string)) && !isNaN(Number(subValue))) {
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
    const query = `SELECT * FROM vista_empresa_rol_usuario${filtros}`;
    const registros = await dataSource.execute(query);
    //
    // Procesar URLs de imágenes en los resultados
    //
    const registrosProcesados = registros.map((registro: any) => {
      return {
        ...registro,
        avatar: this.imageService.procesarUrlImagen(registro.avatar)
      };
    });    
    return registrosProcesados;
  };

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @get('/vistaEmpresaRolUsuarioCount')
  @response(200, {
    description: 'Devuelve usuarios y su rol con la empresa',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaEmpresaRolUsuarioCount(@param.where(Usuario) where?: Where<Usuario>,): Promise<Usuario[]> {
    const dataSource = this.usuarioRepository.dataSource;
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
                if (!isNaN(parseFloat(subValue as string)) && !isNaN(Number(subValue))) {
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
    const query = `SELECT COUNT(*) AS count FROM vista_empresa_rol_usuario${filtros}`;
    const registros = await dataSource.execute(query, []);
    return registros;
  }

  @authenticate('jwt')
  @authorize({allowedRoles: ['API']})

  @patch('/usuarioCredenciales/{idUsuario}')
  @response(204, {
    description: 'UsuarioCredenciales PATCH success',
  })
  async updateByIdCredenciales(
    @param.path.number('idUsuario') idUsuario: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioCredenciales, { partial: true }),
        },
      },
    })
    usuarioCredenciales: UsuarioCredenciales,
  ): Promise<{ status: string; message: string }> {
    if (usuarioCredenciales.password) {
      const dataSource = this.usuarioCredencialesRepository.dataSource;
      const query = `UPDATE usuario_credenciales SET password='${usuarioCredenciales.password}' WHERE id=${idUsuario}`;
      await dataSource.execute(query);

      return { status: 'OK', message: 'Correo enviado con éxito.' };
    }
    return { status: 'ERROR', message: 'La contraseña no puede estar vacía.' };

  }
}