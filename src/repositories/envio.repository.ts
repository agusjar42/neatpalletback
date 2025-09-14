import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Envio, EnvioRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class EnvioRepository extends DefaultCrudRepository<
  Envio,
  typeof Envio.prototype.id,
  EnvioRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Envio.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Envio, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }

  /**
   * Encuentra envíos por empresa
   */
  async findByEmpresa(empresaId: number): Promise<Envio[]> {
    return this.find({
      where: {
        empresaId: empresaId
      },
      include: ['empresa']
    });
  }

  /**
   * Encuentra envíos por rango de fechas de salida
   */
  async findByFechaSalida(fechaInicio: string, fechaFin: string): Promise<Envio[]> {
    return this.find({
      where: {
        fechaSalida: {
          between: [fechaInicio, fechaFin]
        }
      },
      include: ['empresa']
    });
  }

  /**
   * Encuentra envíos por origen y destino
   */
  async findByRuta(origen: string, destino: string): Promise<Envio[]> {
    return this.find({
      where: {
        and: [
          {origenRuta: {like: `%${origen}%`}},
          {destinoRuta: {like: `%${destino}%`}}
        ]
      },
      include: ['empresa']
    });
  }

  /**
   * Cuenta envíos por empresa
   */
  async countByEmpresa(empresaId: number): Promise<number> {
    const result = await this.count({
      empresaId: empresaId
    });
    return result.count;
  }
}