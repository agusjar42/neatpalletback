// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-file-transfer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core';
import {  param,  post,  Request,  requestBody,  Response,  RestBindings,  response,  del,} from '@loopback/rest';
import { FileUploadBindings } from '../keys';
import { FileUploadHandler } from '../types';
import fsExtra from 'fs-extra';
import multer from 'multer';
import sharp from 'sharp';
import path, { join } from 'path';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

/**
 * A controller to handle file uploads using multipart/form-data media type
 */

@authenticate('jwt')
@authorize({allowedRoles: ['API']})


export class FileUploadController {
  /**
   * Constructor
   * @param handler - Inject an express request handler to deal with the request
   */
  constructor(
    @inject(FileUploadBindings.FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
  ) { }
  @post('/files-upload/{folderPathDir}/{fileName}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) respuesta: Response,
    @param.path.string('folderPathDir') folderPathDir: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<object> {
    const rutaDeImagen = `./public/multimedia/${folderPathDir}/`;
    const rutaDeImagenParaDevolver = `/multimedia/${folderPathDir}/`;
    let newFileName = "";

    // Creamos directorio si no existe
    try {
      await fsExtra.ensureDir(rutaDeImagen)
    } catch (err) {
      console.error(err)
    }
    // Parametros-opciones de multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, rutaDeImagen)
      },
      filename: function (req, file, cb) {

        newFileName = FileUploadController.formatearUrlArchivo(fileName);


        cb(null, newFileName);
      }
    })

    const promiseUpload = new Promise<object>((resolve, reject) => {
      const upload = multer({ storage: storage }).single("file")
      upload(request, respuesta, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          reject(err)
        } else if (err) {
          // An unknown error occurred when uploading.
          reject(err)
        }
        // Fue todo bien
        resolve({ originalUrl: `${rutaDeImagenParaDevolver}${newFileName}` })
      })
    })

    return promiseUpload.then(r => {
      return { originalUrl: `${rutaDeImagenParaDevolver}${newFileName}` }
    })
  }

  @post('/images-upload/{folderPathDir}/{fileName}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async imageUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) respuesta: Response,
    @param.path.string('folderPathDir') folderPathDir: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<object> {
    const rutaDeImagen = `./public/multimedia/${folderPathDir}/`;
    const rutaDeImagenParaDevolver = `/multimedia/${folderPathDir}/`;
    let extension = "";
    let nombreFichero = "";
    let nombreFicheroSinExtension = "";

    // Creamos directorio si no existe
    try {
      await fsExtra.ensureDir(rutaDeImagen)
    } catch (err) {
      console.error(err)
    }
    // Parametros-opciones de multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, rutaDeImagen)
      },
      filename: function (req, file, cb) {
        //
        //Recibimos el nombre de la imagen y lo arreglamos, además buscamos extension y la guardamos para el resize posterior
        //
        nombreFichero = file.originalname.replace(/\s/g, "_") // Reemplaza espacios en blanco por guiones bajos
          .replace(/\.(?=.*\.)/g, "_");// Reemplaza todos los puntos excepto el último por guiones bajos
        [nombreFicheroSinExtension, extension] = nombreFichero.split(".");
        //Añade la fecha y hora
        nombreFichero = FileUploadController.formatearUrlArchivo(nombreFichero);

        cb(null, nombreFichero);
       
      }
    })

    const promiseUploadAndResize = new Promise<object>((resolve, reject) => {
      const upload = multer({ storage: storage }).single("file")
      upload(request, respuesta, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          reject(err)
        } else if (err) {
          // An unknown error occurred when uploading.
          reject(err)
        }
        // Fue todo bien
        if (request.file?.mimetype.includes("image")) {
          resolve(FileUploadController.tratarImagenes(`${rutaDeImagen}/${nombreFichero}`, `${extension}`, 1250, 850 ))
        }
      })
    })

    return promiseUploadAndResize.then(r => {
      // Retornamos url de la orignal y de la resized que sera la que utilizaremos en la web
      return { originalUrl: `${rutaDeImagenParaDevolver}${nombreFichero}`, resizedUrl: `${rutaDeImagenParaDevolver}1250x850_${nombreFichero}` }
    })
  }

  @post('/avatar-upload/{folderPathDir}/{fileName}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async avatarUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) respuesta: Response,
    @param.path.string('folderPathDir') folderPathDir: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<object> {
    const rutaDeImagen = `./public/multimedia/${folderPathDir}/`;
    const rutaDeImagenParaDevolver = `/multimedia/${folderPathDir}/`;
    let extension = "";
    let nombreFichero = "";
    let nombreFicheroSinExtension = "";

    // Creamos directorio si no existe
    try {
      await fsExtra.ensureDir(rutaDeImagen)
    } catch (err) {
      console.error(err)
    }
    // Parametros-opciones de multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, rutaDeImagen)
      },
      filename: function (req, file, cb) {
        //
        //Recibimos el nombre de la imagen y lo arreglamos, además buscamos extension y la guardamos para el resize posterior
        //
        nombreFichero = file.originalname.replace(/\s/g, "_") // Reemplaza espacios en blanco por guiones bajos
          .replace(/\.(?=.*\.)/g, "_");// Reemplaza todos los puntos excepto el último por guiones bajos
        [nombreFicheroSinExtension, extension] = nombreFichero.split(".");
        //Añade la fecha y hora
        nombreFichero = FileUploadController.formatearUrlArchivo(nombreFichero);

        cb(null, nombreFichero);
       
      }
    })

    const promiseUploadAndResize = new Promise<object>((resolve, reject) => {
      const upload = multer({ storage: storage }).single("file")
      upload(request, respuesta, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          reject(err)
        } else if (err) {
          // An unknown error occurred when uploading.
          reject(err)
        }
        // Fue todo bien
        if (request.file?.mimetype.includes("image")) {
          resolve(FileUploadController.tratarImagenes(`${rutaDeImagen}/${nombreFichero}`, `${extension}`, 32, 32 ))
        }
      })
    })

    return promiseUploadAndResize.then(r => {
      // Retornamos url de la orignal y de la resized que sera la que utilizaremos en la web
      return { originalUrl: `${rutaDeImagenParaDevolver}${nombreFichero}`, resizedUrl: `${rutaDeImagenParaDevolver}32x32_${nombreFichero}` }
    })
  }

  private static async tratarImagenes(dirPathImage: string, extension: string, anchura?: number, altura?: number) {
    const imageContent = await fsExtra.readFile(dirPathImage);
    //
    //Mapeamos los valores posibles para sharp
    //
    const formatMapping: { [key: string]: keyof sharp.FormatEnum } = {
      'jpg': 'jpeg',
      'jpeg': 'jpeg',
      'png': 'png',
      'webp': 'webp',
      'tiff': 'tiff',
      'avif': 'avif'
    };
    //
    //Si la extensión no está en el formatMapping ponemos por defecto png
    //
    if (!(extension in formatMapping)) {
      extension = 'png';
    }
    //
    //Llamamos a sharp para redimensinar la imagen
    //
    await sharp(imageContent)
      .rotate() // Desactivar la orientación automática
      .resize(anchura, altura, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFormat(formatMapping[extension], formatMapping[extension] === 'png'
        ? { compressionLevel: 9 }  // Compresión máxima para PNG
        : { quality: 80 }  // Calidad para JPEG y WebP
      )
      .toBuffer()
      .then(async function (outputBuffer) {
        const originPath = dirPathImage.split("/")
        const fileName = originPath.pop()?.split(".")[0];
        const outputPath = originPath.filter(p => p !== "").join("/")
        //Creamos si no existe
        await fsExtra.ensureDir(outputPath)
        fsExtra.writeFileSync(`${outputPath}/${anchura}x${altura}_${fileName}.${extension}`, outputBuffer);
      });
  }
  /**
   * Elimina un fichero dado su ruta
   * @param filePath - La ruta del fichero a eliminar
   */
  @del('/files/{imagen}')
  @response(204, {
    description: 'File DELETE success',
  })
  async deleteFileByName(
    @param.path.string('imagen') imagen: string
  ): Promise<void> {
    //
    //preparamos la ruta donde debe estar la imagen
    //
    const publicPath = path.resolve(__dirname, '../../public');
    const rutaImagen = join(publicPath, imagen);
    try {
      await fsExtra.unlink(rutaImagen);
      console.log(`Fichero eliminado: ${rutaImagen}`);
    } catch (err) {
      console.error(`Error al eliminar el fichero: ${err.message}`);
      throw err;
    }
  }
  static formatearUrlArchivo(url: String): string {
    // Obtén la fecha y hora actuales
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const día = String(ahora.getDate()).padStart(2, '0');
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    // Formatea la fecha y hora
    const fechaHora = `${año}-${mes}-${día}_${horas}${minutos}${segundos}`;

    // Divide el nombre del archivo y su extensión
    const puntoIndex = url.lastIndexOf('.');

    const nombreBase = url.slice(0, puntoIndex);
    const extension = url.slice(puntoIndex);

    return `${nombreBase}_${fechaHora}${extension}`;
  }
}