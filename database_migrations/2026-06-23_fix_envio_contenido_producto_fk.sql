--
-- Corregimos la FK de envio_contenido para que apunte
-- a empresa_producto y no a la tabla legacy producto
--
ALTER TABLE `envio_contenido`
  DROP FOREIGN KEY `fk_contenido_producto`;

ALTER TABLE `envio_contenido`
  ADD CONSTRAINT `fk_contenido_producto`
  FOREIGN KEY (`productoId`) REFERENCES `empresa_producto` (`id`)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;
