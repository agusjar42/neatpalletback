import {Model, model, property} from '@loopback/repository';

@model()
export class CrearEnvioConfiguracionDto extends Model {
  @property({
    type: 'number',
    required: true,
  })
  envioId: number;

  @property({
    type: 'number',
    required: true,
  })
  empresaId: number;

  @property({
    type: 'number',
    required: true,
  })
  usuarioCreacion: number;

  constructor(data?: Partial<CrearEnvioConfiguracionDto>) {
    super(data);
  }
}
