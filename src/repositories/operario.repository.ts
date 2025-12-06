import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Operario, OperarioRelations} from '../models';

export class OperarioRepository extends DefaultCrudRepository<
  Operario,
  typeof Operario.prototype.id,
  OperarioRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Operario, dataSource);
  }
}
