import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioContenido, EnvioContenidoRelations} from '../models';

export class EnvioContenidoRepository extends DefaultCrudRepository<
  EnvioContenido,
  typeof EnvioContenido.prototype.id,
  EnvioContenidoRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioContenido, dataSource);
  }
}