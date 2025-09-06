import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioPallet, EnvioPalletRelations} from '../models';

export class EnvioPalletRepository extends DefaultCrudRepository<
  EnvioPallet,
  typeof EnvioPallet.prototype.id,
  EnvioPalletRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioPallet, dataSource);
  }
}