--
-- Refrescamos la vista de contenido de envio para que lea
-- del catalogo empresa_producto y exponga los campos usados en pantalla
--
CREATE OR REPLACE VIEW `vista_envio_contenido_envio` AS
SELECT
  `ec`.`id` AS `id`,
  `ec`.`envioId` AS `envioId`,
  `e`.`origenRuta` AS `origenRuta`,
  `ec`.`orden` AS `orden`,
  `ec`.`productoId` AS `productoId`,
  `pr`.`sku` AS `sku`,
  `pr`.`nombre` AS `nombreProducto`,
  `pr`.`nombre` AS `producto`,
  `ec`.`palletId` AS `palletId`,
  `p`.`codigo` AS `codigoPallet`,
  `ec`.`referencia` AS `referencia`,
  `ec`.`pesoKgs` AS `pesoKgs`,
  `ec`.`cantidad` AS `cantidad`,
  `ec`.`pesoTotal` AS `pesoTotal`,
  `ec`.`medidas` AS `medidas`,
  `ec`.`fotoProducto` AS `fotoProducto`,
  `ec`.`fotoPallet` AS `fotoPallet`,
  `ec`.`fechaCreacion` AS `fechaCreacion`,
  `ec`.`fechaModificacion` AS `fechaModificacion`,
  `ec`.`usuarioCreacion` AS `usuarioCreacion`,
  `ec`.`usuarioModificacion` AS `usuarioModificacion`
FROM `envio_contenido` `ec`
INNER JOIN `envio` `e` ON `ec`.`envioId` = `e`.`id`
LEFT JOIN `empresa_producto` `pr` ON `ec`.`productoId` = `pr`.`id`
LEFT JOIN `pallet` `p` ON `ec`.`palletId` = `p`.`id`;
