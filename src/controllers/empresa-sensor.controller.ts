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
import {EmpresaSensor} from '../models';
import {EmpresaSensorRepository} from '../repositories';
import {SqlFilterUtil} from '../utils/sql-filter.util';
import {authorize} from '@loopback/authorization';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
@authorize({allowedRoles: ['API']})
export class EmpresaSensorController {
  //
  //Usamos una subconsulta en vez de depender de la vista fisica
  //para evitar roturas cuando cambian columnas en empresa_sensor
  //
  private readonly fuenteEmpresaSensorTipoSensor = `(
    SELECT
      es.id AS id,
      es.tipoSensorId AS tipoSensorId,
      es.empresaId AS empresaId,
      es.orden AS orden,
      es.valorMinimo AS valorMinimo,
      es.valorMaximo AS valorMaximo,
      es.activoSn AS activoSn,
      es.usuarioCreacion AS usuarioCreacion,
      es.fechaCreacion AS fechaCreacion,
      es.usuarioModificacion AS usuarioModificacion,
      es.fechaModificacion AS fechaModificacion,
      ts.nombre AS nombre,
      ts.unidad AS unidad
    FROM empresa_sensor es
    JOIN tipo_sensor ts ON es.tipoSensorId = ts.id
  ) vista_empresa_sensor_tipo_sensor`;

  //
  //Normalizamos el estado activo para guardar siempre S o N en bbdd
  //
  private normalizarActivoSn(valor: unknown): string | undefined {
    if (valor === undefined) {
      return undefined;
    }

    if (valor === null || valor === '' || valor === false || valor === 'false' || valor === 'N') {
      return 'N';
    }

    if (valor === true || valor === 'true' || valor === 'S') {
      return 'S';
    }

    return String(valor).toUpperCase() === 'S' ? 'S' : 'N';
  }

  constructor(
    @repository(EmpresaSensorRepository)
    public empresaSensorRepository: EmpresaSensorRepository,
  ) {}

  @post('/empresa-sensores')
  @response(200, {
    description: 'EmpresaSensor model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpresaSensor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {
            title: 'NewEmpresaSensor',
            exclude: ['id'],
          }),
        },
      },
    })
    empresaSensor: Omit<EmpresaSensor, 'id'>,
  ): Promise<EmpresaSensor> {
    //
    //Aseguramos que activoSn se persista con el formato esperado
    //
    empresaSensor.activoSn = this.normalizarActivoSn(empresaSensor.activoSn) ?? 'S';
    return this.empresaSensorRepository.create(empresaSensor);
  }

  @get('/empresa-sensores/count')
  @response(200, {
    description: 'EmpresaSensor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpresaSensor) where?: Where<EmpresaSensor>,
  ): Promise<Count> {
    const dataSource = this.empresaSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQueryCount(
      dataSource,
      this.fuenteEmpresaSensorTipoSensor,
      where,
    );
  }

  @get('/empresa-sensores')
  @response(200, {
    description: 'Array of EmpresaSensor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpresaSensor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpresaSensor) filter?: Filter<EmpresaSensor>,
  ): Promise<EmpresaSensor[]> {
    const dataSource = this.empresaSensorRepository.dataSource;
    return await SqlFilterUtil.ejecutarQuerySelect(
      dataSource,
      this.fuenteEmpresaSensorTipoSensor,
      filter,
      '*',
    );
  }

  @patch('/empresa-sensores')
  @response(200, {
    description: 'EmpresaSensor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {partial: true}),
        },
      },
    })
    empresaSensor: EmpresaSensor,
    @param.where(EmpresaSensor) where?: Where<EmpresaSensor>,
  ): Promise<Count> {
    //
    //Normalizamos activoSn tambien en updates masivos
    //
    empresaSensor.activoSn = this.normalizarActivoSn(empresaSensor.activoSn);
    return this.empresaSensorRepository.updateAll(empresaSensor, where);
  }

  @get('/empresa-sensores/{id}')
  @response(200, {
    description: 'EmpresaSensor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpresaSensor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmpresaSensor, {exclude: 'where'})
    filter?: FilterExcludingWhere<EmpresaSensor>,
  ): Promise<EmpresaSensor> {
    return this.empresaSensorRepository.findById(id, filter);
  }

  @patch('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaSensor, {partial: true}),
        },
      },
    })
    empresaSensor: EmpresaSensor,
  ): Promise<void> {
    //
    //Normalizamos el flag activo antes de guardar la edicion
    //
    empresaSensor.activoSn = this.normalizarActivoSn(empresaSensor.activoSn);
    await this.empresaSensorRepository.updateById(id, empresaSensor);
  }

  @put('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() empresaSensor: EmpresaSensor,
  ): Promise<void> {
    //
    //Mantenemos el mismo criterio de normalizacion en replace
    //
    empresaSensor.activoSn = this.normalizarActivoSn(empresaSensor.activoSn) ?? 'S';
    await this.empresaSensorRepository.replaceById(id, empresaSensor);
  }

  @del('/empresa-sensores/{id}')
  @response(204, {
    description: 'EmpresaSensor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.empresaSensorRepository.deleteById(id);
  }

  @post('/crear-empresa-sensor-desde-tipo-sensor')
  @response(204, {
    description: 'Crear sensores de empresa desde tipos de sensor',
  })
  async crearSensoresDesdeTipoSensor(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              empresaId: {type: 'number'},
              usuarioCreacion: {type: 'number'},
            },
            required: ['empresaId'],
          },
        },
      },
    })
    dto: {empresaId: number; usuarioCreacion?: number},
  ): Promise<void> {
    const dataSource = this.empresaSensorRepository.dataSource;
    await dataSource.execute(
      `DELETE FROM empresa_sensor WHERE empresaId = ${dto.empresaId}`,
    );
    await dataSource.execute(
      `INSERT INTO empresa_sensor (empresaId, tipoSensorId, orden, valorMinimo, valorMaximo, activoSn, usuarioCreacion)
       SELECT ${dto.empresaId}, ts.id, ts.orden, COALESCE(ts.valorDefecto, '0'), NULL, 'S', ${dto.usuarioCreacion ?? 0}
       FROM tipo_sensor ts
       WHERE (ts.activoSn = 'S' OR ts.activoSn IS NULL)`,
    );
  }
}
