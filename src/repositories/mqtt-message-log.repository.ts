import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {MqttMessageLog, MqttMessageLogRelations} from '../models';

export class MqttMessageLogRepository extends DefaultCrudRepository<
  MqttMessageLog,
  typeof MqttMessageLog.prototype.id,
  MqttMessageLogRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(MqttMessageLog, dataSource);
  }
}

