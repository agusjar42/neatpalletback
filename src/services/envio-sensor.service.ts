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
   * Inserta en envio_sensor los datos de envio_sensor_empresa para la empresa indicada.
   * @param envioId El ID del envío.
   * @param empresaId El ID de la empresa.
   * @param usuarioCreacion El ID del usuario que crea el sensor.
   */
  async insertEnvioSensor(envioId: number, empresaId: number, usuarioCreacion: number): Promise<void> {
    const dataSource = this.envioRepository.dataSource;
    //
    //Primero borramos los sensores anteriores por si acaso
    //
    const deleteQuery = `DELETE FROM envio_sensor WHERE envio_id = ${envioId}`;
    await dataSource.execute(deleteQuery);
    //
    //Luego insertamos los sensores por defecto de la empresa
    //
    const insert = `insert into envio_sensor (envio_id,
                                              tipo_sensor_id,
                                              valor,
                                              usuario_creacion)
                                       SELECT ${envioId} envio_id,
                                              tipo_sensor_id,
                                              valor,
                                              ${usuarioCreacion} usuario_creacion
                                         FROM envio_sensor_empresa
                                        where empresa_id = ${empresaId}`;
    await dataSource.execute(insert);
  }
}
