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
    const deleteQuery = `DELETE FROM envio_configuracion WHERE envioId = ${envioId}`;
    await dataSource.execute(deleteQuery);
    //
    //Luego insertamos las configuraciones por defecto de la empresa
    //
    const insert = `insert into envio_configuracion (orden, 
                                                     envioId,
                                                     nombre,
                                                     valor,
                                                     unidadMedida,
                                                     usuarioCreacion)
                                              SELECT orden, 
                                                     ${envioId} envioId,
                                                     nombre,
                                                     valor,
                                                     unidadMedida,
                                                     ${usuarioCreacion} usuarioCreacion
                                                FROM envio_configuracion_empresa
                                               where empresaId = ${empresaId}`;
    await dataSource.execute(insert);
  }
}
