import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {SensorEmpresa, SensorEmpresaRelations, TipoSensor, Empresa} from '../models';
import {TipoSensorRepository} from './tipo_sensor.repository';
import {EmpresaRepository} from './empresa.repository';

export class SensorEmpresaRepository extends DefaultCrudRepository<
  SensorEmpresa,
  typeof SensorEmpresa.prototype.id,
  SensorEmpresaRelations
> {

  public readonly tipoSensor: BelongsToAccessor<TipoSensor, typeof SensorEmpresa.prototype.id>;
  public readonly empresa: BelongsToAccessor<Empresa, typeof SensorEmpresa.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('TipoSensorRepository') protected tipoSensorRepositoryGetter: Getter<TipoSensorRepository>,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(SensorEmpresa, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.tipoSensor = this.createBelongsToAccessorFor('tipoSensor', tipoSensorRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.registerInclusionResolver('tipoSensor', this.tipoSensor.inclusionResolver);
  }

  /**
   * Encuentra sensores por empresa
   */
  async findByEmpresa(empresaId: number): Promise<SensorEmpresa[]> {
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['tipoSensor', 'empresa']
    });
  }

  /**
   * Encuentra sensores por tipo de sensor
   */
  async findByTipoSensor(tipoSensorId: number): Promise<SensorEmpresa[]> {
    return this.find({
      where: {
        tipoSensorId: tipoSensorId
      },
      include: ['tipoSensor', 'empresa']
    });
  }

  /**
   * Obtiene configuración de sensor para una empresa y tipo específico
   */
  async findByEmpresaAndTipo(empresaId: number, tipoSensorId: number): Promise<SensorEmpresa | null> {
    return this.findOne({
      where: {
        and: [
          {empresaId: empresaId},
          {tipoSensorId: tipoSensorId}
        ]
      },
      include: ['tipoSensor', 'empresa']
    });
  }

  /**
   * Cuenta configuraciones de sensores por empresa
   */
  async countByEmpresa(empresaId: number): Promise<number> {
    const result = await this.count({
      empresaId: empresaId
    });
    return result.count;
  }
}
