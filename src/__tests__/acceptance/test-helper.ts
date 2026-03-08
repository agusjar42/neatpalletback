import {NeatpalletBackApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new NeatpalletBackApplication({
    rest: restConfig,
  });

  // Use an in-memory datasource for acceptance tests to avoid requiring MySQL.
  app.bind('datasources.config.neatpalletmysql').to({
    name: 'neatpalletmysql',
    connector: 'memory',
  } as any);

  await app.boot();
  await app.migrateSchema({existingSchema: 'drop'});
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: NeatpalletBackApplication;
  client: Client;
}
