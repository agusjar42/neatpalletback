import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {PalletConfiguracionGeneral, PalletConfiguracionGeneralRelations} from '../models';

export class PalletConfiguracionGeneralRepository extends DefaultCrudRepository<
  PalletConfiguracionGeneral,
  typeof PalletConfiguracionGeneral.prototype.id,
  PalletConfiguracionGeneralRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(PalletConfiguracionGeneral, dataSource);
  }
}