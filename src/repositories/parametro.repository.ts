import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Parametro, ParametroRelations} from '../models';

export class ParametroRepository extends DefaultCrudRepository<
  Parametro,
  typeof Parametro.prototype.id,
  ParametroRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Parametro, dataSource);
  }
}
