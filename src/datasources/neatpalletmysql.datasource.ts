import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';

// get .env configuration
dotenv.config({path: '.env'});
//
//Por defecto usamos el entorno LOCAL
//
let config = {
  name: 'mysql',
  connector: 'mysql',
  host: process.env.MYSQL_HOST_LOCAL,
  port: process.env.MYSQL_PORT_LOCAL,
  user: process.env.MYSQL_USER_LOCAL,
  password: process.env.MYSQL_PASSWORD_LOCAL,
  database: process.env.MYSQL_DATABASE_LOCAL
};
//
//Si es DEV sobreescribo
//
if(process.env.ENTORNO == "DEV"){
  config = {
   name: 'mysql',
   connector: 'mysql',
   host: process.env.MYSQL_HOST_DEV,
   port: process.env.MYSQL_PORT_DEV,
   user: process.env.MYSQL_USER_DEV,
   password: process.env.MYSQL_PASSWORD_DEV,
   database: process.env.MYSQL_DATABASE_DEV
 };
}
//
//Si es PRE sobreescribo
//
if(process.env.ENTORNO == "PRE"){
  config = {
   name: 'mysql',
   connector: 'mysql',
   host: process.env.MYSQL_HOST_PRE,
   port: process.env.MYSQL_PORT_PRE,
   user: process.env.MYSQL_USER_PRE,
   password: process.env.MYSQL_PASSWORD_PRE,
   database: process.env.MYSQL_DATABASE_PRE
 };
}
//
//Si es PRO sobreescribo
//
if(process.env.ENTORNO == "PRO"){
  config = {
   name: 'mysql',
   connector: 'mysql',
   host: process.env.MYSQL_HOST_PRO,
   port: process.env.MYSQL_PORT_PRO,
   user: process.env.MYSQL_USER_PRO,
   password: process.env.MYSQL_PASSWORD_PRO,
   database: process.env.MYSQL_DATABASE_PRO
 };
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NeatpalletmysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'neatpalletmysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.neatpalletmysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
