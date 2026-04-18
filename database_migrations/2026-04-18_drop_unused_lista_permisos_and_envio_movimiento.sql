-- ==============================================================================
-- Migration Script: Drop legacy tables not used by current frontend flows
-- ==============================================================================
-- Objects removed:
-- 1) lista_permisos (no longer consumed by front permission screen)
-- 2) envio_movimiento + legacy view (replaced by envio_pallet_movimiento flow)
-- ==============================================================================

-- Legacy view based on envio_movimiento
DROP VIEW IF EXISTS `vista_envio_movimiento_envio_tipo_sensor`;

-- Legacy / unused tables
DROP TABLE IF EXISTS `lista_permisos`;
DROP TABLE IF EXISTS `envio_movimiento`;
