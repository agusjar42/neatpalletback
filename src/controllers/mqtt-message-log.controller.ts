import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {MqttMessageLog} from '../models';
import {MqttMessageLogRepository} from '../repositories';
import {MqttSubscriberService} from '../services/mqtt-subscriber.service';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class MqttMessageLogController {
  constructor(
    @repository(MqttMessageLogRepository)
    public mqttMessageLogRepository: MqttMessageLogRepository,
    @inject('lifeCycleObservers.MqttSubscriberService')
    private mqttSubscriberService: MqttSubscriberService,
  ) {}

  @get('/mqtt-logs')
  @response(200, {
    description: 'Paginated list of MQTT message logs (newest first)',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(MqttMessageLog)},
      },
    },
  })
  async find(
    @param.query.number('page') page = 1,
    @param.query.number('limit') limit = 50,
  ): Promise<MqttMessageLog[]> {
    const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const filter: Filter<MqttMessageLog> = {
      limit: safeLimit,
      skip,
      order: ['receivedAt DESC', 'id DESC'],
    };

    return this.mqttMessageLogRepository.find(filter);
  }

  @get('/mqtt-logs/{id}')
  @response(200, {
    description: 'Single MQTT message log record',
    content: {'application/json': {schema: getModelSchemaRef(MqttMessageLog)}},
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<MqttMessageLog> {
    return this.mqttMessageLogRepository.findById(id);
  }

  @get('/mqtt/status')
  @response(200, {
    description: 'MQTT subscriber status',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  status(): object {
    return this.mqttSubscriberService.getStatus();
  }
}
