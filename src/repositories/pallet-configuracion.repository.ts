import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {PalletConfiguracion, PalletConfiguracionRelations} from '../models';

export class PalletConfiguracionRepository extends DefaultCrudRepository<
  PalletConfiguracion,
  typeof PalletConfiguracion.prototype.id,
  PalletConfiguracionRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(PalletConfiguracion, dataSource);
  }
}