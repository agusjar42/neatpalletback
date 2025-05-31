import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Seccion, SeccionRelations} from '../models';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id,
  SeccionRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Seccion, dataSource);
  }
}
