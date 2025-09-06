import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Pallet, PalletRelations} from '../models';

export class PalletRepository extends DefaultCrudRepository<
  Pallet,
  typeof Pallet.prototype.id,
  PalletRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Pallet, dataSource);
  }
}