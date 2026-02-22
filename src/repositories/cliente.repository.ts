import {inject, Getter} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {
  public readonly empresa: BelongsToAccessor<Empresa, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Cliente, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
