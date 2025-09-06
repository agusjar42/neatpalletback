import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {ParametrosPalletsDetalle, ParametrosPalletsDetalleRelations} from '../models';

export class ParametrosPalletsDetalleRepository extends DefaultCrudRepository<
  ParametrosPalletsDetalle,
  typeof ParametrosPalletsDetalle.prototype.id,
  ParametrosPalletsDetalleRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(ParametrosPalletsDetalle, dataSource);
  }
}