import { Empresa } from './empresa.model';
import { EmpresaImagenes } from './empresa-imagenes.model';

/**
 * DTO que combina Empresa con campos de imagen para operaciones de API
 */
export class EmpresaConImagenesDto extends Empresa {
  // Campos temporales para procesamiento de imágenes
  imagenBase64?: string;
  imagenNombre?: string;
  imagenTipo?: string;

  logoBase64?: string;
  logoNombre?: string;
  logoTipo?: string;

  constructor(data?: Partial<EmpresaConImagenesDto>) {
    super(data);
    if (data) {
      this.imagenBase64 = data.imagenBase64;
      this.imagenNombre = data.imagenNombre;
      this.imagenTipo = data.imagenTipo;

      this.logoBase64 = data.logoBase64;
      this.logoNombre = data.logoNombre;
      this.logoTipo = data.logoTipo;
    }
  }

  /**
   * Extrae solo los datos de la empresa (sin campos temporales)
   */
  toEmpresa(): Empresa {
    const {imagenBase64, imagenNombre, imagenTipo, logoBase64, logoNombre, logoTipo, ...empresaData} = this;
    return new Empresa(empresaData);
  }

  /**
   * Extrae solo los datos de imagen
   */
  toEmpresaImagenes(): EmpresaImagenes {
    return new EmpresaImagenes({
      imagenBase64: this.imagenBase64,
      imagenNombre: this.imagenNombre,
      imagenTipo: this.imagenTipo,
      logoBase64: this.logoBase64,
      logoNombre: this.logoNombre,
      logoTipo: this.logoTipo 
    });
  }

  /**
   * Crea una instancia desde datos separados
   */
  static fromSeparateData(empresa: Empresa, imagenes?: EmpresaImagenes): EmpresaConImagenesDto {
    return new EmpresaConImagenesDto({
      ...empresa,
      imagenBase64: imagenes?.imagenBase64,
      imagenNombre: imagenes?.imagenNombre,
      imagenTipo: imagenes?.imagenTipo,
      logoBase64: imagenes?.logoBase64,
      logoNombre: imagenes?.logoNombre,
      logoTipo: imagenes?.logoTipo
    });
  }
}