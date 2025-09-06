import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioVehiculo, EnvioVehiculoRelations} from '../models';

export class EnvioVehiculoRepository extends DefaultCrudRepository<
  EnvioVehiculo,
  typeof EnvioVehiculo.prototype.id,
  EnvioVehiculoRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioVehiculo, dataSource);
  }
}