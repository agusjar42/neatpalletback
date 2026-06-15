CREATE OR REPLACE VIEW `vista_envio_parada_envio` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`envioId` AS `envioId`,
  `b`.`origenRuta` AS `origenRuta`,
  `a`.`fecha` AS `fecha`,
  `a`.`lugarParadaId` AS `lugarParadaId`,
  `a`.`lugarParadaGps` AS `lugarParadaGps`,
  `a`.`direccion` AS `direccion`,
  `a`.`operarioId` AS `operarioId`,
  `a`.`telefonoOperario` AS `telefonoOperario`,
  `a`.`emailOperario` AS `emailOperario`,
  `a`.`fechaCreacion` AS `fechaCreacion`,
  `a`.`fechaModificacion` AS `fechaModificacion`,
  `a`.`usuarioCreacion` AS `usuarioCreacion`,
  `a`.`usuarioModificacion` AS `usuarioModificacion`,
  `a`.`orden` AS `orden`,
  `d`.`nombre` AS `lugarParadaNombre`,
  `c`.`nombre` AS `operarioNombre`
FROM `envio_parada` `a`
JOIN `envio` `b` ON `a`.`envioId` = `b`.`id`
LEFT JOIN `cliente_operario` `c` ON `a`.`operarioId` = `c`.`id`
LEFT JOIN `cliente_lugar_parada` `d` ON `a`.`lugarParadaId` = `d`.`id`;
