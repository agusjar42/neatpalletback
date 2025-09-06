import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Envio, EnvioRelations} from '../models';

export class EnvioRepository extends DefaultCrudRepository<
  Envio,
  typeof Envio.prototype.id,
  EnvioRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(Envio, dataSource);
  }
}