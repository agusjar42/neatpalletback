-- NeatPallet (ajuste a esquema existente):
-- Reutilizamos la tabla `refrescar_token` para guardar tanto refresh tokens como tokens de reset de password.
-- Añadimos campos en español y camelCase para distinguir tipos y almacenar SOLO el hash del token de reset.
--
-- NOTA: si alguna columna ya existe en tu BD, elimina/ajusta manualmente ese `ADD COLUMN`.

ALTER TABLE `refrescar_token`
  ADD COLUMN `tipoToken` varchar(30) DEFAULT 'refresh',
  ADD COLUMN `hashToken` varchar(64) DEFAULT NULL,
  ADD COLUMN `fechaExpiracion` datetime DEFAULT NULL,
  ADD COLUMN `fechaUso` datetime DEFAULT NULL,
  ADD COLUMN `ipSolicitud` varchar(45) DEFAULT NULL,
  ADD COLUMN `agenteUsuario` varchar(512) DEFAULT NULL,
  ADD COLUMN `usuarioCreacion` int(11) DEFAULT NULL,
  ADD COLUMN `fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  ADD COLUMN `usuarioModificacion` int(11) DEFAULT NULL,
  ADD COLUMN `fechaModificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp();

-- Para registros existentes (si no se setea al añadir la columna)
UPDATE `refrescar_token` SET `tipoToken` = 'refresh' WHERE `tipoToken` IS NULL;

CREATE INDEX `idx_refrescar_token_tipoToken` ON `refrescar_token` (`tipoToken`);
CREATE INDEX `idx_refrescar_token_hashToken` ON `refrescar_token` (`hashToken`);
CREATE INDEX `idx_refrescar_token_usuarioId` ON `refrescar_token` (`usuarioId`);
CREATE INDEX `idx_refrescar_token_fechaExpiracion` ON `refrescar_token` (`fechaExpiracion`);
