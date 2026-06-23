CREATE TABLE `tipo_categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orden` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `activoSn` VARCHAR(1) NULL,
  `fechaCreacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaModificacion` TIMESTAMP NULL DEFAULT NULL,
  `fechaCreacion_copy1` INT NULL DEFAULT NULL,
  `usuModificacion` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `nombre`)
);
