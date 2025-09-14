import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioConfiguracionEmpresa, EnvioConfiguracionEmpresaRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class EnvioConfiguracionEmpresaRepository extends DefaultCrudRepository<
  EnvioConfiguracionEmpresa,
  typeof EnvioConfiguracionEmpresa.prototype.id,
  EnvioConfiguracionEmpresaRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof EnvioConfiguracionEmpresa.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(EnvioConfiguracionEmpresa, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }

  /**
   * Encuentra configuraciones por empresa
   */
  async findByEmpresa(empresaId: number): Promise<EnvioConfiguracionEmpresa[]> {
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['empresa']
    });
  }

  /**
   * Encuentra configuración por nombre y empresa
   */
  async findByNombreAndEmpresa(nombre: string, empresaId: number): Promise<EnvioConfiguracionEmpresa | null> {
    return this.findOne({
      where: {
        and: [
          {nombre: nombre},
          {empresaId: empresaId}
        ]
      },
      include: ['empresa']
    });
  }

  /**
   * Actualiza o crea configuración de empresa
   */
  async upsertConfiguracion(empresaId: number, nombre: string, valor: string, unidadMedida?: string): Promise<EnvioConfiguracionEmpresa> {
    const existing = await this.findByNombreAndEmpresa(nombre, empresaId);
    
    if (existing) {
      await this.updateById(existing.id!, {
        valor: valor,
        unidadMedida: unidadMedida,
        fechaModificacion: new Date().toISOString()
      });
      return this.findById(existing.id!);
    } else {
      return this.create({
        empresaId: empresaId,
        nombre: nombre,
        valor: valor,
        unidadMedida: unidadMedida
      });
    }
  }
}