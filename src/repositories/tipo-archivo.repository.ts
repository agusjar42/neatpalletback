import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoArchivo, TipoArchivoRelations} from '../models';

export class TipoArchivoRepository extends DefaultCrudRepository<
  TipoArchivo,
  typeof TipoArchivo.prototype.id,
  TipoArchivoRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(TipoArchivo, dataSource);
  }
}
