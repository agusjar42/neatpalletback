import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EnvioRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class EnvioSensorService {
  constructor(
    @repository(EnvioRepository)
    public envioRepository: EnvioRepository,
  ) {}

  /**
   * Inserta en envio_sensor los datos de empresa_sensor para la empresa indicada.
   * @param envioId El ID del envío.
   * @param empresaId El ID de la empresa.
   * @param usuarioCreacion El ID del usuario que crea el sensor.
   */
  async insertEnvioSensor(envioId: number, empresaId: number, usuarioCreacion: number): Promise<void> {
    const dataSource = this.envioRepository.dataSource;
    //
    //Primero borramos los sensores anteriores por si acaso
    //
    const deleteQuery = `DELETE FROM envio_sensor WHERE envioId = ${envioId}`;
    await dataSource.execute(deleteQuery);
    //
    //Luego insertamos los sensores desde catalogo global de tipos de sensor.
    //Si existen overrides por empresa (empresa_sensor), se respetan.
    //
    const insert = `insert into envio_sensor (orden,
                                              envioId,
                                              tipoSensorId,
                                              valor,
                                              usuarioCreacion)
                                      SELECT COALESCE(ese.orden, ts.orden, 0) orden,
                                             ${envioId} envioId,
                                             ts.id tipoSensorId,
                                             COALESCE(ese.valor, '0') valor,
                                             ${usuarioCreacion} usuarioCreacion
                                        FROM tipo_sensor ts
                                   LEFT JOIN empresa_sensor ese
                                          ON ese.tipoSensorId = ts.id
                                         AND ese.empresaId = ${empresaId}
                                       WHERE ts.activoSn = 'S' OR ts.activoSn IS NULL`;
    await dataSource.execute(insert);
  }
}
