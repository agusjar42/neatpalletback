import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioParada, EnvioParadaRelations, Envio} from '../models';
import {EnvioRepository} from './envio.repository';

export class EnvioParadaRepository extends DefaultCrudRepository<
  EnvioParada,
  typeof EnvioParada.prototype.id,
  EnvioParadaRelations
> {

  public readonly envio: BelongsToAccessor<Envio, typeof EnvioParada.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EnvioRepository') protected envioRepositoryGetter: Getter<EnvioRepository>,
  ) {
    super(EnvioParada, dataSource);
    this.envio = this.createBelongsToAccessorFor('envio', envioRepositoryGetter,);
    this.registerInclusionResolver('envio', this.envio.inclusionResolver);
  }

  /**
   * Encuentra paradas por envío
   */
  async findByEnvio(envioId: number): Promise<EnvioParada[]> {
    return this.find({
      where: {
        envioId: envioId
      },
      order: ['fecha ASC'],
      include: ['envio']
    });
  }

  /**
   * Encuentra paradas por operario
   */
  async findByOperario(operarioId: number): Promise<EnvioParada[]> {
    return this.find({
      where: {
        operarioId: operarioId
      },
      include: ['envio', 'operario']
    });
  }

  /**
   * Encuentra paradas por fecha
   */
  async findByFecha(fecha: string): Promise<EnvioParada[]> {
    return this.find({
      where: {
        fecha: fecha
      },
      include: ['envio']
    });
  }

  /**
   * Encuentra paradas por rango de fechas
   */
  async findByFechaRange(fechaInicio: string, fechaFin: string): Promise<EnvioParada[]> {
    return this.find({
      where: {
        fecha: {
          between: [fechaInicio, fechaFin]
        }
      },
      order: ['fecha ASC'],
      include: ['envio']
    });
  }

  /**
   * Cuenta paradas por envío
   */
  async countByEnvio(envioId: number): Promise<number> {
    const result = await this.count({
      envioId: envioId
    });
    return result.count;
  }
}