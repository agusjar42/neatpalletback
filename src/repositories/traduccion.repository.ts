import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Traduccion, TraduccionRelations} from '../models';

export class TraduccionRepository extends DefaultCrudRepository<
  Traduccion,
  typeof Traduccion.prototype.id,
  TraduccionRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Traduccion, dataSource);
  }
}
