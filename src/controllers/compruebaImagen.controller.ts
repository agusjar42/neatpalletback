import {  post,  param,  get,  getModelSchemaRef,  patch,  put,  del,  requestBody,  response,  HttpErrors,} from '@loopback/rest';
import * as path from 'path';
import { join } from 'path';
import { promises as fs } from 'fs';
interface ConImagenMiniatura {
  imagen: string;
  imagenMiniatura?: string;
}
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})

export class CompruebaImagenController {
  constructor() { }

  @get('/compruebaImagen/{imagenUrl}')
  @response(200, {
    content: { 'application/json': { schema: { type: 'object' } } },
  })
  async compruebaImagenEndpoint(
    @param.path.number('imagenUrl') imagenUrl: string,
  ): Promise<Object> {
    try {
      const resultado = await this.compruebaImagen(imagenUrl);
      return { imagen: resultado };
    } catch (error) {
      return { error: error.message };
    }
  }

  public async compruebaImagen(imagen: string): Promise<string> {
    //
    //preparamos la ruta donde debe estar la imagen
    //
    const publicPath = path.resolve(__dirname, '../../public');
    const rutaImagen = join(publicPath, imagen);
    //
    //Si la imagen existe la devolvemos, sino devolvemos imagen-no-disponible.jpg
    //
    try {
      await fs.access(rutaImagen);
      return imagen;
    } catch (error) {
      return '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
    }
  }

  public async procesaImagenConMiniatura(imagen: string): Promise<ConImagenMiniatura> {
    let imagenMiniatura = "";
    if (imagen) {
      imagen = await this.compruebaImagen(imagen);
      //
      // Si he encontrado la imagen añadimos el campo imagenMiniatura con la ruta de la imagen miniatura
      //
      if (imagen.indexOf('imagen-no-disponible.jpeg') < 0) {
        const miniatura = imagen.lastIndexOf('/');
        imagenMiniatura = imagen.slice(0, miniatura + 1) + "1250x850_" + imagen.slice(miniatura + 1);
      } else {
        //
        // Si no existía la imagen añadimos el campo imagenMiniatura pero con la ruta de imagen-no-disponible
        //
        imagenMiniatura = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
      }
    } else {
      imagen = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
      imagenMiniatura = '/multimedia/sistemaNLE/imagen-no-disponible.jpeg';
    }
    return { imagen, imagenMiniatura };
  }

  //
  //Recibimos los registros para procesarlos y devolverlos con la ruta correcta o indicar que no tiene imagen disponible
  //
  public async procesaRegistrosConImagenMiniatura<T extends { imagen?: string }>(
    registros: Array<T>
  ): Promise<Array<T & { imagenMiniatura: string }>> {
    //
    //Hacemos un bucle para tratar todos los registros
    //
    const registrosTratados = await Promise.all(registros.map(async (registro) => {
      //
      //Añadimos el campo imagenMiniatura al modelo que vamos a devolver
      //
      const registroConImagenMiniatura = {
        ...registro,
        imagenMiniatura: '',
      };
      //
      //Procesamos la imagen para recuperar su ruta y comprobar que existe en el directorio
      //
      const resultado = await this.procesaImagenConMiniatura(registro.imagen || "");
      //
      //Preparamos el resultado a devolver añadiendo los valores recien tratados
      //
      registroConImagenMiniatura.imagen = resultado.imagen || "";
      registroConImagenMiniatura.imagenMiniatura = resultado.imagenMiniatura || "";
      return registroConImagenMiniatura;
    }));

    return registrosTratados;
  }
}
