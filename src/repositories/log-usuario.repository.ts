import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {LogUsuario, LogUsuarioRelations} from '../models';

export class LogUsuarioRepository extends DefaultCrudRepository<
  LogUsuario,
  typeof LogUsuario.prototype.id,
  LogUsuarioRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(LogUsuario, dataSource);
  }
}
