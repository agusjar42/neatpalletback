import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioConfiguracion, EnvioConfiguracionRelations, Envio} from '../models';
import {EnvioRepository} from './envio.repository';

export class EnvioConfiguracionRepository extends DefaultCrudRepository<
  EnvioConfiguracion,
  typeof EnvioConfiguracion.prototype.id,
  EnvioConfiguracionRelations
> {

  public readonly envio: BelongsToAccessor<Envio, typeof EnvioConfiguracion.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EnvioRepository') protected envioRepositoryGetter: Getter<EnvioRepository>,
  ) {
    super(EnvioConfiguracion, dataSource);
    this.envio = this.createBelongsToAccessorFor('envio', envioRepositoryGetter,);
    this.registerInclusionResolver('envio', this.envio.inclusionResolver);
  }

  /**
   * Encuentra configuraciones por envío
   */
  async findByEnvio(envioId: number): Promise<EnvioConfiguracion[]> {
    return this.find({
      where: {
        envioId: envioId
      },
      include: ['envio']
    });
  }

  /**
   * Encuentra configuración por nombre y envío
   */
  async findByNombreAndEnvio(nombre: string, envioId: number): Promise<EnvioConfiguracion | null> {
    return this.findOne({
      where: {
        and: [
          {nombre: nombre},
          {envioId: envioId}
        ]
      },
      include: ['envio']
    });
  }

  /**
   * Actualiza o crea configuración
   */
  async upsertConfiguracion(envioId: number, nombre: string, valor: string, unidadMedida?: string): Promise<EnvioConfiguracion> {
    const existing = await this.findByNombreAndEnvio(nombre, envioId);
    
    if (existing) {
      await this.updateById(existing.id!, {
        valor: valor,
        unidadMedida: unidadMedida,
        fechaModificacion: new Date().toISOString()
      });
      return this.findById(existing.id!);
    } else {
      return this.create({
        envioId: envioId,
        nombre: nombre,
        valor: valor,
        unidadMedida: unidadMedida
      });
    }
  }
}