import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {ParametrosPallets, ParametrosPalletsRelations} from '../models';

export class ParametrosPalletsRepository extends DefaultCrudRepository<
  ParametrosPallets,
  typeof ParametrosPallets.prototype.id,
  ParametrosPalletsRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(ParametrosPallets, dataSource);
  }
}