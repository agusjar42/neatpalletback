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
   * Inserta en envio_configuracion los datos de empresa_configuracion para la empresa indicada.
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
    //Luego insertamos las configuraciones por defecto globales.
    //Si no existen (compatibilidad), usamos la configuracion legacy por empresa.
    //
    const eventoConfiguracionCountQuery = `SELECT COUNT(*) AS total
                                             FROM evento_configuracion
                                            WHERE (activoSn = 'S' OR activoSn IS NULL)`;
    const eventoConfiguracionCountResult = (await dataSource.execute(eventoConfiguracionCountQuery)) as Array<{total: number}>;
    const totalEventoConfiguracion = Number(eventoConfiguracionCountResult?.[0]?.total ?? 0);

    let insert = `insert into envio_configuracion (orden,
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
                                              FROM evento_configuracion
                                             WHERE (activoSn = 'S' OR activoSn IS NULL)`;

    if (totalEventoConfiguracion <= 0) {
      insert = `insert into envio_configuracion (orden,
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
                                            FROM empresa_configuracion
                                           WHERE empresaId = ${empresaId}`;
    }
    await dataSource.execute(insert);
  }
}
