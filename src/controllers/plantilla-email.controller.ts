import {  Count,  CountSchema,  Filter,  FilterExcludingWhere,  repository,  Where,} from '@loopback/repository';
import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import { PlantillaEmail } from '../models';
import { EmpresaRepository, PlantillaEmailRepository } from '../repositories';
import nodemailer from 'nodemailer';
import path from 'path';
import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { SqlFilterUtil } from '../utils/sql-filter.util';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class PlantillaEmailController {
  constructor(
    @repository(PlantillaEmailRepository)
    public plantillaEmailRepository: PlantillaEmailRepository,
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,

  ) { }

  @post('/plantilla-emails')
  @response(200, {
    description: 'PlantillaEmail model instance',
    content: { 'application/json': { schema: getModelSchemaRef(PlantillaEmail) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlantillaEmail, {
            title: 'NewPlantillaEmail',
            exclude: ['id'],
          }),
        },
      },
    })
    plantillaEmail: Omit<PlantillaEmail, 'id'>,
  ): Promise<PlantillaEmail> {
    return this.plantillaEmailRepository.create(plantillaEmail);
  }

  @get('/plantilla-emails/count')
  @response(200, {
    description: 'PlantillaEmail model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(PlantillaEmail) where?: Where<PlantillaEmail>,
  ): Promise<Count> {
    const dataSource = this.plantillaEmailRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(dataSource, 'plantilla_email', where);
  }

  @get('/plantilla-emails')
  @response(200, {
    description: 'Array of PlantillaEmail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlantillaEmail, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(PlantillaEmail) filter?: Filter<PlantillaEmail>,
  ): Promise<PlantillaEmail[]> {
    const dataSource = this.plantillaEmailRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(dataSource, 'plantilla_email', filter, '*');
  }

  @patch('/plantilla-emails')
  @response(200, {
    description: 'PlantillaEmail PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlantillaEmail, { partial: true }),
        },
      },
    })
    plantillaEmail: PlantillaEmail,
    @param.where(PlantillaEmail) where?: Where<PlantillaEmail>,
  ): Promise<Count> {
    return this.plantillaEmailRepository.updateAll(plantillaEmail, where);
  }

  @get('/plantilla-emails/{id}')
  @response(200, {
    description: 'PlantillaEmail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlantillaEmail, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlantillaEmail, { exclude: 'where' }) filter?: FilterExcludingWhere<PlantillaEmail>
  ): Promise<PlantillaEmail> {
    return this.plantillaEmailRepository.findById(id, filter);
  }

  @patch('/plantilla-emails/{id}')
  @response(204, {
    description: 'PlantillaEmail PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlantillaEmail, { partial: true }),
        },
      },
    })
    plantillaEmail: PlantillaEmail,
  ): Promise<void> {
    await this.plantillaEmailRepository.updateById(id, plantillaEmail);
  }

  @put('/plantilla-emails/{id}')
  @response(204, {
    description: 'PlantillaEmail PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() plantillaEmail: PlantillaEmail,
  ): Promise<void> {
    await this.plantillaEmailRepository.replaceById(id, plantillaEmail);
  }

  @del('/plantilla-emails/{id}')
  @response(204, {
    description: 'PlantillaEmail DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {

      //Borra la plantilla
      await this.plantillaEmailRepository.deleteById(id);
    } catch (e) {
      if (e.errno === 1451) {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro porque tiene otros registros relacionados.');
      } else {
        throw new HttpErrors.BadRequest('No se pudo eliminar el registro.');
      }
    }
  }

  @post('/plantilla-emails/enviarEmails/{nombrePlantilla}')
  async enviarEmails(
    @requestBody({
      description: 'Enviar los correos a los usuarios',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              emails: {
                type: 'array',
                items: { type: 'string' }
              },
              empresaId: { type: 'number' },
            },
          },
        },
      },
    })
    @param.path.string('nombrePlantilla') nombrePlantilla: string,
    body: { emails: Array<string>, empresaId: number },
  ): Promise<{ status: string; message: string }> {
    try {
      const { emails, empresaId } = body;

      //Obtengo la empresa
      const dataSourceEmpresa = this.empresaRepository.dataSource;
      let query = `SELECT * FROM empresa WHERE id=${empresaId};`;
      const empresaRegistro = await dataSourceEmpresa.execute(query);


      // Preparo la configuración para enviar el correo usando Virtualmin/Postfix local
      const transporter = nodemailer.createTransport({
        host: 'localhost',         // Servidor SMTP local de Virtualmin
        port: 587,                 // Puerto estándar para SMTP
        secure: false,             // false para STARTTLS
        requireTLS: false          // No requerimos TLS para localhost
      });

      // Obtengo la plantilla del correo
      const dataSource = this.plantillaEmailRepository.dataSource;
      query = `SELECT * FROM plantilla_email WHERE nombre_plantilla="${nombrePlantilla}";`;
      const plantillaRegistro = await dataSource.execute(query);
      let htmlContent = plantillaRegistro[0]['cuerpo'];

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

      const publicPath = path.resolve(__dirname, '../../public');

      // Opciones del email
      let parametrosMail = {
        from: empresaRegistro[0]['email'],
        to: emails.join(', '),
        subject: plantillaRegistro[0]['titulo'],
        html: htmlContent,
        attachments: attachments
      };

      // Enviar email usando callback
      transporter.sendMail(parametrosMail, (error, info) => {
        if (error) {
          console.error('Error al enviar el email:', error);
          // Aquí puedes implementar lógica para reintentos, notificaciones, etc.
          return;
        }
      })

      return { status: 'OK', message: 'Correo enviado con éxito.' };
    }

    catch (error) {
      console.error('Error al enviar el correo:', error);
      return { status: 'ERROR', message: 'No se pudo enviar el correo. Por favor, intenta nuevamente.' };
    }
  }

  @post('/plantilla-emails/enviarQR/{url}')
  async enviarQR(
    @requestBody({
      description: 'Enviar un correo con un QR',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              emails: {
                type: 'array',
                items: { type: 'string' }
              },
              empresaId: { type: 'number' },
            },
          },
        },
      },
    })
    @param.path.string('url') url: string,
    body: { emails: Array<string>, empresaId: number },
  ): Promise<{ status: string; message: string }> {
    try {
      const { emails, empresaId } = body;

      //Obtengo la empresa
      const dataSourceEmpresa = this.empresaRepository.dataSource;
      let query = `SELECT * FROM empresa WHERE id=${empresaId};`;
      const empresaRegistro = await dataSourceEmpresa.execute(query);


      // Preparo la configuración para enviar el correo usando Virtualmin/Postfix local
      const transporter = nodemailer.createTransport({
        host: 'localhost',         // Servidor SMTP local de Virtualmin
        port: 587,                 // Puerto estándar para SMTP
        secure: false,             // false para STARTTLS
        requireTLS: false          // No requerimos TLS para localhost
      });

      //Preparamos el codigo QR
      const options = {
        errorCorrectionLevel: 'high' as QRCodeErrorCorrectionLevel, // Corrected type
        //type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        scale: 4,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      }

      const _url = await QRCode.toDataURL(url, options); // Added await for Promise
      const base64Data = _url.split("base64,")[1]; // extrae solo la parte base64

      // Obtengo la plantilla del correo
      let htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Creación de cuenta en nuestro sistema</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #db336e;
    }
    .content {
      padding: 20px 0;
      font-size: 16px;
      line-height: 1.5;
    }
    .qr {
      text-align: center;
      margin: 20px 0;
    }
    .qr img {
      max-width: 200px;
      border: 1px solid #ddd;
      padding: 5px;
      background-color: #fff;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777;
      border-top: 1px solid #eee;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bienvenido a ${empresaRegistro[0].nombre}</h1>
    </div>
    <div class="content">
      <p>Hola,</p>
      <p>Se está creando una cuenta en nuestro sistema para usted. Para completar el proceso de registro y activar su cuenta, puede escanear el código QR que se muestra a continuación con su dispositivo móvil.</p>
      <div class="qr">
        <img src="cid:qrcode@unique" alt="Código QR">
      </div>
      <p>o pulsar el siguiente enlance: <a href="${url}">${url}</a></p>
      <p>Una vez escaneado el código o pulsado el enlace, se le redirigirá a la página de creación de cuenta donde podrá completar el registro y establecer su contraseña.</p>
      <p>Si tiene alguna duda o necesita ayuda, no dude en contactarnos.</p>
      <p>¡Gracias por confiar en nosotros!</p>
    </div>
    <div class="footer">
      <p>${empresaRegistro[0].nombre} - Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
`;
      // Opciones del email
      let parametrosMail = {
        from: empresaRegistro[0]['email'],
        to: emails.join(', '),
        subject: `Creación de cuenta en ${empresaRegistro[0]['nombre']}`,
        html: htmlContent,
        attachments: [{
          filename: 'qrcode.png',
          content: base64Data,
          encoding: 'base64',
          cid: 'qrcode@unique' // Este cid debe coincidir con el usado en el src de la imagen
        }]
      };

      // Enviar email usando callback
      transporter.sendMail(parametrosMail, (error, info) => {
        if (error) {
          console.error('Error al enviar el email:', error);
          // Aquí puedes implementar lógica para reintentos, notificaciones, etc.
          return;
        }
      })

      return { status: 'OK', message: 'Correo enviado con éxito.' };
    }

    catch (error) {
      console.error('Error al enviar el correo:', error);
      return { status: 'ERROR', message: 'No se pudo enviar el correo. Por favor, intenta nuevamente.' };
    }
  }

  @get('/vistaPlantillaEmailIdioma')
  @response(200, {
    description: 'Devuelve plantillas email y su idioma',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaPlantillaEmailIdioma(@param.filter(PlantillaEmail) filter?: Filter<Object>,): Promise<Object[]> {
    const dataSource = this.plantillaEmailRepository.dataSource;
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
    const query = `SELECT * FROM vista_plantilla_email_idioma${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;
  };

  @get('/vistaPlantillaEmailIdiomaCount')
  @response(200, {
    description: 'Devuelve plantillas email y su idioma',
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async vistaPlantillaEmailIdiomaCount(@param.where(PlantillaEmail) where?: Where<PlantillaEmail>,): Promise<PlantillaEmail[]> {
    const dataSource = this.plantillaEmailRepository.dataSource;
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
    const query = `SELECT COUNT(*) AS count FROM vista_plantilla_email_idioma${filtros}`;
    const registros = await dataSource.execute(query);
    return registros;

  }
}
