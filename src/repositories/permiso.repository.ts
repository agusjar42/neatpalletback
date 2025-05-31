import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Permiso, PermisoRelations} from '../models';

export class PermisoRepository extends DefaultCrudRepository<
  Permiso,
  typeof Permiso.prototype.id,
  PermisoRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Permiso, dataSource);
  }
}
