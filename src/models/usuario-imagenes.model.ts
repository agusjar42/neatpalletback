import {Model, model, property} from '@loopback/repository';

@model()
export class UsuarioImagenes extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 10000000, // Límite para base64 (10MB aprox)
    }
  })
  avatarBase64?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255,
    }
  })
  avatarNombre?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 50,
    }
  })
  avatarTipo?: string;

  constructor(data?: Partial<UsuarioImagenes>) {
    super(data);
  }
}

export interface UsuarioImagenesRelations {
  // describe navigational properties here
}

export type UsuarioImagenesWithRelations = UsuarioImagenes & UsuarioImagenesRelations;