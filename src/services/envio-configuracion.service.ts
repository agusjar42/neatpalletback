import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EnvioRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class EnvioConfiguracionService {
  constructor(
    @repository(EnvioRepository)
    public envioRepository: EnvioRepository,
  ) {}

  /**
   * Inserta en envio_configuracion los datos de envio_configuracion_empresa para la empresa indicada.
   * @param envioId El ID del envío.
   * @param empresaId El ID de la empresa.
   * @param usuarioCreacion El ID del usuario que crea la configuración.
   */
  async insertEnvioConfiguracion(envioId: number, empresaId: number, usuarioCreacion: number): Promise<void> {
    const dataSource = this.envioRepository.dataSource;
    //
    //Primero borramos las configuraciones anteriores por si acaso
    //
    const deleteQuery = `DELETE FROM envio_configuracion WHERE envio_id = ${envioId}`;
    await dataSource.execute(deleteQuery);
    //
    //Luego insertamos las configuraciones por defecto de la empresa
    //
    const insert = `insert into envio_configuracion (envio_id,
                                                     nombre,
                                                     valor,
                                                     unidad_medida,
                                                     usuario_creacion)
                                              SELECT ${envioId} envio_id,
                                                     nombre,
                                                     valor,
                                                     unidad_medida,
                                                     ${usuarioCreacion} usuario_creacion
                                                FROM envio_configuracion_empresa
                                               where empresa_id = ${empresaId}`;
    await dataSource.execute(insert);
  }
}
