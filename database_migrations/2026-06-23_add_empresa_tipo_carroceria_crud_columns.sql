ALTER TABLE `empresa_tipo_carroceria`
  ADD COLUMN `codigo` VARCHAR(50) NULL AFTER `empresaId`,
  ADD COLUMN `capacidad` VARCHAR(100) NULL AFTER `nombre`;
