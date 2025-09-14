import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {PalletParametro, PalletParametroRelations} from '../models';

export class PalletParametroRepository extends DefaultCrudRepository<
  PalletParametro,
  typeof PalletParametro.prototype.id,
  PalletParametroRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(PalletParametro, dataSource);
  }
}
