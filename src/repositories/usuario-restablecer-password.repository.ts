import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {UsuarioRestablecerPassword, UsuarioRestablecerPasswordRelations} from '../models';

export class UsuarioRestablecerPasswordRepository extends DefaultCrudRepository<
UsuarioRestablecerPassword,
  typeof UsuarioRestablecerPassword.prototype.id,
  UsuarioRestablecerPasswordRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(UsuarioRestablecerPassword, dataSource);
  }
}
