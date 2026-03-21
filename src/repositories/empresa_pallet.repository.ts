import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EmpresaPallet, EmpresaPalletRelations, Empresa, Pallet} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {PalletRepository} from './pallet.repository';

export class EmpresaPalletRepository extends DefaultCrudRepository<
  EmpresaPallet,
  typeof EmpresaPallet.prototype.id,
  EmpresaPalletRelations
> {
  public readonly empresa: BelongsToAccessor<Empresa, typeof EmpresaPallet.prototype.id>;
  public readonly pallet: BelongsToAccessor<Pallet, typeof EmpresaPallet.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
    @repository.getter('PalletRepository') protected palletRepositoryGetter: Getter<PalletRepository>,
  ) {
    super(EmpresaPallet, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter);
    this.pallet = this.createBelongsToAccessorFor('pallet', palletRepositoryGetter);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.registerInclusionResolver('pallet', this.pallet.inclusionResolver);
  }

  async findByEmpresa(empresaId: number): Promise<EmpresaPallet[]> {
    return this.find({
      where: {empresaId},
      include: ['empresa', 'pallet'],
    });
  }

  async findByPallet(palletId: number): Promise<EmpresaPallet[]> {
    return this.find({
      where: {palletId},
      include: ['empresa', 'pallet'],
    });
  }
}
