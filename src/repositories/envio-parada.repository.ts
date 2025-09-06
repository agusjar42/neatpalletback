import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioParada, EnvioParadaRelations} from '../models';

export class EnvioParadaRepository extends DefaultCrudRepository<
  EnvioParada,
  typeof EnvioParada.prototype.id,
  EnvioParadaRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioParada, dataSource);
  }
}