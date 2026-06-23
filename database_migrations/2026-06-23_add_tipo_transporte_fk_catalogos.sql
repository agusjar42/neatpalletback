ALTER TABLE `empresa_tipo_transporte`
  ADD COLUMN `codigo` VARCHAR(50) NULL AFTER `empresaId`,
  ADD COLUMN `vehiculo` VARCHAR(100) NULL AFTER `codigo`,
  ADD COLUMN `uso` VARCHAR(100) NULL AFTER `vehiculo`,
  ADD COLUMN `categoria` VARCHAR(50) NULL AFTER `uso`,
  ADD COLUMN `tipoVehiculoId` INT NULL AFTER `vehiculo`,
  ADD COLUMN `tipoCategoriaId` INT NULL AFTER `categoria`;

UPDATE `empresa_tipo_transporte` ett
LEFT JOIN `tipo_vehiculo` tv ON tv.nombre = ett.vehiculo
SET ett.tipoVehiculoId = tv.id
WHERE ett.tipoVehiculoId IS NULL;

UPDATE `empresa_tipo_transporte` ett
LEFT JOIN `tipo_categoria` tc ON tc.nombre = ett.categoria
SET ett.tipoCategoriaId = tc.id
WHERE ett.tipoCategoriaId IS NULL;

ALTER TABLE `empresa_tipo_transporte`
  ADD INDEX `idx_empresa_tipo_transporte_tipoVehiculoId` (`tipoVehiculoId` ASC),
  ADD INDEX `idx_empresa_tipo_transporte_tipoCategoriaId` (`tipoCategoriaId` ASC),
  ADD CONSTRAINT `fk_empresa_tipo_transporte_tipoVehiculoId`
    FOREIGN KEY (`tipoVehiculoId`)
    REFERENCES `tipo_vehiculo` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_empresa_tipo_transporte_tipoCategoriaId`
    FOREIGN KEY (`tipoCategoriaId`)
    REFERENCES `tipo_categoria` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
