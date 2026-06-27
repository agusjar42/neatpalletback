CREATE TABLE IF NOT EXISTS `zzz_backup_20260615_operario` LIKE `operario`;
INSERT INTO `zzz_backup_20260615_operario`
SELECT *
FROM `operario` o
WHERE NOT EXISTS (
  SELECT 1
  FROM `zzz_backup_20260615_operario` b
  WHERE b.id = o.id
);

CREATE TABLE IF NOT EXISTS `zzz_backup_20260615_lugar_parada` LIKE `lugar_parada`;
INSERT INTO `zzz_backup_20260615_lugar_parada`
SELECT *
FROM `lugar_parada` lp
WHERE NOT EXISTS (
  SELECT 1
  FROM `zzz_backup_20260615_lugar_parada` b
  WHERE b.id = lp.id
);

CREATE TABLE IF NOT EXISTS `zzz_backup_20260615_sensor_empresa` LIKE `sensor_empresa`;
INSERT INTO `zzz_backup_20260615_sensor_empresa`
SELECT *
FROM `sensor_empresa` es
WHERE NOT EXISTS (
  SELECT 1
  FROM `zzz_backup_20260615_sensor_empresa` b
  WHERE b.id = es.id
);

CREATE TABLE IF NOT EXISTS `zzz_backup_20260615_empresa_producto` LIKE `empresa_producto`;
INSERT INTO `zzz_backup_20260615_empresa_producto`
SELECT *
FROM `empresa_producto` ep
WHERE NOT EXISTS (
  SELECT 1
  FROM `zzz_backup_20260615_empresa_producto` b
  WHERE b.id = ep.id
);

CREATE TABLE IF NOT EXISTS `zzz_backup_20260615_envio_configuracion_empresa` LIKE `envio_configuracion_empresa`;
INSERT INTO `zzz_backup_20260615_envio_configuracion_empresa`
SELECT *
FROM `envio_configuracion_empresa` ece
WHERE NOT EXISTS (
  SELECT 1
  FROM `zzz_backup_20260615_envio_configuracion_empresa` b
  WHERE b.id = ece.id
);

DROP TABLE IF EXISTS `operario`;
DROP TABLE IF EXISTS `lugar_parada`;
DROP TABLE IF EXISTS `sensor_empresa`;
DROP TABLE IF EXISTS `empresa_producto`;
DROP TABLE IF EXISTS `envio_configuracion_empresa`;
