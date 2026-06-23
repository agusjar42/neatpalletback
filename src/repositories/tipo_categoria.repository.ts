import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoCategoria, TipoCategoriaRelations} from '../models';

export class TipoCategoriaRepository extends DefaultCrudRepository<
  TipoCategoria,
  typeof TipoCategoria.prototype.id,
  TipoCategoriaRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql')
    dataSource: NeatpalletmysqlDataSource,
  ) {
    super(TipoCategoria, dataSource);
  }
}
