import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {LugarParada, LugarParadaRelations} from '../models';

export class LugarParadaRepository extends DefaultCrudRepository<
  LugarParada,
  typeof LugarParada.prototype.id,
  LugarParadaRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(LugarParada, dataSource);
  }
}
