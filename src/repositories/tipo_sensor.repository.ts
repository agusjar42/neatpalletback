import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoSensor, TipoSensorRelations, EnvioSensor, EnvioMovimiento} from '../models';
import {EnvioSensorRepository} from './envio_sensor.repository';
import {EnvioMovimientoRepository} from './envio_movimiento.repository';

export class TipoSensorRepository extends DefaultCrudRepository<
  TipoSensor,
  typeof TipoSensor.prototype.id,
  TipoSensorRelations
> {

  public readonly envioSensores: HasManyRepositoryFactory<EnvioSensor, typeof TipoSensor.prototype.id>;
  public readonly envioMovimientos: HasManyRepositoryFactory<EnvioMovimiento, typeof TipoSensor.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EnvioSensorRepository') protected envioSensorRepositoryGetter: Getter<EnvioSensorRepository>,
    @repository.getter('EnvioMovimientoRepository') protected envioMovimientoRepositoryGetter: Getter<EnvioMovimientoRepository>,
  ) {
    super(TipoSensor, dataSource);
    this.envioMovimientos = this.createHasManyRepositoryFactoryFor('envioMovimientos', envioMovimientoRepositoryGetter,);
    this.registerInclusionResolver('envioMovimientos', this.envioMovimientos.inclusionResolver);
    this.envioSensores = this.createHasManyRepositoryFactoryFor('envioSensores', envioSensorRepositoryGetter,);
    this.registerInclusionResolver('envioSensores', this.envioSensores.inclusionResolver);
  }

  /**
   * Encuentra tipos de sensor activos
   */
  async findActive(): Promise<TipoSensor[]> {
    return this.find({
      where: {activoSn: 'S'}
    });
  }

  /**
   * Busca tipo de sensor por nombre
   */
  async findByNombre(nombre: string): Promise<TipoSensor[]> {
    return this.find({
      where: {nombre: {like: `%${nombre}%`}}
    });
  }

  /**
   * Activa/desactiva un tipo de sensor
   */
  async toggleActive(id: number): Promise<void> {
    const sensor = await this.findById(id);
    const newStatus = sensor.activoSn === 'S' ? 'N' : 'S';
    
    await this.updateById(id, {
      activoSn: newStatus,
      fechaModificacion: new Date().toISOString()
    });
  }
}
