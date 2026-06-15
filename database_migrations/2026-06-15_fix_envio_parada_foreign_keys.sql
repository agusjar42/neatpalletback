SET @drop_fk_lugar = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.REFERENTIAL_CONSTRAINTS
      WHERE BINARY CONSTRAINT_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'envio_parada'
        AND CONSTRAINT_NAME = 'fk_envio_parada_lugar_parada'
    ),
    'ALTER TABLE `envio_parada` DROP FOREIGN KEY `fk_envio_parada_lugar_parada`',
    'SELECT 1'
  )
);
PREPARE stmt_drop_fk_lugar FROM @drop_fk_lugar;
EXECUTE stmt_drop_fk_lugar;
DEALLOCATE PREPARE stmt_drop_fk_lugar;

SET @drop_fk_operario = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.REFERENTIAL_CONSTRAINTS
      WHERE BINARY CONSTRAINT_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'envio_parada'
        AND CONSTRAINT_NAME = 'fk_envio_parada_operario'
    ),
    'ALTER TABLE `envio_parada` DROP FOREIGN KEY `fk_envio_parada_operario`',
    'SELECT 1'
  )
);
PREPARE stmt_drop_fk_operario FROM @drop_fk_operario;
EXECUTE stmt_drop_fk_operario;
DEALLOCATE PREPARE stmt_drop_fk_operario;

ALTER TABLE `envio_parada`
  MODIFY COLUMN `lugarParadaId` INT NULL,
  MODIFY COLUMN `operarioId` INT NULL;

UPDATE `envio_parada` ep
LEFT JOIN `cliente_lugar_parada` clp ON clp.id = ep.lugarParadaId
SET ep.lugarParadaId = NULL
WHERE ep.lugarParadaId IS NOT NULL
  AND clp.id IS NULL;

UPDATE `envio_parada` ep
LEFT JOIN `cliente_operario` co ON co.id = ep.operarioId
SET ep.operarioId = NULL
WHERE ep.operarioId IS NOT NULL
  AND co.id IS NULL;

SET @add_fk_lugar = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.TABLES
      WHERE BINARY TABLE_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'cliente_lugar_parada'
    ),
    'ALTER TABLE `envio_parada` ADD CONSTRAINT `fk_envio_parada_lugar_parada` FOREIGN KEY (`lugarParadaId`) REFERENCES `cliente_lugar_parada` (`id`) ON UPDATE CASCADE',
    'SELECT 1'
  )
);
PREPARE stmt_add_fk_lugar FROM @add_fk_lugar;
EXECUTE stmt_add_fk_lugar;
DEALLOCATE PREPARE stmt_add_fk_lugar;

SET @add_fk_operario = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.TABLES
      WHERE BINARY TABLE_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'cliente_operario'
    ),
    'ALTER TABLE `envio_parada` ADD CONSTRAINT `fk_envio_parada_operario` FOREIGN KEY (`operarioId`) REFERENCES `cliente_operario` (`id`) ON UPDATE CASCADE',
    'SELECT 1'
  )
);
PREPARE stmt_add_fk_operario FROM @add_fk_operario;
EXECUTE stmt_add_fk_operario;
DEALLOCATE PREPARE stmt_add_fk_operario;
