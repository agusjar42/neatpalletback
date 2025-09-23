import { Usuario } from './usuario.model';
import { UsuarioImagenes } from './usuario-imagenes.model';

/**
 * DTO que combina Usuario con campos de imagen para operaciones de API
 */
export class UsuarioConImagenesDto extends Usuario {
  // Campos temporales para procesamiento de imágenes
  avatarBase64?: string;
  avatarNombre?: string;
  avatarTipo?: string;

  constructor(data?: Partial<UsuarioConImagenesDto>) {
    super(data);
    if (data) {
      this.avatarBase64 = data.avatarBase64;
      this.avatarNombre = data.avatarNombre;
      this.avatarTipo = data.avatarTipo;
    }
  }

  /**
   * Extrae solo los datos del usuario (sin campos temporales)
   */
  toUsuario(): Usuario {
    const {avatarBase64, avatarNombre, avatarTipo, ...usuarioData} = this;
    return new Usuario(usuarioData);
  }

  /**
   * Extrae solo los datos de imagen
   */
  toUsuarioImagenes(): UsuarioImagenes {
    return new UsuarioImagenes({
      avatarBase64: this.avatarBase64,
      avatarNombre: this.avatarNombre,
      avatarTipo: this.avatarTipo
    });
  }

  /**
   * Crea una instancia desde datos separados
   */
  static fromSeparateData(usuario: Usuario, imagenes?: UsuarioImagenes): UsuarioConImagenesDto {
    return new UsuarioConImagenesDto({
      ...usuario,
      avatarBase64: imagenes?.avatarBase64,
      avatarNombre: imagenes?.avatarNombre,
      avatarTipo: imagenes?.avatarTipo
    });
  }
}