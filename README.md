# neatpallet_back

Este es un proyecto de [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) con el
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

# Proyecto Backend API Neatpallet

A continuación se describe todo lo necesario para este proyecto API.

## Requisitos
Tener instalado Node, en este caso se uso la versión:
- Node: v20.13.1


## Instalar dependencias

De forma predeterminada, las dependencias se instalaron cuando se generó esta aplicación.
Siempre que se cambien las dependencias en `package.json`, ejecute el siguiente comando:

```sh
npm install
```

Para instalar únicamente dependencias resueltas en `package-lock.json`:

```sh
npm ci
```

## Ejecute la aplicación

```sh
npm start
```

También puedes ejecutar `node.` para omitir el paso de compilación.

Abra http://127.0.0.1:3000 en su navegador.

## Compilar el proyecto

Para compilar el proyecto:

```sh
npm run build
```

Para forzar una compilación completa limpiando los artefactos almacenados en caché:

```sh
npm run rebuild
```

## Solucionar problemas de formato y estilo de código

```sh
npm run lint
```

Para solucionar automáticamente estos problemas:

```sh
npm run lint:fix
```

## Otros comandos útiles

- `npm run migrate`: Migrar esquemas de bases de datos para modelos
- `npm run openapi-spec`: Generar especificaciones OpenAPI en un archivo

## Password reset (Forgot/Reset)

Endpoints (públicos):
- `POST /auth/password/forgot` body: `{ "email": "user@example.com" }` (siempre responde 200 con mensaje neutro)
- `POST /auth/password/reset` body: `{ "token": "<rawToken>", "newPassword": "NewPassword123" }`

Variables de entorno:
- `FRONTEND_BASE_URL` (obligatoria): se usa para construir el link `.../reset-password?token=...`
- `RESET_TOKEN_TTL_MINUTES` (default `30`)
- `RESET_TOKEN_PEPPER` (opcional, recomendado)
- `RESET_FORGOT_MAX_PER_HOUR` (default `5`, limita por IP y por email)
- Password policy:
  - `RESET_PASSWORD_MIN_LENGTH` (default `10`)
  - `RESET_PASSWORD_REQUIRE_LETTER` (default `true`)
  - `RESET_PASSWORD_REQUIRE_NUMBER` (default `true`)
- SMTP (si no está configurado, el backend imprime el link en consola para desarrollo):
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (opcional), `SMTP_SECURE` (opcional)

Pasos para probar en local:
1) Crear/migrar tablas (elige una opción):
   - `npm run migrate` (LoopBack `migrateSchema`)
   - o ejecutar los SQL en `database_migrations/` (incluye `password_reset_token` y `usuario.passwordChangedAt`)
2) Exporta `FRONTEND_BASE_URL` (ej: `http://localhost:5173`)
3) Llama a `POST /auth/password/forgot` con tu email; si no hay SMTP, verás el link en consola
4) Copia el `token` del link y llama a `POST /auth/password/reset`

## EJEMPLO (NEATPALLET) -> CREAR BACKEND API - NODEJS - LOOPBACK 4

- Importar el modelo de la base de datos en Workbench
- Versión de NodeJs instalada: 20.13.1
- Instalar loopback 4: npm install -g @loopback/cli
- Crear carpeta del proyecto: mkdir neatpallet
- Crear proyecto (Neatpallet): lb4
- Crear Datasource: lb4 datasource
- Compilar el proyecto: npm run build
- Crear los modelos (Descubrir las tablas de la BD): lb4 discover --schema neatpallet 
          * https://loopback.io/doc/en/lb4/Discovering-models.html#overview
- Crear los repositorios: lb4 repository
- Crear los controladores (uno a uno): lb4 controller

## Tests

```sh
npm test
```

## Documentación Loopback4

[LoopBack 4 documentation](https://loopback.io/doc/en/lb4/)

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
