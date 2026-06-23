--
--Anadimos el permiso de seleccionar estado en Usuarios
--para que rol y estado se puedan gobernar desde la pantalla de permisos
--
INSERT INTO `permiso` (`rolId`, `modulo`, `controlador`, `accion`, `fechaCreacion`, `usuCreacion`)
SELECT
  base.`rolId`,
  base.`modulo`,
  base.`controlador`,
  'SeleccionarEstado',
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
  WHERE p.`controlador` = 'Usuarios'
    AND r.`nombre` <> 'API'
) base
LEFT JOIN `permiso` existente
  ON existente.`rolId` = base.`rolId`
 AND existente.`modulo` = base.`modulo`
 AND existente.`controlador` = base.`controlador`
 AND existente.`accion` = 'SeleccionarEstado'
WHERE existente.`id` IS NULL;
