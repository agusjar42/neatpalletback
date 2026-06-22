--
--Anadimos los campos necesarios para completar los puntos de entrega
--
ALTER TABLE `cliente`
  ADD COLUMN `codigo` varchar(50) NULL AFTER `empresaId`,
  ADD COLUMN `direccion` varchar(500) NULL AFTER `nombre`,
  ADD COLUMN `horario` varchar(100) NULL AFTER `direccion`,
  ADD COLUMN `activoSN` varchar(1) NULL DEFAULT 'S' AFTER `usuModificacion`;

--
--Marcamos como activos los registros existentes para mantener el comportamiento actual
--
UPDATE `cliente`
SET `activoSN` = 'S'
WHERE `activoSN` IS NULL OR `activoSN` = '';
