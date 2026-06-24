import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioOperario, EnvioOperarioRelations} from '../models';

export class EnvioOperarioRepository extends DefaultCrudRepository<
  EnvioOperario,
  typeof EnvioOperario.prototype.id,
  EnvioOperarioRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioOperario, dataSource);
  }
}
