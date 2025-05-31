import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {PalletsMovements, PalletsMovementsRelations} from '../models';

export class PalletsMovementsRepository extends DefaultCrudRepository<
  PalletsMovements,
  typeof PalletsMovements.prototype.id,
  PalletsMovementsRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(PalletsMovements, dataSource);
  }
}
