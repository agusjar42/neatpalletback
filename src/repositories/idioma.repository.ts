import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Idioma, IdiomaRelations} from '../models';

export class IdiomaRepository extends DefaultCrudRepository<
  Idioma,
  typeof Idioma.prototype.id,
  IdiomaRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Idioma, dataSource);
  }
}
