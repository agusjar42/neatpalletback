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
