--
--Anadimos las columnas que ya usa el CRUD de tipos de transporte
--para que el formulario y la tabla compartan el mismo contrato
--
ALTER TABLE `empresa_tipo_transporte`
  ADD COLUMN IF NOT EXISTS `codigo` varchar(50) NULL AFTER `empresaId`,
  ADD COLUMN IF NOT EXISTS `vehiculo` varchar(100) NULL AFTER `codigo`,
  ADD COLUMN IF NOT EXISTS `uso` varchar(100) NULL AFTER `vehiculo`,
  ADD COLUMN IF NOT EXISTS `categoria` varchar(50) NULL AFTER `uso`;

--
--Compatibilidad con instalaciones anteriores a la renombrada de tablas
--
--No aplicar cambios sobre `tipo_transporte`.
--La tabla valida en este proyecto es `empresa_tipo_transporte`.
