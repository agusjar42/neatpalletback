import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {RefrescarToken, RefrescarTokenRelations} from '../models';

export class RefrescarTokenRepository extends DefaultCrudRepository<
  RefrescarToken,
  typeof RefrescarToken.prototype.id,
  RefrescarTokenRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(RefrescarToken, dataSource);
  }
}
