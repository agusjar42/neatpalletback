CREATE TABLE IF NOT EXISTS `empresa_sensor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoSensorId` int NOT NULL,
  `empresaId` int NOT NULL,
  `valor` varchar(50) DEFAULT NULL,
  `usuarioCreacion` int DEFAULT NULL,
  `fechaCreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioModificacion` int DEFAULT NULL,
  `fechaModificacion` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `orden` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_empresa_sensor_tipo_sensor_idx` (`tipoSensorId`),
  KEY `fk_empresa_sensor_empresa_idx` (`empresaId`),
  CONSTRAINT `fk_empresa_sensor_empresa` FOREIGN KEY (`empresaId`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fk_empresa_sensor_tipo_sensor` FOREIGN KEY (`tipoSensorId`) REFERENCES `tipo_sensor` (`id`)
);

SET @copy_envio_sensor_empresa := IF(
  EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = DATABASE() AND table_name = 'envio_sensor_empresa'
  ),
  'INSERT INTO `empresa_sensor` (`tipoSensorId`, `empresaId`, `valor`, `usuarioCreacion`, `fechaCreacion`, `usuarioModificacion`, `fechaModificacion`, `orden`)
   SELECT e.`tipoSensorId`, e.`empresaId`, e.`valor`, e.`usuarioCreacion`, e.`fechaCreacion`, e.`usuarioModificacion`, e.`fechaModificacion`, e.`orden`
   FROM `envio_sensor_empresa` e
   WHERE NOT EXISTS (
     SELECT 1
     FROM `empresa_sensor` se
     WHERE se.`empresaId` = e.`empresaId`
       AND se.`tipoSensorId` = e.`tipoSensorId`
       AND COALESCE(se.`orden`, -1) = COALESCE(e.`orden`, -1)
       AND COALESCE(se.`valor`, '''''') = COALESCE(e.`valor`, '''''')
   )',
  'SELECT 1'
);
PREPARE stmt FROM @copy_envio_sensor_empresa;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @copy_sensor_empresa := IF(
  EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = DATABASE() AND table_name = 'sensor_empresa'
  ),
  'INSERT INTO `empresa_sensor` (`tipoSensorId`, `empresaId`, `valor`, `usuarioCreacion`, `fechaCreacion`, `usuarioModificacion`, `fechaModificacion`, `orden`)
   SELECT e.`tipoSensorId`, e.`empresaId`, e.`valor`, e.`usuarioCreacion`, e.`fechaCreacion`, e.`usuarioModificacion`, e.`fechaModificacion`, e.`orden`
   FROM `sensor_empresa` e
   WHERE NOT EXISTS (
     SELECT 1
     FROM `empresa_sensor` se
     WHERE se.`empresaId` = e.`empresaId`
       AND se.`tipoSensorId` = e.`tipoSensorId`
       AND COALESCE(se.`orden`, -1) = COALESCE(e.`orden`, -1)
       AND COALESCE(se.`valor`, '''''') = COALESCE(e.`valor`, '''''')
   )',
  'SELECT 1'
);
PREPARE stmt FROM @copy_sensor_empresa;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

CREATE OR REPLACE VIEW `vista_empresa_sensor_tipo_sensor` AS
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

CREATE OR REPLACE VIEW `vista_envio_tipo_sensor_empresa` AS
SELECT * FROM `vista_empresa_sensor_tipo_sensor`;
