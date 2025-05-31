import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {UsuarioCredenciales, UsuarioCredencialesRelations} from '../models';

export class UsuarioCredencialesRepository extends DefaultCrudRepository<
  UsuarioCredenciales,
  typeof UsuarioCredenciales.prototype.id,
  UsuarioCredencialesRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(UsuarioCredenciales, dataSource);
  }
}
