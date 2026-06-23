--
-- Anadimos los campos visuales del catalogo de productos
-- en la tabla correcta empresa_producto
--
ALTER TABLE `empresa_producto`
  ADD COLUMN IF NOT EXISTS `sku` varchar(50) NULL AFTER `empresaId`,
  ADD COLUMN IF NOT EXISTS `familia` varchar(100) NULL AFTER `nombre`,
  ADD COLUMN IF NOT EXISTS `rangoTemp` varchar(100) NULL AFTER `familia`,
  ADD COLUMN IF NOT EXISTS `vidaUtil` varchar(100) NULL AFTER `rangoTemp`;
