-- ==============================================================================
-- Renombramos la tabla actual a empresa_sensor si todavia existe como sensor_empresa
-- ==============================================================================
SET @tabla_sensor_empresa_existe := (
  SELECT COUNT(*)
  FROM information_schema.tables
  WHERE table_schema = DATABASE()
    AND table_name = 'sensor_empresa'
);

SET @tabla_empresa_sensor_existe := (
  SELECT COUNT(*)
  FROM information_schema.tables
  WHERE table_schema = DATABASE()
    AND table_name = 'empresa_sensor'
);

SET @sql_renombrar_sensor_empresa := IF(
  @tabla_sensor_empresa_existe > 0 AND @tabla_empresa_sensor_existe = 0,
  'RENAME TABLE `sensor_empresa` TO `empresa_sensor`',
  'SELECT 1'
);

PREPARE stmt FROM @sql_renombrar_sensor_empresa;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ==============================================================================
-- Reconstruimos las vistas dependientes apuntando al nuevo nombre de tabla
-- ==============================================================================
CREATE OR REPLACE VIEW `vista_empresa_sensor_tipo_sensor` AS
SELECT
  `a`.`id` AS `id`,
  `a`.`tipoSensorId` AS `tipoSensorId`,
  `a`.`empresaId` AS `empresaId`,
  `a`.`valor` AS `valor`,
  `b`.`nombre` AS `nombre`,
  `b`.`activoSn` AS `activoSn`,
  `a`.`orden` AS `orden`
FROM (`empresa_sensor` `a` JOIN `tipo_sensor` `b`)
WHERE (`a`.`tipoSensorId` = `b`.`id`);

CREATE OR REPLACE VIEW `vista_envio_tipo_sensor_empresa` AS
SELECT * FROM `vista_empresa_sensor_tipo_sensor`;
