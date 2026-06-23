--
--Anadimos el campo estado al catalogo cliente
--segun la estructura real solicitada
--
ALTER TABLE `cliente`
ADD COLUMN `estado` VARCHAR(20) NULL AFTER `orden`;

--
--Migramos los valores antiguos desde activoSN si existieran
--
UPDATE `cliente`
SET `estado` = 'Activo'
WHERE (`estado` IS NULL OR `estado` = '')
  AND (`activoSN` IS NULL OR `activoSN` = '' OR `activoSN` = 'S');

UPDATE `cliente`
SET `estado` = 'Descatalogado'
WHERE (`estado` IS NULL OR `estado` = '')
  AND `activoSN` = 'N';
