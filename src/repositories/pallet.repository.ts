import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Pallet, PalletRelations, EnvioPallet, PalletParametro} from '../models';
import {EnvioPalletRepository} from './envio_pallet.repository';
import {PalletParametroRepository} from './pallet_parametro.repository';

export class PalletRepository extends DefaultCrudRepository<
  Pallet,
  typeof Pallet.prototype.id,
  PalletRelations
> {
  public readonly envioPallets: HasManyRepositoryFactory<EnvioPallet, typeof Pallet.prototype.id>;
  public readonly palletParametros: HasManyRepositoryFactory<PalletParametro, typeof Pallet.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EnvioPalletRepository') protected envioPalletRepositoryGetter: Getter<EnvioPalletRepository>,
    @repository.getter('PalletParametroRepository') protected palletParametroRepositoryGetter: Getter<PalletParametroRepository>,
  ) {
    super(Pallet, dataSource);
    this.palletParametros = this.createHasManyRepositoryFactoryFor('palletParametros', palletParametroRepositoryGetter);
    this.registerInclusionResolver('palletParametros', this.palletParametros.inclusionResolver);
    this.envioPallets = this.createHasManyRepositoryFactoryFor('envioPallets', envioPalletRepositoryGetter);
    this.registerInclusionResolver('envioPallets', this.envioPallets.inclusionResolver);
  }

  /**
   * Busca pallet por código
   */
  async findByCodigo(codigo: string): Promise<Pallet | null> {
    return this.findOne({
      where: {
        codigo: codigo,
      },
      include: ['palletParametros', 'envioPallets'],
    });
  }

  /**
   * Busca pallets por alias
   */
  async findByAlias(alias: string): Promise<Pallet[]> {
    return this.find({
      where: {
        alias: {like: `%${alias}%`},
      },
      include: ['palletParametros', 'envioPallets'],
    });
  }

  /**
   * Obtiene pallets disponibles (no asignados a envíos activos)
   */
  async findAvailable(): Promise<Pallet[]> {
    // Esta consulta podría requerir SQL personalizado dependiendo de la lógica de negocio
    return this.find({
      include: ['envioPallets'],
    });
  }
}
