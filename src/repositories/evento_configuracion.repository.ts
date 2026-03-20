import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {
  EventoConfiguracion,
  EventoConfiguracionRelations,
} from '../models';

export class EventoConfiguracionRepository extends DefaultCrudRepository<
  EventoConfiguracion,
  typeof EventoConfiguracion.prototype.id,
  EventoConfiguracionRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql')
    dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EventoConfiguracion, dataSource);
  }
}
