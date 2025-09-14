import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {TipoCarroceria, TipoCarroceriaRelations} from '../models';

export class TipoCarroceriaRepository extends DefaultCrudRepository<
  TipoCarroceria,
  typeof TipoCarroceria.prototype.id,
  TipoCarroceriaRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(TipoCarroceria, dataSource);
  }

  /**
   * Busca tipos de carrocería por nombre
   */
  async findByNombre(nombre: string): Promise<TipoCarroceria[]> {
    return this.find({
      where: {
        nombre: {like: `%${nombre}%`}
      }
    });
  }

  /**
   * Obtiene tipo de carrocería por nombre exacto
   */
  async findByNombreExacto(nombre: string): Promise<TipoCarroceria | null> {
    return this.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  /**
   * Obtiene todos los tipos ordenados por nombre
   */
  async findAllOrdered(): Promise<TipoCarroceria[]> {
    return this.find({
      order: ['nombre ASC']
    });
  }
}