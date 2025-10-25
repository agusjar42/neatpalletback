-- ==============================================================================
-- Migration Script: Rename Database Columns from snake_case to camelCase
-- ==============================================================================
-- Description: This script renames all database columns from snake_case naming
--              convention to camelCase to match the TypeScript/JavaScript
--              naming standards used in the application models.
--
-- Date Created: 2025-10-25
-- Author: Automated Migration Script
--
-- IMPORTANT:
-- - Backup your database before running this script
-- - Test in a development environment first
-- - Review all column types to ensure they match your current schema
-- ==============================================================================

-- Table: empresa
ALTER TABLE empresa CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE empresa CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE empresa CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE empresa CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;

-- Table: tipo_sensor
ALTER TABLE tipo_sensor CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE tipo_sensor CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE tipo_sensor CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE tipo_sensor CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE tipo_sensor CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: pallet
ALTER TABLE pallet CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE pallet CHANGE COLUMN `fecha_impresion` `fechaImpresion` VARCHAR(20) NULL;
ALTER TABLE pallet CHANGE COLUMN `periodo_envio_mail` `periodoEnvioMail` INT(4) NULL;
ALTER TABLE pallet CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE pallet CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE pallet CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE pallet CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio
ALTER TABLE envio CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE envio CHANGE COLUMN `origen_ruta` `origenRuta` VARCHAR(50) NULL;
ALTER TABLE envio CHANGE COLUMN `fecha_llegada` `fechaLlegada` VARCHAR(20) NULL;
ALTER TABLE envio CHANGE COLUMN `gps_ruta_origen` `gpsRutaOrigen` VARCHAR(50) NULL;
ALTER TABLE envio CHANGE COLUMN `destino_ruta` `destinoRuta` VARCHAR(50) NULL;
ALTER TABLE envio CHANGE COLUMN `gps_ruta_destino` `gpsRutaDestino` VARCHAR(50) NULL;
ALTER TABLE envio CHANGE COLUMN `fecha_salida` `fechaSalida` VARCHAR(20) NULL;
ALTER TABLE envio CHANGE COLUMN `paradas_previstas` `paradasPrevistas` INT(3) NULL;
ALTER TABLE envio CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_contenido
ALTER TABLE envio_contenido CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `peso_kgs` `pesoKgs` DECIMAL(18,2) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `peso_total` `pesoTotal` DECIMAL(18,2) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `foto_producto` `fotoProducto` VARCHAR(250) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `foto_pallet` `fotoPallet` VARCHAR(250) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NOT NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_contenido CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_configuracion
ALTER TABLE envio_configuracion CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_configuracion CHANGE COLUMN `unidad_medida` `unidadMedida` VARCHAR(50) NULL;
ALTER TABLE envio_configuracion CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_configuracion CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_configuracion CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_configuracion CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_configuracion_empresa
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `unidad_medida` `unidadMedida` VARCHAR(50) NULL;
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_configuracion_empresa CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_pallet
ALTER TABLE envio_pallet CHANGE COLUMN `pallet_id` `palletId` INT(11) NOT NULL;
ALTER TABLE envio_pallet CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_pallet CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_pallet CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_pallet CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_pallet CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_sensor
ALTER TABLE envio_sensor CHANGE COLUMN `tipo_sensor_id` `tipoSensorId` INT(11) NOT NULL;
ALTER TABLE envio_sensor CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_sensor CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_sensor CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_sensor CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_sensor CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_sensor_empresa
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `tipo_sensor_id` `tipoSensorId` INT(11) NOT NULL;
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_sensor_empresa CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_parada
ALTER TABLE envio_parada CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_parada CHANGE COLUMN `lugar_parada` `lugarParada` VARCHAR(50) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `lugar_parada_gps` `lugarParadaGps` VARCHAR(50) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `nombre_operario` `nombreOperario` VARCHAR(100) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `telefono_operario` `telefonoOperario` VARCHAR(20) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `email_operario` `emailOperario` VARCHAR(100) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_parada CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_parada CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_movimiento
ALTER TABLE envio_movimiento CHANGE COLUMN `tipo_sensor_id` `tipoSensorId` INT(11) NOT NULL;
ALTER TABLE envio_movimiento CHANGE COLUMN `envio_id` `envioId` INT(11) NOT NULL;
ALTER TABLE envio_movimiento CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_movimiento CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_movimiento CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_movimiento CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: parametro
ALTER TABLE parametro CHANGE COLUMN `valor_disponible` `valorDisponible` VARCHAR(500) NULL;
ALTER TABLE parametro CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE parametro CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NOT NULL;
ALTER TABLE parametro CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE parametro CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: pallet_parametro
ALTER TABLE pallet_parametro CHANGE COLUMN `pallet_id` `palletId` INT(11) NOT NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `parametro_id` `parametroId` INT(11) NOT NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `texto_libre` `textoLibre` VARCHAR(500) NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE pallet_parametro CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: envio_contenido_pallet
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `envio_contenido_id` `envioContenidoId` INT(11) NOT NULL;
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `pallet_id` `palletId` INT(11) NOT NULL;
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE envio_contenido_pallet CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: tipo_transporte
ALTER TABLE tipo_transporte CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE tipo_transporte CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE tipo_transporte CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE tipo_transporte CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: tipo_carroceria
ALTER TABLE tipo_carroceria CHANGE COLUMN `usuario_creacion` `usuarioCreacion` INT(11) NULL;
ALTER TABLE tipo_carroceria CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE tipo_carroceria CHANGE COLUMN `usuario_modificacion` `usuarioModificacion` INT(11) NULL;
ALTER TABLE tipo_carroceria CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;

-- Table: usuario
ALTER TABLE usuario CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE usuario CHANGE COLUMN `rol_id` `rolId` INT(11) NOT NULL;
ALTER TABLE usuario CHANGE COLUMN `idioma_id` `idiomaId` INT(11) NOT NULL;
ALTER TABLE usuario CHANGE COLUMN `fecha_creacion` `fechaCreacion` DATETIME NULL;
ALTER TABLE usuario CHANGE COLUMN `fecha_modificacion` `fechaModificacion` DATETIME NULL;
ALTER TABLE usuario CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NULL;
ALTER TABLE usuario CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;
ALTER TABLE usuario CHANGE COLUMN `fecha_inactivo` `fechaInactivo` DATETIME NULL;
ALTER TABLE usuario CHANGE COLUMN `usu_inactivo` `usuInactivo` INT(11) NULL;

-- Table: idioma
ALTER TABLE idioma CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE idioma CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE idioma CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE idioma CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;
ALTER TABLE idioma CHANGE COLUMN `fecha_inactivo` `fechaInactivo` DATETIME NULL;
ALTER TABLE idioma CHANGE COLUMN `usu_inactivo` `usuInactivo` INT(11) NULL;

-- Table: pais
ALTER TABLE pais CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE pais CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE pais CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE pais CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;

-- Table: rol
ALTER TABLE rol CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE rol CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE rol CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE rol CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE rol CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;
ALTER TABLE rol CHANGE COLUMN `fecha_inactivo` `fechaInactivo` DATETIME NULL;
ALTER TABLE rol CHANGE COLUMN `usu_inactivo` `usuInactivo` INT(11) NULL;

-- Table: plantilla_email
ALTER TABLE plantilla_email CHANGE COLUMN `idioma_id` `idiomaId` INT(11) NOT NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `empresa_id` `empresaId` INT(11) NOT NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `nombre_plantilla` `nombrePlantilla` VARCHAR(50) NOT NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `fecha_inactivo` `fechaInactivo` DATETIME NULL;
ALTER TABLE plantilla_email CHANGE COLUMN `usu_inactivo` `usuInactivo` INT(11) NULL;

-- Table: log_usuario
ALTER TABLE log_usuario CHANGE COLUMN `usuario_id` `usuarioId` INT(11) NOT NULL;
ALTER TABLE log_usuario CHANGE COLUMN `fecha_registro` `fechaRegistro` DATETIME NULL;
ALTER TABLE log_usuario CHANGE COLUMN `mas_datos` `masDatos` VARCHAR(500) NULL;
ALTER TABLE log_usuario CHANGE COLUMN `fecha_creacion` `fechaCreacion` TIMESTAMP NULL;
ALTER TABLE log_usuario CHANGE COLUMN `fecha_modificacion` `fechaModificacion` TIMESTAMP NULL;
ALTER TABLE log_usuario CHANGE COLUMN `usu_creacion` `usuCreacion` INT(11) NOT NULL;
ALTER TABLE log_usuario CHANGE COLUMN `usu_modificacion` `usuModificacion` INT(11) NULL;

-- ==============================================================================
-- End of Migration Script
-- ==============================================================================
