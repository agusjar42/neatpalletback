// src/services/image-processing.service.ts
import {injectable, service} from '@loopback/core';
import {ImageService} from './image.service';

interface ImageConfig {
  base64Field: string;
  typeField: string;
  nameField: string;
  outputField: string;
  folder: string;
}

@injectable()
export class ImageProcessingService {
  constructor(
    @service(ImageService) private imageService: ImageService,
  ) {}

  /**
   * Procesa imágenes Base64 de forma dinámica
   * @param data - Objeto con los datos que incluyen imágenes Base64
   * @param imageConfigs - Array de configuraciones de imágenes a procesar
   * @returns Objeto con las imágenes procesadas y campos temporales eliminados
   */
  async procesarImagenesBase64(data: any, imageConfigs: ImageConfig[]): Promise<any> {
    const dataProcesada = {...data};

    for (const config of imageConfigs) {
      const {base64Field, typeField, nameField, outputField, folder} = config;
      
      // Verificar si existe la imagen Base64
      if (data[base64Field]) {
        try {
          console.log(`Procesando imagen ${outputField}...`);
          
          const rutaRelativa = await this.imageService.guardarImagenBase64(
            data[base64Field],
            data[typeField],
            folder
          );
          
          dataProcesada[outputField] = rutaRelativa;
          console.log(`Imagen ${outputField} guardada: ${rutaRelativa}`);
          
        } catch (error) {
          console.error(`Error procesando imagen ${outputField}:`, error);
          throw new Error(`Error al procesar la imagen ${outputField}`);
        }
      }
    }

    // Limpiar campos temporales antes de guardar en BD
    imageConfigs.forEach(config => {
      delete dataProcesada[config.base64Field];
      delete dataProcesada[config.nameField];
      delete dataProcesada[config.typeField];
    });

    return dataProcesada;
  }
}