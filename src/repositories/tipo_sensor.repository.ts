import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoSensor, TipoSensorRelations, Empresa, EnvioSensor, EnvioMovimiento} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {EnvioSensorRepository} from './envio_sensor.repository';
import {EnvioMovimientoRepository} from './envio_movimiento.repository';

export class TipoSensorRepository extends DefaultCrudRepository<
  TipoSensor,
  typeof TipoSensor.prototype.id,
  TipoSensorRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof TipoSensor.prototype.id>;
  public readonly envioSensores: HasManyRepositoryFactory<EnvioSensor, typeof TipoSensor.prototype.id>;
  public readonly envioMovimientos: HasManyRepositoryFactory<EnvioMovimiento, typeof TipoSensor.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
    @repository.getter('EnvioSensorRepository') protected envioSensorRepositoryGetter: Getter<EnvioSensorRepository>,
    @repository.getter('EnvioMovimientoRepository') protected envioMovimientoRepositoryGetter: Getter<EnvioMovimientoRepository>,
  ) {
    super(TipoSensor, dataSource);
    this.envioMovimientos = this.createHasManyRepositoryFactoryFor('envioMovimientos', envioMovimientoRepositoryGetter,);
    this.registerInclusionResolver('envioMovimientos', this.envioMovimientos.inclusionResolver);
    this.envioSensores = this.createHasManyRepositoryFactoryFor('envioSensores', envioSensorRepositoryGetter,);
    this.registerInclusionResolver('envioSensores', this.envioSensores.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }

  /**
   * Encuentra tipos de sensor por empresa
   */
  async findByEmpresa(empresaId: number): Promise<TipoSensor[]> {
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['empresa']
    });
  }

  /**
   * Encuentra tipos de sensor activos
   */
  async findActive(empresaId?: number): Promise<TipoSensor[]> {
    const whereCondition: any = {
      activoSn: 'S'
    };

    if (empresaId) {
      whereCondition.empresaId = empresaId;
    }

    return this.find({
      where: whereCondition,
      include: ['empresa']
    });
  }

  /**
   * Busca tipo de sensor por nombre
   */
  async findByNombre(nombre: string, empresaId?: number): Promise<TipoSensor[]> {
    const whereCondition: any = {
      nombre: {like: `%${nombre}%`}
    };

    if (empresaId) {
      whereCondition.empresaId = empresaId;
    }

    return this.find({
      where: whereCondition,
      include: ['empresa']
    });
  }

  /**
   * Activa/desactiva un tipo de sensor
   */
  async toggleActive(id: number): Promise<void> {
    const sensor = await this.findById(id);
    const newStatus = sensor.activoSn === 'S' ? 'N' : 'S';
    
    await this.updateById(id, {
      activoSn: newStatus,
      fechaModificacion: new Date().toISOString()
    });
  }
}