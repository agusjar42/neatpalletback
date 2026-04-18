-- ==============================================================================
-- Migration Script: Rename business tables + refresh dependent views
-- Date: 2026-04-19
-- ==============================================================================
-- Requested table renames:
-- envio_configuracion_empresa -> empresa_configuracion
-- envio_pallet               -> envio_pallet_usado
-- envio_sensor_empresa       -> empresa_sensor
-- lugar_parada               -> cliente_lugar_parada
-- operario                   -> cliente_operario
-- producto                   -> empresa_producto
-- tipo_carroceria            -> empresa_tipo_carroceria
-- tipo_transporte            -> empresa_tipo_transporte
--
-- Also requested:
-- tipo_documento -> drop if unused
-- ==============================================================================

-- 1) Rename tables only when source exists and target does not exist
SET @old_fk_checks := @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

-- envio_configuracion_empresa -> empresa_configuracion
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'envio_configuracion_empresa'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'empresa_configuracion'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `envio_configuracion_empresa` TO `empresa_configuracion`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- envio_pallet -> envio_pallet_usado
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'envio_pallet'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'envio_pallet_usado'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `envio_pallet` TO `envio_pallet_usado`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- envio_sensor_empresa -> empresa_sensor
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'envio_sensor_empresa'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'empresa_sensor'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `envio_sensor_empresa` TO `empresa_sensor`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- lugar_parada -> cliente_lugar_parada
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'lugar_parada'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'cliente_lugar_parada'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `lugar_parada` TO `cliente_lugar_parada`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- operario -> cliente_operario
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'operario'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'cliente_operario'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `operario` TO `cliente_operario`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- producto -> empresa_producto
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'producto'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'empresa_producto'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `producto` TO `empresa_producto`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- tipo_carroceria -> empresa_tipo_carroceria
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'tipo_carroceria'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'empresa_tipo_carroceria'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `tipo_carroceria` TO `empresa_tipo_carroceria`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- tipo_transporte -> empresa_tipo_transporte
SET @src_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'tipo_transporte'
);
SET @dst_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'empresa_tipo_transporte'
);
SET @sql_stmt := IF(
  @src_exists > 0 AND @dst_exists = 0,
  'RENAME TABLE `tipo_transporte` TO `empresa_tipo_transporte`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = @old_fk_checks;

-- 2) Drop tipo_documento only if it exists and nothing references it
SET @tipo_doc_exists := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = DATABASE() AND table_name = 'tipo_documento'
);
SET @tipo_doc_fk_refs := (
  SELECT COUNT(*) FROM information_schema.key_column_usage
  WHERE referenced_table_schema = DATABASE()
    AND referenced_table_name = 'tipo_documento'
);
SET @sql_stmt := IF(
  @tipo_doc_exists > 0 AND @tipo_doc_fk_refs = 0,
  'DROP TABLE `tipo_documento`',
  'SELECT 1'
);
PREPARE stmt FROM @sql_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3) Rebuild dependent views with new table names

CREATE OR REPLACE VIEW `vista_cliente_lugar_parada` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`direccion` AS `direccion`,
  `a`.`nombre` AS `nombre`,
  `a`.`direccionGps` AS `direccionGps`,
  `a`.`activoSN` AS `activoSN`,
  `b`.`id` AS `clienteId`,
  `b`.`nombre` AS `clienteNombre`
FROM (`cliente_lugar_parada` `a` JOIN `cliente` `b`)
WHERE (`a`.`clienteId` = `b`.`id`);

CREATE OR REPLACE VIEW `vista_cliente_operario` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`nombre` AS `nombre`,
  `a`.`telefono` AS `telefono`,
  `a`.`email` AS `email`,
  `a`.`activoSN` AS `activoSN`,
  `b`.`id` AS `clienteId`,
  `b`.`nombre` AS `clienteNombre`
FROM (`cliente_operario` `a` JOIN `cliente` `b`)
WHERE (`a`.`clienteId` = `b`.`id`);

CREATE OR REPLACE VIEW `vista_envio_contenido_envio` AS
SELECT
  `ec`.`id` AS `id`,
  `ec`.`envioId` AS `envioId`,
  `ec`.`orden` AS `orden`,
  `ec`.`productoId` AS `productoId`,
  `pr`.`nombre` AS `nombreProducto`,
  `pr`.`nombre` AS `producto`,
  `ec`.`palletId` AS `palletId`,
  `p`.`codigo` AS `codigoPallet`,
  `ec`.`referencia` AS `referencia`,
  `ec`.`pesoKgs` AS `pesoKgs`,
  `ec`.`cantidad` AS `cantidad`,
  `ec`.`pesoTotal` AS `pesoTotal`,
  `ec`.`medidas` AS `medidas`,
  `ec`.`fotoProducto` AS `fotoProducto`,
  `ec`.`fotoPallet` AS `fotoPallet`,
  `ec`.`fechaCreacion` AS `fechaCreacion`,
  `ec`.`fechaModificacion` AS `fechaModificacion`,
  `ec`.`usuarioCreacion` AS `usuarioCreacion`,
  `ec`.`usuarioModificacion` AS `usuarioModificacion`,
  `e`.`origenRuta` AS `origenRuta`
FROM (((`envio_contenido` `ec`
  JOIN `envio` `e` ON (`ec`.`envioId` = `e`.`id`))
  LEFT JOIN `empresa_producto` `pr` ON (`ec`.`productoId` = `pr`.`id`))
  LEFT JOIN `pallet` `p` ON (`ec`.`palletId` = `p`.`id`));

CREATE OR REPLACE VIEW `vista_envio_pallet_contenido` AS
SELECT
  `p`.`id` AS `id`,
  `p`.`orden` AS `orden`,
  `ec`.`envioId` AS `envioId`,
  `p`.`codigo` AS `codigo`,
  `p`.`alias` AS `alias`,
  `p`.`modelo` AS `modelo`,
  `ec`.`productoId` AS `productoId`,
  `pr`.`nombre` AS `nombreProducto`,
  `ec`.`referencia` AS `referencia`,
  `e`.`origenRuta` AS `origenRuta`,
  `e`.`fechaLlegada` AS `fechaLlegada`
FROM ((((`pallet` `p`
  JOIN `envio_contenido_pallet` `ecp` ON (`p`.`id` = `ecp`.`palletId`))
  JOIN `envio_contenido` `ec` ON (`ec`.`id` = `ecp`.`envioContenidoId`))
  JOIN `envio` `e` ON (`ec`.`envioId` = `e`.`id`))
  JOIN `empresa_producto` `pr` ON (`ec`.`productoId` = `pr`.`id`));

CREATE OR REPLACE VIEW `vista_envio_pallet_envio_pallet` AS
SELECT
  `ep`.`id` AS `id`,
  `ep`.`envioId` AS `envioId`,
  `e`.`origenRuta` AS `origenRuta`,
  `ep`.`palletId` AS `palletId`,
  `p`.`codigo` AS `codigoPallet`,
  `p`.`alias` AS `aliasPallet`,
  `ep`.`fechaCreacion` AS `fechaCreacion`,
  `ep`.`fechaModificacion` AS `fechaModificacion`,
  `ep`.`usuarioCreacion` AS `usuarioCreacion`,
  `ep`.`usuarioModificacion` AS `usuarioModificacion`
FROM ((`envio_pallet_usado` `ep`
  JOIN `envio` `e` ON (`ep`.`envioId` = `e`.`id`))
  JOIN `pallet` `p` ON (`ep`.`palletId` = `p`.`id`));

CREATE OR REPLACE VIEW `vista_envio_pallet_movimiento_envio_tipo_sensor` AS
SELECT
  `m`.`id` AS `id`,
  `e`.`origenRuta` AS `origenRuta`,
  `ep`.`envioId` AS `envioId`,
  `m`.`envioPalletId` AS `envioPalletId`,
  `ep`.`palletId` AS `palletId`,
  `m`.`tipoSensorId` AS `tipoSensorId`,
  `ts`.`nombre` AS `nombreSensor`,
  `m`.`fecha` AS `fecha`,
  `m`.`gps` AS `gps`,
  `m`.`imagen` AS `imagen`,
  `m`.`valor` AS `valor`,
  `m`.`orden` AS `orden`,
  `m`.`fechaCreacion` AS `fechaCreacion`,
  `m`.`fechaModificacion` AS `fechaModificacion`,
  `m`.`usuarioCreacion` AS `usuarioCreacion`,
  `m`.`usuarioModificacion` AS `usuarioModificacion`,
  `p`.`codigo` AS `palletCodigo`
FROM ((((`envio_pallet_movimiento` `m`
  JOIN `envio_pallet_usado` `ep` ON (`m`.`envioPalletId` = `ep`.`id`))
  JOIN `envio` `e` ON (`ep`.`envioId` = `e`.`id`))
  JOIN `tipo_sensor` `ts` ON (`m`.`tipoSensorId` = `ts`.`id`))
  JOIN `pallet` `p` ON (`ep`.`palletId` = `p`.`id`));

CREATE OR REPLACE VIEW `vista_envio_parada_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`fecha` AS `fecha`,
  `a`.`lugarParadaId` AS `lugarParadaId`,
  `a`.`lugarParadaGps` AS `lugarParadaGps`,
  `a`.`direccion` AS `direccion`,
  `a`.`operarioId` AS `operarioId`,
  `a`.`telefonoOperario` AS `telefonoOperario`,
  `a`.`emailOperario` AS `emailOperario`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`,
  `a`.`orden` AS `orden`,
  `d`.`nombre` AS `lugarParadaNombre`,
  `c`.`nombre` AS `operarioNombre`
FROM (((`envio_parada` `a`
  JOIN `envio` `b` ON (`a`.`envioId` = `b`.`id`))
  JOIN `cliente_operario` `c` ON (`a`.`operarioId` = `c`.`id`))
  JOIN `cliente_lugar_parada` `d` ON (`a`.`lugarParadaId` = `d`.`id`));

CREATE OR REPLACE VIEW `vista_envio_tipo_sensor_empresa` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`tipoSensorId` AS `tipoSensorId`,
  `a`.`empresaId` AS `empresaId`,
  `a`.`valor` AS `valor`,
  `b`.`nombre` AS `nombre`,
  `b`.`activoSn` AS `activoSn`,
  `a`.`orden` AS `orden`
FROM (`empresa_sensor` `a` JOIN `tipo_sensor` `b`)
WHERE (`a`.`tipoSensorId` = `b`.`id`);
