import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoTransporte, TipoTransporteRelations} from '../models';

export class TipoTransporteRepository extends DefaultCrudRepository<
  TipoTransporte,
  typeof TipoTransporte.prototype.id,
  TipoTransporteRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(TipoTransporte, dataSource);
  }

  /**
   * Busca tipos de transporte por nombre
   */
  async findByNombre(nombre: string): Promise<TipoTransporte[]> {
    return this.find({
      where: {
        nombre: {like: `%${nombre}%`}
      }
    });
  }

  /**
   * Obtiene tipo de transporte por nombre exacto
   */
  async findByNombreExacto(nombre: string): Promise<TipoTransporte | null> {
    return this.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  /**
   * Obtiene todos los tipos ordenados por nombre
   */
  async findAllOrdered(): Promise<TipoTransporte[]> {
    return this.find({
      order: ['nombre ASC']
    });
  }
}