import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioPalletMovimiento, EnvioPalletMovimientoRelations, TipoSensor, EnvioPallet} from '../models';
import {TipoSensorRepository} from './tipo_sensor.repository';
import {EnvioPalletRepository} from './envio_pallet.repository';

export class EnvioPalletMovimientoRepository extends DefaultCrudRepository<
  EnvioPalletMovimiento,
  typeof EnvioPalletMovimiento.prototype.id,
  EnvioPalletMovimientoRelations
> {

  public readonly tipoSensor: BelongsToAccessor<TipoSensor, typeof EnvioPalletMovimiento.prototype.id>;
  public readonly envioPallet: BelongsToAccessor<EnvioPallet, typeof EnvioPalletMovimiento.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('TipoSensorRepository') protected tipoSensorRepositoryGetter: Getter<TipoSensorRepository>,
    @repository.getter('EnvioPalletRepository') protected envioPalletRepositoryGetter: Getter<EnvioPalletRepository>,
  ) {
    super(EnvioPalletMovimiento, dataSource);
    this.envioPallet = this.createBelongsToAccessorFor('envioPallet', envioPalletRepositoryGetter,);
    this.tipoSensor = this.createBelongsToAccessorFor('tipoSensor', tipoSensorRepositoryGetter,);
    this.registerInclusionResolver('envioPallet', this.envioPallet.inclusionResolver);
    this.registerInclusionResolver('tipoSensor', this.tipoSensor.inclusionResolver);
  }

  /**
   * Encuentra movimientos por envío
   */
  async findByEnvioPallet(envioPalletId: number): Promise<EnvioPalletMovimiento[]> {
    return this.find({
      where: {
        envioPalletId: envioPalletId
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envioPallet']
    });
  }

  /**
   * Encuentra movimientos por tipo de sensor
   */
  async findByTipoSensor(tipoSensorId: number): Promise<EnvioPalletMovimiento[]> {
    return this.find({
      where: {
        tipoSensorId: tipoSensorId
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envioPallet']
    });
  }

  /**
   * Encuentra movimientos por fecha
   */
  async findByFecha(fecha: string): Promise<EnvioPalletMovimiento[]> {
    return this.find({
      where: {
        fecha: fecha
      },
      order: ['fechaCreacion DESC'],
      include: ['tipoSensor', 'envioPallet']
    });
  }

  /**
   * Encuentra movimientos por rango de fechas
   */
  async findByFechaRange(fechaInicio: string, fechaFin: string): Promise<EnvioPalletMovimiento[]> {
    return this.find({
      where: {
        fecha: {
          between: [fechaInicio, fechaFin]
        }
      },
      order: ['fecha DESC'],
      include: ['tipoSensor', 'envioPallet']
    });
  }

  /**
   * Obtiene último movimiento de un envío
   */
  async getLatestByEnvioPallet(envioPalletId: number): Promise<EnvioPalletMovimiento | null> {
    return this.findOne({
      where: {
        envioPalletId: envioPalletId
      },
      order: ['fecha DESC', 'fechaCreacion DESC'],
      include: ['tipoSensor']
    });
  }

  /**
   * Obtiene último movimiento por tipo de sensor
   */
  async getLatestByEnvioPalletAndTipoSensor(envioPalletId: number, tipoSensorId: number): Promise<EnvioPalletMovimiento | null> {
    return this.findOne({
      where: {
        and: [
          {envioPalletId: envioPalletId},
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
  async countByEnvioPallet(envioPalletId: number): Promise<number> {
    const result = await this.count({
      envioPalletId: envioPalletId
    });
    return result.count;
  }

  /**
   * Registra un nuevo movimiento
   */
  async registrarMovimiento(
    envioPalletId: number, 
    tipoSensorId: number, 
    valor: string, 
    gps?: string, 
    imagen?: string,
    usuarioCreacion?: number
  ): Promise<EnvioPalletMovimiento> {
    return this.create({
      envioPalletId: envioPalletId,
      tipoSensorId: tipoSensorId,
      fecha: new Date().toISOString(),
      valor: valor,
      gps: gps,
      imagen: imagen,
      usuarioCreacion: usuarioCreacion
    });
  }
}
