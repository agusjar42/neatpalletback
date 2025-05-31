import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {NeatpalletmysqlDataSource} from '../datasources';
import {Usuario, UsuarioCredenciales, UsuarioRelations} from '../models';
import { UsuarioCredencialesRepository } from './usuario-credenciales.repository';

export type Credentials = {
  mail: string;
  password: string;
};

export type UserData = {
  mail: string;
  password: string;
  empresaId: number,
  rolId: number;
}

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<UsuarioCredenciales, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.neatpalletmysql') dataSource: NeatpalletmysqlDataSource,
    @repository.getter('UsuarioCredencialesRepository') protected userCredentialsRepositoryGetter: Getter<UsuarioCredencialesRepository>,
  ) {
    super(Usuario, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof Usuario.prototype.id,
  ): Promise<UsuarioCredenciales | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
