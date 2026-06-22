--
--Anadimos los campos visuales necesarios para productos y pallets
--
ALTER TABLE `producto`
  ADD COLUMN `sku` varchar(50) NULL AFTER `empresaId`,
  ADD COLUMN `familia` varchar(100) NULL AFTER `nombre`,
  ADD COLUMN `rangoTemp` varchar(100) NULL AFTER `familia`,
  ADD COLUMN `vidaUtil` varchar(100) NULL AFTER `rangoTemp`;

ALTER TABLE `pallet`
  ADD COLUMN `adquisicion` varchar(20) NULL AFTER `fechaImpresion`,
  ADD COLUMN `estado` varchar(50) NULL AFTER `modelo`,
  ADD COLUMN `ultimaSenal` varchar(50) NULL AFTER `estado`;
