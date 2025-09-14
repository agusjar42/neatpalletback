import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioMovimiento, EnvioMovimientoRelations, TipoSensor, Envio} from '../models';
import {TipoSensorRepository} from './tipo_sensor.repository';
import {EnvioRepository} from './envio.repository';

export class EnvioMovimientoRepository extends DefaultCrudRepository<
  EnvioMovimiento,
  typeof EnvioMovimiento.prototype.id,
  EnvioMovimientoRelations
> {

  public readonly tipoSensor: BelongsToAccessor<TipoSensor, typeof EnvioMovimiento.prototype.id>;
  public readonly envio: BelongsToAccessor<Envio, typeof EnvioMovimiento.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('TipoSensorRepository') protected tipoSensorRepositoryGetter: Getter<TipoSensorRepository>,
    @repository.getter('EnvioRepository') protected envioRepositoryGetter: Getter<EnvioRepository>,
  ) {
    super(EnvioMovimiento, dataSource);
    this.envio = this.createBelongsToAccessorFor('envio', envioRepositoryGetter,);
    this.tipoSensor = this.createBelongsToAccessorFor('tipoSensor', tipoSensorRepositoryGetter,);
    this.registerInclusionResolver('envio', this.envio.inclusionResolver);
    this.registerInclusionResolver('tipoSensor', this.tipoSensor.inclusionResolver);
  }

  /**
   * Encuentra movimientos por envío
   */
  async findByEnvio(envioId: number): Promise<EnvioMovimiento[]> {
    return this.find({
      where: {
        envioId: envioId
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Encuentra movimientos por tipo de sensor
   */
  async findByTipoSensor(tipoSensorId: number): Promise<EnvioMovimiento[]> {
    return this.find({
      where: {
        tipoSensorId: tipoSensorId
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Encuentra movimientos por fecha
   */
  async findByFecha(fecha: string): Promise<EnvioMovimiento[]> {
    return this.find({
      where: {
        fecha: fecha
      },
      order: ['fechaCreacion DESC'],
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Encuentra movimientos por rango de fechas
   */
  async findByFechaRange(fechaInicio: string, fechaFin: string): Promise<EnvioMovimiento[]> {
    return this.find({
      where: {
        fecha: {
          between: [fechaInicio, fechaFin]
        }
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envio']
    });
  }

  /**
   * Obtiene último movimiento de un envío
   */
  async getLatestByEnvio(envioId: number): Promise<EnvioMovimiento | null> {
    return this.findOne({
      where: {
        envioId: envioId
      },
      order: ['fecha DESC', 'fechaCreacion DESC'],
      include: ['tipoSensor']
    });
  }

  /**
   * Obtiene último movimiento por tipo de sensor
   */
  async getLatestByEnvioAndTipoSensor(envioId: number, tipoSensorId: number): Promise<EnvioMovimiento | null> {
    return this.findOne({
      where: {
        and: [
          {envioId: envioId},
          {tipoSensorId: tipoSensorId}
        ]
      },
      order: ['fecha DESC', 'fechaCreacion DESC'],
      include: ['tipoSensor']
    });
  }

  /**
   * Cuenta movimientos por envío
   */
  async countByEnvio(envioId: number): Promise<number> {
    const result = await this.count({
      envioId: envioId
    });
    return result.count;
  }

  /**
   * Registra un nuevo movimiento
   */
  async registrarMovimiento(
    envioId: number, 
    tipoSensorId: number, 
    valor: string, 
    gps?: string, 
    imagen?: string,
    usuarioCreacion?: number
  ): Promise<EnvioMovimiento> {
    return this.create({
      envioId: envioId,
      tipoSensorId: tipoSensorId,
      fecha: new Date().toISOString(),
      valor: valor,
      gps: gps,
      imagen: imagen,
      usuarioCreacion: usuarioCreacion
    });
  }
}