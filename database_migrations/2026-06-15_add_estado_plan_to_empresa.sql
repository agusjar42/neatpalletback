SET @add_estado = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.COLUMNS
      WHERE BINARY TABLE_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'empresa'
        AND COLUMN_NAME = 'estado'
    ),
    'SELECT 1',
    'ALTER TABLE `empresa` ADD COLUMN `estado` VARCHAR(20) NULL DEFAULT ''Activa'' AFTER `nombre`'
  )
);
PREPARE stmt_add_estado FROM @add_estado;
EXECUTE stmt_add_estado;
DEALLOCATE PREPARE stmt_add_estado;

SET @add_plan = (
  SELECT IF(
    EXISTS(
      SELECT 1
      FROM information_schema.COLUMNS
      WHERE BINARY TABLE_SCHEMA = BINARY DATABASE()
        AND TABLE_NAME = 'empresa'
        AND COLUMN_NAME = 'plan'
    ),
    'SELECT 1',
    'ALTER TABLE `empresa` ADD COLUMN `plan` VARCHAR(20) NULL DEFAULT ''Enterprise'' AFTER `estado`'
  )
);
PREPARE stmt_add_plan FROM @add_plan;
EXECUTE stmt_add_plan;
DEALLOCATE PREPARE stmt_add_plan;

UPDATE `empresa`
SET
  `estado` = COALESCE(NULLIF(`estado`, ''), 'Activa'),
  `plan` = COALESCE(NULLIF(`plan`, ''), 'Enterprise');
