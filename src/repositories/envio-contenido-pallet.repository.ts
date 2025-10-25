import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {EnvioContenidoPallet, EnvioContenidoPalletRelations} from '../models';

export class EnvioContenidoPalletRepository extends DefaultCrudRepository<
  EnvioContenidoPallet,
  typeof EnvioContenidoPallet.prototype.id,
  EnvioContenidoPalletRelations
> {
  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
  ) {
    super(EnvioContenidoPallet, dataSource);
  }

  /**
   * Elimina todos los pallets de todos los contenidos de un envío
   * @param envioId El ID del envío
   */
  async deleteByEnvioId(envioId: number): Promise<void> {
    const deleteQuery = `
      DELETE FROM envio_contenido_pallet
      WHERE envioContenidoId IN (
        SELECT id FROM envio_contenido WHERE envioId = ${envioId}
      )
    `;
    await this.dataSource.execute(deleteQuery);
  }
}
