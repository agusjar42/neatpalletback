import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Pais, PaisRelations} from '../models';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.id,
  PaisRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Pais, dataSource);
  }
}
