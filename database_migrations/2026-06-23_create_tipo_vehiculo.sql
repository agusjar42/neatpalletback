CREATE TABLE `tipo_vehiculo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orden` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `activoSn` VARCHAR(1) NULL,
  `fechaCreacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` TIMESTAMP NULL DEFAULT NULL,
  `usuCreacion` INT NULL DEFAULT NULL,
  `usuModificacion` INT NULL DEFAULT NULL,
  `tipo_vehiculocol` VARCHAR(50) NULL,
  PRIMARY KEY (`id`, `nombre`)
);
