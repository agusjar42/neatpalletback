-- ==============================================================================
-- Migration Script: Remove pallet.empresaId and refresh dependent views
-- ==============================================================================
-- Purpose:
-- 1) Drop deprecated column `pallet.empresaId` (if still present)
-- 2) Rebuild views that referenced `pallet.empresaId` or `tipo_sensor.empresaId`
-- ==============================================================================

-- 1) Drop `empresaId` from pallet only if the column exists
SET @has_pallet_empresa_id := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'pallet'
    AND column_name = 'empresaId'
);

SET @drop_pallet_empresa_id_sql := IF(
  @has_pallet_empresa_id > 0,
  'ALTER TABLE `pallet` DROP COLUMN `empresaId`',
  'SELECT 1'
);

PREPARE stmt_drop_pallet_empresa_id FROM @drop_pallet_empresa_id_sql;
EXECUTE stmt_drop_pallet_empresa_id;
DEALLOCATE PREPARE stmt_drop_pallet_empresa_id;

-- 2) Recreate affected views without deprecated columns/joins
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
  `e`.`origenRuta` AS `origenRuta`
FROM (((`pallet` `p`
  JOIN `envio_contenido_pallet` `ecp` ON (`p`.`id` = `ecp`.`palletId`))
  JOIN `envio_contenido` `ec` ON (`ec`.`id` = `ecp`.`envioContenidoId`))
  JOIN `envio` `e` ON (`ec`.`envioId` = `e`.`id`))
  JOIN `producto` `pr` ON (`ec`.`productoId` = `pr`.`id`);

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
FROM ((`envio_pallet` `ep`
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
  JOIN `envio_pallet` `ep` ON (`m`.`envioPalletId` = `ep`.`id`))
  JOIN `envio` `e` ON (`ep`.`envioId` = `e`.`id`))
  JOIN `tipo_sensor` `ts` ON (`m`.`tipoSensorId` = `ts`.`id`))
  JOIN `pallet` `p` ON (`ep`.`palletId` = `p`.`id`));
