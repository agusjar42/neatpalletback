import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EventoConfiguracion} from '../models';
import {EventoConfiguracionRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';
import {authorize} from '@loopback/authorization';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class EventoConfiguracionController {
  constructor(
    @repository(EventoConfiguracionRepository)
    public eventoConfiguracionRepository: EventoConfiguracionRepository,
  ) {}

  @post('/evento-configuraciones')
  @response(200, {
    description: 'EventoConfiguracion model instance',
    content: {'application/json': {schema: getModelSchemaRef(EventoConfiguracion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoConfiguracion, {
            title: 'NewEventoConfiguracion',
            exclude: ['id'],
          }),
        },
      },
    })
    eventoConfiguracion: Omit<EventoConfiguracion, 'id'>,
  ): Promise<EventoConfiguracion> {
    return this.eventoConfiguracionRepository.create(eventoConfiguracion);
  }

  @get('/evento-configuraciones/count')
  @response(200, {
    description: 'EventoConfiguracion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EventoConfiguracion) where?: Where<EventoConfiguracion>,
  ): Promise<Count> {
    const dataSource = this.eventoConfiguracionRepository.dataSource;
    return SqlFilterUtil.ejecutarQueryCount(dataSource, 'evento_configuracion', where);
  }

  @get('/evento-configuraciones')
  @response(200, {
    description: 'Array of EventoConfiguracion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EventoConfiguracion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EventoConfiguracion) filter?: Filter<EventoConfiguracion>,
  ): Promise<EventoConfiguracion[]> {
    const dataSource = this.eventoConfiguracionRepository.dataSource;
    return SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      'evento_configuracion',
      filter,
      '*',
    );
  }

  @patch('/evento-configuraciones')
  @response(200, {
    description: 'EventoConfiguracion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoConfiguracion, {partial: true}),
        },
      },
    })
    eventoConfiguracion: EventoConfiguracion,
    @param.where(EventoConfiguracion) where?: Where<EventoConfiguracion>,
  ): Promise<Count> {
    return this.eventoConfiguracionRepository.updateAll(eventoConfiguracion, where);
  }

  @get('/evento-configuraciones/{id}')
  @response(200, {
    description: 'EventoConfiguracion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EventoConfiguracion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EventoConfiguracion, {exclude: 'where'})
    filter?: FilterExcludingWhere<EventoConfiguracion>,
  ): Promise<EventoConfiguracion> {
    return this.eventoConfiguracionRepository.findById(id, filter);
  }

  @patch('/evento-configuraciones/{id}')
  @response(204, {
    description: 'EventoConfiguracion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoConfiguracion, {partial: true}),
        },
      },
    })
    eventoConfiguracion: EventoConfiguracion,
  ): Promise<void> {
    await this.eventoConfiguracionRepository.updateById(id, eventoConfiguracion);
  }

  @put('/evento-configuraciones/{id}')
  @response(204, {
    description: 'EventoConfiguracion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eventoConfiguracion: EventoConfiguracion,
  ): Promise<void> {
    await this.eventoConfiguracionRepository.replaceById(id, eventoConfiguracion);
  }

  @del('/evento-configuraciones/{id}')
  @response(204, {
    description: 'EventoConfiguracion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventoConfiguracionRepository.deleteById(id);
  }
}
