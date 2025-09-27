import * as fs from 'fs';
import {ApplicationConfig, NeatpalletBackApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new NeatpalletBackApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log('url::> ', url)
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      protocol: ((process.env.ENTORNO == "PRO") || (process.env.ENTORNO == "DEV") || (process.env.ENTORNO == "PRE")) ? ((process.env.PROTOCOL || 'http')) : 'http',
      key: (process.env.ENTORNO == "PRO" && process.env.KEY_PRO) ? fs.readFileSync(process.env.KEY_PRO) : (process.env.ENTORNO == "PRE" && process.env.KEY_PRE) ? fs.readFileSync(process.env.KEY_PRE) : (process.env.ENTORNO == "DEV" && process.env.KEY_DEV) ? fs.readFileSync(process.env.KEY_DEV) : '',
      cert: (process.env.ENTORNO == "PRO" && process.env.CERT_PRO) ? fs.readFileSync(process.env.CERT_PRO) : (process.env.ENTORNO == "PRE" && process.env.CERT_PRE) ? fs.readFileSync(process.env.CERT_PRE) : (process.env.ENTORNO == "DEV" && process.env.CERT_DEV) ? fs.readFileSync(process.env.CERT_DEV) : '',
      port: (process.env.ENTORNO == "PRO") ? (process.env.PORT_PRO) : (process.env.ENTORNO == "DEV") ? process.env.PORT_DEV : (process.env.ENTORNO == "PRE") ? process.env.PORT_PRE : (process.env.PORT_LOCAL),
      host: (process.env.ENTORNO == "PRO") ? (process.env.HOST_PRO) : (process.env.ENTORNO == "DEV") ? process.env.HOST_DEV : (process.env.ENTORNO == "PRE") ? process.env.HOST_PRE : (process.env.HOST_LOCAL),
      gracePeriodForClose: 5000, // 5 seconds
      // Configuración para permitir payloads más grandes (necesario para imágenes base64)
      requestBodyParser: {
        json: {
          limit: '50mb' // Aumenta el límite para JSON (incluye imágenes base64)
        },
        text: {
          limit: '50mb'
        },
        urlencoded: {
          limit: '50mb',
          extended: true
        },
        raw: {
          limit: '50mb'
        }
      },
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
