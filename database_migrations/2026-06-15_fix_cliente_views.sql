CREATE OR REPLACE VIEW `vista_cliente_operario` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`nombre` AS `nombre`,
  `a`.`telefono` AS `telefono`,
  `a`.`email` AS `email`,
  `a`.`activoSN` AS `activoSN`,
  `b`.`id` AS `clienteId`,
  `b`.`nombre` AS `clienteNombre`
FROM (`cliente_operario` `a` JOIN `cliente` `b`)
WHERE (`a`.`clienteId` = `b`.`id`);

CREATE OR REPLACE VIEW `vista_cliente_lugar_parada` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`direccion` AS `direccion`,
  `a`.`nombre` AS `nombre`,
  `a`.`direccionGps` AS `direccionGps`,
  `a`.`activoSN` AS `activoSN`,
  `b`.`id` AS `clienteId`,
  `b`.`nombre` AS `clienteNombre`
FROM (`cliente_lugar_parada` `a` JOIN `cliente` `b`)
WHERE (`a`.`clienteId` = `b`.`id`);
