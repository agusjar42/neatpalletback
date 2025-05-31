import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {ListaPermisos, ListaPermisosRelations} from '../models/lista-permisos.model';

export class ListaPermisosRepository extends DefaultCrudRepository<
  ListaPermisos,
  typeof ListaPermisos.prototype.id,
  ListaPermisosRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(ListaPermisos, dataSource);
  }
}
