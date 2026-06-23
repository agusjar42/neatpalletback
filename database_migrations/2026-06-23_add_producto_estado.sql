--
--Anadimos el campo estado al catalogo empresa_producto
--sin depender de una tabla legacy llamada producto
--
ALTER TABLE `empresa_producto`
ADD COLUMN `estado` VARCHAR(20) NULL AFTER `orden`;

--
--Migramos los valores antiguos desde activoSN si existieran
--
UPDATE `empresa_producto`
SET `estado` = 'Activo'
WHERE (`estado` IS NULL OR `estado` = '')
  AND (`activoSN` IS NULL OR `activoSN` = '' OR `activoSN` = 'S');

UPDATE `empresa_producto`
SET `estado` = 'Descatalogado'
WHERE (`estado` IS NULL OR `estado` = '')
  AND `activoSN` = 'N';
