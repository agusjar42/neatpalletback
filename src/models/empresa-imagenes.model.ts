import {Model, model, property} from '@loopback/repository';
import { UsuarioImagenes } from './usuario-imagenes.model';

@model()
export class EmpresaImagenes extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  logoBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  logoNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  logoTipo?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  imagenBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  imagenNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  imagenTipo?: string;

  constructor(data?: Partial<EmpresaImagenes>) {
    super(data);
  }
}

export interface EmpresaImagenesRelations {
  // describe navigational properties here
}

export type EmpresaImagenesWithRelations = EmpresaImagenes & EmpresaImagenesRelations;