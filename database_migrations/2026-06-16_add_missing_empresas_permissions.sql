-- Migration Script: Add missing Empresas permissions to existing roles
-- Purpose:
--   1. Ensure non-API roles that already have Empresas access also receive the missing CRUD permissions.
--   2. Keep the script idempotent so it can be run safely more than once.

INSERT INTO `permiso` (`rolId`, `modulo`, `controlador`, `accion`, `fechaCreacion`, `usuCreacion`)
SELECT
  base.`rolId`,
  base.`modulo`,
  base.`controlador`,
  faltantes.`accion`,
  NOW(),
  COALESCE(base.`usuCreacion`, 1)
FROM (
  SELECT DISTINCT
    p.`rolId`,
    p.`modulo`,
    p.`controlador`,
    p.`usuCreacion`
  FROM `permiso` p
  INNER JOIN `rol` r ON r.`id` = p.`rolId`
  WHERE p.`controlador` = 'Empresas'
    AND r.`nombre` <> 'API'
) base
INNER JOIN (
  SELECT 'Ver' AS `accion`
  UNION ALL SELECT 'Nuevo'
  UNION ALL SELECT 'Actualizar'
  UNION ALL SELECT 'Borrar'
) faltantes
LEFT JOIN `permiso` existente
  ON existente.`rolId` = base.`rolId`
 AND existente.`modulo` = base.`modulo`
 AND existente.`controlador` = base.`controlador`
 AND existente.`accion` = faltantes.`accion`
WHERE existente.`id` IS NULL;
