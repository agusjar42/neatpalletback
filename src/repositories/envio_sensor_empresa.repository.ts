import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioSensorEmpresa, EnvioSensorEmpresaRelations, TipoSensor, Empresa} from '../models';
import {TipoSensorRepository} from './tipo_sensor.repository';
import {EmpresaRepository} from './empresa.repository';

export class EnvioSensorEmpresaRepository extends DefaultCrudRepository<
  EnvioSensorEmpresa,
  typeof EnvioSensorEmpresa.prototype.id,
  EnvioSensorEmpresaRelations
> {

  public readonly tipoSensor: BelongsToAccessor<TipoSensor, typeof EnvioSensorEmpresa.prototype.id>;
  public readonly empresa: BelongsToAccessor<Empresa, typeof EnvioSensorEmpresa.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('TipoSensorRepository') protected tipoSensorRepositoryGetter: Getter<TipoSensorRepository>,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(EnvioSensorEmpresa, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.tipoSensor = this.createBelongsToAccessorFor('tipoSensor', tipoSensorRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.registerInclusionResolver('tipoSensor', this.tipoSensor.inclusionResolver);
  }

  /**
   * Encuentra sensores por empresa
   */
  async findByEmpresa(empresaId: number): Promise<EnvioSensorEmpresa[]> {
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
  async findByTipoSensor(tipoSensorId: number): Promise<EnvioSensorEmpresa[]> {
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
  async findByEmpresaAndTipo(empresaId: number, tipoSensorId: number): Promise<EnvioSensorEmpresa | null> {
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
