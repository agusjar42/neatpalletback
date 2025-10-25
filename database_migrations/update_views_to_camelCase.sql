-- ==============================================================================
-- Migration Script: Update Database VIEWS from snake_case to camelCase
-- ==============================================================================
-- Description: This script updates all database views to use camelCase column
--              names instead of snake_case, matching the new naming convention
--              for columns in the database.
--
-- Date Created: 2025-10-25
-- Author: Automated Migration Script
--
-- IMPORTANT:
-- - Execute this script AFTER running rename_columns_to_camelCase.sql
-- - This updates all views to reflect the new column names
-- ==============================================================================

-- View: vista_empresa_envio
CREATE OR REPLACE VIEW `vista_empresa_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`empresaId` AS `empresaId`,
  `a`.`origenRuta` AS `origenRuta`,
  `a`.`fechaLlegada` AS `fechaLlegada`,
  `a`.`gpsRutaOrigen` AS `gpsRutaOrigen`,
  `a`.`destinoRuta` AS `destinoRuta`,
  `a`.`gpsRutaDestino` AS `gpsRutaDestino`,
  `a`.`fechaSalida` AS `fechaSalida`,
  `a`.`paradasPrevistas` AS `paradasPrevistas`,
  `b`.`codigo` AS `codigoEmpresa`,
  `b`.`nombre` AS `nombreEmpresa`
FROM (`envio` `a` JOIN `empresa` `b`)
WHERE `a`.`empresaId` = `b`.`id`;

-- View: vista_empresa_rol
CREATE OR REPLACE VIEW `vista_empresa_rol` AS
SELECT
  `r`.`id` AS `id`,
  `e`.`id` AS `empresaId`,
  `e`.`nombre` AS `nombreEmpresa`,
  `r`.`nombre` AS `nombre`,
  `r`.`dashboardUrl` AS `dashboardUrl`,
  `r`.`muestraEmpresa` AS `muestraEmpresa`,
  `r`.`activoSn` AS `activoSn`
FROM (`empresa` `e` JOIN `rol` `r` ON(`e`.`id` = `r`.`empresaId`));

-- View: vista_empresa_rol_permiso
CREATE OR REPLACE VIEW `vista_empresa_rol_permiso` AS
SELECT
  `e`.`id` AS `empresaId`,
  `e`.`nombre` AS `nombreEmpresa`,
  `r`.`id` AS `rolId`,
  `r`.`nombre` AS `rolNombre`,
  `r`.`activoSn` AS `rolActivoSn`,
  `p`.`id` AS `permisoId`,
  `p`.`modulo` AS `permisoModulo`,
  `p`.`controlador` AS `permisoControlador`,
  `p`.`accion` AS `permisoAccion`
FROM ((`empresa` `e` JOIN `rol` `r` ON(`e`.`id` = `r`.`empresaId`))
  JOIN `permiso` `p` ON(`r`.`id` = `p`.`rolId`));

-- View: vista_empresa_rol_usuario
CREATE OR REPLACE VIEW `vista_empresa_rol_usuario` AS
SELECT
  `u`.`id` AS `id`,
  `u`.`nombre` AS `nombre`,
  `u`.`mail` AS `mail`,
  `u`.`telefono` AS `telefono`,
  `u`.`activoSn` AS `activoSn`,
  `u`.`avatar` AS `avatar`,
  `e`.`id` AS `empresaId`,
  `e`.`nombre` AS `nombreEmpresa`,
  `r`.`id` AS `rolId`,
  `r`.`nombre` AS `nombreRol`,
  `i`.`id` AS `idiomaId`,
  `i`.`nombre` AS `nombreIdioma`
FROM (((`usuario` `u` JOIN `empresa` `e` ON(`u`.`empresaId` = `e`.`id`))
  JOIN `rol` `r` ON(`u`.`rolId` = `r`.`id`))
  JOIN `idioma` `i` ON(`u`.`idiomaId` = `i`.`id`));

-- View: vista_envio_configuracion_envio
CREATE OR REPLACE VIEW `vista_envio_configuracion_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `a`.`nombre` AS `nombre`,
  `a`.`valor` AS `valor`,
  `a`.`unidadMedida` AS `unidadMedida`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`,
  `b`.`origenRuta` AS `origenRuta`
FROM (`envio_configuracion` `a` JOIN `envio` `b`)
WHERE `a`.`envioId` = `b`.`id`;

-- View: vista_envio_contenido_envio
CREATE OR REPLACE VIEW `vista_envio_contenido_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`producto` AS `producto`,
  `a`.`referencia` AS `referencia`,
  `a`.`pesoKgs` AS `pesoKgs`,
  `a`.`pesoTotal` AS `pesoTotal`,
  `a`.`medidas` AS `medidas`,
  `a`.`fotoProducto` AS `fotoProducto`,
  `a`.`fotoPallet` AS `fotoPallet`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`
FROM (`envio_contenido` `a` JOIN `envio` `b`)
WHERE `a`.`envioId` = `b`.`id`;

-- View: vista_envio_movimiento_envio_tipo_sensor
CREATE OR REPLACE VIEW `vista_envio_movimiento_envio_tipo_sensor` AS
SELECT
  `a`.`id` AS `id`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`envioId` AS `envioId`,
  `a`.`tipoSensorId` AS `tipoSensorId`,
  `c`.`nombre` AS `nombreSensor`,
  `a`.`fecha` AS `fecha`,
  `a`.`gps` AS `gps`,
  `a`.`imagen` AS `imagen`,
  `a`.`valor` AS `valor`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`
FROM ((`envio_movimiento` `a` JOIN `envio` `b`)
  JOIN `tipo_sensor` `c`)
WHERE `a`.`envioId` = `b`.`id`
  AND `a`.`tipoSensorId` = `c`.`id`
  AND `b`.`empresaId` = `c`.`empresaId`;

-- View: vista_envio_pallet_contenido
CREATE OR REPLACE VIEW `vista_envio_pallet_contenido` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`empresaId` AS `empresaId`,
  `b`.`envioId` AS `envioId`,
  `a`.`codigo` AS `codigo`,
  `a`.`alias` AS `alias`,
  `a`.`modelo` AS `modelo`,
  `b`.`producto` AS `producto`,
  `b`.`referencia` AS `referencia`
FROM ((`pallet` `a` JOIN `envio_contenido` `b`)
  JOIN `envio_contenido_pallet` `c`)
WHERE `a`.`id` = `c`.`palletId`
  AND `b`.`id` = `c`.`envioContenidoId`;

-- View: vista_envio_pallet_envio_pallet
CREATE OR REPLACE VIEW `vista_envio_pallet_envio_pallet` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`palletId` AS `palletId`,
  `c`.`codigo` AS `codigoPallet`,
  `c`.`alias` AS `aliasPallet`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`
FROM ((`envio_pallet` `a` JOIN `envio` `b`)
  JOIN `pallet` `c`)
WHERE `a`.`envioId` = `b`.`id`
  AND `a`.`palletId` = `c`.`id`
  AND `b`.`empresaId` = `c`.`empresaId`;

-- View: vista_envio_parada_envio
CREATE OR REPLACE VIEW `vista_envio_parada_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`fecha` AS `fecha`,
  `a`.`lugarParada` AS `lugarParada`,
  `a`.`lugarParadaGps` AS `lugarParadaGps`,
  `a`.`direccion` AS `direccion`,
  `a`.`nombreOperario` AS `nombreOperario`,
  `a`.`telefonoOperario` AS `telefonoOperario`,
  `a`.`emailOperario` AS `emailOperario`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`
FROM (`envio_parada` `a` JOIN `envio` `b`)
WHERE `a`.`envioId` = `b`.`id`;

-- View: vista_envio_sensor_envio_tipo_sensor
CREATE OR REPLACE VIEW `vista_envio_sensor_envio_tipo_sensor` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`tipoSensorId` AS `tipoSensorId`,
  `c`.`nombre` AS `nombreSensor`,
  `a`.`valor` AS `valor`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`
FROM ((`envio_sensor` `a` JOIN `envio` `b`)
  JOIN `tipo_sensor` `c`)
WHERE `a`.`envioId` = `b`.`id`
  AND `a`.`tipoSensorId` = `c`.`id`
  AND `c`.`empresaId` = `b`.`empresaId`;

-- View: vista_envio_tipo_sensor_empresa
CREATE OR REPLACE VIEW `vista_envio_tipo_sensor_empresa` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`tipoSensorId` AS `tipoSensorId`,
  `a`.`empresaId` AS `empresaId`,
  `a`.`valor` AS `valor`,
  `b`.`nombre` AS `nombre`,
  `b`.`activoSn` AS `activoSn`
FROM (`envio_sensor_empresa` `a` JOIN `tipo_sensor` `b`)
WHERE `a`.`tipoSensorId` = `b`.`id`;

-- View: vista_log_usuario_empresa
CREATE OR REPLACE VIEW `vista_log_usuario_empresa` AS
SELECT
  `log_usuario`.`id` AS `id`,
  `neatpallet`.`log_usuario`.`usuarioId` AS `usuarioId`,
  `neatpallet`.`log_usuario`.`fechaRegistro` AS `fechaRegistro`,
  `neatpallet`.`log_usuario`.`ip` AS `ip`,
  `neatpallet`.`log_usuario`.`masDatos` AS `masDatos`,
  `neatpallet`.`usuario`.`nombre` AS `nombreUsuario`
FROM (`log_usuario` JOIN `usuario`)
WHERE `neatpallet`.`log_usuario`.`usuarioId` = `neatpallet`.`usuario`.`id`;

-- View: vista_log_usuario_usuario
CREATE OR REPLACE VIEW `vista_log_usuario_usuario` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`fechaRegistro` AS `fechaRegistro`,
  `a`.`ip` AS `ip`,
  `a`.`masDatos` AS `masDatos`,
  `a`.`usuarioId` AS `usuarioId`,
  `b`.`nombre` AS `nombreUsuario`,
  `b`.`mail` AS `mail`,
  `b`.`empresaId` AS `empresaId`
FROM (`log_usuario` `a` JOIN `usuario` `b`)
WHERE `a`.`usuarioId` = `b`.`id`;

-- View: vista_pallet_parametro_parametro_pallet
CREATE OR REPLACE VIEW `vista_pallet_parametro_parametro_pallet` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`palletId` AS `palletId`,
  `a`.`parametroId` AS `parametroId`,
  `a`.`valor` AS `valor`,
  `a`.`textoLibre` AS `textoLibre`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`,
  `b`.`activoSn` AS `activoSN`,
  `b`.`nombre` AS `parametro`,
  `c`.`codigo` AS `pallet`
FROM ((`pallet_parametro` `a` JOIN `parametro` `b`)
  JOIN `pallet` `c`)
WHERE `a`.`palletId` = `c`.`id`
  AND `a`.`parametroId` = `b`.`id`;

-- View: vista_plantilla_email_idioma
CREATE OR REPLACE VIEW `vista_plantilla_email_idioma` AS
SELECT
  `p`.`id` AS `id`,
  `i`.`nombre` AS `nombreIdioma`,
  `i`.`id` AS `idiomaId`,
  `p`.`empresaId` AS `empresaId`,
  `p`.`nombrePlantilla` AS `nombrePlantilla`,
  `p`.`activoSn` AS `activoSn`,
  `p`.`titulo` AS `titulo`,
  `p`.`cuerpo` AS `cuerpo`
FROM (`idioma` `i` JOIN `plantilla_email` `p` ON(`i`.`id` = `p`.`idiomaId`));

-- View: vista_traduccion_idioma
CREATE OR REPLACE VIEW `vista_traduccion_idioma` AS
SELECT
  `t`.`id` AS `id`,
  `t`.`idiomaId` AS `idiomaId`,
  `t`.`clave` AS `clave`,
  `t`.`valor` AS `valor`,
  `i`.`nombre` AS `nombreIdioma`,
  `i`.`iso` AS `iso`
FROM (`traduccion` `t` JOIN `idioma` `i` ON(`t`.`idiomaId` = `i`.`id`));

-- View: vista_traducciones
CREATE OR REPLACE VIEW `vista_traducciones` AS
SELECT
  `t`.`id` AS `id`,
  `t`.`idiomaId` AS `idiomaId`,
  `t`.`clave` AS `clave`,
  `t`.`valor` AS `castellano`,
  `ingles`.`valor` AS `ingles`,
  `ingles`.`id` AS `inglesId`
FROM (`traduccion` `t` JOIN `traduccion` `ingles`
  ON(`t`.`clave` = `ingles`.`clave` AND `ingles`.`idiomaId` = 3))
WHERE `t`.`idiomaId` = 1;

-- View: vista_zonas_horarias
CREATE OR REPLACE VIEW `vista_zonas_horarias` AS
SELECT
  `zona_horaria`.`id` AS `id`,
  `zona_horaria`.`nombre` AS `nombre`
FROM `zona_horaria`;

-- ==============================================================================
-- End of Migration Script
-- ==============================================================================
