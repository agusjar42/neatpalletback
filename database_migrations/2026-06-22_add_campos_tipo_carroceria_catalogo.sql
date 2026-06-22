--
--Anadimos los campos visuales necesarios para carrocerias
--
ALTER TABLE `empresa_tipo_carroceria`
  ADD COLUMN `codigo` varchar(50) NULL AFTER `empresaId`,
  ADD COLUMN `capacidad` varchar(100) NULL AFTER `nombre`;
