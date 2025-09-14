import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioPallet, EnvioPalletRelations, Pallet, Envio} from '../models';
import {PalletRepository} from './pallet.repository';
import {EnvioRepository} from './envio.repository';

export class EnvioPalletRepository extends DefaultCrudRepository<
  EnvioPallet,
  typeof EnvioPallet.prototype.id,
  EnvioPalletRelations
> {

  public readonly pallet: BelongsToAccessor<Pallet, typeof EnvioPallet.prototype.id>;
  public readonly envio: BelongsToAccessor<Envio, typeof EnvioPallet.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('PalletRepository') protected palletRepositoryGetter: Getter<PalletRepository>,
    @repository.getter('EnvioRepository') protected envioRepositoryGetter: Getter<EnvioRepository>,
  ) {
    super(EnvioPallet, dataSource);
    this.envio = this.createBelongsToAccessorFor('envio', envioRepositoryGetter,);
    this.pallet = this.createBelongsToAccessorFor('pallet', palletRepositoryGetter,);
    this.registerInclusionResolver('envio', this.envio.inclusionResolver);
    this.registerInclusionResolver('pallet', this.pallet.inclusionResolver);
  }

  /**
   * Encuentra pallets por envío
   */
  async findByEnvio(envioId: number): Promise<EnvioPallet[]> {
    return this.find({
      where: {
        envioId: envioId
      },
      include: ['pallet', 'envio']
    });
  }

  /**
   * Encuentra envíos por pallet
   */
  async findByPallet(palletId: number): Promise<EnvioPallet[]> {
    return this.find({
      where: {
        palletId: palletId
      },
      include: ['pallet', 'envio']
    });
  }

  /**
   * Verifica si un pallet está asignado a un envío
   */
  async isPalletAssigned(palletId: number): Promise<boolean> {
    const count = await this.count({
      palletId: palletId
    });
    return count.count > 0;
  }

  /**
   * Obtiene el envío actual de un pallet (si existe)
   */
  async getCurrentEnvioByPallet(palletId: number): Promise<EnvioPallet | null> {
    return this.findOne({
      where: {
        palletId: palletId
      },
      order: ['fechaCreacion DESC'],
      include: ['envio']
    });
  }

  /**
   * Cuenta pallets por envío
   */
  async countPalletsByEnvio(envioId: number): Promise<number> {
    const result = await this.count({
      envioId: envioId
    });
    return result.count;
  }

  /**
   * Asigna un pallet a un envío
   */
  async assignPalletToEnvio(palletId: number, envioId: number, usuarioCreacion?: number): Promise<EnvioPallet> {
    // Verificar si ya está asignado
    const existing = await this.findOne({
      where: {
        and: [
          {palletId: palletId},
          {envioId: envioId}
        ]
      }
    });

    if (existing) {
      throw new Error('Pallet ya está asignado a este envío');
    }

    return this.create({
      palletId: palletId,
      envioId: envioId,
      usuarioCreacion: usuarioCreacion
    });
  }
}