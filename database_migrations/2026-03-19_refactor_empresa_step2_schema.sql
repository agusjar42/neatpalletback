-- ==============================================================================
-- Migration Script: Refactor Empresa - Step 2 schema compatibility
-- ==============================================================================
-- Purpose:
-- 1) Create global catalog table `evento_configuracion`
-- 2) Seed global event config from legacy company-level data
-- 3) Make `pallet.empresaId` nullable to support assignment workflow
-- 4) Update shipment sensor views to work with global sensor catalog
-- ==============================================================================

-- 1) Global event configuration catalog
CREATE TABLE IF NOT EXISTS `evento_configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `valor` varchar(50) DEFAULT NULL,
  `unidadMedida` varchar(50) DEFAULT NULL,
  `orden` int(4) DEFAULT NULL,
  `activoSn` varchar(1) DEFAULT 'S',
  `usuarioCreacion` int(11) DEFAULT NULL,
  `fechaCreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioModificacion` int(11) DEFAULT NULL,
  `fechaModificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Normaliza colacion para evitar conflictos entre tablas legacy y nuevas
ALTER TABLE `evento_configuracion`
  CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 2) Seed from legacy table (one canonical row per `nombre`)
INSERT INTO `evento_configuracion` (
  `nombre`,
  `valor`,
  `unidadMedida`,
  `orden`,
  `activoSn`,
  `usuarioCreacion`,
  `fechaCreacion`,
  `usuarioModificacion`,
  `fechaModificacion`
)
SELECT
  src.`nombre`,
  src.`valor`,
  src.`unidadMedida`,
  src.`orden`,
  'S' AS `activoSn`,
  src.`usuarioCreacion`,
  src.`fechaCreacion`,
  src.`usuarioModificacion`,
  src.`fechaModificacion`
FROM `envio_configuracion_empresa` src
WHERE src.`nombre` IS NOT NULL
  AND src.`id` = (
    SELECT e2.`id`
    FROM `envio_configuracion_empresa` e2
    WHERE e2.`nombre` COLLATE utf8mb4_general_ci = src.`nombre` COLLATE utf8mb4_general_ci
    ORDER BY COALESCE(e2.`fechaModificacion`, e2.`fechaCreacion`) DESC, e2.`id` DESC
    LIMIT 1
  )
  AND NOT EXISTS (
    SELECT 1
    FROM `evento_configuracion` ec
    WHERE ec.`nombre` COLLATE utf8mb4_general_ci = src.`nombre` COLLATE utf8mb4_general_ci
  );

-- 3) Pallet assignment compatibility (allow unassigned pallets)
ALTER TABLE `pallet`
  MODIFY COLUMN `empresaId` int(11) NULL;

-- 4) Sensor-related shipment views (remove strict empresa match)
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
  AND `a`.`tipoSensorId` = `c`.`id`;

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
  AND `a`.`tipoSensorId` = `c`.`id`;
