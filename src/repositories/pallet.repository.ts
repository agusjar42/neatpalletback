import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Pallet, PalletRelations, Empresa, EnvioPallet, PalletParametro} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {EnvioPalletRepository} from './envio_pallet.repository';
import {PalletParametroRepository} from './pallet_parametro.repository';

export class PalletRepository extends DefaultCrudRepository<
  Pallet,
  typeof Pallet.prototype.id,
  PalletRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Pallet.prototype.id>;
  public readonly envioPallets: HasManyRepositoryFactory<EnvioPallet, typeof Pallet.prototype.id>;
  public readonly palletParametros: HasManyRepositoryFactory<PalletParametro, typeof Pallet.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
    @repository.getter('EnvioPalletRepository') protected envioPalletRepositoryGetter: Getter<EnvioPalletRepository>,
    @repository.getter('PalletParametroRepository') protected palletParametroRepositoryGetter: Getter<PalletParametroRepository>,
  ) {
    super(Pallet, dataSource);
    this.palletParametros = this.createHasManyRepositoryFactoryFor('palletParametros', palletParametroRepositoryGetter,);
    this.registerInclusionResolver('palletParametros', this.palletParametros.inclusionResolver);
    this.envioPallets = this.createHasManyRepositoryFactoryFor('envioPallets', envioPalletRepositoryGetter,);
    this.registerInclusionResolver('envioPallets', this.envioPallets.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }

  /**
   * Encuentra pallets por empresa
   */
  async findByEmpresa(empresaId: number): Promise<Pallet[]> {
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['empresa', 'palletParametros']
    });
  }

  /**
   * Busca pallet por código
   */
  async findByCodigo(codigo: string): Promise<Pallet | null> {
    return this.findOne({
      where: {
        codigo: codigo
      },
      include: ['empresa', 'palletParametros', 'envioPallets']
    });
  }

  /**
   * Busca pallets por alias
   */
  async findByAlias(alias: string): Promise<Pallet[]> {
    return this.find({
      where: {
        alias: {like: `%${alias}%`}
      },
      include: ['empresa']
    });
  }

  /**
   * Obtiene pallets disponibles (no asignados a envíos activos)
   */
  async findAvailable(empresaId: number): Promise<Pallet[]> {
    // Esta consulta podría requerir SQL personalizado dependiendo de la lógica de negocio
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['empresa', 'envioPallets']
    });
  }

  /**
   * Cuenta pallets por empresa
   */
  async countByEmpresa(empresaId: number): Promise<number> {
    const result = await this.count({
      empresaId: empresaId
    });
    return result.count;
  }
}