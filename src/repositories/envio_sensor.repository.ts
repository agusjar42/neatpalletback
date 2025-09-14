import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioSensor, EnvioSensorRelations, TipoSensor, Envio} from '../models';
import {TipoSensorRepository} from './tipo_sensor.repository';
import {EnvioRepository} from './envio.repository';

export class EnvioSensorRepository extends DefaultCrudRepository<
  EnvioSensor,
  typeof EnvioSensor.prototype.id,
  EnvioSensorRelations
> {

  public readonly tipoSensor: BelongsToAccessor<TipoSensor, typeof EnvioSensor.prototype.id>;
  public readonly envio: BelongsToAccessor<Envio, typeof EnvioSensor.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('TipoSensorRepository') protected tipoSensorRepositoryGetter: Getter<TipoSensorRepository>,
    @repository.getter('EnvioRepository') protected envioRepositoryGetter: Getter<EnvioRepository>,
  ) {
    super(EnvioSensor, dataSource);
    this.envio = this.createBelongsToAccessorFor('envio', envioRepositoryGetter,);
    this.tipoSensor = this.createBelongsToAccessorFor('tipoSensor', tipoSensorRepositoryGetter,);
    this.registerInclusionResolver('envio', this.envio.inclusionResolver);
    this.registerInclusionResolver('tipoSensor', this.tipoSensor.inclusionResolver);
  }

  /**
   * Encuentra sensores por envío
   */
  async findByEnvio(envioId: number): Promise<EnvioSensor[]> {
    return this.find({
      where: {
        envioId: envioId
      },
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Encuentra sensores por tipo de sensor
   */
  async findByTipoSensor(tipoSensorId: number): Promise<EnvioSensor[]> {
    return this.find({
      where: {
        tipoSensorId: tipoSensorId
      },
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Obtiene último valor de sensor para un envío
   */
  async getLatestValueByEnvioAndTipo(envioId: number, tipoSensorId: number): Promise<EnvioSensor | null> {
    return this.findOne({
      where: {
        and: [
          {envioId: envioId},
          {tipoSensorId: tipoSensorId}
        ]
      },
      order: ['fechaCreacion DESC'],
      include: ['tipoSensor']
    });
  }

  /**
   * Cuenta sensores activos por envío
   */
  async countActiveByEnvio(envioId: number): Promise<number> {
    const result = await this.count({
      envioId: envioId
    });
    return result.count;
  }
}