import {BindingScope, inject, injectable} from '@loopback/core';
import {Request, RestBindings} from '@loopback/rest';
import * as fs from 'fs';
import * as path from 'path';

@injectable({scope: BindingScope.REQUEST})
export class ImageService {
  private readonly IMAGEN_NO_DISPONIBLE_PATH = '/multimedia/sistemaNP/1250x850_imagen-no-disponible.jpeg';

  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
  ) {}

  getBaseUrl(): string {
    const protocol = this.req.protocol;
    const host = this.req.get('host');
    return `${protocol}://${host}`;
  }

  procesarUrlImagen(rutaRelativa: string | null | undefined): string {
    const baseUrl = this.getBaseUrl();
    //
    //Si la imagen no existe pone la imagen no disponible
    //
    if (!rutaRelativa) {
      return `${baseUrl}${this.IMAGEN_NO_DISPONIBLE_PATH}`;
    }
    //
    // Construir ruta completa del archivo
    //
    const rutaCompleta = path.join(process.cwd(), 'public', rutaRelativa);
    //
    // Verificar si el archivo existe
    //
    if (fs.existsSync(rutaCompleta)) {
      return `${baseUrl}/${rutaRelativa}`;
    } else {
      console.warn(`Imagen no encontrada: ${rutaCompleta}`);
      return `${baseUrl}${this.IMAGEN_NO_DISPONIBLE_PATH}`;
    }
  }

  async guardarImagenBase64(
    base64Data: string, 
    tipo: string, 
    categoria: string
  ): Promise<string> {
    //
    //Obtiene la imagen en base64 y la convierte a buffer para poder trabajar con ella
    //
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    //
    //Convierte la imagen a jpg y le da un nombre unico
    //
    const mimeType = tipo || 'image/jpeg';
    const extension = mimeType.split('/')[1] || 'jpg';
    const nombreArchivo = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${extension}`;
    //
    // Crear el directorio si no existe
    //
    const directorioUploads = path.join(process.cwd(), 'public/multimedia/uploads', categoria);
    if (!fs.existsSync(directorioUploads)) {
      fs.mkdirSync(directorioUploads, { recursive: true });
    }
    //
    // Guardar el archivo
    //
    const rutaCompleta = path.join(directorioUploads, nombreArchivo);
    fs.writeFileSync(rutaCompleta, buffer);
    //
    // Devuelve la ruta relativa para almacenar en la base de datos
    //
    return `multimedia/uploads/${categoria}/${nombreArchivo}`;
  }
}