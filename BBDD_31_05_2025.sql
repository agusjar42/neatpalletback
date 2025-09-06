-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: neatpallet
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archivo`
--

DROP TABLE IF EXISTS `archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivo` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `tipo_archivo_id` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `tabla` varchar(50) DEFAULT NULL,
  `id_tabla` int(11) DEFAULT NULL,
  `pantalla` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `orden` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkArchivosEmpresas_idx` (`empresa_id`),
  KEY `fkArchivoTipoarchivo_idx` (`tipo_archivo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo`
--

LOCK TABLES `archivo` WRITE;
/*!40000 ALTER TABLE `archivo` DISABLE KEYS */;
INSERT INTO `archivo` VALUES (403,1,17,NULL,'/multimedia/Usuario/avatar_2025-06-14_070919.png',NULL,'usuario',1,NULL,'2025-06-14 07:09:26',NULL,1,NULL,NULL),(404,1,17,NULL,'/multimedia/Usuario/imagen_near_2025-06-14_070935.png',NULL,'usuario',24,NULL,'2025-06-14 07:09:35',NULL,1,NULL,NULL),(424,1,3,NULL,'/multimedia/Empresa/imagen_near_2025-06-17_141632.png',NULL,'empresa',1,NULL,'2025-06-17 14:16:32',NULL,1,NULL,NULL),(425,1,4,NULL,'/multimedia/Empresa/logo_neat_2025-06-17_141634.png',NULL,'empresa',1,NULL,'2025-06-17 14:16:34',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `servicio` varchar(45) DEFAULT NULL,
  `tiempoInactividad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'NP','NeatPallet','NeatPallet','2024-06-24 13:54:59','2025-06-14 07:11:40',1,1,'agusjar@hotdmail.com','krrj kdon rgsf yamn','',0),(74,'01','Pruebas Oscar','','2025-06-17 16:39:15','2025-06-18 13:48:36',24,1,'info@roomscontroltech.com','123456789',NULL,0);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `anyo` varchar(4) DEFAULT NULL,
  `origen` varchar(500) DEFAULT NULL,
  `origen_coordenadas_gps` varchar(500) DEFAULT NULL,
  `destino` varchar(500) DEFAULT NULL,
  `destino_coordenadas_gps` varchar(500) DEFAULT NULL,
  `fecha_salida` timestamp NULL DEFAULT NULL,
  `fecha_llegada` timestamp NULL DEFAULT NULL,
  `paradas_previstas` varchar(50) DEFAULT NULL,
  `usuario_creacoin` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `usuario_modificacion` int(11) DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`empresa_id`),
  KEY `fk_envio_empresa_idx` (`empresa_id`),
  CONSTRAINT `fk_envio_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_contenido`
--

DROP TABLE IF EXISTS `envio_contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_contenido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `envio_id` int(11) NOT NULL,
  `producto` varchar(100) DEFAULT NULL,
  `referencia` varchar(50) DEFAULT NULL,
  `peso_kgs` varchar(50) DEFAULT NULL,
  `peso_total` varchar(50) DEFAULT NULL,
  `medidas` varchar(50) DEFAULT NULL,
  `foto_producto` varchar(250) DEFAULT NULL,
  `foto_pallet` varchar(250) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`envio_id`),
  KEY `fk_enviocontenido_envio_idx` (`envio_id`),
  CONSTRAINT `fk_enviocontenido_envio` FOREIGN KEY (`envio_id`) REFERENCES `envio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_contenido`
--

LOCK TABLES `envio_contenido` WRITE;
/*!40000 ALTER TABLE `envio_contenido` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio_contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_pallet`
--

DROP TABLE IF EXISTS `envio_pallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_pallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pallet_id` int(11) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`pallet_id`),
  KEY `fk_enviopallet_pallet_idx` (`pallet_id`),
  CONSTRAINT `fk_enviopallet_pallet` FOREIGN KEY (`pallet_id`) REFERENCES `pallet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_pallet`
--

LOCK TABLES `envio_pallet` WRITE;
/*!40000 ALTER TABLE `envio_pallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio_pallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_parada`
--

DROP TABLE IF EXISTS `envio_parada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_parada` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `envio_id` int(11) NOT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  `lugar_parada` varchar(500) DEFAULT NULL,
  `localizacion_gps` varchar(50) DEFAULT NULL,
  `direccion` varchar(500) DEFAULT NULL,
  `operario` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`envio_id`),
  KEY `fk_envioparada_envio_idx` (`envio_id`),
  CONSTRAINT `fk_envioparada_envio` FOREIGN KEY (`envio_id`) REFERENCES `envio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_parada`
--

LOCK TABLES `envio_parada` WRITE;
/*!40000 ALTER TABLE `envio_parada` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio_parada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_vehiculo`
--

DROP TABLE IF EXISTS `envio_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_vehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `envio_id` int(11) NOT NULL,
  `matricula` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `carroceria` varchar(50) DEFAULT NULL,
  `plataforma_sn` varchar(50) DEFAULT NULL,
  `carga_maxima` varchar(50) DEFAULT NULL,
  `propietario` varchar(50) DEFAULT NULL,
  `numero_servicio` varchar(50) DEFAULT NULL,
  `tipo_transporte` varchar(50) DEFAULT NULL,
  `conductor` varchar(50) DEFAULT NULL,
  `id_conductor` varchar(50) DEFAULT NULL,
  `telefono_conductor` varchar(50) DEFAULT NULL,
  `carnet_conductor` varchar(50) DEFAULT NULL,
  `gps_sn` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`envio_id`),
  KEY `fk_enviovehiculo_envio_idx` (`envio_id`),
  CONSTRAINT `fk_enviovehiculo_envio` FOREIGN KEY (`envio_id`) REFERENCES `envio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_vehiculo`
--

LOCK TABLES `envio_vehiculo` WRITE;
/*!40000 ALTER TABLE `envio_vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio_vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idioma`
--

DROP TABLE IF EXISTS `idioma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idioma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iso` varchar(10) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_inactivo` datetime DEFAULT NULL,
  `usu_inactivo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idioma`
--

LOCK TABLES `idioma` WRITE;
/*!40000 ALTER TABLE `idioma` DISABLE KEYS */;
INSERT INTO `idioma` VALUES (1,'es','Español','S','2024-07-17 08:05:51','2025-05-31 08:23:36',1,NULL,NULL,NULL),(3,'en','Inglés','S','2024-07-17 08:06:16','2025-05-31 08:23:36',1,1,NULL,NULL),(17,'zh','Chino','S','2025-06-17 16:52:52','2025-06-17 16:53:09',24,24,NULL,NULL),(18,'pt','Portuges','S','2025-07-08 14:25:45',NULL,24,NULL,NULL,NULL);
/*!40000 ALTER TABLE `idioma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista_permisos`
--

DROP TABLE IF EXISTS `lista_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` varchar(45) DEFAULT NULL,
  `seccion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_permisos`
--

LOCK TABLES `lista_permisos` WRITE;
/*!40000 ALTER TABLE `lista_permisos` DISABLE KEYS */;
INSERT INTO `lista_permisos` VALUES (1,'Empresas',NULL),(11,'Idiomas',NULL),(13,'Logs de usuarios',NULL),(17,'Paises',NULL),(24,'Tipos de archivo',NULL),(25,'Plantillas de correo',NULL),(26,'Secciones',NULL),(27,'Archivos',NULL),(28,'Traducciones',NULL),(32,'Roles',NULL),(33,'Permisos',NULL),(34,'Examenes',NULL),(35,'Usuarios',NULL);
/*!40000 ALTER TABLE `lista_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_usuario`
--

DROP TABLE IF EXISTS `log_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `mas_datos` varchar(500) DEFAULT NULL COMMENT 'Pondremos aquí los datos del navegador con el que entra y toda la información extra que podamos conseguir',
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_usuario`
--

LOCK TABLES `log_usuario` WRITE;
/*!40000 ALTER TABLE `log_usuario` DISABLE KEYS */;
INSERT INTO `log_usuario` VALUES (1,1,'2025-05-31 10:14:44','80.102.138.129','login','2025-05-31 10:14:44',NULL,1,NULL),(2,1,'2025-05-31 11:03:04','80.102.138.129','login','2025-05-31 11:03:04',NULL,1,NULL),(3,1,'2025-05-31 11:09:33','80.102.138.129','login','2025-05-31 11:09:33',NULL,1,NULL),(4,1,'2025-05-31 11:29:11','80.102.138.129','login','2025-05-31 11:29:11',NULL,1,NULL),(5,1,'2025-05-31 11:46:11','80.102.138.129','login','2025-05-31 11:46:11',NULL,1,NULL),(6,1,'2025-05-31 13:11:10','80.102.138.129','login','2025-05-31 13:11:11',NULL,1,NULL),(7,1,'2025-05-31 13:27:26','80.102.138.129','login','2025-05-31 13:27:26',NULL,1,NULL),(8,1,'2025-05-31 13:32:00','80.102.138.129','login','2025-05-31 13:32:00',NULL,1,NULL),(9,1,'2025-05-31 13:36:16','80.102.138.129','login','2025-05-31 13:36:16',NULL,1,NULL),(10,1,'2025-05-31 13:46:48','80.102.138.129','login','2025-05-31 13:46:48',NULL,1,NULL),(11,1,'2025-05-31 13:55:31','80.102.138.129','login','2025-05-31 13:55:31',NULL,1,NULL),(12,1,'2025-05-31 14:06:25','80.102.138.129','login','2025-05-31 14:06:25',NULL,1,NULL),(13,1,'2025-05-31 14:11:31','80.102.138.129','login','2025-05-31 14:11:31',NULL,1,NULL),(14,1,'2025-05-31 14:35:53','80.102.138.129','login','2025-05-31 14:35:53',NULL,1,NULL),(15,1,'2025-05-31 14:37:17','80.102.138.129','login','2025-05-31 14:37:17',NULL,1,NULL),(16,1,'2025-05-31 14:50:22','80.102.138.129','login','2025-05-31 14:50:22',NULL,1,NULL),(17,1,'2025-05-31 14:51:39','80.102.138.129','login','2025-05-31 14:51:39',NULL,1,NULL),(18,1,'2025-05-31 14:55:30','80.102.138.129','login','2025-05-31 14:55:30',NULL,1,NULL),(19,1,'2025-05-31 15:08:22','80.102.138.129','login','2025-05-31 15:08:22',NULL,1,NULL),(20,1,'2025-05-31 15:09:23','80.102.138.129','login','2025-05-31 15:09:23',NULL,1,NULL),(21,1,'2025-05-31 15:09:52','80.102.138.129','login','2025-05-31 15:09:52',NULL,1,NULL),(22,1,'2025-05-31 15:10:18','80.102.138.129','login','2025-05-31 15:10:18',NULL,1,NULL),(23,1,'2025-05-31 15:16:22','80.102.138.129','login','2025-05-31 15:16:22',NULL,1,NULL),(24,1,'2025-05-31 15:19:16','80.102.138.129','login','2025-05-31 15:19:16',NULL,1,NULL),(25,1,'2025-05-31 15:19:58','80.102.138.129','login','2025-05-31 15:19:58',NULL,1,NULL),(26,1,'2025-05-31 15:21:17','80.102.138.129','login','2025-05-31 15:21:17',NULL,1,NULL),(27,1,'2025-05-31 15:22:32','80.102.138.129','login','2025-05-31 15:22:32',NULL,1,NULL),(28,1,'2025-05-31 15:31:29','80.102.138.129','login','2025-05-31 15:31:29',NULL,1,NULL),(29,1,'2025-05-31 15:33:29','80.102.138.129','login','2025-05-31 15:33:29',NULL,1,NULL),(30,1,'2025-05-31 15:34:08','80.102.138.129','login','2025-05-31 15:34:08',NULL,1,NULL),(31,1,'2025-05-31 15:39:35','80.102.138.129','login','2025-05-31 15:39:35',NULL,1,NULL),(32,1,'2025-06-01 04:09:15','80.102.138.129','login','2025-06-01 04:09:15',NULL,1,NULL),(33,1,'2025-06-01 04:22:15','80.102.138.129','login','2025-06-01 04:22:15',NULL,1,NULL),(34,1,'2025-06-01 04:24:24','80.102.138.129','login','2025-06-01 04:24:24',NULL,1,NULL),(35,1,'2025-06-01 04:32:23','80.102.138.129','login','2025-06-01 04:32:23',NULL,1,NULL),(36,1,'2025-06-01 04:33:46','80.102.138.129','login','2025-06-01 04:33:46',NULL,1,NULL),(37,1,'2025-06-01 04:35:49','80.102.138.129','login','2025-06-01 04:35:49',NULL,1,NULL),(38,1,'2025-06-01 04:43:16','80.102.138.129','login','2025-06-01 04:43:16',NULL,1,NULL),(39,1,'2025-06-01 04:45:12','80.102.138.129','login','2025-06-01 04:45:12',NULL,1,NULL),(40,1,'2025-06-01 04:46:09','80.102.138.129','login','2025-06-01 04:46:09',NULL,1,NULL),(41,1,'2025-06-01 04:49:37','80.102.138.129','login','2025-06-01 04:49:37',NULL,1,NULL),(42,1,'2025-06-01 04:50:31','80.102.138.129','login','2025-06-01 04:50:31',NULL,1,NULL),(43,1,'2025-06-01 04:52:38','80.102.138.129','login','2025-06-01 04:52:38',NULL,1,NULL),(44,1,'2025-06-01 04:59:33','80.102.138.129','login','2025-06-01 04:59:33',NULL,1,NULL),(45,1,'2025-06-01 05:01:35','80.102.138.129','login','2025-06-01 05:01:36',NULL,1,NULL),(46,1,'2025-06-01 05:07:44','80.102.138.129','login','2025-06-01 05:07:44',NULL,1,NULL),(47,1,'2025-06-01 05:12:52','80.102.138.129','login','2025-06-01 05:12:52',NULL,1,NULL),(48,1,'2025-06-01 05:31:58','80.102.138.129','login','2025-06-01 05:31:58',NULL,1,NULL),(49,1,'2025-06-01 05:42:24','80.102.138.129','login','2025-06-01 05:42:24',NULL,1,NULL),(50,1,'2025-06-01 05:53:28','80.102.138.129','login','2025-06-01 05:53:28',NULL,1,NULL),(51,1,'2025-06-01 06:02:17','80.102.138.129','login','2025-06-01 06:02:17',NULL,1,NULL),(52,1,'2025-06-01 06:02:27','80.102.138.129','login','2025-06-01 06:02:27',NULL,1,NULL),(53,1,'2025-06-01 06:05:45','80.102.138.129','login','2025-06-01 06:05:45',NULL,1,NULL),(54,1,'2025-06-01 06:05:56','80.102.138.129','login','2025-06-01 06:05:56',NULL,1,NULL),(55,1,'2025-06-01 06:32:10','80.102.138.129','login','2025-06-01 06:32:10',NULL,1,NULL),(56,1,'2025-06-01 06:49:43','80.102.138.129','login','2025-06-01 06:49:43',NULL,1,NULL),(57,1,'2025-06-01 06:53:10','80.102.138.129','login','2025-06-01 06:53:10',NULL,1,NULL),(58,1,'2025-06-03 14:03:42','80.102.138.129','login','2025-06-03 14:03:42',NULL,1,NULL),(59,1,'2025-06-11 13:21:42','80.102.138.129','login','2025-06-11 13:21:42',NULL,1,NULL),(60,1,'2025-06-11 13:22:40','80.102.138.129','login','2025-06-11 13:22:40',NULL,1,NULL),(61,1,'2025-06-11 13:53:09','80.102.138.129','login','2025-06-11 13:53:09',NULL,1,NULL),(62,1,'2025-06-11 13:55:37','80.102.138.129','login','2025-06-11 13:55:38',NULL,1,NULL),(63,1,'2025-06-11 13:57:52','80.102.138.129','login','2025-06-11 13:57:53',NULL,1,NULL),(64,1,'2025-06-11 14:01:06','80.102.138.129','login','2025-06-11 14:01:06',NULL,1,NULL),(65,1,'2025-06-11 14:02:09','80.102.138.129','login','2025-06-11 14:02:09',NULL,1,NULL),(66,1,'2025-06-11 14:02:35','80.102.138.129','login','2025-06-11 14:02:35',NULL,1,NULL),(67,1,'2025-06-11 14:04:15','80.102.138.129','login','2025-06-11 14:04:15',NULL,1,NULL),(68,1,'2025-06-11 14:06:51','80.102.138.129','login','2025-06-11 14:06:51',NULL,1,NULL),(69,1,'2025-06-11 14:20:44','80.102.138.129','login','2025-06-11 14:20:44',NULL,1,NULL),(70,1,'2025-06-11 15:27:18','80.102.138.129','login','2025-06-11 15:27:19',NULL,1,NULL),(71,1,'2025-06-11 15:27:58','80.102.138.129','login','2025-06-11 15:27:58',NULL,1,NULL),(72,1,'2025-06-11 15:30:18','80.102.138.129','login','2025-06-11 15:30:19',NULL,1,NULL),(73,1,'2025-06-11 15:33:57','80.102.138.129','login','2025-06-11 15:33:57',NULL,1,NULL),(74,1,'2025-06-11 15:36:29','80.102.138.129','login','2025-06-11 15:36:29',NULL,1,NULL),(75,1,'2025-06-11 16:02:21','80.102.138.129','login','2025-06-11 16:02:21',NULL,1,NULL),(76,1,'2025-06-11 16:03:00','80.102.138.129','login','2025-06-11 16:03:00',NULL,1,NULL),(77,1,'2025-06-12 13:51:41','80.102.138.129','login','2025-06-12 13:51:42',NULL,1,NULL),(78,1,'2025-06-12 15:25:29','80.102.138.129','login','2025-06-12 15:25:29',NULL,1,NULL),(79,1,'2025-06-12 15:25:33','80.102.138.129','login','2025-06-12 15:25:33',NULL,1,NULL),(80,1,'2025-06-13 15:32:56','80.102.138.129','login','2025-06-13 15:32:56',NULL,1,NULL),(81,1,'2025-06-13 15:38:17','80.102.138.129','login','2025-06-13 15:38:18',NULL,1,NULL),(82,1,'2025-06-13 15:49:58','80.102.138.129','login','2025-06-13 15:49:59',NULL,1,NULL),(83,1,'2025-06-13 16:27:23','80.102.138.129','login','2025-06-13 16:27:23',NULL,1,NULL),(84,1,'2025-06-14 06:30:11','80.102.138.129','login','2025-06-14 06:30:11',NULL,1,NULL),(85,1,'2025-06-14 06:34:23','80.102.138.129','login','2025-06-14 06:34:24',NULL,1,NULL),(86,1,'2025-06-14 06:54:18','80.102.138.129','login','2025-06-14 06:54:19',NULL,1,NULL),(87,1,'2025-06-14 07:03:49','80.102.138.129','login','2025-06-14 07:03:50',NULL,1,NULL),(88,1,'2025-06-14 07:21:03','80.102.138.129','login','2025-06-14 07:21:03',NULL,1,NULL),(89,1,'2025-06-14 07:33:54','80.102.138.129','login','2025-06-14 07:33:54',NULL,1,NULL),(90,1,'2025-06-14 07:42:08','80.102.138.129','login','2025-06-14 07:42:08',NULL,1,NULL),(91,1,'2025-06-16 09:38:12','80.102.138.129','login','2025-06-16 09:38:12',NULL,1,NULL),(92,1,'2025-06-17 13:14:00','80.102.138.129','login','2025-06-17 13:13:59',NULL,1,NULL),(93,1,'2025-06-17 13:25:21','80.102.138.129','login','2025-06-17 13:25:21',NULL,1,NULL),(94,1,'2025-06-17 13:25:40','80.102.138.129','login','2025-06-17 13:25:40',NULL,1,NULL),(95,1,'2025-06-17 13:36:34','80.102.138.129','login','2025-06-17 13:36:35',NULL,1,NULL),(96,1,'2025-06-17 13:39:03','80.102.138.129','login','2025-06-17 13:39:03',NULL,1,NULL),(97,1,'2025-06-17 13:39:53','80.102.138.129','login','2025-06-17 13:39:53',NULL,1,NULL),(98,1,'2025-06-17 13:51:57','80.102.138.129','login','2025-06-17 13:51:57',NULL,1,NULL),(99,1,'2025-06-17 14:04:31','80.102.138.129','login','2025-06-17 14:04:31',NULL,1,NULL),(100,1,'2025-06-17 14:07:59','80.102.138.129','login','2025-06-17 14:07:59',NULL,1,NULL),(101,1,'2025-06-17 14:16:00','80.102.138.129','login','2025-06-17 14:16:00',NULL,1,NULL),(102,1,'2025-06-17 14:16:44','80.102.138.129','login','2025-06-17 14:16:44',NULL,1,NULL),(103,1,'2025-06-17 14:17:38','80.102.138.129','login','2025-06-17 14:17:38',NULL,1,NULL),(104,1,'2025-06-17 15:29:37','80.102.138.129','login','2025-06-17 15:29:37',NULL,1,NULL),(105,24,'2025-06-17 15:30:28','80.102.138.129','login','2025-06-17 15:30:28',NULL,24,NULL),(106,1,'2025-06-17 15:33:58','80.102.138.129','login','2025-06-17 15:33:58',NULL,1,NULL),(107,1,'2025-06-17 15:36:16','80.102.138.129','login','2025-06-17 15:36:16',NULL,1,NULL),(108,1,'2025-06-17 15:38:46','80.102.138.129','login','2025-06-17 15:38:46',NULL,1,NULL),(109,1,'2025-06-17 15:41:34','80.102.138.129','login','2025-06-17 15:41:34',NULL,1,NULL),(110,1,'2025-06-17 15:49:16','80.102.138.129','login','2025-06-17 15:49:16',NULL,1,NULL),(111,1,'2025-06-17 15:49:49','80.102.138.129','login','2025-06-17 15:49:49',NULL,1,NULL),(112,1,'2025-06-17 15:56:05','80.102.138.129','login','2025-06-17 15:56:05',NULL,1,NULL),(113,1,'2025-06-17 15:56:48','80.102.138.129','login','2025-06-17 15:56:48',NULL,1,NULL),(114,1,'2025-06-17 16:01:13','80.102.138.129','login','2025-06-17 16:01:13',NULL,1,NULL),(115,1,'2025-06-17 16:01:46','80.102.138.129','login','2025-06-17 16:01:46',NULL,1,NULL),(116,24,'2025-06-17 16:02:17','80.102.138.129','login','2025-06-17 16:02:17',NULL,24,NULL),(117,24,'2025-06-17 16:33:25','196.245.54.154','login','2025-06-17 16:33:27',NULL,24,NULL),(118,24,'2025-06-17 16:50:27','196.245.54.154','login','2025-06-17 16:50:28',NULL,24,NULL),(119,24,'2025-06-17 16:58:21','196.245.54.154','login','2025-06-17 16:58:23',NULL,24,NULL),(120,24,'2025-06-17 16:59:06','196.245.54.154','login','2025-06-17 16:59:07',NULL,24,NULL),(121,24,'2025-06-17 17:02:37','196.245.54.154','login','2025-06-17 17:02:39',NULL,24,NULL),(122,24,'2025-06-17 17:16:48','80.102.138.129','login','2025-06-17 17:16:48',NULL,24,NULL),(123,1,'2025-06-17 17:35:45','80.102.138.129','login','2025-06-17 17:35:45',NULL,1,NULL),(124,24,'2025-06-18 06:50:08','196.245.54.140','login','2025-06-18 06:50:10',NULL,24,NULL),(125,24,'2025-06-18 06:50:46','196.245.54.140','login','2025-06-18 06:50:48',NULL,24,NULL),(126,24,'2025-06-18 13:24:43','79.116.247.20','login','2025-06-18 13:24:44',NULL,24,NULL),(127,1,'2025-06-18 13:48:06','80.102.138.129','login','2025-06-18 13:48:06',NULL,1,NULL),(128,26,'2025-06-18 13:51:45','80.102.138.129','login','2025-06-18 13:51:45',NULL,26,NULL),(129,26,'2025-06-18 14:08:29','80.102.138.129','login','2025-06-18 14:08:29',NULL,26,NULL),(130,26,'2025-06-18 14:23:22','80.102.138.129','login','2025-06-18 14:23:22',NULL,26,NULL),(131,26,'2025-06-18 14:27:11','80.102.138.129','login','2025-06-18 14:27:11',NULL,26,NULL),(132,26,'2025-06-19 14:03:52','80.102.138.129','login','2025-06-19 14:03:52',NULL,26,NULL),(133,26,'2025-06-19 14:14:36','80.102.138.129','login','2025-06-19 14:14:36',NULL,26,NULL),(134,26,'2025-07-08 13:30:25','90.167.50.194','login','2025-07-08 13:30:26',NULL,26,NULL),(135,24,'2025-07-08 13:31:09','90.167.50.194','login','2025-07-08 13:31:09',NULL,24,NULL),(136,24,'2025-07-08 13:54:27','90.167.50.194','login','2025-07-08 13:54:27',NULL,24,NULL),(137,24,'2025-07-08 14:12:49','90.167.50.194','login','2025-07-08 14:12:49',NULL,24,NULL),(138,26,'2025-07-08 14:20:47','90.167.50.194','login','2025-07-08 14:20:47',NULL,26,NULL),(139,24,'2025-07-08 14:21:21','90.167.50.194','login','2025-07-08 14:21:21',NULL,24,NULL),(140,24,'2025-07-08 14:30:34','90.167.50.194','login','2025-07-08 14:30:34',NULL,24,NULL),(141,24,'2025-07-11 14:55:51','80.102.138.129','login','2025-07-11 14:55:51',NULL,24,NULL),(142,24,'2025-07-11 15:22:52','80.102.138.129','login','2025-07-11 15:22:52',NULL,24,NULL),(143,24,'2025-08-18 13:59:07','80.102.138.129','login','2025-08-18 13:59:08',NULL,24,NULL),(144,24,'2025-08-18 14:09:38','80.102.138.129','login','2025-08-18 14:09:39',NULL,24,NULL),(145,1,'2025-08-18 14:13:22','80.102.138.129','login','2025-08-18 14:13:22',NULL,1,NULL),(146,24,'2025-08-18 14:13:37','80.102.138.129','login','2025-08-18 14:13:38',NULL,24,NULL),(147,26,'2025-08-18 14:13:48','80.102.138.129','login','2025-08-18 14:13:48',NULL,26,NULL),(148,26,'2025-08-18 14:16:13','80.102.138.129','login','2025-08-18 14:16:13',NULL,26,NULL),(149,26,'2025-08-18 14:16:37','80.102.138.129','login','2025-08-18 14:16:37',NULL,26,NULL),(150,26,'2025-08-18 14:19:09','80.102.138.129','login','2025-08-18 14:19:09',NULL,26,NULL),(151,26,'2025-08-18 14:20:27','80.102.138.129','login','2025-08-18 14:20:27',NULL,26,NULL),(152,26,'2025-08-18 14:20:44','80.102.138.129','login','2025-08-18 14:20:44',NULL,26,NULL),(153,26,'2025-08-20 13:49:38','80.102.138.129','login','2025-08-20 13:49:39',NULL,26,NULL),(154,24,'2025-08-20 13:53:02','80.102.138.129','login','2025-08-20 13:53:02',NULL,24,NULL),(155,24,'2025-08-20 13:53:13','80.102.138.129','login','2025-08-20 13:53:13',NULL,24,NULL),(156,26,'2025-08-20 13:55:26','80.102.138.129','login','2025-08-20 13:55:26',NULL,26,NULL),(157,24,'2025-08-20 14:07:48','80.102.138.129','login','2025-08-20 14:07:48',NULL,24,NULL),(158,26,'2025-08-20 14:10:03','80.102.138.129','login','2025-08-20 14:10:03',NULL,26,NULL),(159,26,'2025-08-20 14:17:23','80.102.138.129','login','2025-08-20 14:17:23',NULL,26,NULL),(160,26,'2025-08-20 14:20:13','80.102.138.129','login','2025-08-20 14:20:13',NULL,26,NULL),(161,26,'2025-08-20 14:22:57','80.102.138.129','login','2025-08-20 14:22:57',NULL,26,NULL),(162,26,'2025-08-20 14:36:26','80.102.138.129','login','2025-08-20 14:36:26',NULL,26,NULL),(163,26,'2025-08-20 14:38:46','80.102.138.129','login','2025-08-20 14:38:47',NULL,26,NULL),(164,26,'2025-08-20 14:53:57','80.102.138.129','login','2025-08-20 14:53:58',NULL,26,NULL),(165,26,'2025-08-20 15:04:41','80.102.138.129','login','2025-08-20 15:04:41',NULL,26,NULL),(166,26,'2025-08-20 15:55:13','80.102.138.129','login','2025-08-20 15:55:13',NULL,26,NULL),(167,26,'2025-08-20 16:07:34','80.102.138.129','login','2025-08-20 16:07:34',NULL,26,NULL),(168,26,'2025-08-20 16:17:28','80.102.138.129','login','2025-08-20 16:17:28',NULL,26,NULL),(169,26,'2025-08-20 16:17:45','80.102.138.129','login','2025-08-20 16:17:45',NULL,26,NULL),(170,26,'2025-09-05 14:24:39','80.102.138.129','login','2025-09-05 14:24:39',NULL,26,NULL),(171,26,'2025-09-05 14:25:00','80.102.138.129','login','2025-09-05 14:25:00',NULL,26,NULL),(172,26,'2025-09-05 14:30:37','80.102.138.129','login','2025-09-05 14:30:37',NULL,26,NULL),(173,1,'2025-09-05 14:32:19','80.102.138.129','login','2025-09-05 14:32:19',NULL,1,NULL),(174,26,'2025-09-05 14:38:48','80.102.138.129','login','2025-09-05 14:38:48',NULL,26,NULL),(175,26,'2025-09-05 14:39:21','80.102.138.129','login','2025-09-05 14:39:21',NULL,26,NULL),(176,1,'2025-09-05 14:39:36','80.102.138.129','login','2025-09-05 14:39:36',NULL,1,NULL);
/*!40000 ALTER TABLE `log_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iso` varchar(10) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'bbb','España','S','2024-07-12 11:11:53','2025-05-31 11:17:48',1,1),(21,'1','Francia','S','2025-05-31 11:15:52','2025-05-31 11:16:32',1,1),(24,'ES','España','S','2025-06-17 16:35:36',NULL,24,NULL),(25,'BR','Brasil','S','2025-06-17 16:35:57',NULL,24,NULL),(26,'CH','China','S','2025-06-17 16:36:13',NULL,24,NULL),(27,'MX','México','S','2025-06-17 16:36:27',NULL,24,NULL),(28,'CR','Costa Rica','S','2025-06-17 16:36:37',NULL,24,NULL),(29,'EU','Estados Unidos','S','2025-06-17 16:36:51',NULL,24,NULL),(30,'2','02','N','2025-08-18 14:03:33',NULL,24,24),(31,'22','01','S','2025-08-18 14:03:54',NULL,24,26),(32,'','03','S','2025-08-18 14:03:59',NULL,24,24);
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pallet`
--

DROP TABLE IF EXISTS `pallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `usuario_creacion` int(11) DEFAULT NULL,
  `usuario_modificacion` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`empresa_id`),
  KEY `fk_pallet_empresa_idx` (`empresa_id`),
  CONSTRAINT `fk_pallet_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pallet`
--

LOCK TABLES `pallet` WRITE;
/*!40000 ALTER TABLE `pallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `pallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pallet_configuracion`
--

DROP TABLE IF EXISTS `pallet_configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet_configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pallet_id` int(11) NOT NULL,
  `evento_guardado_minuto` varchar(50) DEFAULT NULL,
  `evento_enviado_minuto` varchar(50) DEFAULT NULL,
  `resolucion_peso` varchar(50) DEFAULT NULL,
  `temperatura_sin_control` varchar(50) DEFAULT NULL,
  `temperatura_ambiente` varchar(50) DEFAULT NULL,
  `temperatura_refrigerado` varchar(50) DEFAULT NULL,
  `temperatura_congelado` varchar(50) DEFAULT NULL,
  `humedad_permitida` varchar(50) DEFAULT NULL,
  `calidad_aire_permitida` varchar(50) DEFAULT NULL,
  `velocidad_permitida` varchar(50) DEFAULT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `usuario_creacion` int(11) DEFAULT NULL,
  `usuario_modificacion` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`pallet_id`),
  KEY `fk_palletconfiguracon_pallet_idx` (`pallet_id`),
  CONSTRAINT `fk_palletconfiguracon_pallet` FOREIGN KEY (`pallet_id`) REFERENCES `pallet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pallet_configuracion`
--

LOCK TABLES `pallet_configuracion` WRITE;
/*!40000 ALTER TABLE `pallet_configuracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `pallet_configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pallet_configuracion_general`
--

DROP TABLE IF EXISTS `pallet_configuracion_general`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallet_configuracion_general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `evento_guardado_minuto` varchar(50) DEFAULT NULL,
  `evento_enviado_minuto` varchar(50) DEFAULT NULL,
  `resolucion_peso` varchar(50) DEFAULT NULL,
  `temperatura_sin_control` varchar(50) DEFAULT NULL,
  `temperatura_ambiente` varchar(50) DEFAULT NULL,
  `temperatura_refrigerado` varchar(50) DEFAULT NULL,
  `temperatura_congelado` varchar(50) DEFAULT NULL,
  `humedad_permitida` varchar(50) DEFAULT NULL,
  `calidad_aire_permitida` varchar(50) DEFAULT NULL,
  `velocidad_permitida` varchar(50) DEFAULT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `usuario_creacion` int(11) DEFAULT NULL,
  `usuario_modificacion` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`empresa_id`),
  KEY `fk_palletconfiguracon_empresa_idx` (`empresa_id`),
  CONSTRAINT `fk_palletconfiguracon_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pallet_configuracion_general`
--

LOCK TABLES `pallet_configuracion_general` WRITE;
/*!40000 ALTER TABLE `pallet_configuracion_general` DISABLE KEYS */;
/*!40000 ALTER TABLE `pallet_configuracion_general` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pallets_movements`
--

DROP TABLE IF EXISTS `pallets_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pallets_movements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `temperature` varchar(50) DEFAULT NULL,
  `humidity` varchar(50) DEFAULT NULL,
  `press` varchar(50) DEFAULT NULL,
  `pm2_5` varchar(50) DEFAULT NULL,
  `pm5` varchar(50) DEFAULT NULL,
  `pm10` varchar(50) DEFAULT NULL,
  `battery_volts` varchar(50) DEFAULT NULL,
  `battery_pct` varchar(50) DEFAULT NULL,
  `rssi` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`empresa_id`),
  KEY `fk_PM_Empresa_idx` (`empresa_id`),
  CONSTRAINT `fk_PM_Empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pallets_movements`
--

LOCK TABLES `pallets_movements` WRITE;
/*!40000 ALTER TABLE `pallets_movements` DISABLE KEYS */;
/*!40000 ALTER TABLE `pallets_movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametros_pallets`
--

DROP TABLE IF EXISTS `parametros_pallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametros_pallets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `activo_sn` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `usu_creacion` int(11) DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`empresa_id`),
  CONSTRAINT `fk_parametrospallets_empresa` FOREIGN KEY (`id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametros_pallets`
--

LOCK TABLES `parametros_pallets` WRITE;
/*!40000 ALTER TABLE `parametros_pallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametros_pallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametros_pallets_detalle`
--

DROP TABLE IF EXISTS `parametros_pallets_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametros_pallets_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parametros_pallets_id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `usu_creacion` int(11) DEFAULT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`parametros_pallets_id`),
  KEY `fk_paramdet_param_idx` (`parametros_pallets_id`),
  CONSTRAINT `fk_paramdet_param` FOREIGN KEY (`parametros_pallets_id`) REFERENCES `parametros_pallets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametros_pallets_detalle`
--

LOCK TABLES `parametros_pallets_detalle` WRITE;
/*!40000 ALTER TABLE `parametros_pallets_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametros_pallets_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_id` int(11) NOT NULL,
  `modulo` varchar(50) DEFAULT NULL,
  `controlador` varchar(50) DEFAULT NULL,
  `accion` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkPerRoles_idx` (`rol_id`),
  CONSTRAINT `fkPerRoles` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27127 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (26803,1,'Neatpallet','Idiomas','Ver','2025-02-14 12:22:41','2025-05-31 07:57:17',1,NULL),(26804,1,'Neatpallet','Idiomas','Nuevo','2025-02-14 12:22:48','2025-05-31 07:57:17',1,NULL),(26805,1,'Neatpallet','Idiomas','Actualizar','2025-02-14 12:22:49','2025-05-31 07:57:17',1,NULL),(26806,1,'Neatpallet','Idiomas','Borrar','2025-02-14 12:22:50','2025-05-31 07:57:17',1,NULL),(26814,1,'Neatpallet','Logs de usuarios','Actualizar','2025-02-14 12:23:15','2025-05-31 07:57:17',1,NULL),(26815,1,'Neatpallet','Logs de usuarios','Borrar','2025-02-14 12:23:17','2025-05-31 07:57:17',1,NULL),(26816,1,'Neatpallet','Logs de usuarios','Nuevo','2025-02-14 12:23:18','2025-05-31 07:57:17',1,NULL),(26831,1,'Neatpallet','Paises','Acceder','2025-02-14 12:23:48','2025-05-31 07:57:17',1,NULL),(26832,1,'Neatpallet','Paises','Ver','2025-02-14 12:23:49','2025-05-31 07:57:17',1,NULL),(26833,1,'Neatpallet','Paises','Nuevo','2025-02-14 12:25:04','2025-05-31 07:57:17',1,NULL),(26834,1,'Neatpallet','Paises','Actualizar','2025-02-14 12:25:06','2025-05-31 07:57:17',1,NULL),(26835,1,'Neatpallet','Paises','Borrar','2025-02-14 12:25:07','2025-05-31 07:57:17',1,NULL),(26866,1,'Neatpallet','Tipos de archivo','Acceder','2025-02-14 12:25:36','2025-05-31 07:57:17',1,NULL),(26867,1,'Neatpallet','Tipos de archivo','Ver','2025-02-14 12:25:36','2025-05-31 07:57:17',1,NULL),(26868,1,'Neatpallet','Tipos de archivo','Nuevo','2025-02-14 12:25:37','2025-05-31 07:57:17',1,NULL),(26869,1,'Neatpallet','Tipos de archivo','Actualizar','2025-02-14 12:25:38','2025-05-31 07:57:17',1,NULL),(26870,1,'Neatpallet','Tipos de archivo','Borrar','2025-02-14 12:25:39','2025-05-31 07:57:17',1,NULL),(26871,1,'Neatpallet','Plantillas de correo','Acceder','2025-02-14 12:25:39','2025-05-31 07:57:17',1,NULL),(26872,1,'Neatpallet','Plantillas de correo','Ver','2025-02-14 12:25:40','2025-05-31 07:57:17',1,NULL),(26873,1,'Neatpallet','Plantillas de correo','Nuevo','2025-02-14 12:25:41','2025-05-31 07:57:17',1,NULL),(26874,1,'Neatpallet','Plantillas de correo','Actualizar','2025-02-14 12:25:42','2025-05-31 07:57:17',1,NULL),(26875,1,'Neatpallet','Plantillas de correo','Borrar','2025-02-14 12:25:43','2025-05-31 07:57:17',1,NULL),(26876,1,'Neatpallet','Secciones','Acceder','2025-02-14 12:25:44','2025-05-31 07:57:17',1,NULL),(26877,1,'Neatpallet','Secciones','Ver','2025-02-14 12:25:45','2025-05-31 07:57:17',1,NULL),(26878,1,'Neatpallet','Secciones','Nuevo','2025-02-14 12:25:46','2025-05-31 07:57:17',1,NULL),(26879,1,'Neatpallet','Secciones','Actualizar','2025-02-14 12:25:47','2025-05-31 07:57:17',1,NULL),(26880,1,'Neatpallet','Secciones','Borrar','2025-02-14 12:25:47','2025-05-31 07:57:17',1,NULL),(26881,1,'Neatpallet','Archivos','Acceder','2025-02-14 12:25:49','2025-05-31 07:57:17',1,NULL),(26882,1,'Neatpallet','Archivos','Ver','2025-02-14 12:25:50','2025-05-31 07:57:17',1,NULL),(26883,1,'Neatpallet','Archivos','Nuevo','2025-02-14 12:25:50','2025-05-31 07:57:17',1,NULL),(26884,1,'Neatpallet','Archivos','Borrar','2025-02-14 12:25:52','2025-05-31 07:57:17',1,NULL),(26885,1,'Neatpallet','Archivos','Actualizar','2025-02-14 12:25:52','2025-05-31 07:57:17',1,NULL),(26886,1,'Neatpallet','Traducciones','Acceder','2025-02-14 12:25:55','2025-05-31 07:57:17',1,NULL),(26887,1,'Neatpallet','Traducciones','Nuevo','2025-02-14 12:25:56','2025-05-31 07:57:17',1,NULL),(26888,1,'Neatpallet','Traducciones','Ver','2025-02-14 12:25:58','2025-05-31 07:57:17',1,NULL),(26889,1,'Neatpallet','Traducciones','Actualizar','2025-02-14 12:25:59','2025-05-31 07:57:17',1,NULL),(26890,1,'Neatpallet','Traducciones','Borrar','2025-02-14 12:26:00','2025-05-31 07:57:17',1,NULL),(26906,1,'Neatpallet','Roles','Acceder','2025-02-14 12:26:22','2025-05-31 07:57:17',1,NULL),(26907,1,'Neatpallet','Roles','Ver','2025-02-14 12:26:23','2025-05-31 07:57:17',1,NULL),(26908,1,'Neatpallet','Roles','Nuevo','2025-02-14 12:26:24','2025-05-31 07:57:17',1,NULL),(26909,1,'Neatpallet','Roles','Actualizar','2025-02-14 12:26:25','2025-05-31 07:57:17',1,NULL),(26910,1,'Neatpallet','Roles','Borrar','2025-02-14 12:26:26','2025-05-31 07:57:17',1,NULL),(26911,1,'Neatpallet','Permisos','Acceder','2025-02-14 12:26:28','2025-05-31 07:57:17',1,NULL),(26912,1,'Neatpallet','Permisos','Ver','2025-02-14 12:26:29','2025-05-31 07:57:17',1,NULL),(26913,1,'Neatpallet','Permisos','Nuevo','2025-02-14 12:26:29','2025-05-31 07:57:17',1,NULL),(26914,1,'Neatpallet','Permisos','Actualizar','2025-02-14 12:26:30','2025-05-31 07:57:17',1,NULL),(26915,1,'Neatpallet','Permisos','Borrar','2025-02-14 12:26:31','2025-05-31 07:57:17',1,NULL),(26921,1,'Neatpallet','Usuarios','Acceder','2025-02-14 12:26:38','2025-05-31 07:57:17',1,NULL),(26922,1,'Neatpallet','Usuarios','Ver','2025-02-14 12:26:38','2025-05-31 07:57:17',1,NULL),(26923,1,'Neatpallet','Usuarios','Nuevo','2025-02-14 12:26:39','2025-05-31 07:57:17',1,NULL),(26924,1,'Neatpallet','Usuarios','Actualizar','2025-02-14 12:26:40','2025-05-31 07:57:17',1,NULL),(26925,1,'Neatpallet','Usuarios','Borrar','2025-02-14 12:26:41','2025-05-31 07:57:17',1,NULL),(26989,1,'Neatpallet','Usuarios','SeleccionarRol','2025-04-09 06:35:45','2025-05-31 07:57:17',1,NULL),(26990,1,'Neatpallet','Usuarios','SeleccionarTipo','2025-04-09 06:35:49','2025-05-31 07:57:17',1,NULL),(26991,1,'Neatpallet','Usuarios','Cancelar','2025-04-09 06:35:53','2025-05-31 07:57:17',1,NULL),(26998,1,'Neatpallet','Usuarios','SeleccionarAgente','2025-04-14 07:58:32','2025-05-31 07:57:17',1,NULL),(27009,1,'Neatpallet','Usuarios','SeleccionarComercial','2025-04-17 08:23:15','2025-05-31 07:57:17',1,NULL),(27013,1,'Neatpallet','Logs de usuarios','Acceder','2025-05-31 14:39:07',NULL,1,NULL),(27014,1,'Neatpallet','Logs de usuarios','Ver','2025-05-31 14:39:13',NULL,1,NULL),(27016,1,'Neatpallet','Movimientos','Nuevo','2025-06-01 06:04:29',NULL,1,NULL),(27017,1,'Neatpallet','Movimientos','Borrar','2025-06-01 06:05:37',NULL,1,NULL),(27018,1,'Neatpallet','Movimientos','Actualizar','2025-06-01 06:05:37',NULL,1,NULL),(27020,20,'Neatpallet','Empresas','Acceder','2025-06-11 13:54:02',NULL,1,NULL),(27022,1,'Neatpallet','Movimientos','Ver','2025-06-17 13:38:41',NULL,1,NULL),(27024,21,'Neatpallet','Empresas','Acceder','2025-06-17 17:41:40',NULL,1,NULL),(27040,22,'Neatpallet','Idiomas','Ver','2025-02-14 12:22:41',NULL,1,NULL),(27041,22,'Neatpallet','Idiomas','Nuevo','2025-02-14 12:22:48',NULL,1,NULL),(27042,22,'Neatpallet','Idiomas','Actualizar','2025-02-14 12:22:49',NULL,1,NULL),(27043,22,'Neatpallet','Idiomas','Borrar','2025-02-14 12:22:50',NULL,1,NULL),(27047,22,'Neatpallet','Paises','Acceder','2025-02-14 12:23:48',NULL,1,NULL),(27048,22,'Neatpallet','Paises','Ver','2025-02-14 12:23:49',NULL,1,NULL),(27049,22,'Neatpallet','Paises','Nuevo','2025-02-14 12:25:04',NULL,1,NULL),(27050,22,'Neatpallet','Paises','Actualizar','2025-02-14 12:25:06',NULL,1,NULL),(27051,22,'Neatpallet','Paises','Borrar','2025-02-14 12:25:07',NULL,1,NULL),(27052,22,'Neatpallet','Tipos de archivo','Acceder','2025-02-14 12:25:03',NULL,1,NULL),(27053,22,'Neatpallet','Tipos de archivo','Ver','2025-02-14 12:25:03',NULL,1,NULL),(27054,22,'Neatpallet','Tipos de archivo','Nuevo','2025-02-14 12:25:03',NULL,1,NULL),(27055,22,'Neatpallet','Tipos de archivo','Actualizar','2025-02-14 12:25:03',NULL,1,NULL),(27056,22,'Neatpallet','Tipos de archivo','Borrar','2025-02-14 12:25:03',NULL,1,NULL),(27057,22,'Neatpallet','Plantillas de correo','Acceder','2025-02-14 12:25:03',NULL,1,NULL),(27058,22,'Neatpallet','Plantillas de correo','Ver','2025-02-14 12:25:04',NULL,1,NULL),(27059,22,'Neatpallet','Plantillas de correo','Nuevo','2025-02-14 12:25:04',NULL,1,NULL),(27060,22,'Neatpallet','Plantillas de correo','Actualizar','2025-02-14 12:25:04',NULL,1,NULL),(27061,22,'Neatpallet','Plantillas de correo','Borrar','2025-02-14 12:25:04',NULL,1,NULL),(27062,22,'Neatpallet','Secciones','Acceder','2025-02-14 12:25:44',NULL,1,NULL),(27063,22,'Neatpallet','Secciones','Ver','2025-02-14 12:25:45',NULL,1,NULL),(27064,22,'Neatpallet','Secciones','Nuevo','2025-02-14 12:25:46',NULL,1,NULL),(27065,22,'Neatpallet','Secciones','Actualizar','2025-02-14 12:25:47',NULL,1,NULL),(27066,22,'Neatpallet','Secciones','Borrar','2025-02-14 12:25:47',NULL,1,NULL),(27067,22,'Neatpallet','Archivos','Acceder','2025-02-14 12:25:49',NULL,1,NULL),(27068,22,'Neatpallet','Archivos','Ver','2025-02-14 12:25:50',NULL,1,NULL),(27069,22,'Neatpallet','Archivos','Nuevo','2025-02-14 12:25:50',NULL,1,NULL),(27070,22,'Neatpallet','Archivos','Borrar','2025-02-14 12:25:52',NULL,1,NULL),(27071,22,'Neatpallet','Archivos','Actualizar','2025-02-14 12:25:52',NULL,1,NULL),(27072,22,'Neatpallet','Traducciones','Acceder','2025-02-14 12:25:55',NULL,1,NULL),(27073,22,'Neatpallet','Traducciones','Nuevo','2025-02-14 12:25:56',NULL,1,NULL),(27074,22,'Neatpallet','Traducciones','Ver','2025-02-14 12:25:58',NULL,1,NULL),(27075,22,'Neatpallet','Traducciones','Actualizar','2025-02-14 12:25:59',NULL,1,NULL),(27076,22,'Neatpallet','Traducciones','Borrar','2025-02-14 12:26:00',NULL,1,NULL),(27077,22,'Neatpallet','Roles','Acceder','2025-02-14 12:26:22',NULL,1,NULL),(27078,22,'Neatpallet','Roles','Ver','2025-02-14 12:26:23',NULL,1,NULL),(27079,22,'Neatpallet','Roles','Nuevo','2025-02-14 12:26:24',NULL,1,NULL),(27080,22,'Neatpallet','Roles','Actualizar','2025-02-14 12:26:25',NULL,1,NULL),(27081,22,'Neatpallet','Roles','Borrar','2025-02-14 12:26:26',NULL,1,NULL),(27082,22,'Neatpallet','Permisos','Acceder','2025-02-14 12:26:28',NULL,1,NULL),(27083,22,'Neatpallet','Permisos','Ver','2025-02-14 12:26:29',NULL,1,NULL),(27084,22,'Neatpallet','Permisos','Nuevo','2025-02-14 12:26:29',NULL,1,NULL),(27085,22,'Neatpallet','Permisos','Actualizar','2025-02-14 12:26:30',NULL,1,NULL),(27086,22,'Neatpallet','Permisos','Borrar','2025-02-14 12:26:31',NULL,1,NULL),(27087,22,'Neatpallet','Usuarios','Acceder','2025-02-14 12:26:38',NULL,1,NULL),(27088,22,'Neatpallet','Usuarios','Ver','2025-02-14 12:26:38',NULL,1,NULL),(27089,22,'Neatpallet','Usuarios','Nuevo','2025-02-14 12:26:39',NULL,1,NULL),(27090,22,'Neatpallet','Usuarios','Actualizar','2025-02-14 12:26:40',NULL,1,NULL),(27091,22,'Neatpallet','Usuarios','Borrar','2025-02-14 12:26:41',NULL,1,NULL),(27093,22,'Neatpallet','Usuarios','SeleccionarRol','2025-04-09 06:35:45',NULL,1,NULL),(27094,22,'Neatpallet','Usuarios','SeleccionarTipo','2025-04-09 06:35:49',NULL,1,NULL),(27095,22,'Neatpallet','Usuarios','Cancelar','2025-04-09 06:35:53',NULL,1,NULL),(27097,22,'Neatpallet','Usuarios','SeleccionarAgente','2025-04-14 07:58:32',NULL,1,NULL),(27098,22,'Neatpallet','Usuarios','SeleccionarComercial','2025-04-17 08:23:15',NULL,1,NULL),(27099,22,'Neatpallet','Logs de usuarios','Acceder','2025-05-31 14:39:07',NULL,1,NULL),(27100,22,'Neatpallet','Logs de usuarios','Ver','2025-05-31 14:39:13',NULL,1,NULL),(27101,22,'Neatpallet','Movimientos','Nuevo','2025-06-01 06:04:29',NULL,1,NULL),(27102,22,'Neatpallet','Movimientos','Borrar','2025-06-01 06:05:37',NULL,1,NULL),(27103,22,'Neatpallet','Movimientos','Actualizar','2025-06-01 06:05:37',NULL,1,NULL),(27105,22,'Neatpallet','Movimientos','Ver','2025-06-17 13:38:41',NULL,1,NULL),(27115,1,'Neatpallet','Empresas','Actualizar','2025-08-20 15:55:31',NULL,26,NULL),(27116,1,'Neatpallet','Empresas','Borrar','2025-08-20 15:55:32',NULL,26,NULL),(27121,1,'Neatpallet','Empresas','Acceder','2025-08-20 15:57:48',NULL,26,NULL),(27122,1,'Neatpallet','Empresas','Ver','2025-08-20 15:57:50',NULL,26,NULL),(27123,1,'Neatpallet','Empresas','Nuevo','2025-08-20 15:58:53',NULL,26,NULL),(27124,1,'Neatpallet','Movimientos','Acceder','2025-08-20 16:15:40',NULL,26,NULL),(27125,1,'Neatpallet','Idiomas','Acceder','2025-08-20 16:15:48',NULL,26,NULL),(27126,1,'Neatpallet','Usuarios','VerPerfil','2025-08-20 16:17:07',NULL,26,NULL);
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantilla_email`
--

DROP TABLE IF EXISTS `plantilla_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantilla_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idioma_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `nombre_plantilla` varchar(50) NOT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `cuerpo` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_inactivo` datetime DEFAULT NULL,
  `usu_inactivo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_plantilla_UNIQUE` (`nombre_plantilla`),
  KEY `fkPlantmailEmpresa_idx` (`empresa_id`),
  KEY `fkPlantmailIdioma_idx` (`idioma_id`),
  CONSTRAINT `fkPlantmailEmpresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fkPlantmailIdioma` FOREIGN KEY (`idioma_id`) REFERENCES `idioma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantilla_email`
--

LOCK TABLES `plantilla_email` WRITE;
/*!40000 ALTER TABLE `plantilla_email` DISABLE KEYS */;
INSERT INTO `plantilla_email` VALUES (51,1,1,'RecuperarContraseña',NULL,'Nathalie: Restablecer tu contraseña','<p>Tu código para restablecer la contraseña es: <strong>{{codigoRecuperacion}}</strong>. Este código expirará en <strong style=\"color: rgb(230, 0, 0);\">24 horas</strong>.</p>','2025-01-28 11:31:29','2025-05-31 14:57:31',1,1,NULL,NULL);
/*!40000 ALTER TABLE `plantilla_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refrescar_token`
--

DROP TABLE IF EXISTS `refrescar_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refrescar_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `refreshToken` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkRefrescarTokenUsuario_idx` (`usuario_id`),
  CONSTRAINT `fkRefrescarTokenUsuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=716 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refrescar_token`
--

LOCK TABLES `refrescar_token` WRITE;
/*!40000 ALTER TABLE `refrescar_token` DISABLE KEYS */;
INSERT INTO `refrescar_token` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc1MzIwYTRjLWQxMWEtNDdmNy04ODY3LTVhMmY0NWQzNjIyNSIsImlhdCI6MTcxOTIzNzUxOSwiZXhwIjoxNzE5NDUzNTE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tpd_oBYWS5dUHo8ezwjzJvoEKk1uZfV6lqXZzws1ZE8'),(2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNmOWNiNzdiLWU2YzQtNGYyNS04MjA5LWE1MTA2NGE3YjUwZCIsImlhdCI6MTcxOTIzNzU1OSwiZXhwIjoxNzE5NDUzNTU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gQdD-Uco1_cXgL2d7wKJ6CmX1ZgupJN4kP_So-QKj3I'),(3,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ5NWNlMjE5LTJmZDUtNDVmZS1hYjQ0LTkzMDg2NjM4ZjliOCIsImlhdCI6MTcxOTIzNzY1OSwiZXhwIjoxNzE5NDUzNjU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.J3x8BktLPx-5vspNRUnf8VfeamVqm-tKS0e9_pnnmA4'),(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFhYjJiOGI4LThhZDEtNDA2Zi1hY2NkLTk1OTNhNWFlNjkwOCIsImlhdCI6MTcyMDU5MzIyOSwiZXhwIjoxNzIwODA5MjI5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vyxfFxSK34Yoc6LSmaO6nyRWsG1-JQllYO21HCXH0YY'),(5,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAxOTUwZDQ1LTkxZDAtNDYzMy1iMGFiLThjZGI4MjBhY2UyNSIsImlhdCI6MTcyMDU5NDE0MCwiZXhwIjoxNzIwODEwMTQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.N7CEmmkMG3LxtRB7lHHcPgP2HyoGw3rKl714P1PH29c'),(76,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRjOGY2MDE5LWE4OTMtNDg2NS1hNDY2LTA5MDhhMjk4NGMyNiIsImlhdCI6MTcyNTQzMTU1NSwiZXhwIjoxNzI1NjQ3NTU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ghykP89adiLpYfkAbM9B1awPRL3x2o8E70oTqgyTP-g'),(77,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZlNjljOGVhLTlkNDMtNDdkOC04ZGQyLTk2MzExNTk1MWE2YiIsImlhdCI6MTcyNTQzOTU4MywiZXhwIjoxNzI1NjU1NTgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ws582rcklvkXoAIT1euo6NakKhL7yS5Ni44KtQstSwA'),(78,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ1YjlmY2VjLTEwYTUtNGFjMy04ODk1LTIyMTllMjFlMThmZCIsImlhdCI6MTcyNjEyMTg0MCwiZXhwIjoxNzI2MzM3ODQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.O3LTwB-QggO5cWJVnh7wh8vkPfB3e9Z0USwPTtN08XM'),(79,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMxMzgzMmViLTM4NWUtNGRiNS04NTM0LWVlNDM5YmE1NGFmYyIsImlhdCI6MTcyNjEzMDkwOCwiZXhwIjoxNzI2MzQ2OTA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.JQsqrugRC4IhJ_Hcy1Ik2LT67Fi3yW4q1r3-qTUH-4A'),(80,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc3ZWM2MDEyLTlkNGMtNDE3Mi1hZWQyLTYyMDFjMzZhNzg3YyIsImlhdCI6MTcyNjIwNTUxOCwiZXhwIjoxNzI2NDIxNTE4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.z_zpfGbfn4xapdqDWqsL01jMXePHbAunfW6B9ino5uI'),(81,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU5NjhmMDVmLTQ5NDktNDAyMC1iNTFmLTE2NmMwMjAzOGZlMSIsImlhdCI6MTcyNjQ2NzIyNCwiZXhwIjoxNzI2NjgzMjI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-NydLYC2HI-9qR0eJ3NMy2lKf3DDFX6V5vmv2ml6Ta4'),(82,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRjZjNhODc0LWUxNWItNDdjZi04Y2NiLTg1YzFhMDViMGEyNyIsImlhdCI6MTcyNjQ4NTE2OCwiZXhwIjoxNzI2NzAxMTY4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.sTu5MGRpe-h0aZCMCUwduT8me_pbJ0FWvEVVShonH2k'),(83,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjExODdjOGM3LTFiNjYtNDdlMi1iNjljLTVmMjQ0YjFhMTBiMSIsImlhdCI6MTcyNjQ5NDk2NCwiZXhwIjoxNzI2NzEwOTY0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.A-K9zqOEx1lMIApDhlkCwa7qkEnjNy8iRBPmvLG8Z4Q'),(84,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE1ZmQ5Mjc1LTQ1YjUtNDg5NS1iODEyLTY0NzgwNmFiODRkZCIsImlhdCI6MTcyNjU4NTU1OCwiZXhwIjoxNzI2ODAxNTU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.md2xynJe5Nst1eWAJ_zKu8g72DAQgtEeNf_uZh8JkOE'),(85,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNjMzQ5M2JiLWQ1YTUtNGIzOS1hMzQyLTg3Mjg5YTY1MTUwMCIsImlhdCI6MTcyNjgyMzYwNywiZXhwIjoxNzI3MDM5NjA3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Nl4r5DV3YKdysy0A8FcscjzGkPtW6G61b0N6Gu745nA'),(86,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM2NWZmMDU0LWVmZDEtNDcxYi1hNWIxLTRjMzA0YzhiNGQ5NSIsImlhdCI6MTcyNjgyNTI4NCwiZXhwIjoxNzI3MDQxMjg0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FHkru1HOB12x778DYiUGqqkMFRqWGSI_bXMLo360mgk'),(87,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUzYjgwOGMwLTljNDgtNDViYi1hOTFkLTI3YjhlNDZjNzU4NiIsImlhdCI6MTcyNzA4MDg1MywiZXhwIjoxNzI3Mjk2ODUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.oeCYlIau2p65XhX8JZcpISTPb6Ho9HlRqemAML8QSsA'),(88,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhiNmFmMzNkLWI3ZmMtNGM5ZC1iMzBhLTQwZDcwMTIxNmNkYiIsImlhdCI6MTcyNzA5Mjc0MiwiZXhwIjoxNzI3MzA4NzQyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zxh5OGRIv1wMNYOeldVkV_JlZIF4qUScttkBqCCfgq0'),(89,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNiN2E0NDY1LThkZjAtNDQ1NC1iNzgwLTQzNDk2MjI4ZDQ2NCIsImlhdCI6MTczMTQwNTQzOSwiZXhwIjoxNzMxNjIxNDM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.EeRFPgO1aL2uD-dRQZvN8da1eUYnmkDg3vorZTrEZFI'),(90,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdjMWUwMTAxLThiN2ItNDBhYS1hODViLWQ4MmMwOTU1Njc5NSIsImlhdCI6MTczMTQxNTg4OSwiZXhwIjoxNzMxNjMxODg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SEYZI3zLy1Hga_FqDLXAw33HTnlsr0ANVRhSBIZpQK0'),(91,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk1NmRmYTE5LTRlNDgtNGI2MS1hZTIyLWVmYjk3YjZhNzliYyIsImlhdCI6MTczMTQxNzAwNywiZXhwIjoxNzMxNjMzMDA3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.fbJgAEbh_PaLgcYGCqg2n70kMsq9sSXNtR3WjE-zuqM'),(92,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ4OTk0ODUwLTFkOGQtNDQ0NS1hZDdhLTNjZjViYmVhOTAwNyIsImlhdCI6MTczMTQxODQ1OSwiZXhwIjoxNzMxNjM0NDU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yRDmOu6Ov2Dw1Mq0JSSZnq-wPeaRBluNQzhvZCJx4Ak'),(93,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ5Y2VlMzVkLWE3MzgtNDFiYy04MTI4LTlmYmExZDMyYjNhZiIsImlhdCI6MTczMTQxOTA3NCwiZXhwIjoxNzMxNjM1MDc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uU70VXOh-H1WcIUnUOlWV5exHZjQjH6IYwL2UYMk9tk'),(94,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVkY2QyOGFhLTdmYWUtNDAyNi1iMzQ2LTI3ZGU0ZDU5NjgzMSIsImlhdCI6MTczMTQxOTY4MSwiZXhwIjoxNzMxNjM1NjgxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1loI60D1eNAt0_KmakisjiY4wUzMU-FgYQstht0DsnA'),(95,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI3YTM2OGIwLTE1ZWMtNGZlNi04NzYzLTZlNDFlYTQzOGNhOSIsImlhdCI6MTczMTQ4MTkxMiwiZXhwIjoxNzMxNjk3OTEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SY1vJAPvEeqFXRDL0Ezb5WV8stIsA32EyzY3WziV-DI'),(96,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAxYzdkYzQ4LTkzZmUtNDE3Yi1hZDljLWJkZjVkM2U1MjgyYSIsImlhdCI6MTczMTQ4NzQ1MywiZXhwIjoxNzMxNzAzNDUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.OzADfyVl_BKQ1psOe3qIXTSn0i_UD3GHzPXX8SgiwPM'),(97,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhNWE4NmE3LWMwOGMtNDhhYS05YjNhLTFkZTA2ODRmYjNmZiIsImlhdCI6MTczMTQ4ODEwMCwiZXhwIjoxNzMxNzA0MTAwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.D3xAJt64XU8JUPwoUUpVuB6Bs8suAwbKbQZyl9eQavw'),(98,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBlNGFlNTU1LTI2OTQtNGRkNS04OGQyLTc2NzZmZWZhYTgxNSIsImlhdCI6MTczMTQ4OTU1MSwiZXhwIjoxNzMxNzA1NTUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Z2R4ap4Y769Vz96A8DcRBu1Ro7OJExjs6MuYE4wwXe0'),(99,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgyOTFjYjlmLTRlYmMtNDYyNy05N2JkLWNhYTBmMTE2NGJjZSIsImlhdCI6MTczMTQ4OTU1MSwiZXhwIjoxNzMxNzA1NTUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SXf9XGSxBbOn63e-qjVwEz_giIKkbGlJK6Tg9Y2m89o'),(100,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM3YmQwMjkxLTY0MWUtNGM4OC1iOTEyLTg3YzhlYjQ2Mjk4MyIsImlhdCI6MTczMTQ5NTg2NywiZXhwIjoxNzMxNzExODY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6j6k-itsIHKmYShyzmLqAqSAXWEwhLiY53ncpaAMRKw'),(101,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQwOGQ1MDA1LTg5MDktNGU2ZS1iNDg1LTU3NDhkZTIxZWU1MyIsImlhdCI6MTczMTQ5OTIxMiwiZXhwIjoxNzMxNzE1MjEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.TCN7JQgbVsfXTM3Q7KrX3QsoaKq-UC68Z8KxMacD3qs'),(102,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU5MTFhYjExLTI1NDMtNDM3OS1hYjgwLWRlMDVjZTY4M2FjOCIsImlhdCI6MTczMTQ5OTk1MywiZXhwIjoxNzMxNzE1OTUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iYWSv0bpupprmiFcIswcjmVopqrY2LkN0HCl2pwWXzM'),(103,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdiMTYzZDcyLTk5MTQtNGJmNi05YTYyLTdlYzljYmUyMzE0NSIsImlhdCI6MTczMTUwMDEyOCwiZXhwIjoxNzMxNzE2MTI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gp-o-tbcXPc7MUkOcsXeAbVs0ToAkD95b15imaI1kcE'),(104,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc3MDNhNTI1LTAzZTUtNGFjMi05Y2NlLTU5ODJhZTUyNzJkYiIsImlhdCI6MTczMTUwMDIzMywiZXhwIjoxNzMxNzE2MjMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cProjqMfFjZK9XiHzqkbCaeUkHcwefi1KWZPecHR4s4'),(105,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIwZTllNTA4LTU4M2QtNGEzOC05OTYxLTc5ODA3ZmUzNmU3OSIsImlhdCI6MTczMjAyNDYwMywiZXhwIjoxNzMyMjQwNjAzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iAMFLNhpIDd6F3cycCzedKG2XWDITqrLekoqHcS5W00'),(106,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY4NWY1N2NjLTYyMGQtNGI0NC1hNDNlLWFkMGZjNTQxOGVhZiIsImlhdCI6MTczMjE3NDM1OCwiZXhwIjoxNzMyMzkwMzU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QwM_qz2KmZT-rU3VbhRWpjixMYxVW28vR33n_8M3zJY'),(107,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk1ZDNiY2RmLTllNTQtNDc4Zi1hNTc1LWVmYjVkZjFjYTU2ZiIsImlhdCI6MTczMjc4MDY4NywiZXhwIjoxNzMyOTk2Njg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.GzXaDDZ-6fsY-E5e0oJtSFfT_lPyS911nMZCwtWkAio'),(108,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM2ZWI3YTYzLTllM2YtNGY4Mi1iMGMxLTQ2MGEzYmE1OTY0OCIsImlhdCI6MTczMzEzOTA2NywiZXhwIjoxNzMzMzU1MDY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.v3GFSdde27dBTe0nn7fmOROfVq9BxYnBtRKF1YeXiZ8'),(109,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU0OGIzNDQ0LTE0ZTEtNDE2YS1iZjU5LTQyNWQ4NzJhODliNiIsImlhdCI6MTczMzc0NTkzMSwiZXhwIjoxNzMzOTYxOTMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.UGp4bs2jaPjqaNLIoL80d6LccbC2EqCyZZKpvmmv8cU'),(110,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJhYmVlN2M2LWMzMGYtNGMxZi04NmZlLWYyYTY1MWI3YTBhMyIsImlhdCI6MTczMzk5NDc1MiwiZXhwIjoxNzM0MjEwNzUyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CtmY7YsUvfEgeCO1aZh7hpFBzyqRhW7looAARtxcsX8'),(111,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRiMTVkYzQ0LTc4ZjMtNDdiNy04OWVhLWQxNDk2YWNlYjY2OSIsImlhdCI6MTczMzk5NTMxMiwiZXhwIjoxNzM0MjExMzEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.8Iapmf9_mJqSph_qfeKRHiz9jCpKIP_-akOMX6Quheg'),(112,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4NmFkYTJiLTM2Y2UtNGJjMi1hY2U3LWRlOWY3Mjk1ZTFjYiIsImlhdCI6MTczMzk5NjU4NCwiZXhwIjoxNzM0MjEyNTg0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.F18NCNuxglDGnkMpusaI2ZPykw5DTwSJN4iKgIaoNlg'),(113,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIzMzY5MmM1LWM2NGMtNDUyYi1hOTllLTJmNTAyZjRiOWY4NiIsImlhdCI6MTczNDYwMTQzMSwiZXhwIjoxNzM0ODE3NDMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wOGzaCmSTLgfeEFi4wGJ3CDRZVlLc3WR4hmcHdsZpH0'),(114,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVlOGIxMGE3LWJjYWYtNGM3Yi1hYTM5LTk4MGVjNDVkNjZhYSIsImlhdCI6MTczNjgzOTY5NywiZXhwIjoxNzM3MDU1Njk3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5zi9klVxq4r54M1FPB_1-DebosAIbD6oyNlCpHsjKJY'),(115,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1Y2E0MzY1LWUyMmUtNDJhZS05NGZlLTQwZTE3ZmQzOTEzMCIsImlhdCI6MTczNjg0MDIzMiwiZXhwIjoxNzM3MDU2MjMyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.aWk5NzM87yX0Bw7QIqobvQ4s5rHxQELKbxG6zsy44vI'),(116,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRjMDM4MWJmLWUxZjUtNDc5ZC1iOWYyLTA0NWIwZDYyNTJlNiIsImlhdCI6MTczNjg0MDgwMywiZXhwIjoxNzM3MDU2ODAzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.K-nxC8LKjlKdmGtP9Cfa9FlQ16FCViWhXoMjVZITA0Q'),(117,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgxYzQzYzU1LThlNjUtNGVmOC1iNDg0LTQ1ZmQ1NzI4OWU5OSIsImlhdCI6MTczNzM3NjczOSwiZXhwIjoxNzM3NTkyNzM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vV9tD7bS1UCTAPFPqDcQoHH9S5-CrSSTV9MYg1PThmY'),(126,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRlY2RjZWU5LWVkMTctNGRjZi05ODhmLTA3NWU5MmIzZGRhMCIsImlhdCI6MTczNzU2MzE3NCwiZXhwIjoxNzM3Nzc5MTc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.I_XHmW6VZs5Pq2bz8M6LNeKuthEkvS5O8CUYW8PFFJ8'),(128,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBjZTRiMjBkLWM0OWUtNDU2My1iOTRhLTI3OGYxZGZiNDFjNiIsImlhdCI6MTczNzYyMjk2OSwiZXhwIjoxNzM3ODM4OTY5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PzXrISy9321E8eXDUjgo5qcDmGdzfuOJW9nPm8Ke2j0'),(129,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFmZWQ1MzMzLWI5ZjQtNDQ4OC04YmEwLWU4ZWU0MTgyODFkOCIsImlhdCI6MTczNzYzNjA2OCwiZXhwIjoxNzM3ODUyMDY4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.MEtoyNUqtkrsX87pBpWIMT2-b5RhN0iNSOmmMJNZSEM'),(130,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM4Mzk2Mzc0LTIwNDktNGIzZS04MTRjLWFmZTlkMTJhMDM3MSIsImlhdCI6MTczNzYzNjMwNCwiZXhwIjoxNzM3ODUyMzA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dPCu3GL-G-3cmcoRQCGKiXxd4y4fNwTO_7oGN7JjKSE'),(131,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4OGQ3ODZiLTM4ZDQtNDkwOC1hMmYwLTY0NzIxZGY4YTVjNyIsImlhdCI6MTczNzYzNjM2MSwiZXhwIjoxNzM3ODUyMzYxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.AGS3-SBZstpbmFauqxMw_6YwYv1Wuw_0yBsYVGbxzgo'),(132,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIzNzc3MWE3LTk3YzAtNDJlZC05NDQzLTE2NWI3OGFmNjA1NSIsImlhdCI6MTczNzYzNjk2NiwiZXhwIjoxNzM3ODUyOTY2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.EcEiVfY_Y3fSqh-V84Fjz73oqNdruqe9OCkTUU-2bK0'),(133,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFhNmE4YmY1LWM5NmUtNGU2OC1iOWU5LTUyMjAwNGI3ODBjZCIsImlhdCI6MTczNzYzNzAyMSwiZXhwIjoxNzM3ODUzMDIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7myQEs-dGvcSgqArCBJAA7JbjflJt7d0MZvluSBmuvY'),(134,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY4MTc3MWE1LWM0YzgtNGMzMi04OGY1LTI5YzU0MDU5N2NmZiIsImlhdCI6MTczNzYzNzUzNiwiZXhwIjoxNzM3ODUzNTM2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XjSgli7olCYbimqa2HEDtknBX8ARTGpMchcNKBpqlxc'),(135,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk2ZGRjYjJjLTVjMGQtNDBmMi1iNGFmLTU1NjQ2ZTFiMTI1OCIsImlhdCI6MTczNzcyMDE4NSwiZXhwIjoxNzM3OTM2MTg1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jUmmbmpdEpSuArK0mp-Dep3usfxKPr0o00mo9QxTHUc'),(136,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE3OGQ1NWE5LWE4YzgtNDUzNS04MDY2LTgxODA2N2I0NmE3NCIsImlhdCI6MTczNzk2MTQ2MSwiZXhwIjoxNzM4MTc3NDYxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-19zSBCeJ5nJ4DdrwS-WzFxHAOe4NBb0Dff4aLB3Sn8'),(137,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhlNWVlMjRkLTUxN2MtNDgyMC1hYTdhLWNmYTQyZmUxZThhMiIsImlhdCI6MTczNzk3NTI5MywiZXhwIjoxNzM4MTkxMjkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.MjeXKbQznB3k6Tg8MeLfR5Nk3ERqvk_lTAnnLujPERs'),(138,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM5NDBjZGU2LTc5NmItNGU5YS1hYzgxLTQ2MTFkMGMyNzk2MiIsImlhdCI6MTczNzk3NTMxNiwiZXhwIjoxNzM4MTkxMzE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vf63bC3bXITXjQ5Av9GLOVSM6njf2DuZs1XnvZYokJI'),(139,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA5NThlNGE0LTI3ZGQtNDcyMy1hYWRkLThjOTRiOWI2YTJkMCIsImlhdCI6MTczNzk5MTEzNiwiZXhwIjoxNzM4MjA3MTM2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nRUWds4p4sf6MHo3HrioiykjJvh_t_kYmdYDuuyqPWs'),(140,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQxNDA1ZWUyLTAyNTItNGE5Ny1hOWI1LTdjYjNmMTVkZWM3MiIsImlhdCI6MTczNzk5MjE2NSwiZXhwIjoxNzM4MjA4MTY1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.s8WJMdmjw6M_oY61Mfoi6urgUJ6vAIivVgDqJ-6ZWbA'),(141,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4NTkwM2ZlLTk1ZTEtNDk3NC05NjRjLTI0OTk5OGE3N2U4NyIsImlhdCI6MTczODA2MTYxMiwiZXhwIjoxNzM4Mjc3NjEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Tm4l6o7rE0UyS_laQK8wL-zIMFCoEXoVEVGjcdOrY_s'),(142,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmZjlmYWRlLTU3ZTgtNDdlOS1hOWQ3LTJmOTFjYjRiM2MyZCIsImlhdCI6MTczODA2MzgwOCwiZXhwIjoxNzM4Mjc5ODA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.a9GT5BJn0lTLwo1Vy9ZeUWqh9xVoCXX7RZakedZoSD4'),(143,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ1YjY0MjA5LTZlMDItNDFmZS05YzA2LWFmNjFiMDM0OWE5YiIsImlhdCI6MTczODA2NzMyMCwiZXhwIjoxNzM4MjgzMzIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-gTbq6T2eBJYwuPecP7FLF3Eo8A3fN-HOTNLkt_OM7k'),(144,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNkOWQwMDZkLWNlODAtNDQ3ZC05YmJlLTk1OTM4MmQ4OGQyZSIsImlhdCI6MTczODA2NzY3NCwiZXhwIjoxNzM4MjgzNjc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4yY3AX6sYDtDZT2AIX1tW8UvIhQ1ZrqEPFTVrL20DdA'),(145,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVlNDZkNTFlLWE1MzctNDVlYi1iOTY4LWQ4ZmYxNzgzY2FhNCIsImlhdCI6MTczODE0MTQzNywiZXhwIjoxNzM4MzU3NDM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nDrXUFGhpNI5hbl1bGr3cHqQ11zTqRwFkornl0uxCf8'),(153,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY0MTM5YjZhLTg4YzUtNDEzNi1iNTAzLWE0YTBmNmY4ODdkMiIsImlhdCI6MTczODE0ODA4OSwiZXhwIjoxNzM4MzY0MDg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.31JWlKAhP_Vt71RZKLdyt3Q_ms1TgxTjZbif1-GxUQM'),(161,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzY2E1YzkzLWQxZTgtNDlmMC05MDVjLTZmODhiZGFjMjhkNCIsImlhdCI6MTczODIzNTkxNSwiZXhwIjoxNzM4NDUxOTE1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-RIbCfi8rzS4ncQR5ELOJMsku604645c03wR2fW3c3k'),(164,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUyNTNkNDhkLThiM2QtNDE3MS04MDkzLTEzZTk0MjFlOGMzYyIsImlhdCI6MTczODMwNzY5NSwiZXhwIjoxNzM4NTIzNjk1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.d1O8Qyi4yC5b5Itx6xudIBxNLWA00e63oKsLkd3WB6Y'),(168,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNmOWI4NzlmLTc0MmEtNGE4Ni04ZmQ0LWExMjA5YTVlZDU2NCIsImlhdCI6MTczODMxMjI3NCwiZXhwIjoxNzM4NTI4Mjc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hn6TUISEMHaglXd5s6PcLmQTwZgVrLtE1EGTwNieyE4'),(171,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVkMjUyMTBhLWIwMzUtNDA1NC1hMjdhLWIzMmMxOGU5NzcyOCIsImlhdCI6MTczODMyMzkzMSwiZXhwIjoxNzM4NTM5OTMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3dXWFU4fk6jtvTFuHRzifqhYRKtq0La62EjI-n5ToYo'),(172,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4MjY4ZTZiLWEyY2QtNDg5NS05YTAwLTI2Y2ZlY2RhMGVlOSIsImlhdCI6MTczODMyNDAxMiwiZXhwIjoxNzM4NTQwMDEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.KOGVP1sT0LQFWZcpzMy2B3JF1KdKq0cshJ845_Ffl50'),(174,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjczZjFiYTdlLWQ4ODMtNGRjNy04ZGFlLTZlZDZhOTFhYzA0MyIsImlhdCI6MTczODMzOTI4MywiZXhwIjoxNzM4NTU1MjgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.YXvrTfcr8d-o6BNrsGxjspKhcevoCM4yrIGaV0tqpbk'),(175,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZlYmZkNTAxLTljNWEtNGQ1Yi1iNTZhLWQ2ZGU4NjFmN2JmOCIsImlhdCI6MTczODM0MzEwNywiZXhwIjoxNzM4NTU5MTA3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ABr74XkwMw61lj1fDZ4yng1fqiAW8wdXJMJ14I6qdi0'),(176,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZhNjJkZWZiLTQ5ZTItNDQ3NC1hYjA1LWYxZjkxNjdiNzg0YSIsImlhdCI6MTczODM0MzI2OCwiZXhwIjoxNzM4NTU5MjY4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lj09lbnErqNGwLhHQY5jPoRq8w4K_vDtsXNAnJlvviQ'),(177,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzYTc1OGQxLWE2ZmEtNDMwYS1iNjIzLWRlZmY2YWUzZmM0ZiIsImlhdCI6MTczODM0NDMwOSwiZXhwIjoxNzM4NTYwMzA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yrvgDJI8sfHxzEQyg3Ygqvx2r8fB4elpDuBTrtd8Gb0'),(178,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdmZDBhOTE4LTk5OTMtNDE0MS05MzViLWNkODgwYmNmN2IxOCIsImlhdCI6MTczODU2NDI4MywiZXhwIjoxNzM4NzgwMjgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jx5o5_wnFebQzZwsxjUNHhXLw_viJfuwYtLcFWI1TSM'),(185,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJjNmE5N2VhLTIwNGMtNDBlYy1iM2E5LTQyMjA4YmI4OGRkZSIsImlhdCI6MTczODczOTYyMCwiZXhwIjoxNzM4OTU1NjIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.P8O4dyQOOD7EOUO3l-tVjDmeXsn5MDlNuiFIfGzZIl8'),(188,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFjMjA0YjQ0LWE1YWUtNDM2My1hYzE3LTYwY2FiYzE2YzE0OCIsImlhdCI6MTczODc0NDAxNiwiZXhwIjoxNzM4OTYwMDE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Gi8HZ2-PgTP5rzE1ER6u8EX635rfjh1-D69E2u-2bsI'),(189,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYzOThlOTBmLTA1ZjItNGExOS1iNDFmLTcyYzY1YTY4ZGUwZSIsImlhdCI6MTczODc0NDA2MCwiZXhwIjoxNzM4OTYwMDYwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cRu2Q61QDQViMRbdCcpCBim4BlLS5pdj92buxIvU5ek'),(190,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJmMmZhY2ZjLWVhYWQtNDQ3Mi05YmIzLWJjMTRiODllY2U3ZiIsImlhdCI6MTczODc0NDE0MSwiZXhwIjoxNzM4OTYwMTQxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1w_tRlbLSBSimcy-kGz77T1QXzCjrMNFRiK8BpHo-is'),(191,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM0YTgwZjVmLTNhODQtNGE3NS05OTAzLWM2N2Q2YmYxMTIzNiIsImlhdCI6MTczODc0NDU4MiwiZXhwIjoxNzM4OTYwNTgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.JBtgqYFQkyIrDWKQOwjvM01bzVDuwJxabmsvoixzE8s'),(192,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUxZjMzZmEzLWJkOGUtNGUwOC04MGI4LTk0MDVmYWQzZTk4MCIsImlhdCI6MTczODgyMzA4NCwiZXhwIjoxNzM5MDM5MDg0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.GqMbuoDmKIcxuknw-OaPMEN3k1sEwir593tGZenX58Q'),(193,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0ZWJkNGMxLTA5MjMtNGUxOC1iN2IwLTk4MmIyNzIyZWYzOSIsImlhdCI6MTczODkyMTQxOSwiZXhwIjoxNzM5MTM3NDE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zHqaIr5Y7YQzbbNXo8hXgihJyc2-5lCtO7HfufcTITY'),(195,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM0YWM4NjM5LWMyYjAtNDZhMC04YWM4LTUyYmYyYzgyZjM2YyIsImlhdCI6MTczOTI2NzczMCwiZXhwIjoxNzM5NDgzNzMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9eC4oIfsPpfjTlhzY4ckM6Aop5n9-dQ2AyQd7ZnGlWs'),(197,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjcyZDlkYTk5LWFmZDctNDMzMC05NGQ1LWM0YWQ5ODA4YmQ2YSIsImlhdCI6MTczOTQzMzE0MywiZXhwIjoxNzM5NjQ5MTQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.myEt9ItDrk56M7KouV-wermrohwAcmy6-p1DDsa-ldQ'),(198,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNiNmIyYzFiLTJlZTQtNDY5My04OGU1LThmMjQ0Y2QyNjUyNiIsImlhdCI6MTczOTUxNjc3NywiZXhwIjoxNzM5NzMyNzc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Dj0Jp5fDYRMiV1XGgPpQdnf6Z-DRlF7YJv158NfAANY'),(204,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNlZTcxYzViLTZjOWYtNDZmMS1hMWI0LWQwYjgwZjk2OWNlMiIsImlhdCI6MTczOTg3Njk3MSwiZXhwIjoxNzQwMDkyOTcxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iI8OjN7AL7EYBogXvxjTkcxvHdqxsG7bOFjT9rUN83Q'),(205,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ1YTI5ZjEyLThmZDgtNDk0MC05YzNhLTNlYmY0NGMxY2JjMSIsImlhdCI6MTczOTg3Njk3MywiZXhwIjoxNzQwMDkyOTczLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nZtpmEGJPuJAu2LgROa9eGXZIIgJSjGq3AX8rciirgA'),(215,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlkNzdhMDc5LWM1MmYtNGU0YS1iZDM0LTgwYzM5YmY1ZDFkMyIsImlhdCI6MTczOTk1MDA0NiwiZXhwIjoxNzQwMTY2MDQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hl_JEzfwc8H1-ypfZiLfcnJm6r-kyho50qMIPIEoKA0'),(216,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkOWZhZjU3LWJhNWEtNGEyMS1iY2U5LTI2NTliMTg5MzlhMSIsImlhdCI6MTczOTk1MDA1NywiZXhwIjoxNzQwMTY2MDU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cfPYLo-5fK96_Y_rvVLqPzmvHOO-NTPYq6gzQd4Xuak'),(217,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA4MTIxNzQwLWNkOTgtNDA4NC1iYjhhLTMwOTM0NDQ2YjI1NiIsImlhdCI6MTczOTk1MTIzMiwiZXhwIjoxNzQwMTY3MjMyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XfPRtsdPTBQBRnOZ480pQADOJBg6CpM-SMgjY4HM5fg'),(219,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUyYWU4MGZlLWZlZmItNDgyMy05OTcwLTEzODA3NzM2Yjg3ZCIsImlhdCI6MTczOTk1MzY3NSwiZXhwIjoxNzQwMTY5Njc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.GL3PWjdSyZ3fcRhT8aVxRgKCQWmlYhwZyPw2vN1ZebI'),(220,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk4OWI2YWU5LTI2NjktNDJhZC1hMDg4LTY4YjA3M2Q3ODA3OSIsImlhdCI6MTczOTk1MzY5NSwiZXhwIjoxNzQwMTY5Njk1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XjBhQjJccVgEBEI4nXegYE4zMsP12iBh8gI37cfj9k8'),(221,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY5ZWRhYWU5LTc3MTMtNDMxMy1hZmZlLTY5Zjg1Y2M1ZjdjOSIsImlhdCI6MTczOTk1NDQ3NywiZXhwIjoxNzQwMTcwNDc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PJveiIHyK4j9j_i5AgvixPhVSnDiXX524qKEbIcIglA'),(224,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQxZGU3YzRiLWJkODYtNDU2Ny04NmZhLTQzMWExNjg3MWMzMyIsImlhdCI6MTczOTk2MzQ4OSwiZXhwIjoxNzQwMTc5NDg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZglvZO0E8VvNOaVP6qvu9pi7srOFWiSIGSnDucTGOOc'),(225,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI0ZjQxY2ViLTUwOTctNGFjZi1iNjk1LTg3YmQ5YzY1ZmFiZSIsImlhdCI6MTczOTk2MzQ5OCwiZXhwIjoxNzQwMTc5NDk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vQgoJpZ6gsjJDSuPYH1_O6CHx2CM1kIXW9icxxO-V5A'),(226,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIwNDkzYmI3LTU2M2MtNDRkZS1hNGE0LTJiM2E4OTM2MzI3NyIsImlhdCI6MTczOTk2NDYzMCwiZXhwIjoxNzQwMTgwNjMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.G6MpCNPQPcwP9UCbUJivV5Wk_5pyiOcNCYVFAS1dAHE'),(227,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQxMGM3YWFjLThkMjItNGEwOC1iNjlhLTFmZmRlOTA5YjBlMCIsImlhdCI6MTczOTk2Njk1OSwiZXhwIjoxNzQwMTgyOTU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uMRVfKokyNf3oFdP3dUlbGEg4g0nhF_YwVnLKR0-PME'),(228,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZjODA5M2E0LTVjZjktNDg3NS05ZDVlLTNhYTQ3NTJkMDgwNiIsImlhdCI6MTczOTk2ODI3NywiZXhwIjoxNzQwMTg0Mjc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0lKlBf1-E4hrvdnIHt9BmkL0cVv1U6NGM5jQcR893Sg'),(229,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIzNTBkMmU3LTRkNmUtNDk4Ni04NmNlLTNkYjQxMGIyZDZmYiIsImlhdCI6MTc0MDA0MTc3OSwiZXhwIjoxNzQwMjU3Nzc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7ZczHukHog_CmbSfYi-iW1FXYtEzHmrPfAdyQ-mBjiw'),(230,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ0NjNiN2QxLWU5M2ItNGI4NS1iODAyLTc2MDI0MjQ1NDViZCIsImlhdCI6MTc0MDEyNjQwOSwiZXhwIjoxNzQwMzQyNDA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VaacKIbNO1JbbriqmvwLTYMKhuQH7XqP3Sli-pygkKQ'),(231,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJjYTZmODc4LWRhNTItNDZkYS04YTkzLWU4NTY2NWMwMzU2NCIsImlhdCI6MTc0MDM4NDQyNCwiZXhwIjoxNzQwNjAwNDI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.sD9mKjQvfD4KtiBVPvj_QPUCOabtQOwfHH4JjkMeB48'),(232,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhlNTVhYjVkLThjNzctNGVhYi04NmQxLTE4MTcxYjZhYjA2MyIsImlhdCI6MTc0MDQ2NjU4NiwiZXhwIjoxNzQwNjgyNTg2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.s3JRRP9QekSakFhJweul3czRe1bfTwfQPCuwfNs--O4'),(233,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE3NDNhYzJjLTU0Y2ItNDA3NS05ZDljLWU3NTEyNDg4ZTQ1ZiIsImlhdCI6MTc0MDQ3MDEwMiwiZXhwIjoxNzQwNjg2MTAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jtXX-azmUMDiNuJN5Fo10D7-iHxBEDeB1l1hZU8__Ms'),(234,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3OGVlZTFiLWZiNmEtNDdmYS04NDNmLTc0N2U1MWRkMWY0ZSIsImlhdCI6MTc0MDQ4MzE0NCwiZXhwIjoxNzQwNjk5MTQ0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4-GBmfYmWs0YNIWx5y94su8E5s3PRwHVl62ezxLcV1E'),(237,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBlNTAxNjYwLWFiMjgtNDVkYS05MTMzLWRmODhjZTUzOWIyZCIsImlhdCI6MTc0MDk4NjA1MywiZXhwIjoxNzQxMjAyMDUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tVKldZmZhYGR0vbXwL06DV8qAfRGDZNvWLW7RBn28N8'),(240,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMzMGRhYWIyLTUwNjUtNGE2Yy1hNmUzLTNiYmU2YzhmOGI1YyIsImlhdCI6MTc0MTA4NjMxMiwiZXhwIjoxNzQxMzAyMzEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tz5SaK2y1uWTuZN59il6miMzLMOVJvTzpIK4q-A03gw'),(241,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZjMGVhNjFiLTc0YWUtNDc3ZC1iOGY1LTE4ZWIwOGVjN2ZmMiIsImlhdCI6MTc0MTExMDY2MiwiZXhwIjoxNzQxMzI2NjYyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.23vApQpnkaSwkydoThBCS0_OtPx3idk3A1HBk2febRM'),(242,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM0ODBiZWE2LTg0YjEtNDRiNC1iYTNiLWMyYjc2ZGRjZTc2ZCIsImlhdCI6MTc0MTI0NTI5NCwiZXhwIjoxNzQxNDYxMjk0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.fXcoQ-mhCo0_xWa63psEGNgOy0ChxJyoNOiaKfA2_J0'),(243,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY2MTE0YjhjLTM4MGUtNGQzNi04ODNmLTdiOTEyNjlmMDYxMiIsImlhdCI6MTc0MTI2MjYzNSwiZXhwIjoxNzQxNDc4NjM1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ax1RevGtbVkN0zbpaGjU1TnUPp2HA_SndE8kSdq3OeM'),(244,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkODY0MjVlLWFhOTQtNDkwYy04NTJjLTg4YmRkMzkyZTU2MiIsImlhdCI6MTc0MTI2MzQ5MCwiZXhwIjoxNzQxNDc5NDkwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3cmkP5WcblrfjjoEqoOe1pdN6ifTLBq3yziW1xF-knk'),(245,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhlYTlkZmUxLWY0Y2EtNDNhYS1hNDE3LThmMTM5MDU2MmJjZSIsImlhdCI6MTc0MTI2NDE3MywiZXhwIjoxNzQxNDgwMTczLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5LL5ugkqsTDoUwaBqnLSnwnKSN8SOxcC_5xPa_Nrgxg'),(246,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBkMTg1YjgzLWJkNWQtNDU5Ni04OGFlLTdkMTU0OWY2M2ExNCIsImlhdCI6MTc0MTI2NDU4NywiZXhwIjoxNzQxNDgwNTg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.IVdXuU3s6UI1CVO4jYey8LgrvrUKT1tUYQsU_Xmul8A'),(247,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIwYTZjOWJkLWQyNWMtNGZkMy1iZWI3LTM1ZDU3ZGYxM2U2MiIsImlhdCI6MTc0MTI2NDY5OCwiZXhwIjoxNzQxNDgwNjk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tkLvmn7rIUDzDQHa7e3kFyWG9Ycj5kcWNSTF5datqAk'),(248,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4M2JhYzViLTYxOWEtNDVlMi1iZTAyLWIzNzkwZTkxNjBlNCIsImlhdCI6MTc0MTI2NDcxMCwiZXhwIjoxNzQxNDgwNzEwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lwsFTlc5VV9soO-Guc9VtlfJZ4fnKK4JZrHhro3EUzc'),(249,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZjYzQ0ZDkwLTU4MGYtNDZmMC04NWMzLWExMTI2MDc4ZTUzMiIsImlhdCI6MTc0MTI2NDc4MiwiZXhwIjoxNzQxNDgwNzgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-geM1Eix4Bu7dmoNXDRukCOfZmW8HcAQkDXUH4ITLLM'),(250,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc1ZGNkOWIwLWU1NzUtNDQxNi1iMDNjLTI4MDZhNTMzOTU0MiIsImlhdCI6MTc0MTI2NDgwNCwiZXhwIjoxNzQxNDgwODA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wrNgHCSFlUUp9pmaQI9mnCFVhoYPehP51Du8a-ngCPU'),(251,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4OTk4ZmVlLTQzYmMtNGM3MS1hYzFjLWVkYjUyMGUxYjVlNyIsImlhdCI6MTc0MTI2NDk4NywiZXhwIjoxNzQxNDgwOTg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.izKL5qE_QVYrRKNd0gAKTOZ1tPnUKCcMmmARKh7fJRQ'),(252,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjllZjRkOWMxLTc2MmUtNDI5OS1iYTljLWUxYWI5YjJkNGE1OCIsImlhdCI6MTc0MTI2NTYwNCwiZXhwIjoxNzQxNDgxNjA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Nh0vxGvAcbMAtDBF21lcpejy7vjMTwH7WsuCTG5Zg-Q'),(253,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdmZDJmOGU0LTA5Y2QtNDUwNi05ZmUzLWQ0NjkzN2EyYzgxYyIsImlhdCI6MTc0MTI2NTc0OSwiZXhwIjoxNzQxNDgxNzQ5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9w2xHfaA-JQQ0pC1kifaFjEvwcTckV7SCCRdupxDIxg'),(254,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwMDIxMjE4LTc1MjQtNDI1Yi1hYzNlLTI1ZDQ0YTRjOGY3YiIsImlhdCI6MTc0MTMzMDkzMywiZXhwIjoxNzQxNTQ2OTMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.avxzpXF-jNIF62ZfttQhn2bOyWw2w5pmlOc2JxtWqOw'),(255,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0MjI4YzYxLWIyN2MtNDRjNi05MzAyLWViMmU2YWQ0MWFmNiIsImlhdCI6MTc0MTMzMzIxMywiZXhwIjoxNzQxNTQ5MjEzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tcb6B2Pwn-NnJN786GTRroT5xY8hkitpJaMFlmUdOmo'),(256,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY0ZmU4NTVkLTA0Y2MtNDI1ZC1iYWNmLTM4YWRkNDYyM2RlZCIsImlhdCI6MTc0MTMzNTE2NywiZXhwIjoxNzQxNTUxMTY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hdeq_sOVGtBZ3AuXgGjls_ykt6uey4nNkz8A4VZbPCo'),(257,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ1YzVlNjhjLWQxMzctNDhjZC1hMDNjLTQwZmY0Yjk5NzA0OSIsImlhdCI6MTc0MTMzNTg3NSwiZXhwIjoxNzQxNTUxODc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WSE34Z33CvRk5UsIh-qSNXsbpRc3WrBauZfEtfSUJZ0'),(258,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVhMjg2NzRkLTE3ZmItNDQzZi04NWI2LTI1ZmNjNjA2NjczMCIsImlhdCI6MTc0MTMzODE3MCwiZXhwIjoxNzQxNTU0MTcwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wGgBjNg9MEGbBFX4Jp96V9z5tyyhWnUVPKrTI64F7TQ'),(259,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIxYjhkMzg1LWIyYmMtNGQ5Mi1iNzM4LTI4MzMyYzY1YTA1YiIsImlhdCI6MTc0MTMzODE5NiwiZXhwIjoxNzQxNTU0MTk2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.j7l3uWknwZWje4EULMy52-HvShHHkFd3kDi7Q3LaSPg'),(260,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlkMTI0ZjRjLTc2NzUtNDkxOS04NDRiLTU2ZTY1YzRlMjM1OCIsImlhdCI6MTc0MTMzODMxMSwiZXhwIjoxNzQxNTU0MzExLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.oZa0hrsYNWjaCWvDX21C4lqeATgGdZGUe3tPzgEWOZ0'),(261,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk0YmQ0NzgxLWY5OTItNDcwZS1iNDQ2LWY1ZDdiOWRiNzQ2OCIsImlhdCI6MTc0MTMzODQ3NywiZXhwIjoxNzQxNTU0NDc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.e5I-VNe_TCRoUgOW_yabyfq_k0Ar4E9sPsoyjnEVPeE'),(262,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNjZWMwN2M0LTg2ZmYtNGEzNS1iNjAzLTBjZjVjYWY3ZDY4MiIsImlhdCI6MTc0MTMzODYwMywiZXhwIjoxNzQxNTU0NjAzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yhyBPND18EOdBQqTRKReWGt0yQYuLDmPmCZ2uiAqns0'),(263,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJmZDRjYjMyLTVmZmMtNGIzNy1hZGQ0LTdkYmI4Y2MxNWUxNCIsImlhdCI6MTc0MTMzODY3NywiZXhwIjoxNzQxNTU0Njc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.eQkBM7CHQL83ObYAopDOqzGgHiXZXW7uuFtVW4A1y1E'),(264,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVhODI0NGQ5LTgyNTgtNDE4My04ZTM4LTNhMWI3NWNmOTYwNSIsImlhdCI6MTc0MTMzOTc3MiwiZXhwIjoxNzQxNTU1NzcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.UAwr9vc1hcptGLUMleNnUSwWxkIEn_4x-WcasLEsfyg'),(265,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE1ZDE5OTE4LTY5MzUtNGNlNy1iZjQwLTRiNzgwOGIzZjQ2NSIsImlhdCI6MTc0MTMzOTgxOCwiZXhwIjoxNzQxNTU1ODE4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.MlOcS1UA7J0TXyy-A8NbdIL8xrjKtrbAqRPUmEbfHCU'),(266,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZjOTFhN2IwLTY0NzUtNDNjZS05NWE2LTBmZDI4YTA4ZmIxYiIsImlhdCI6MTc0MTM0MDQ5NiwiZXhwIjoxNzQxNTU2NDk2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.LULLf_qvo7xeqjUaBWlg4h2JftvXcj2f0WqAcfoeSSc'),(267,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg1NDBiMzA3LWQ2MjQtNGI4NS05MzVmLTBiNWQyMjhlNDk5ZCIsImlhdCI6MTc0MTM0MDUwOSwiZXhwIjoxNzQxNTU2NTA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.e3Erx6d6HxlqgGBMYILEP_oNXkTgTKukMFZY5LMWJe8'),(268,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE3MDU1Yzk3LTQxZjUtNGNhMy04YmVkLTdlNmE3YjYyZmNhNiIsImlhdCI6MTc0MTM0MTAyOCwiZXhwIjoxNzQxNTU3MDI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gCSpmKMM4RQCqWnJtJvj20qoC9jvSc5NAF9VY8YHx48'),(269,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRkMjdmMzE1LTIxODgtNDNiMy1hY2FlLTRhZWIwMzc2ZmE5MyIsImlhdCI6MTc0MTM0MTYzMiwiZXhwIjoxNzQxNTU3NjMyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5cWKW-e7NWduiyfSRoTXTwxy2OMMzl9EL2rAXvsCDW4'),(270,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgyYzg0YjhjLTdhMGEtNGRmMC04MDNlLTJlMjQyMTUxM2Q4ZCIsImlhdCI6MTc0MTM0MTY5OCwiZXhwIjoxNzQxNTU3Njk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.oPgXEbkwcx8XKdywykkVQviLTl7l0FS6gaDCPM_floo'),(271,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZlNzJiOGE2LWVhOTgtNDQ5NS1iY2M2LTIxMDBmM2E1NjcwMSIsImlhdCI6MTc0MTM0Mjk0NiwiZXhwIjoxNzQxNTU4OTQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5Vk0U3m1xCJPPsKnGUpcibZJNJgar2n9K-mvqJhgog8'),(272,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0ZWY1ZGFlLTM1MDMtNDNlYS04OWQ3LWY0MzQ3NjJlODQxOSIsImlhdCI6MTc0MTM0MzEzMywiZXhwIjoxNzQxNTU5MTMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SGPHSTTNhmxgUvzqZsUYVPsPq8d6R3IKyzdh9KqXTCw'),(273,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVkZjNhYzAxLWQ2ZjAtNDNlMC04OWM1LWE2MWQ0NGM3ODFmMCIsImlhdCI6MTc0MTM0NzUxNiwiZXhwIjoxNzQxNTYzNTE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.sZpS4b-k1sP8jpb4ddTpPNdEB-JJMpHnPx9JEpQTfdU'),(274,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ0NmE0ZTQ4LTI2NjYtNDY3MS04Njc1LTEzYzU2YThkYjNlOCIsImlhdCI6MTc0MTM1MDEwNSwiZXhwIjoxNzQxNTY2MTA1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FbqDTvvbay9_nPFFyhAxfImoRF0Kwt-283DAoxQdOCU'),(275,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAwNWExZmVjLWJhNzEtNDg5OC1iOTQwLTFiODkwNTViN2MzNCIsImlhdCI6MTc0MTM1MDU4OCwiZXhwIjoxNzQxNTY2NTg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QKukKpd-fKhBnh07t_MLaMRVTMUV_suZuwaGy-965yc'),(276,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBjYzk4Njg2LThkN2YtNDZlNi1iNjNkLWUxOWQ3ZmU4NmMzNCIsImlhdCI6MTc0MTM1MTc5MCwiZXhwIjoxNzQxNTY3NzkwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-iegaE-v9kk5IyREMZaHLAxeT8VQv3o7_pBInoL666k'),(277,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU4NzVmMzdiLTdkM2EtNDQ1Ny05Y2IyLTk5YmJhZGEwYzcwYSIsImlhdCI6MTc0MTM1MzQzNSwiZXhwIjoxNzQxNTY5NDM1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.o4E4WGsFTerZO8kmBBcYPgLHY_S24wO93Iy_cbWRh3c'),(278,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM0MDUzMGI2LWU4ZDQtNGMyNi1iMDU5LTU4MjE1OGUzOTIyOCIsImlhdCI6MTc0MTU5MTUwMiwiZXhwIjoxNzQxODA3NTAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.NLc2qUYWuFYxnCHt0n8bVxfdVbAP_p43wpFXtH8ZtxI'),(279,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIxZThkMjY0LWU5NjYtNGNiYy1iM2I3LWNhZjgwZTI2ODUyMiIsImlhdCI6MTc0MTU5Mjg2MSwiZXhwIjoxNzQxODA4ODYxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.X2uT6osn4JJJc1eW1v-iWb3qX8z3I-FSqqx3XLPpcM0'),(280,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBlOGVkMzk4LWY1ZDUtNDYyYy1iM2E5LTNhOTUzMzk3YTM1OSIsImlhdCI6MTc0MTU5NDU0MywiZXhwIjoxNzQxODEwNTQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1egVhewN9DLHpEEmlY9Pr6GHyGX2tm1XbIdMEJ7COLI'),(281,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzM2RmNWNjLWI1OWMtNGNmNS1iYjNiLWRkNGFmNzkzOGU3ZiIsImlhdCI6MTc0MTU5NDU2NSwiZXhwIjoxNzQxODEwNTY1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4iCmZDX9NI5xeW_sO_IorVPE024UvBLQcjCI1t4kNXc'),(282,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE2MjgzZmZjLTQ1MzctNGFlZi1hMmQxLTMyZTk4ODdmOWU2MSIsImlhdCI6MTc0MTU5NjEyMSwiZXhwIjoxNzQxODEyMTIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Qbnx22dis31BrxBT1Rw27ZwVyZYN07jXRDcK4QTRJJU'),(283,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBlZWQ1Nzk5LTVkYTktNDY0My1iMTVjLTkzNzU2MmM2NTc1NSIsImlhdCI6MTc0MTU5NjEyNSwiZXhwIjoxNzQxODEyMTI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QOYoZOMRjliYZwveefbCMa7FMwrwgby7z5-K-UDCrhE'),(284,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdjMTk3MWNlLTE0ZTUtNDUyZi04ZWEzLThmZWExZDYwOTE4MiIsImlhdCI6MTc0MTU5NjU1MCwiZXhwIjoxNzQxODEyNTUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3yVbPWk8GvXQ2PJq5Nhi1KSP1XGHygpiYj3_6_LgEh0'),(285,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0ZGUxOTFmLTI2MGItNGI1Ny1hNDdjLWI3M2E5NjNjODA2MyIsImlhdCI6MTc0MTU5NjkwNCwiZXhwIjoxNzQxODEyOTA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.sBGXMhe3u_ZqlkhdQTugfGJWiGHNP2JFM5Tzn7e6h3I'),(286,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRlZDZmMGJlLTMxMzItNDZmYy04Y2QzLTUxM2IyYmI0MDc1NCIsImlhdCI6MTc0MTU5ODAzOSwiZXhwIjoxNzQxODE0MDM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iFe_3n3-LCgKJxG9u6yAS-sKEwAnNbqKzsSDAH6od70'),(287,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU4OWQ0ZGY1LWIxNmEtNDYzZS1hNDM4LWMwMDAxOTBiZTU2YiIsImlhdCI6MTc0MTYwNDk5MCwiZXhwIjoxNzQxODIwOTkwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Va3AfrnwXSgXWewsyoo_W6eZZ1SqmS8ld6bcniI6YR8'),(288,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZhYzQzNmQyLWQ1YjYtNDQ5Ny1iNTFiLWNlMjk1NTkxNGRjNyIsImlhdCI6MTc0MTYwNTAxNiwiZXhwIjoxNzQxODIxMDE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FXFFXgvoyNQlhun_adog0xzieBHMTFeIaq21wOwyZFo'),(289,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQwYzcyZDk2LTJmZTktNDY1Yi04Mzc5LWRmYzI4ZmJiZDEzNCIsImlhdCI6MTc0MTYwNTgwNiwiZXhwIjoxNzQxODIxODA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.eT8jKCVcSdXtaVlOPP_hbkemysplnVzEDNuwfaoS490'),(290,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU1MzI0YjYzLTYzNDctNDk4MS05NGFkLTRiZWE3MTA0NWUyMiIsImlhdCI6MTc0MTYwNjIyNywiZXhwIjoxNzQxODIyMjI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.8ZvtH2QLmDs-QcfbykFFfZEkqYqVH6o3I18kCWqJmv8'),(291,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM4N2VmYmYzLTBiMzUtNDRjYy1hYzMwLTAzYzBhOWYxNmIxNiIsImlhdCI6MTc0MTYwNjQyOCwiZXhwIjoxNzQxODIyNDI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0._5SX1RILmKl7hhsV5iEcbC9P_ZhH8hmiKYKd6k4y0c0'),(292,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNlMTE1YWVmLTVkYjMtNGFjMC1iNTVlLWFiZWEyYWU1NTk3OSIsImlhdCI6MTc0MTYwNjQ4NiwiZXhwIjoxNzQxODIyNDg2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PLZL0W8FrD9mEctq0LEHdSbgAkcuPQzmMzk2uDOpYqE'),(293,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA5OTMyYjY0LTFmYjctNDkxMC05YTRjLTg5OGFhMzU3OWE2NiIsImlhdCI6MTc0MTYwNjUyMSwiZXhwIjoxNzQxODIyNTIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.eDYzL1fGuFoqSlC2H4EP_FPY0UfRDEOa9AnhcqBSqsI'),(294,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM0MDgzYTVhLTBmNjUtNGVjNS05NzRkLTk0NmY5ZDcwOTEzMCIsImlhdCI6MTc0MTYwNzE4OSwiZXhwIjoxNzQxODIzMTg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lsGmAJhHJYPxy9EkWxLif4i6Ucdncl4S8Eapv2mZL_c'),(295,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY2NTUyMDAxLWQwZGQtNDQ2OC1iMTYzLTFhYzMwNzdjNjFiOSIsImlhdCI6MTc0MTYwNzMyMywiZXhwIjoxNzQxODIzMzIzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.KF018eIAeuGUYcHIhg_0mTNOsZHKqXxkTmpkCp7wt_Y'),(296,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgyZDNjODY0LTJlMDQtNDMwZS04Y2MwLTYzYWM0N2QxMzY0NCIsImlhdCI6MTc0MTY3Mjc0NywiZXhwIjoxNzQxODg4NzQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jQPDwG985Jbr6DfDTf_n8VAlgNdvPYO4wUn584I2kTs'),(297,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE1NTVhNmJhLTdhMGYtNDNkOS04NzZmLTIzYTA0NzY5NTllYSIsImlhdCI6MTc0MTY3MzA0NywiZXhwIjoxNzQxODg5MDQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.I9H5ncoKArSeutCdhBDRykA6sZxfKiLEpAUfx1QEBMY'),(299,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNiMzlhOGM4LWE3NzgtNDEyNi04N2UwLTZhOWNhZWEwMTBmZSIsImlhdCI6MTc0MTY3Njc3NiwiZXhwIjoxNzQxODkyNzc2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nK8SnPNBKDIqJAP9BoUxSijmeCOhb9_ncR6-vrVC03o'),(301,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRiZmQxNzZlLWJlZjItNDVjMy04N2I4LTZkMjJmMmNlYzc0MSIsImlhdCI6MTc0MTY3ODU1NywiZXhwIjoxNzQxODk0NTU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Hl02NX7YsqRA2jvZ7aKDPE0qoFpW541tJIJQ-YBjUF8'),(303,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE5ZDRmODBmLTU5NjUtNGE0Yi05YzJjLWYxNDk1YjBjNjQyNiIsImlhdCI6MTc0MTY5MjMyOCwiZXhwIjoxNzQxOTA4MzI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.MxbR5Q2D8ivWXvVUaWTmyXYnC3nx8GxBU8ZXAnE5kYY'),(304,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMwZWQxMDZkLWIxMDYtNDRmMi04Y2FiLTY3Mzg4Njg1MDM4MiIsImlhdCI6MTc0MTY5NTEyMCwiZXhwIjoxNzQxOTExMTIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2gWZ1U1eUTfSE0pMDPYzvXyVmf3Ks5dUXmKA1L1JGeM'),(305,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZhMTI0MTVkLWM3YWItNDkwNS1iN2JhLWFmMGI4MzFjZjg2YSIsImlhdCI6MTc0MTc2MjQ0MywiZXhwIjoxNzQxOTc4NDQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.c9f5fjbtsCx4eBkbLNP4zlCri2LY6WnlnaEB-wzYX6s'),(306,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEyNTllNTU5LWI3NzktNDdmZS1hYzE2LTQ2MDlmOTlmZDgzNiIsImlhdCI6MTc0MTc2NTk3NywiZXhwIjoxNzQxOTgxOTc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PTTb5sUrlzJwWQwhThW_DXoUCfpeUdl7qtO8PKMtsQg'),(307,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNjY2Y1N2I1LWVjMjUtNGZhNS1hZjg2LTU4YTQyNmM0MjM3YyIsImlhdCI6MTc0MTc2NjI5MywiZXhwIjoxNzQxOTgyMjkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9bBeEq66xUdjN3cX134jXKREXnD1H4GOPZsJfnvCWkM'),(308,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlkYmQ1OTFkLTBkODQtNDZkNC04MmEwLWI2OTA5NjFlMzI5ZiIsImlhdCI6MTc0MTc2ODEyNCwiZXhwIjoxNzQxOTg0MTI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.18ai4eHWR37YoESz0TGmcoB0fCiImq23L3XhialDrs8'),(309,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYwMGZkYWNjLWZiOTQtNDQ0MC04YTVhLWM1MGFkMmE4MmRkYyIsImlhdCI6MTc0MTc5NDkyMSwiZXhwIjoxNzQyMDEwOTIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.54E3vdtGpOPxg3PLhFq2kzyAHuI487jCPC8nzaY4dOs'),(310,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhMGYyNWQzLTQ2YTYtNDMwMy05ZTE2LTQ3ODg0YTcxZjEyYSIsImlhdCI6MTc0MTc5NjE5MywiZXhwIjoxNzQyMDEyMTkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.g1L1JWe14t1DdcohpHGFt8MKL2rgaqGRW6XudZAgHkE'),(311,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM0NzE1OTNhLTZmMzctNDcyZC1iMmM4LTM4YzVjOTEyZjVhOSIsImlhdCI6MTc0MTk1MzkyMywiZXhwIjoxNzQyMTY5OTIzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.mcacmR8DUSDjK0VQ49gKL2usi6NApBjMV-p--fUyaBE'),(312,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjViZDkzMWVkLTJmYmUtNGI3Mi1iYWJmLWI5MDdmZDRmMDZmZiIsImlhdCI6MTc0MjE5NjQ4OSwiZXhwIjoxNzQyNDEyNDg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ofoYfqkyH-RZoKVpV6h67cBkFv2UfMzJOl_WfH6UeFE'),(313,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMwY2JkODQ1LWE4NDItNDZjNy1iMjI3LWE3MTRkYmUyNjdhOSIsImlhdCI6MTc0MjI5MjAzOSwiZXhwIjoxNzQyNTA4MDM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nxx4kUtc86SM9A_JrCPKUbOfSyupZWN2qq6uARiHqoM'),(314,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc3MTRkODRlLWYyNGUtNDQ4Yi04NjFmLTg2ZjkyOWNjNDYzZSIsImlhdCI6MTc0MjI5ODQxNCwiZXhwIjoxNzQyNTE0NDE0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WctDQcNUlGM4_vhBdq7gKtYlQD2wx7S_yr8WtMqRKjg'),(315,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ5Yjg0NDZkLTExNmItNDk2OC04NGJmLTczZjUzZjdhYjg0MyIsImlhdCI6MTc0MjI5ODgwMSwiZXhwIjoxNzQyNTE0ODAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.qAmLrRRX1acB2Wk_mk8nZAWODjBaJ40U-8Gb4QFbqTw'),(316,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY4YjUzOTA4LWI1MTMtNDhkYi04MmMzLWRlNWFmYWIxMzQwMiIsImlhdCI6MTc0MjI5ODg4MywiZXhwIjoxNzQyNTE0ODgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kzd_hniBBo1aVaBurShuNiljmI7DJwIHa5UMZp3lC9Y'),(317,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUyNTdhNjkwLTcwMTAtNDk2MS1iN2I4LTI4N2FlNWQ1ODk5OSIsImlhdCI6MTc0MjMwMDkwOCwiZXhwIjoxNzQyNTE2OTA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cIHu1fnxIy4xaesWjrdedyv6lURUhJ9SgDlgR9Ric6c'),(318,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEwMDJkZWFiLTUyNmYtNDMzMi1iZWEyLWQ5MjE3MDI0OGFlYiIsImlhdCI6MTc0MjMwMDk3NCwiZXhwIjoxNzQyNTE2OTc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.csnIQ7BCmf5XxtThN834Gq271mw92-oOtfoNJJRKiP4'),(319,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc0NzVlODZhLTJhOGUtNDIzYS1iOTVkLWY2OWFlOWQ5YmEzYSIsImlhdCI6MTc0MjMwMTc2MiwiZXhwIjoxNzQyNTE3NzYyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.klmRFE5jBtzCbAnZICqig4kGxXZQJ_kZb2sGC8IVrZ0'),(320,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI5NmEzOTUxLWFiZjktNGIzMC04ZTUxLTk3MTEyOGZiM2M1NCIsImlhdCI6MTc0MjU0MjkxNywiZXhwIjoxNzQyNzU4OTE3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wNzE0HImSy8gzRGoqSI1QRPe4oP1HGQdxVMdOtmD5do'),(321,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY0NjI4MmYwLWNiNDAtNDdjZS05NGRhLTFmMjMyMDM2ZTkzYiIsImlhdCI6MTc0MjU0MzAwMSwiZXhwIjoxNzQyNzU5MDAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dfDT8qX2X2mbR0iD1tX-NGbi40nnkemsNUhW9xzyzoo'),(322,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUxMDU5MjY5LTc3MTQtNGYyYi1hNDgxLTJjMmYzNjFkMjQ2NCIsImlhdCI6MTc0MjU1NDU3MiwiZXhwIjoxNzQyNzcwNTcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FMxuTSvyFTJk0-HHdrl0N5eZZQmp6O61FPxPZk0sN2o'),(323,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE3MWFiMjYyLTEyZTQtNDUzOS04NDEwLWRkNzFlNmMyMWRjNiIsImlhdCI6MTc0MjU1NTEyOSwiZXhwIjoxNzQyNzcxMTI5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.bFK4yHqH8uPlP5FABLQArjo2AW1IfKHXPSPXfIU8pX0'),(324,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzZDFjMDAxLWYzY2EtNDE4Zi1hZTUyLWJkNDQwZThkMzRhYyIsImlhdCI6MTc0MjU1NTE3OCwiZXhwIjoxNzQyNzcxMTc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.emTKFjLTA4L-60nKCZDmw9BkMmfkIpVmz3aJXfaQiKM'),(325,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI0Mjg2NTY4LWZkNTYtNDg0MC1iZWNjLTY2MzA2NDMxMTg5MCIsImlhdCI6MTc0MjU1NTIyOCwiZXhwIjoxNzQyNzcxMjI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.v50nJynBsNImS4b3_erD9bG_uJh14eHtIfU4bhf-NsM'),(326,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZkODQ4NjVhLTFiNDUtNGYxZi05YWE3LWQ5YzI3NWNkMWUyNCIsImlhdCI6MTc0MjU1NTI4NSwiZXhwIjoxNzQyNzcxMjg1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CShKuzFVjSMAnoKrcIJZMVEgtjvnKypcPxv5Nrbzagg'),(327,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdjNGNhMTFiLTM4MWUtNDI4Mi04MGE4LWMzYzg5YWU1OTFiNCIsImlhdCI6MTc0MjU1NjUzMiwiZXhwIjoxNzQyNzcyNTMyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.meMYrUs2dgBfWk48K23-N-Sw9W5aTKwZCknAIqXhvHM'),(328,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI3MGU5YzQ0LTBhMWEtNDQyNS1iMWU3LTcwNmY3YTFjMmJjMyIsImlhdCI6MTc0MjU3NjE1NywiZXhwIjoxNzQyNzkyMTU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.R_yZjVgfvvU2QTOIg-CrSP8IpnLGVu_qxMY7BlbSCSM'),(329,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRkMDI0YjJhLWNiM2ItNDM1Yi1hM2VkLWNiZDQ3MWNmMDc0ZSIsImlhdCI6MTc0MjU3NzQ2NiwiZXhwIjoxNzQyNzkzNDY2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XQlC_hkj9Ri-rOiw6WilpDgeSThzihiuzonmTh-R3rQ'),(330,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVmYmEzZjM3LWE0MGItNDYxYy1hNWMwLTEyYTM5ZjQ0M2UzYyIsImlhdCI6MTc0MjU3ODI1MSwiZXhwIjoxNzQyNzk0MjUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2hYOupoKvRTaqU4hTcB3Q7om13nT5m2X2FRgopct5GE'),(331,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZjZDUzNjZjLWI2N2YtNDIwMS04Mzc0LTkzNzA2YTRiMWVkNiIsImlhdCI6MTc0MjU3ODI1NywiZXhwIjoxNzQyNzk0MjU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.05ASEe7QfsPf_ruIw105bPKoWMu2LNikA9_kHLizRKk'),(332,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUzNWMwYjlhLTAxZjYtNGU3Zi1iODE2LWVlZjRkMGY5YzU5MyIsImlhdCI6MTc0MjU3ODY1OSwiZXhwIjoxNzQyNzk0NjU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vxXC4XYOXinqzLs0sbq3sekGD1Vwr7OLRH-po4qbUa4'),(333,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0ZWQ2OGJjLTE3ZDUtNDJhOC04YzE0LWVkOTViZWYwNWM4NSIsImlhdCI6MTc0MjgwMzgwNSwiZXhwIjoxNzQzMDE5ODA1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kUpasdhi4vzRiknOeozRlNmMUfmhedXjrdhTjsGIZnk'),(334,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzODlhMTdiLWZhODAtNDA1ZC1iNmJhLTk3M2VmZTExN2FhMyIsImlhdCI6MTc0MjgxNDM5NiwiZXhwIjoxNzQzMDMwMzk2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CcyL-4ScTpH6KdhH6PTxNEQy3_x4voVfmeSCUKN1glg'),(336,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg5NGNiZDVjLWI2ODctNDYwMC05ZDg5LTg1ZDA4Njg5NGM5MiIsImlhdCI6MTc0MjgxNzY4NSwiZXhwIjoxNzQzMDMzNjg1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XDcOFpPqB3xe4VUkWdgsLxo5PHRrA7MIB6BqMEMuP28'),(337,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjljNGIzMjUzLWEwZmEtNDBlOC1hNzlkLTM1NzU1OWJjOWFmMCIsImlhdCI6MTc0MjgxODA3OSwiZXhwIjoxNzQzMDM0MDc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.T3IKfePW3_aBGrnmoXmli0vj2jUniPTM-RnMLhWLBvo'),(338,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkYzVlYzc3LTg5MGEtNGY3YS1iZWNhLTEwYTU3NTI3YzI2YSIsImlhdCI6MTc0MjgyMDI1OCwiZXhwIjoxNzQzMDM2MjU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.aJkZfFRay63SCV8VL7tCrXhhZ-GHUbRGavGx1rpL-4M'),(340,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFjN2U2ZWNjLWI4ZTYtNDhlYi1iZDEwLWM2YjU0MmI2OTYwMiIsImlhdCI6MTc0MjgyMDM1NCwiZXhwIjoxNzQzMDM2MzU0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.l093v1EfzXd_7fdXfehUxr1roi1oTYK8fcqdpsUWYm8'),(343,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFhMTU0MjZhLTU0OWEtNDU0OS05ZmJjLTVjMzY1Mzg4OTVlZCIsImlhdCI6MTc0Mjg4NDM0NiwiZXhwIjoxNzQzMTAwMzQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.U_-iuOGya62wSROVfjil3JqN8ILw6l-cJJ-727qyEJI'),(344,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwYzMwZTI3LWUzMjQtNGUyNi04YTVhLTUxN2M4ODBiZGUyNSIsImlhdCI6MTc0Mjg4NDc3NCwiZXhwIjoxNzQzMTAwNzc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9m6o0O0Nxu7gsqzMt_3YD0fJ_XhFj1msANHfbWCRzGQ'),(347,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFiNzA2NzA4LWFiNjQtNDY0ZS04ZTY4LTI3NjdkOTFiMTBlYiIsImlhdCI6MTc0MjkwNjMxMywiZXhwIjoxNzQzMTIyMzEzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.8q602lZGnbd-jVzsiANxyirEf6OIJRphPqXu-yFSxMI'),(348,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyY2ZhY2IxLWIzZDMtNDRiMC04ZjYyLTg0NmM0NTEyZTRmMCIsImlhdCI6MTc0MjkwNzAxNywiZXhwIjoxNzQzMTIzMDE3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ImVHsKkfd5LBvfuxyzhr1p4qWgneE49pmVKTKHYtGV0'),(349,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MzU5Y2QxLWYwNGYtNGYxYS05NmY0LWNlYWQ1ZDZmODNkYiIsImlhdCI6MTc0Mjk3MzYyMiwiZXhwIjoxNzQzMTg5NjIyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.B1u43MeuWk6IsiEzBdwiS3Qir8_R1674XSiL-hucw94'),(350,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY1M2Y5NjcxLWZjMzctNDc0OS04YTJlLTAzNjA4MmEwZGU4YiIsImlhdCI6MTc0Mjk3MzgyNCwiZXhwIjoxNzQzMTg5ODI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.BCxt1tps8FKLMwsM3GSO4mkuuwQUWbjrQdXQXEqX6a4'),(351,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlmZDAyYmIzLTMyOTctNDg4OC1iNTQwLTJlNjEyZDJlZDBjZSIsImlhdCI6MTc0Mjk3MzgzOSwiZXhwIjoxNzQzMTg5ODM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5oKv24hF-BVeQVrhK_bwVc7RkhkXR0udM3u9ND-Ar0g'),(352,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgzZjY2ODNjLWQ0N2MtNGRlMC05NGFjLTkxZmIxOTJlYjY3MyIsImlhdCI6MTc0Mjk3Mzk0NiwiZXhwIjoxNzQzMTg5OTQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4a5-y9I6JbvL3lOT-40tFlwjLlZRwPZ42K1pFASu8BA'),(353,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRiMDA0ZTBhLTM1NjctNGMxNy1iM2EzLTlkZWY4Mzk3YTMwMyIsImlhdCI6MTc0Mjk3NDQ4NCwiZXhwIjoxNzQzMTkwNDg0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.BIU7-qtUsFnaEiX1SeZLP9Uh4Hjv891OcLbii3_mdTU'),(354,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdkYWI0MjI2LTUxN2UtNDhmMC1iZjllLTkzY2Q4YjU4Y2E5ZSIsImlhdCI6MTc0MzA3NTAyNSwiZXhwIjoxNzQzMjkxMDI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.mA3GdktsNCtXS2zqOX5iDsQPXUyc0hmyGfLe9xG9Amw'),(355,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEzNTNlZDA0LTQ4MzQtNGU4NS05NGE4LWIwNGY2YzE3MzgxZSIsImlhdCI6MTc0MzQwODEzNSwiZXhwIjoxNzQzNjI0MTM1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.KSsxEKvLdaFKBvzG5_96dE5eJTLUloXCLVuF1hUsRm4'),(356,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk2OWJlYWI1LWU1YWYtNDExZS1iOGU4LTIzYmE2MzhkMjM1YyIsImlhdCI6MTc0MzQwOTAxOSwiZXhwIjoxNzQzNjI1MDE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PeOwsnJLb-27L0pEBBuThfkoGkP6sHdDmozEf_PdmtQ'),(357,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFhOGE4OTAxLTg5YTgtNDQ3ZS04MWI0LWY3MDFmYmY2ZWQyYyIsImlhdCI6MTc0MzQwOTEyMCwiZXhwIjoxNzQzNjI1MTIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.f9fgDijVksd7xT8srB-O7eDruAIkm1UB6FXnRZfyXYc'),(358,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmY2QyYzU1LWYzNjctNDc4Ny1hZDZkLWYyZDAwMDI1ZTVlZSIsImlhdCI6MTc0MzQxMjE5OSwiZXhwIjoxNzQzNjI4MTk5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FcRE3eb1o3v5XmpNLtaMbU14p0ddM6VXb9_ouAL6LGo'),(359,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJjZjE2ZDI3LTY1MGMtNGM2ZS05MTdjLTRkNDQ0MjZhN2JiOCIsImlhdCI6MTc0MzQxMjY4NSwiZXhwIjoxNzQzNjI4Njg1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yt_e9fCP_wTyxmAoED9JhQrnNG9hLJ4Q9pJqUm3FmNY'),(360,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliMzgyNDBhLWY4YTktNDNlYi1iNTU0LTM2NmQwNDc3ZTE3NCIsImlhdCI6MTc0MzQxMzcwOSwiZXhwIjoxNzQzNjI5NzA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1FXvTJlbyZ4N7dDjaxdPwjiqzUOGIrCG_o6xaszwUsg'),(361,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM2NWQzOGY2LTU4NTAtNDdhNC1iOGE3LTEyMzlkYmM5OWViMiIsImlhdCI6MTc0MzQxNjA1OCwiZXhwIjoxNzQzNjMyMDU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tW1Y7m9Z8zMbnsXRB9KDTDUCjoK33RMTMq057Kvkq68'),(362,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAwODA0NDQ1LTY2NTQtNGJhYi1hNzRmLTNhZmQxZGNkNmY0NCIsImlhdCI6MTc0MzQxNjE4MywiZXhwIjoxNzQzNjMyMTgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.R_XOFdiX0sOScmvtFO6KHI0v8j9WwuNQKSyN6FwnOWY'),(363,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUwZGRiMDNlLWQyNmEtNGIxZC1iYTJjLTZlN2QxZjhlODlmYiIsImlhdCI6MTc0MzQyMDIyMiwiZXhwIjoxNzQzNjM2MjIyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VFXsl2gxIgxkpMC73I8exZNhhzc7SraVRapd14oMEOI'),(364,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQxZDM5MDE5LWMyYmEtNDRhYS04MDUwLTM1YzljNWNjMzJlZCIsImlhdCI6MTc0MzQyNzkyMiwiZXhwIjoxNzQzNjQzOTIyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.OH-M-BgP-PiL7rgzwYCtmUegoE5-3PMX0FE7j3mfKfQ'),(365,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIxNjFjNWVmLTExNmQtNDBiNS1iNTFmLWZhODliYjVmNmFjYiIsImlhdCI6MTc0MzQzMTk4MCwiZXhwIjoxNzQzNjQ3OTgwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.e-HM9ea-T-QzNJCB5swvygnKxpPn3C_ylbOnOJRPhKw'),(366,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY1ZDc1ODhkLTc4MTktNDlkMC1iMDg4LWEwZTM4MjMyYWYyNCIsImlhdCI6MTc0MzQzMzA4MiwiZXhwIjoxNzQzNjQ5MDgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Q1Oejo0EgJJZ6CSHsAjkFKeV5IxjfaeUY219ejcUg7U'),(367,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyZWViMDQ0LTI1MmUtNGQyMi05ODQzLTY5N2ZiMjRmZWY5YSIsImlhdCI6MTc0MzQzNTU0OSwiZXhwIjoxNzQzNjUxNTQ5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yCra-we2m4gAyf1WbpdNrJbwtYPw0VbpeGn_RvR1ZOY'),(368,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0NmE5OTcxLWI0ZDAtNDI2Mi1hNGUwLWRhYzE3YTU0NjhlMSIsImlhdCI6MTc0MzQzNTU4OCwiZXhwIjoxNzQzNjUxNTg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.pYIF9ZsUeXjnjWwm7_WefLdzRcLGtyUOSIBDTRxcrA0'),(369,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYzMzUzZWQ3LWIwN2QtNDdhOS1iY2M1LTNkNWRiZDE1OTFiYyIsImlhdCI6MTc0MzQzNTYxNSwiZXhwIjoxNzQzNjUxNjE1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tl61JbTnlUnjWUT0Cm-Hp9ieEPu4wOGzLqS-EfR65P0'),(370,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNiOTA1Y2Y5LWVjN2MtNGUzMy1hZWYxLWZlYzhlODkzMTcxNSIsImlhdCI6MTc0MzQzNTc5MSwiZXhwIjoxNzQzNjUxNzkxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PZDHazRBSXVd1BruXICdMJcJHKaNNO-GpNezB-fGy44'),(371,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJiY2QxMDg1LThjMDQtNDczNi1iMDg0LTJjYjM0YWYzZmMzMiIsImlhdCI6MTc0MzQzNzkyMSwiZXhwIjoxNzQzNjUzOTIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.J35IzgEQx6-2rAneEYZkTXP5QG5CYIVwl5412OKZzLo'),(372,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJmNGExMWQ2LTEyMmEtNDM4Yi1iYzBiLTU2OWYwMjYyN2Q3YyIsImlhdCI6MTc0MzQ4NDY5OCwiZXhwIjoxNzQzNzAwNjk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.qIn75ZjEGxzeGf_OXtMyVyjzcFVLyMMP_P__mDCZLaI'),(373,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE5NjRiNjU2LWFmOWEtNDI4Zi1iNjk1LTNlYWExMGViYjMxMSIsImlhdCI6MTc0MzQ4NDc4OCwiZXhwIjoxNzQzNzAwNzg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.fAhiC2NPS72MS4HUvLryrTV6VvFHp88_1t8ShlMA2ow'),(374,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIzZDI2ZTYwLTI1NDQtNGJkMi04MGNlLTY4MzA0ZDBjMDUzYyIsImlhdCI6MTc0MzQ4NTQ0OCwiZXhwIjoxNzQzNzAxNDQ4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.pzzanp_XwjYyowwIuljx5E4W_zoH77K2tVvNjSM7Fag'),(375,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU5N2NmNDA1LWQ3YzQtNDdkMC04M2I2LTI1MTNhYmFjZjU2ZiIsImlhdCI6MTc0MzQ4NTc0MywiZXhwIjoxNzQzNzAxNzQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.qypd-icBDBGwmPCekkVM6NTAqdCkhL2-RX85NpuY6aM'),(376,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEwN2M1OWY4LWE2NzYtNGFlMS05OTQzLTJlZWMwOTYwNDdjYyIsImlhdCI6MTc0MzQ4NTg2NiwiZXhwIjoxNzQzNzAxODY2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1Ws8wQ49eDEgeH5HJLsmHaJbJmkRt4i8MvdfzT1iLPU'),(377,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3MjRjN2NkLTAyNTEtNDY5ZS04ZjQxLTkwNGU2NmE5OTkyYSIsImlhdCI6MTc0MzQ4NTg4OSwiZXhwIjoxNzQzNzAxODg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.V-54gwkPswNB7hfN-zorHFdBOEfvkryk3F8eLPalSBE'),(378,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU1NzhjY2MxLWE0NTItNGU3NS05NDVjLTRkNTlkZGVmMjk3YSIsImlhdCI6MTc0MzQ4NjgwNiwiZXhwIjoxNzQzNzAyODA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yOY8pKHwcvh03G3WHhR5pCS25_N5tUSeVnTUXIKXJec'),(379,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM0MWNjOGIzLWY5MzktNDc5OS05YTkxLTYwZmFkOGVhYzEzZiIsImlhdCI6MTc0MzQ4NjkzOCwiZXhwIjoxNzQzNzAyOTM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hj4gh6pYADBX_80aoD170FBFuHSAVF6eW_ay934Qc00'),(380,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZlZDEyMjQ4LWUwNWItNDIyYi04OGFhLTFjOWQ0MjQ1YmVhYyIsImlhdCI6MTc0MzQ5OTk4OCwiZXhwIjoxNzQzNzE1OTg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.aFdZFKdyV7XuHFtlB5BRmkc9m2cZFWk4OqY6grp2uzE'),(381,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk3MTc3MzJkLTg0ZTUtNDExZC04NDY1LTM3NTZhOTVkNmZkOSIsImlhdCI6MTc0MzUwMDk0MCwiZXhwIjoxNzQzNzE2OTQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VHXT0yyBEeaWGPaXRhzIvR4zkSQOjNJ04m2Dt8Yf1x4'),(382,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjljZmFkYjFhLWI1MjItNGIyMi05YWExLTdlN2NiYWY4MjMyOCIsImlhdCI6MTc0MzUwMjIyMCwiZXhwIjoxNzQzNzE4MjIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.LISYFBDh5r34K7D-4Xfp1PV2C-jiGTSgA7ctCo42cZ0'),(383,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU1OWE4OWM0LTIyZTUtNDVmNy1hZTY5LTZhZTM5NDdhZGI4ZSIsImlhdCI6MTc0MzUwMzg0NywiZXhwIjoxNzQzNzE5ODQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iL9qn88kiDL93zapQ7QstcnDTzuYmXben2I5OenX4VE'),(384,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBjYTc5YjQwLWVkZWYtNDBlZC1hZjA0LTUzMmMzMmU5NTQ5ZiIsImlhdCI6MTc0MzUwNDY0OCwiZXhwIjoxNzQzNzIwNjQ4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.odb7cpfK4SOHM8QkLojf0oFRky3EJQ4tUD5zcLOfzt8'),(385,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyZjQ1NWY2LTdhMzEtNDI0OC1hOGEwLTYxYTJiNDU2ZmE0YSIsImlhdCI6MTc0MzUwNTQ3NiwiZXhwIjoxNzQzNzIxNDc2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.p0QMlNPlEbW5OSUCILN4MDEoW0agdExZ0M0IHbs8dlo'),(386,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVkZjg3NDA0LWE3YmYtNDFmMy1iNWNkLTQ3NDkzOTZjZTFiMyIsImlhdCI6MTc0MzUwODE1NywiZXhwIjoxNzQzNzI0MTU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.rIMspAUj59G2Btrik1-592OeGBlsD-zv6GWxVxHqaqw'),(387,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQwY2E1ZTBhLTkyMWMtNGYzZC1hYTFjLWE4Y2NjYTA1ZWYyNCIsImlhdCI6MTc0MzUxMjg4NywiZXhwIjoxNzQzNzI4ODg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vSTozhyADFoMyRg1FN6oM31oZmvKchUV8C6_PQ_KgAY'),(388,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdlZmUyMWVlLTRlMGUtNDQwZi1iNzY2LWRkZDZhZjllZTBhNCIsImlhdCI6MTc0MzUxNzUyNiwiZXhwIjoxNzQzNzMzNTI2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.39nWQC3dfEBNgwfXQ0Qextd6EYkKvfH1yQG7so_9Wb0'),(389,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzNjg1OTI4LWFjNjYtNDI1NS04N2ZlLTJlOGZiMDE4NDcyYSIsImlhdCI6MTc0MzUxODU1MSwiZXhwIjoxNzQzNzM0NTUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lFSwwyl2tuFT2rDRO8i8mvDyaJS3Q2IpR7lCjDxRvr8'),(390,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNjZTQ2YzdmLTAyNTktNDk4MS1iOWEyLTFhMmQyMGRmZTY2YiIsImlhdCI6MTc0MzUxODU1MiwiZXhwIjoxNzQzNzM0NTUyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.TB4X1WMjk4mjY2VWCzAugQG0mL8Zsb4FaqtCz91ftk4'),(391,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg3MTlkMTliLTRmMDktNGM4ZS1iNGI0LWE3N2FhMjkxODNkNCIsImlhdCI6MTc0MzUyMDExOSwiZXhwIjoxNzQzNzM2MTE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nkNdULbV14AlRE0sjoI6_pNT9ubDW7IIHbxKns8UI4k'),(392,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU5ZmExYTdjLTdhZTQtNDJlOC04MTY2LWVmMWVlNjMwZjFlZSIsImlhdCI6MTc0MzUyMDEyMCwiZXhwIjoxNzQzNzM2MTIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jUAcFxl0pEVnpWg5uxEUKZsUGelzFrCPAMlLG_Lnsuo'),(393,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjljZjA4ZjI1LTM4MjQtNDhkMy1hZGEwLWZlYzc3Y2YzZmI3NSIsImlhdCI6MTc0MzUyMDg5MSwiZXhwIjoxNzQzNzM2ODkxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tO9BKZkDKoaegM07ujd7LarcUB_30ZUpADSRQcvMSJM'),(394,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkNWQxYjMyLTNlNjItNGM2My1hN2U0LTI2MWY3MWYwNWZhYSIsImlhdCI6MTc0MzUyMjYyMywiZXhwIjoxNzQzNzM4NjIzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.TR4RgVuaCy34xngCHkdYY4R6y8rCMMkG7CT5jbAwqaE'),(395,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY5MmI1NjUwLWNkNDYtNDFiOC05YjFhLTAxNGJhM2NkZTQ0YiIsImlhdCI6MTc0MzUyMzQ5MSwiZXhwIjoxNzQzNzM5NDkxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ryAtSZyW6E5ds3NjEIg-x5vPJslCpWoqEKpQaQHXtL4'),(396,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA2ZjczNmY3LTU2NGEtNDViZS05MGMzLWY4MmZlZTQwOGViOSIsImlhdCI6MTc0MzU3MDgwNiwiZXhwIjoxNzQzNzg2ODA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-Zj9a10wgI2T2_UJS3bM8xJIuGU-kub3CZI5HVP-2-Y'),(397,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJlZmFjZGVhLTA5MjgtNDVlYS05MWQ1LTliZDNhYjI4N2UwOCIsImlhdCI6MTc0MzU3MzcwOSwiZXhwIjoxNzQzNzg5NzA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.HHBZnLYSw9xNBDHtq-X23Br5BywbEieAvbtpkOQUWFY'),(398,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRhMDhhMGU1LWJmNTYtNGJjMy05ODM3LTdmM2NjYTM4ZTM1MiIsImlhdCI6MTc0MzU3NDEwNiwiZXhwIjoxNzQzNzkwMTA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.BH-tjaeU0hDDHT0dwaf2bb_YIh2dNTmXl5R3qS-X7cA'),(399,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzOWQ2ZjgzLTRkNzUtNDY4My1hNGJmLTk4NjljYjRhNWVlYSIsImlhdCI6MTc0MzU3NDU0NSwiZXhwIjoxNzQzNzkwNTQ1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZQo3jQF760hq81ATOlHMEmMDTIAfVNwPmXXr33zZH4o'),(400,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdmZWI5MzNiLTljN2EtNDhjMC1hZGZhLWI2OTcyYzc0YzYxZSIsImlhdCI6MTc0MzU3NTA5NywiZXhwIjoxNzQzNzkxMDk3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-MhCtxfhejXpsFTojaRXwX_1YWzjcU7MKvYy-m8IlQA'),(401,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQwNmVjNWY0LTJiOTItNGQzMi1hYzJmLWM3ODY1Nzg0N2JkOSIsImlhdCI6MTc0MzU3NTQ4MiwiZXhwIjoxNzQzNzkxNDgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.IzJvzx1C346WYAqiV-AsCtkfH3zf8yQj4J0sfYD2xX8'),(402,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMzNzg4MDkxLWRhZTktNDUxYS1iN2NiLTJlNWNiYTg4M2E0YSIsImlhdCI6MTc0MzU3NTc2NywiZXhwIjoxNzQzNzkxNzY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vwCcPJ5TZFm547RVAAWg3XZkhTPLhuSE1Z2ls1peDDI'),(403,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc5MTM4ODY3LTZhMjctNGMzYS1hZjU0LTdjMmVlOWMyOTM1ZiIsImlhdCI6MTc0MzU3NTkxOSwiZXhwIjoxNzQzNzkxOTE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ex2j7mdl9HIRECqURg-KVaTq5niwMuhCSTj0cp-L8eM'),(404,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJjYzU2NzMyLWNhMzItNDdlZC05M2Q4LTg2YWU0ZjFkZmQwZCIsImlhdCI6MTc0MzU3NjE0MCwiZXhwIjoxNzQzNzkyMTQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ePVXnrlzmvozySk953Nl2uyOBgsZYHKTLLM-Dbn2C3s'),(405,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYwNGRiNWYwLWMzZjYtNDNhOC1hNWZjLTBlY2I4YTVhZjNiYiIsImlhdCI6MTc0MzU3NjE0MywiZXhwIjoxNzQzNzkyMTQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VxTp5UXiE-5fWwYmiQw5MF3ZmRP_hZINLuAsD9wTsIk'),(406,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBmZmIyZTQ3LWQ3ZDAtNDI5Yi1iZmY5LWRhYjdkNTNmYTYyNCIsImlhdCI6MTc0MzU3NjE0NywiZXhwIjoxNzQzNzkyMTQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.b_vlqN1yWMFZSu4lPhNQeJoD93Cis-fupKm6x-OxbA4'),(407,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmYzliNTc0LTQ5ZmMtNDJmMS04N2ZjLWVjNDk1MjhjNzlkYSIsImlhdCI6MTc0MzU3NjE1MCwiZXhwIjoxNzQzNzkyMTUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.MRmi63pvRojb8MClyk-_SxRrDxX-UZpsTXOc9E9dY9M'),(408,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3ZjEyMzczLWM3YmEtNGIyOC04ZjNhLTdkMzNkY2QwOWU3NiIsImlhdCI6MTc0MzU3NjIzMywiZXhwIjoxNzQzNzkyMjMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jjyVqpwyrLvfj5y_bldM-EyBt-AcVk7ScjO9SfcfSpc'),(409,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJhZjNjNmEyLTgxMjAtNDIyZC04ZmFiLWVjYWFiMDczMDQzYiIsImlhdCI6MTc0MzU3NjM0MiwiZXhwIjoxNzQzNzkyMzQyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.rFD0SsxFjJlWsqQ_K23aTmnv7RXAQkcPcMtogY9Gf-4'),(410,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0NzE1NmJiLTgwMDAtNDg4MS1iODdkLTI0NmM2Nzc4MWU5ZSIsImlhdCI6MTc0MzU3NjM2MCwiZXhwIjoxNzQzNzkyMzYwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zVOcyqHPxGRTQEZKASJ2slVDsowVyx01icxBdMOmInc'),(411,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVjMjY3ZDVmLTQ3ZDktNDVjYy04MTgzLTNkZDZhZTg5NGIwNCIsImlhdCI6MTc0MzU3NjQ0OCwiZXhwIjoxNzQzNzkyNDQ4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.tMevGogL-IJX123LvoOsgh59HG_RAd9eCJ_4WHG1Wso'),(412,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYwZDZmMjY0LTlhODktNGU1Yi05OWIxLTQ1YjVmOTZjYjNiMSIsImlhdCI6MTc0MzU3Njg0MSwiZXhwIjoxNzQzNzkyODQxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.pxvMCeg5bomSCxRDcjb0ZHKL2gBZ8PNS1s9xai9SUPk'),(413,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliMzNjYTAxLTc2MmUtNDMyMS1iYzgzLTA1ZTEyNzFhNmE4NSIsImlhdCI6MTc0MzU3NjkxMCwiZXhwIjoxNzQzNzkyOTEwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lIqqPInWToX9qZAKynP1vtQ3BwihrIYZhE4aFfxu4e4'),(414,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM5MjE2NzE5LTY3NDQtNDYzZi1hZmZiLWRmOGU4OTcyMDAwZSIsImlhdCI6MTc0MzU3Njk4MywiZXhwIjoxNzQzNzkyOTgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.a1du9CoSv-62KR4ebTUKMINafLWYupCHmqJFbPjrjdk'),(415,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIwNTNhMTUwLTE4OTctNDFlMy04NWNjLTczYjYwYWJmYjg2MSIsImlhdCI6MTc0MzU3Njk4NiwiZXhwIjoxNzQzNzkyOTg2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0S56TsD8mzyVY6Ysp5lnF2FMcVGXuCE--I92Gdz29j0'),(416,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdiMTQzMTJkLWY3OWQtNDU3ZC05NDgwLWFkZTBhZjc4NzA5MSIsImlhdCI6MTc0MzU3OTQ0MywiZXhwIjoxNzQzNzk1NDQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.niewhD6Q7P-Av_G2G1JL3HV7jpr9WBRUZv9D1pqmDxg'),(418,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFkMjAxNmZjLWVlYTUtNGY5ZC1iMDYyLWUzOTYzZjYzNzc4NiIsImlhdCI6MTc0MzU4MjQ3MiwiZXhwIjoxNzQzNzk4NDcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.htGyTsmUzuOP0_POakHoP88af0bKLqcz_vXCtIjOj6g'),(419,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNmNjY0ZmMxLTNlYzUtNDIwOC04Mjk2LWViNDQ3ZWQwYTdkNSIsImlhdCI6MTc0MzU4MjU0NiwiZXhwIjoxNzQzNzk4NTQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0._AfXKbdve0_wBGx_Kd8FzcJTZ2LPdLOCvkC8pShPxyc'),(420,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMyZmNlZWRjLWQ2MDItNDEwZC1hZGFlLWNlZjgzZjNhN2Y0ZSIsImlhdCI6MTc0MzYwOTAyNiwiZXhwIjoxNzQzODI1MDI2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.meARvlqApPLIysfvXpzWAjy9XHprBT6OeimdcbjJkbA'),(421,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFlNjkxZDAzLWQ3ZTctNGM3ZS1iZTM4LWJkZWQ0MzVkMjBiYSIsImlhdCI6MTc0MzYwOTAzOCwiZXhwIjoxNzQzODI1MDM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.rifHoFOVVh0x-mriZcLjD3IAEddlbJV4VxWW6yrOq8o'),(422,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEzY2Y4MjRjLWVkOTEtNGMzMy05MmEzLTYwNzQ3Mjc1MjUyOCIsImlhdCI6MTc0MzYwOTA0MywiZXhwIjoxNzQzODI1MDQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VtiBilT9ebWsG86l8u1ugZoXhwwmITPSayw7dePWh5E'),(423,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBlNTM3YjFjLTg3NmMtNGE3MS1iYjRjLTcyNWQ2MWY3MWRkMiIsImlhdCI6MTc0MzY3MzMyNywiZXhwIjoxNzQzODg5MzI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CpDWKlWci7xM11drcvJp6LaYtcLy2qWRbTydwC0UVmU'),(424,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUxMTJkM2IyLTYwZDgtNDM5Yy1hZTI2LWQ1ZGFhZWMwNTEwMCIsImlhdCI6MTc0MzY3NTkwNCwiZXhwIjoxNzQzODkxOTA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wk2M2OsLHhTFyuA5-Xeo4yYLdkVG7btPkrLGe5Pc5-c'),(425,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYwNDYzYjBkLWVjNjctNGY2ZC04YjdmLWM2Mzg2MDRjN2UwNiIsImlhdCI6MTc0MzY3NTk0MCwiZXhwIjoxNzQzODkxOTQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Ko3SdgwGdfFJMcS8IH4hs1awnpW_AdHqVV1-oNBP_Jg'),(426,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYzNDE3NGJiLWI5NDMtNGEwOC1iMzdhLTgzOTcwNWJhYWQwYiIsImlhdCI6MTc0MzY3NjM4MSwiZXhwIjoxNzQzODkyMzgxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.l_4DBk8yg4EO0ohAYvJNKjUhAEI-LD9uiiWW46edbb8'),(427,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMwMjczMmFjLTg5YzUtNDA3ZC1hYTQwLTc1ZTMwYWYxYjA3ZCIsImlhdCI6MTc0MzY3NjQ3MCwiZXhwIjoxNzQzODkyNDcwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jkX0820c6PRAY7afUVyrsQFpeAkX1uAITf3ysgHmeP4'),(428,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMyNjNmMGE2LTYzOGYtNDhmYy05OWE1LTM1YjViMjZmOWRiYiIsImlhdCI6MTc0Mzc2NzU4NywiZXhwIjoxNzQzOTgzNTg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Rog1ct78-ZtBVaRK1pwTmxxOkzihapujScsH1LZfUKY'),(429,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEyYzg3N2IxLThmZjQtNDhiYi1hMWQxLTI1ZDZmNjQ0OWZhMyIsImlhdCI6MTc0NDE3NzUxOSwiZXhwIjoxNzQ0MzkzNTE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.F87RliUdrUW3IRh8pmudwXsnp04KE0MoAmfV8OFH8Cg'),(430,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFiZWIyYjA2LTFkMDgtNDg0ZC1hMWZmLTRkYmI0ZDcwMzdiYiIsImlhdCI6MTc0NDE4MDQxNiwiZXhwIjoxNzQ0Mzk2NDE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.f4huYD5hPEIWGVOayHbz6uo-nceBL4wptUXGaj5Aoj8'),(431,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ2NzNkNmRkLTQzMGYtNGRjZS1iMTY2LTJhNTg2NjRlMmU3OSIsImlhdCI6MTc0NDE4MDgzNiwiZXhwIjoxNzQ0Mzk2ODM2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.oIRVrqG_vd-bxlBJyQ544KmvGpLJP1cW-qMz92g1e50'),(433,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwNTc0OWVlLTI2MGUtNDFhOS05ODc0LTVlNDkzZDdjMzY4NSIsImlhdCI6MTc0NDE4MTA2NCwiZXhwIjoxNzQ0Mzk3MDY0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZIttSG8CFzwK5XZLzykTOj6-VBymlHKQ7mS9SPGJoFE'),(434,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE1YzI5MDZjLTA2YWMtNGViMy1hNzc3LWNmYWYyODNkNjdmMSIsImlhdCI6MTc0NDE5NjYwMiwiZXhwIjoxNzQ0NDEyNjAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9vnS09vd0QUZY6lwNKVmMar2uBH9BuTLizBZPYOD8Kc'),(436,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIwOTBhOTNmLTJiN2EtNGIwMC05Yjk2LTVmNDUyNjQzNzgzNyIsImlhdCI6MTc0NDI3MDg2MCwiZXhwIjoxNzQ0NDg2ODYwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SfZRK3gbNazW6zCVPntpOTtUlmG9gd9TJZBHzHYyq6w'),(437,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwMjUyN2EyLTM0YjAtNDI0Ni1iYzQ1LTY1NmJiYTBhNDRkOSIsImlhdCI6MTc0NDI3MTM4MSwiZXhwIjoxNzQ0NDg3MzgxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.q8egK-SkOqJS3lCQYb-ItYUI5QQ9f-blGvW7aYRAAOA'),(438,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFlMzlkZTQyLWRkN2YtNGMzNC04MmU1LTY0MDcxN2FhZDhiNCIsImlhdCI6MTc0NDM2NDM3NiwiZXhwIjoxNzQ0NTgwMzc2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.EShQGE9bXS38PEmo6a42KDMRBKAzvxLMK16B8Gw_dZQ'),(439,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIwMzRiYjM1LTU2ODctNDlkMS1iYjg0LTFiYjUxOGIxM2M2YSIsImlhdCI6MTc0NDYxMzI1MywiZXhwIjoxNzQ0ODI5MjUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.IbYLu5Yy4jz6GbOYt_f1Ed55K4sH_-EMOEj4daY9Y68'),(440,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYyMzFkYWY4LTUzMjUtNDdlMS05OGYyLTFkMmQ2MzI4MDEyZSIsImlhdCI6MTc0NDYxMzI1OSwiZXhwIjoxNzQ0ODI5MjU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.23aNnqKc9dYdVLnF6vGPiP7-coecgzk_ObYj6_WDv58'),(443,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBmZjM0ZjljLTFmZTYtNGQxYS05YzBkLTAzN2I0NDgwMzdkMyIsImlhdCI6MTc0NDY5NjcxMSwiZXhwIjoxNzQ0OTEyNzExLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lSoqHfiWzsW4wuhzPdEHFMgcin_SEbuJFj0S7kfnbF4'),(444,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIyYzhmYmMwLWU3NWItNDM3MS04MmVhLTAzYTk2YzY2NmMzYiIsImlhdCI6MTc0NDY5NzI1NCwiZXhwIjoxNzQ0OTEzMjU0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.s1-E01EfUsH1hB8-wls8iHyK60V0QpMTmVvmCY4gF9w'),(445,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgzNjhmMmQzLTcxMTQtNDc1Mi05MjA5LWFkY2ZhZWQ0OGJhMSIsImlhdCI6MTc0NDY5ODU0OSwiZXhwIjoxNzQ0OTE0NTQ5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gf7Mer-DfJnmXcfUw3ZtgEILGUIBtmAspGZFExrJ4sY'),(447,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA1Y2IxOGQ2LWFhYTAtNDY5Zi05ZDk3LTI1MTQ4OTMxZDFkZiIsImlhdCI6MTc0NDY5ODYyNiwiZXhwIjoxNzQ0OTE0NjI2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wh4rpDfnRvWPsukjZscB_8XrCPzSAgD7XyuTaFT-ZbE'),(449,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmMmZlMzQ3LTE1OTMtNDViMS05ZmNmLTM4YWNlYjViZDNlMyIsImlhdCI6MTc0NDY5ODk4OSwiZXhwIjoxNzQ0OTE0OTg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hdMmT84g1oYDixzUa-9n_n9Gz_2gPZDcTNUtiHWrZCI'),(451,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIyM2FjNmJjLTQ2MWUtNGMxZS05MDJmLTJkNjMxMzA4ZDMxZSIsImlhdCI6MTc0NDY5OTExNywiZXhwIjoxNzQ0OTE1MTE3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.W3fKpXQ1XRyGNxWV0tFP3Q4fv0uHxuG299TwrYk6VhQ'),(455,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY2MzFlN2E0LTExMjItNDEyYS1iMWU2LTFhYzU3MzNmNzBiMyIsImlhdCI6MTc0NDg2Nzk1NCwiZXhwIjoxNzQ1MDgzOTU0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.olk90VcS6NTORA1oLGqMn0Dqff-m8K7es4iaz27uDE8'),(459,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU2YWY1YzM5LWI1ZmEtNGQ5NC05MzhiLTVjOTNkMWZmZjg0NiIsImlhdCI6MTc0NDg4NjUwOSwiZXhwIjoxNzQ1MTAyNTA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dk3oCxJdXGQxdNW_ZIkCumWydoc7T3A-My8Qk-RMnRQ'),(460,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMxNTNiZTE1LWVjYmMtNDlmYi04NWVkLWQzNjY0YTIwYTk0NiIsImlhdCI6MTc0NTMxNTEzMSwiZXhwIjoxNzQ1NTMxMTMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.56nK2Nm-14oerOs7cKXZ3wcb3W9cyEzK3z9nMY54qRQ'),(461,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc1Y2ViZWYyLTRmMDktNGE5Mi05N2I3LWJlNzQ3MDEzNDJiMCIsImlhdCI6MTc0NTU3ODM5MCwiZXhwIjoxNzQ1Nzk0MzkwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dpco9pmAPAmc8_9ZI_9IlTRdTcpTek2oVvrUNcHLF-E'),(464,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM5ZjMzMTc2LWY0MDItNDM5Zi04YmYxLWYyOWY2MjNiM2FlMyIsImlhdCI6MTc0NTgyNzQwOSwiZXhwIjoxNzQ2MDQzNDA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.i8DSr7AYUuyA0Cp1tJ4BZ5is54je_AjGP7hvMwf88wY'),(465,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIwODU5ODUzLWRlMmMtNGZlNS04MTUwLTM4ZGNlNmFjZGVkMyIsImlhdCI6MTc0NTkwNTIwNiwiZXhwIjoxNzQ2MTIxMjA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zBYy3s5R1K8S5zhmiUTV614oPCO06xE2YIxXxXlW5mc'),(466,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZlZTA5YWY2LWM0MmMtNDI0Ny05MGQyLTU0MmM3Mzk1NDIyMiIsImlhdCI6MTc0NjAyOTIyMywiZXhwIjoxNzQ2MjQ1MjIzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PY3fFvCTSmJYbRQ8j6I1kRg1NJO-_gktjTtb3W0jxr0'),(467,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg2OWM2NTEyLTgxZjktNGIwYy1iNWRlLWI0ODI5NzdiNjE2OCIsImlhdCI6MTc0NjE2Mjc1MywiZXhwIjoxNzQ2Mzc4NzUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cGaDks-uMp73E9Krgr11e5bqdSK_6VximCmQN1DT9_U'),(468,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MjIwZjQ3LThjNGYtNDJmYi04ZjAwLTQ2ZmRjZjA3NjYxYSIsImlhdCI6MTc0NjQzODA1MCwiZXhwIjoxNzQ2NjU0MDUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kyoKg79OrLUn0X3rbRSfBVPz6T_ZRIohC9YHV8CzKwU'),(471,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRlZmEwOWE4LTkxMTMtNGRlMS1iNjIxLTNjODMwMjc5NTFhMiIsImlhdCI6MTc0NjQ1MjI3OCwiZXhwIjoxNzQ2NjY4Mjc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hP0J_nPrv8BQJQlNZBtIFeLSsfg71nVcMUE6MKasCsg'),(472,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFkZjE1YzU4LWFiMDktNDViZC04NjM2LTdhZDBiNGExMWZjYSIsImlhdCI6MTc0NjY4OTY3NSwiZXhwIjoxNzQ2OTA1Njc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6qizgOFT_-yGjB-DAN2Il9sUyF_-naSv7HS2yjgaWk0'),(474,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBjMjRlMDAwLWQwZDItNGY2OS1hZDgzLWViMjA0ZDE4MmRlMyIsImlhdCI6MTc0NjcwMTA4MywiZXhwIjoxNzQ2OTE3MDgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4EnjkarsXZfoJTCTDde4fpx0t1XDgcyDXZwv_rb3ht0'),(475,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY1MjQ2ZGM1LTliMTAtNDJmZi1hYTEyLTFiY2ExNzZjODI1MCIsImlhdCI6MTc0NjcwNDIyNywiZXhwIjoxNzQ2OTIwMjI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WdpSXu21f5ftd2aV7j801i3kiR9M8pgbf0ASTEm_Ebc'),(477,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUwMjNmNDY5LThlMTAtNGRlNy1hNDBmLWU5YzU5ODQxMWYwZSIsImlhdCI6MTc0NjcxNjIxNCwiZXhwIjoxNzQ2OTMyMjE0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.I7XDOoiUGmBSd8Mow8xkkT0WkG_ECkt4t7-dco3e1M0'),(478,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZiNjhkNDlkLTFmZGYtNGFlMS1iN2NkLWM1NzZiOGI2ZTg5NiIsImlhdCI6MTc0NzEyMjQwMiwiZXhwIjoxNzQ3MzM4NDAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.o7W87akYeU-5ATe0S5cfVUNT80CjYZr4UNFbbGImFOk'),(482,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFjNDI4OGYxLWE3OGYtNDhmMS1iMWNmLWEwODU4ZTRmM2QzMiIsImlhdCI6MTc0NzIxNTAyMCwiZXhwIjoxNzQ3NDMxMDIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.LrPsWXAq-1nUbjCUV6POQPGi5qviQM2y6gPna4V1Hzc'),(484,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjllMWQ1MTFhLWQ0NTItNGI2Yy05ZGJiLTU0MGRkMmMyZjc1MCIsImlhdCI6MTc0NzgzOTYxMCwiZXhwIjoxNzQ4MDU1NjEwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.178DhqNCx7BMxafQqnumQU6qh9IiIX6DoqMepr47yws'),(485,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgyMTY4NjMyLWVmYzEtNDgzNy04YTE3LTE3ZjZlZmZkZGJmYSIsImlhdCI6MTc0Nzg0MzUyNywiZXhwIjoxNzQ4MDU5NTI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0._MCS1sBCFpYphA1Hwm42xv1Kbsu0CFSn3WVP7phDOLc'),(486,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE5MGE4OWEzLWUwZDYtNDM1OS04MTA4LTEyNWQxZWI4MGUxMCIsImlhdCI6MTc0Nzk3Nzc1MSwiZXhwIjoxNzQ4MTkzNzUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.UtTfWsFJrGS798Yn-R18wqCyRWhjH10m7BtVsIjuumw'),(487,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk5ZWQ3NjE4LTY1ZDctNGIyZC04MDMzLTRiMWFlMzcwMDAyZSIsImlhdCI6MTc0Nzk5MDEyMSwiZXhwIjoxNzQ4MjA2MTIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.EkO7oQKZzagoYRMOrTHaXSnoFBRbE48GJYoJ5plPPhA'),(488,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBmODNmODdlLWYzYjctNDVlMi1iZWM2LTMyMmVhZWUwOWM2OCIsImlhdCI6MTc0ODY3NzI3NCwiZXhwIjoxNzQ4ODkzMjc0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9L-_sLDlNhdtwPt5TzyZndaSMp_GbWss25xz45WPv6Y'),(489,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA2Njk0YjNiLWQ1NzUtNDNiZC05NTcyLWI2ZjQzMWMwMTQyOCIsImlhdCI6MTc0ODY3Nzc3OSwiZXhwIjoxNzQ4ODkzNzc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.SEkHfYQKcTclofdoR2ZJiTRhJmhbQJhZ_AH0dqrdUvI'),(490,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgxZWNkYTU0LTg3NDQtNDM3YS1hNDdmLWMzOTM1ZWE1OTI5NCIsImlhdCI6MTc0ODY3Nzg0NiwiZXhwIjoxNzQ4ODkzODQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZjVDCCzoMMEqOHBfqbLIhoZ3MB9PIBV-c6Ul21YFffg'),(491,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAyNTFlMjZmLWY2NjEtNDRkNy1iOGM2LTA3MGJmODE1NDQzMSIsImlhdCI6MTc0ODY3ODQ5NiwiZXhwIjoxNzQ4ODk0NDk2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.DgcF7flZBiJohqyssbs2i4vFG5NiYtzyTXScpP4jUyM'),(492,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU0ZDJiNWIwLWJiNjAtNDQzNC05NGNhLTJmZTkwNDZjZmFjZCIsImlhdCI6MTc0ODY3OTYzOSwiZXhwIjoxNzQ4ODk1NjM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lWxKR-GTTHNTu4pWwCAZV17SW7n61v4fc7MsytT5A-M'),(493,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFmNDQ2N2E1LWU4NmQtNGNlNS1hNDE4LWIxNzg3MmRkMGZjOSIsImlhdCI6MTc0ODY4MDMyMiwiZXhwIjoxNzQ4ODk2MzIyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.y9TWJ2XD1eiGGqE8Ivtg2CWJ_WMRw0pE3vG49M1hizw'),(494,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI0NGNmMmJlLThlMWUtNGM3Ny1hY2Y0LTMwYzQwNGI2ZTRiNiIsImlhdCI6MTc0ODY4MDY5OCwiZXhwIjoxNzQ4ODk2Njk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2bPfB9yn8_FaU_iTAyfzyWoA_CLsvIssBe8m79Mkym0'),(495,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUxNzdhMDgzLTYyOWQtNDk3Mi1iNDRlLWM2ZDlhNDU2NTI4NSIsImlhdCI6MTc0ODY4MjI2NSwiZXhwIjoxNzQ4ODk4MjY1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.NQAwvdiYE0ff_JrkUwuB1aeWakB6ydyplg-q8oxO8PI'),(496,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE4YjJjMGYwLTA0ODQtNGRmNi1hMTkyLTJjNWViOTc5MzljYSIsImlhdCI6MTc0ODY4NDkyMCwiZXhwIjoxNzQ4OTAwOTIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-gmMgs2LoCXb-RigeiIp_aIGiPFMWrtsMgzgMK9FBfY'),(497,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU1YzY1ODJmLWJhNmUtNGRkNS04MjMzLWYxMTQ5NWUzYjRlNyIsImlhdCI6MTc0ODY4NDk3MSwiZXhwIjoxNzQ4OTAwOTcxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.G6_4LgbxI55NQ9-JEDbtdvLRp2Xe58U2jwbdGvc9v-Y'),(498,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3NGU2MzQ0LWRmM2EtNGQ1MS05ZTA0LWVjYjA4ZDdjNDNjMCIsImlhdCI6MTc0ODY4NTAyMCwiZXhwIjoxNzQ4OTAxMDIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-0ksUdWMP6lGeX9RvyatUEfYWiaHYYkSdtgLMeOetIg'),(499,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhNzFkMGVlLTcxZTYtNDEzMS05ODA5LWM0YTFiYTE5YmFiZiIsImlhdCI6MTc0ODY4NTEzOCwiZXhwIjoxNzQ4OTAxMTM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.35mPX3WwDFK65BM_2U6KzOULtINAgsSgvYSI6x-dU1I'),(500,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZhMWQ5ZTNlLWJmMzctNDVjOS05MDNiLTgwYjc3NDRiYjMwNiIsImlhdCI6MTc0ODY4NTE1NiwiZXhwIjoxNzQ4OTAxMTU2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.E1_zXthfHkd-vNF0FmQLstC1tPO3Kb2uJYmiyfsLvP8'),(501,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMzZjUyYTQ0LTZhN2MtNDdiMy1iZTIwLWFiMmU3ZmZiNGNkZCIsImlhdCI6MTc0ODY4NTU0MywiZXhwIjoxNzQ4OTAxNTQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iU3YURpxt8fG2FVhtKCGIgA4ZteQ6MIBRBaCwqieXlg'),(502,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY4ZjI0MDUwLTEzOGYtNDE3Mi04ODFiLWQyYWQwMTI3NGIzYiIsImlhdCI6MTc0ODY4NTU2MSwiZXhwIjoxNzQ4OTAxNTYxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uw42_U3lvk9ihfdsDvnSxbEJxtMSNO5VnWUi8yTY2Sk'),(503,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEzYzYwMzM4LWRlNTktNGFkNC05YWYyLTFjNGI5ZDMzZWQxYyIsImlhdCI6MTc0ODY4NTY1NiwiZXhwIjoxNzQ4OTAxNjU2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.LhnxT3TexBbie2sBsIuHvmguQ-qLxnQ24IofM-IPjvs'),(504,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY3OTZmYTcxLTkyZTAtNGFkMC05MWY3LWYzNDZmYjk1OThlNyIsImlhdCI6MTc0ODY4NTY2NSwiZXhwIjoxNzQ4OTAxNjY1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.V5UkCfhd-9K3V8DuWPZ28Mm0O30bI0OTal4XEfvuwIM'),(505,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVhYWExYWQ4LWU2NzQtNDc5ZS1iNThhLWVjYjZjYTIzMzVkMSIsImlhdCI6MTc0ODY4NTY3NiwiZXhwIjoxNzQ4OTAxNjc2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.R0OdWKpkBphPRItcxmNX2_1VkqiLPF3t3SvZRu2jCd4'),(506,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMxNDg0MDJlLTAzYTUtNDNlNy1hODk0LThhZGY5OGExNWEwNSIsImlhdCI6MTc0ODY4NTc4NCwiZXhwIjoxNzQ4OTAxNzg0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QAPV5pcopb5PwoUMhSU_Sdlp8Z-ocnjmDHQCTpDTgTI'),(507,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY4OTUzMjhhLTBmN2ItNGU1YS04MDA0LTA0Yjk3MWY4NDZlYiIsImlhdCI6MTc0ODY4NTgwOSwiZXhwIjoxNzQ4OTAxODA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZLE6OHjjXd-wjLh_USRX2CUKIX8J7WiLju7yMhNf7gA'),(508,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg5NmM4Y2QxLTM2MTctNDUyMS1hOWUyLTlmZjQ0NWQ1NzM0OSIsImlhdCI6MTc0ODY4NTg0MCwiZXhwIjoxNzQ4OTAxODQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.u2Z7qGlIOwsYGEiSCcjE3hWsO5V1PVDbjQhjHpqA4So'),(509,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBkOTYwOWNjLTE5MTYtNDQzZS04YjlhLTgwYzM5NmNkZTFhOCIsImlhdCI6MTc0ODY4NTg3OSwiZXhwIjoxNzQ4OTAxODc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.NDRqsbmyIWKmUbjcz0pPu5qNRZ8leflxTah4oGPI2Fc'),(510,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEwYWRlNTRkLWY3YWItNDkwNS1hZTIzLTQwNmJiNDE3N2Y2YiIsImlhdCI6MTc0ODY4NTkxMSwiZXhwIjoxNzQ4OTAxOTExLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1bavWFjkaFTUflOylxjFb22d-Jw9qvGelegGwNiTs0s'),(511,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRkMjE2NjBhLWM0ODgtNDE0Zi05NGUxLWE2NWZjODIwMTQwMyIsImlhdCI6MTc0ODY4NjM3NywiZXhwIjoxNzQ4OTAyMzc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.RAi7CxCOEp0bhdsHvPWfhJqELGwTtMeap3M5X68055U'),(512,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg3NmFhOWY0LTQ1NjMtNDU1Ny04NzdhLTgxZjczMmMyNTUyOSIsImlhdCI6MTc0ODY4NjM4OCwiZXhwIjoxNzQ4OTAyMzg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.oYRhnPOPA0RzRKgWIDmOA8I9d7uw3fMXAdaSTSvIKdw'),(513,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdkYzEyZTllLWQxNWItNDM1Mi1hOTI0LWFkNGE1NzkwZDE3OSIsImlhdCI6MTc0ODY4NjQyMSwiZXhwIjoxNzQ4OTAyNDIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0MDnvq2UW0mtQZdz4FjxXY689xsSPDGYsUSoqAKPchc'),(514,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkyYWMxOWE1LWU1ZmItNDljNC04ZmFkLWE0ZTcxOGRkN2MxMCIsImlhdCI6MTc0ODY4NjQ2NSwiZXhwIjoxNzQ4OTAyNDY1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZU60c_TLQQf6t22f33oPu7xHDcLiy2TzEnZ7W3RehI8'),(515,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJmNDE2MTRlLThhZGEtNDYwYi05ZWJjLWRlYjRhMDIwMjJhYyIsImlhdCI6MTc0ODY4OTM3OSwiZXhwIjoxNzQ4OTA1Mzc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.YOjT3syw6ZHZDB4tILysNnQ5rrT9bOrMiLnzT3iyijI'),(516,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk3YjI5OTQ3LWQ2MDAtNGUyMi05Y2YzLWZmZTRkMGVkN2M3NCIsImlhdCI6MTc0ODY4OTc1MywiZXhwIjoxNzQ4OTA1NzUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Tw-OIrAMYQORu-q-agRVQufZnD65sA_y06wDeRCbxVE'),(517,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBiZTRhOTk0LWVmZjktNGFiZC1iOWRjLWM0MDA1YTRhNzNmZiIsImlhdCI6MTc0ODY5MDk0MCwiZXhwIjoxNzQ4OTA2OTQwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dGw5r-8YzgonscPbD2Jt6oF3hBvhU0nKb9zzvOWdvco'),(518,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJiZTgxMmUzLWM2NjAtNDZkMS04ZjUzLWM1NTRiZWVhZjYxNiIsImlhdCI6MTc0ODY5MTk2NywiZXhwIjoxNzQ4OTA3OTY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QoB0VyhDWdL0NS0-of8x8WjTq3M12v7tWfktiiRTb1o'),(519,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIzNDZiMzBlLTY1NTYtNDRiOC1hNjgxLTZmNzg5MGYyMDdkYiIsImlhdCI6MTc0ODY5NzA3MCwiZXhwIjoxNzQ4OTEzMDcwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ClVJ7-Qsyb2ywiWxXQKm6K7xBZ531cgO1BSYr1lGXeE'),(520,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZjNjI4YWQxLTMwZjItNGMyNC1hMDQ2LWRlOGZhOTRkNWE3NyIsImlhdCI6MTc0ODY5NzI1MCwiZXhwIjoxNzQ4OTEzMjUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6jW32Bss0h6HK6quvJ04pZro3-siFDtqnjKv8Up3Jts'),(521,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM2NmQ4MGU0LTc5NjgtNDk1YS1hNTJjLTFmZDI2ZDRkYzljNiIsImlhdCI6MTc0ODY5ODA0NiwiZXhwIjoxNzQ4OTE0MDQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.TkEZmohBaPIqhY_H4-12SrJToIiidv0V7oS1jF4DBH4'),(522,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUxNDNiNTM2LWE3ZDEtNDAzNS1iNzExLTJmOGQ4N2IzNDQ2NCIsImlhdCI6MTc0ODY5ODMyMCwiZXhwIjoxNzQ4OTE0MzIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iRHr0FIPpVsAMWRObHjxzQJyJ5F0BlqJxn2pC2Vuj80'),(523,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ5ZWFlMDU1LThhOTktNDQ5ZS1hZWQzLTNkZjEwNGIxZmMyNSIsImlhdCI6MTc0ODY5ODU3NSwiZXhwIjoxNzQ4OTE0NTc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WJnQTk_wMULEzhYu1gBBWA2KGVt0IDfMoFFPt7CB62Y'),(524,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYwM2Q4YmM2LTk5Y2ItNDgyYS05ZWFlLTRjZjRhOTU1ZjdjYyIsImlhdCI6MTc0ODY5ODc2OSwiZXhwIjoxNzQ4OTE0NzY5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6BUWQluVBmZW6ZBYJrWMW9u7NPv4264QSF8gzbUvUAw'),(525,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMyYzZjY2JjLWY2ZTEtNDE4Ny1iYmYxLTZjNDUyODJlYzdmMSIsImlhdCI6MTc0ODY5OTIwOCwiZXhwIjoxNzQ4OTE1MjA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.IRiVI3plua4LsR87tA9bMyGiJZbI6MyHgHZK4MvRN4A'),(526,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA1ODdhZjljLWI5OTItNDJjYy1hMzg5LWJkOWEzMzQ0N2RjYiIsImlhdCI6MTc0ODY5OTQ5MywiZXhwIjoxNzQ4OTE1NDkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.rVQf2SOoCW38hQW55qNFtIwgBOhQekm-4ckkZuNFLxQ'),(527,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJiYWYyZGRhLWM1ZGItNDJjMS04YzA0LTcxOTlhNjk2ZjM4NyIsImlhdCI6MTc0ODY5OTUxOSwiZXhwIjoxNzQ4OTE1NTE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.37OkYudY81Xn8mac_3Tj8YbQgNTwyXe_2UQ87oIz3ow'),(528,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMyNTAzNTBiLTdhMDItNDc5Zi04YTJiLWQyNzVhZTI4MzEwMSIsImlhdCI6MTc0ODY5OTUzMCwiZXhwIjoxNzQ4OTE1NTMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Jij1trtVYThBzR_qwqXKv8hS3_6SYJChGp5S_XnlBHU'),(529,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjViMTEyMzI4LTJlN2YtNDA4Ni1iMzc5LWY4NDdiYmJmMTNmMyIsImlhdCI6MTc0ODY5OTczMCwiZXhwIjoxNzQ4OTE1NzMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.AqrNjNO2ChjFIsiWuLPys7_0sF45ZRzCb5CYKgfY0Sw'),(530,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJjNjBlMTU3LTkyMzItNDBhOC04MjkwLTMyOTQ0NzU4YzY2OSIsImlhdCI6MTc0ODcwMDM4NSwiZXhwIjoxNzQ4OTE2Mzg1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.bAZkGzmjW8Dmc8sIgB4f8Un6Pr8XyI8DESaG2WSR-E0'),(531,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRjZmExMGRjLTY2MzQtNDJhZi1hZGE1LWYzZDBmMjVjMzVhMiIsImlhdCI6MTc0ODcwMDY5MSwiZXhwIjoxNzQ4OTE2NjkxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.AampyFmNVKaJNfRdBt9qvjggiGbxZlHNMO-tkl3xLZg'),(532,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZlMDQ3MDZmLTU0YWQtNDQ1MS04YmFkLWM4MDE3NWMxYWUwYiIsImlhdCI6MTc0ODcwMTY0MiwiZXhwIjoxNzQ4OTE3NjQyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.FjOnR4-ne6kArzYUvtZUhLotxJVRrzFOG6MNIpaLdbw'),(533,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM0OTNlMTQ1LTUwNmYtNGQ1NS1hZjliLTkxZmNkMDU5OTQ1NyIsImlhdCI6MTc0ODcwMTY5MywiZXhwIjoxNzQ4OTE3NjkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.HcDlJIs-nPAFYPP3xesbiI0oABIhY2wGbVOOI_bRflM'),(534,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRlM2ViYzY4LWQzYjktNGIxZC05ZTJkLTcwMTNjMTY3OGEzOSIsImlhdCI6MTc0ODcwMjE1MiwiZXhwIjoxNzQ4OTE4MTUyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.pAMzzGnkxyRLIZ5fTjIU0SFVWHQi-edCFLAVfxaKzXE'),(535,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY0ODYxOWUwLWYyYzYtNGI5Ni1iOTYwLTE1ZjAwMjE1Y2YzZCIsImlhdCI6MTc0ODcwMjIzNywiZXhwIjoxNzQ4OTE4MjM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7dfKL_WFriOid2bjuGjpiNZb-l1x0veZ5BY49HLDMZ4'),(536,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYxMmEzNGRhLTk4ZjMtNGExYy04NjYwLTQyODIxMGQ5NWEzYSIsImlhdCI6MTc0ODcwMzAyMSwiZXhwIjoxNzQ4OTE5MDIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6Q1HHl3mGGY-qmuF1ybtAuYPPuapGober4pGmQzNADI'),(537,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkNzYwNzUwLTNhMjctNDdhOC05NWYyLWFjOTZjYTlmMzQ3YSIsImlhdCI6MTc0ODcwMzA5NywiZXhwIjoxNzQ4OTE5MDk3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iG0_1xbX-EIlIUZPvF50A6blap-ISr4k0LOOEe7HjV0'),(538,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE3MDU0NTk3LWY4MjYtNDM5ZS1iNDQzLWRjY2I3MWQ1YzNiNCIsImlhdCI6MTc0ODcwMzMzMCwiZXhwIjoxNzQ4OTE5MzMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.N8G7LFwi5CfaXYxauiLjw_KNXWMQtErk93ykI81Paug'),(539,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhkOGQxZWE5LTRmMWItNGIzYy05OTQ5LTgwNmEzNTljYTc2MSIsImlhdCI6MTc0ODcwNDEwMSwiZXhwIjoxNzQ4OTIwMTAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.EaEaLi8o8nBWgDFy_r97XTj9ayw--rbsfVNO0WkDX78'),(540,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyMWY0YjFhLWE2MDQtNGE1Ni04ZjA0LTgwMGRiOTMyYmE2NyIsImlhdCI6MTc0ODcwNDE2MiwiZXhwIjoxNzQ4OTIwMTYyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kJiyUDgshGa2vQRPCFMpj-oQ19mIqSLS4_RWKiAW8l8'),(541,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQxNjRhOWE0LWM4OTgtNDM1My05OTY3LTU1ODMyN2I4OWIyZSIsImlhdCI6MTc0ODcwNDE5MiwiZXhwIjoxNzQ4OTIwMTkyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3Zv2Mw4esnmUh-phXu_OUEdNotl84Z4QDoOsJ1sP8yc'),(542,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZkMDE0NDE4LTI1YTItNGFkZi1iOWY5LWU3ZTk1MjZjNGEyMyIsImlhdCI6MTc0ODcwNDIxNywiZXhwIjoxNzQ4OTIwMjE3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.GG6UCSf5TA_C3dFf3T6KLD5_mCpHLuCbMIXV6qHWerY'),(543,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIyYjNlMmM3LWZhYjAtNDVmNi1iYWUxLTc2YjU5MmRlMzIzYiIsImlhdCI6MTc0ODcwNDU4MiwiZXhwIjoxNzQ4OTIwNTgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.rUTfW1JlR6gN6eyxpDGxiT1b0lKxZgBTi5EIny1OjOo'),(544,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ1ODNmOGNlLWE2MTMtNDc2YS1iYmI4LTM0MTkwMTdmODM2ZiIsImlhdCI6MTc0ODcwNDc1NSwiZXhwIjoxNzQ4OTIwNzU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.xMqagmyZ0gKoW3_EzE6l9ejzuoVKbvTONV7jpvKZPzM'),(545,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRlZWY1YjcwLTlhOGUtNDc3MS1iZDc4LTAxYWI0ZTIzOThhMCIsImlhdCI6MTc0ODcwNDc5OCwiZXhwIjoxNzQ4OTIwNzk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.HQHZD4scxTO14SasfvOZaflLAjnIgLSyPFwFFtw2Yco'),(546,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBmYzVlM2E4LTA1MmItNGMwYy04NzFmLTU0MWMyYjI0NzFjNCIsImlhdCI6MTc0ODcwNDg3NywiZXhwIjoxNzQ4OTIwODc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9CtzCcBp3UOUPb6YwMb5XGjVZEbmoEGNl7VUk177RNY'),(547,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3ZjI3NzZjLTI2MzEtNGQzMi1hOGQ3LTJhZjA3OWQyZTY4ZiIsImlhdCI6MTc0ODcwNDk1MiwiZXhwIjoxNzQ4OTIwOTUyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lZTjT3Tf9bfadZ0-Lxd9Rrj6PmW61tKj0EViWLKJjho'),(548,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI1MjAzYjViLTZkYTgtNDQ3Mi05Nzg1LTNiOWVhZDA3M2U3ZCIsImlhdCI6MTc0ODcwNTQ4OSwiZXhwIjoxNzQ4OTIxNDg5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ucg9XWteNe1xuXOkbmltdWlKcylPVyeaWM5Ur8hCmUs'),(549,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk2OGUxNmQ2LTU4NzktNGZjNy04YThiLTcyOGUwNWM3NGFhMyIsImlhdCI6MTc0ODcwNTYwOSwiZXhwIjoxNzQ4OTIxNjA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VZrOjJx8I05C6M0I1zuJIneJhTEEbl0S74Sje5ouACU'),(550,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRmMGZmYTk1LTM2MjgtNGY2Zi1hOWExLTY0OGU3NDM0OWJjYSIsImlhdCI6MTc0ODcwNTY0OCwiZXhwIjoxNzQ4OTIxNjQ4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ta_QmDzDSYmSpqPc0YTsbCCjO-7EbKxan3_FHDwSHws'),(551,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYyYmQwNzk1LWJjNGUtNGY1ZC05YmM2LWJiY2FkZDFjMmNlNSIsImlhdCI6MTc0ODcwNTk3NSwiZXhwIjoxNzQ4OTIxOTc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WSaV-f9CDy0xxW2P_2dRg-gdrAfMrGRKgl6zaaSVzkc'),(552,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUzNzBmN2Q5LTFiMDctNDcxMS1iMzNlLTI4YmExYjMyNzczOCIsImlhdCI6MTc0ODc1MDk1NSwiZXhwIjoxNzQ4OTY2OTU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.b7gTm0Lagn79qxQKe9n_zZStQq2DWMssSSrceI-hsEc'),(553,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjcyM2JlMzBiLTk5MzMtNDk0Mi1hODZkLTFiZDdkMGIzYzViZCIsImlhdCI6MTc0ODc1MTczNSwiZXhwIjoxNzQ4OTY3NzM1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hsQYcAXlkKoncqMJ_Y_jH6DBHpVeoOXuRWvnb8Ab1ec'),(554,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVmOGFmNGQ2LTFkMjItNDcxMy1hOTIyLTU5Njk2OWRiODJhOCIsImlhdCI6MTc0ODc1MTg2MywiZXhwIjoxNzQ4OTY3ODYzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cJzwGuMegRciP4ii2P_sWUQc7Uct9bOyEQRq_uJDbus'),(555,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlmMmM5Yzg1LWMyOTUtNDliYi1hZDQ3LWNmNjZkZTAwZjI5OSIsImlhdCI6MTc0ODc1MjM0MywiZXhwIjoxNzQ4OTY4MzQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.8skU0bPuqmEQ-lT2yiJiCVFA9ZAfV9ePTmNPJI0kbcU'),(556,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBkMDQ3MDVmLTM2MjQtNDhlYy1hZmI4LTQ2NGQyZGY4ZGI3YiIsImlhdCI6MTc0ODc1MjQyNSwiZXhwIjoxNzQ4OTY4NDI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kMMXZWw7fS7olvsas4yYQJJbyCYk2HQhVGNVyw8Fs8M'),(557,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmZDkyNzFhLTVmNDYtNDUzOC1hNjZkLTE1NmIzYThlOWNkMSIsImlhdCI6MTc0ODc1MjU0OSwiZXhwIjoxNzQ4OTY4NTQ5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yaHBg-ufJMEb5fCl0Kv0UO1ekeSYq9tztwgkVJkE-Ew'),(558,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM5YzQzOTkzLTdjMzQtNDgyZi1iMjAwLWFmZTkyZjFmNmZhOSIsImlhdCI6MTc0ODc1Mjk5NiwiZXhwIjoxNzQ4OTY4OTk2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.dNVQJhPFxju0YVAOH90ECPkufajjcPbJTTbxwfjki5E'),(559,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM4YmQxMzEyLTNjNzEtNGMzNy04MmI3LTFlZDA4ZmIyNmIzMyIsImlhdCI6MTc0ODc1MzExMiwiZXhwIjoxNzQ4OTY5MTEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.M0as_ZjG7J13dtJhOJSvYaaAgPb1exEL1ts3CLnUBz4'),(560,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJiYjljOWQ3LTEwNzktNDI0OC1iM2I1LWViNGMwYTY0OTdkMyIsImlhdCI6MTc0ODc1MzE2OSwiZXhwIjoxNzQ4OTY5MTY5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.45WCbUoJEqqAsHnYQZnoTJ0LlEFYEpitZcIWB3Ye4R0'),(561,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNhMzRlNDVlLWFiYzctNDQxNy04NGQ1LTFlNjQ0ZjZjNWMxNiIsImlhdCI6MTc0ODc1MzM3NywiZXhwIjoxNzQ4OTY5Mzc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yhWlK8N9HlzLKYkCRlBAbZBa8QbaiUZ9nTkVWjlXCV0'),(562,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE1MGMwNmExLTA1NmItNDFhNi05Mzc5LTljNTNlMmIyZDA2MiIsImlhdCI6MTc0ODc1MzQzMCwiZXhwIjoxNzQ4OTY5NDMwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.fiZB8Ln6SQvnfAvjEL79yRqpXhkfSZL-23PO5hxXUXg'),(563,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU5MjRmNTdmLTVlOWEtNDJkMi1iOTJiLTI3YjhlZGE1ZjJlYyIsImlhdCI6MTc0ODc1MzU1OCwiZXhwIjoxNzQ4OTY5NTU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.YrgzRJNlYbWFL12YuM4Yo2Cq7gZIhOonG15A53-oBh0'),(564,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVmNGU3NTkxLTBmYjktNDIzNi1iMTcyLThjZjZmYzMxOTA2OSIsImlhdCI6MTc0ODc1Mzk3MywiZXhwIjoxNzQ4OTY5OTczLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QpFM2Zgwmg2uXysKouj4VJFuvXNc2h8AcXrZ6GHEFDY'),(565,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZkZTJkYmE2LTFkYTMtNGZhZi1iZTcyLWJjYWFkNWY3YjE5ZiIsImlhdCI6MTc0ODc1NDA5NSwiZXhwIjoxNzQ4OTcwMDk1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.E8Ed14uqsPsJ139NRFZaKjgqWpHiRXRt30W95wOUZQU'),(566,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmNmY0ZWU1LTZmOTMtNGY4NC1iN2RjLTEzZTg5OWVlMDk3YyIsImlhdCI6MTc0ODc1NDQ2NCwiZXhwIjoxNzQ4OTcwNDY0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wswQZcD0h8_ZCu7mQ4PCiFJ1PP3y5aBUQNYfEfhMe1M'),(567,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU3OTg5MGEzLWZiMjctNDM0MC1iYWM5LTc5ODA0MmI5ZjUzMyIsImlhdCI6MTc0ODc1NDc3MiwiZXhwIjoxNzQ4OTcwNzcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vk_w_ZvHz9rM4G_txn5QF1Eq-v3WJ4FAsmQ2--H0NJo'),(568,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0NDMwZDU5LWRkOTQtNGY4Ni04NGY3LWU5NTJkNmU3NGNiMCIsImlhdCI6MTc0ODc1NTkxOCwiZXhwIjoxNzQ4OTcxOTE4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.GuJg9vkpdCS0yzkdDawhXqurgmZKy9DhfJuhacG5lUE'),(569,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgwZDAyNzBlLTExNzAtNDQwYi04MGYxLTY1YTBjNjZjMTQ5ZCIsImlhdCI6MTc0ODc1NjU0NCwiZXhwIjoxNzQ4OTcyNTQ0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cIqHjFDBXCYb_7dK8BAk7ZR-DaXoCXqO80VGL-zVMjs'),(570,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ3MjVhMDcwLTkxMWYtNDgwMS1hMmQyLWUxODk1NDMxMjhiMiIsImlhdCI6MTc0ODc1NzIwOCwiZXhwIjoxNzQ4OTczMjA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0X1IJweRpjwEIBJIfWmqWwiWl37Bwy7ZyPHNiBKYdAA'),(571,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRiNjkzOWU5LWQ5ZDktNGFlZC04ZTg3LTY0MWU4MDZmZWM5YSIsImlhdCI6MTc0ODc1NzU5NCwiZXhwIjoxNzQ4OTczNTk0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vjaUv4ooGF-0lQBKQ4Hpio2WYPnvrz9IXez7FBG2k5M'),(572,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI0ODY3YTJjLWY1YmMtNDZiNC1hNGQ2LTZhMWVjNTJhOTJhYSIsImlhdCI6MTc0ODc1Nzc0NywiZXhwIjoxNzQ4OTczNzQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hfsYnzlZjSUm3Ljdh3mV2_SMbw9FpbgXcNKHjrXKtK8'),(573,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlmOWU0ODc5LTA2YjctNDBiOC1iYjA0LTc2Y2JlNzk4YWJmMiIsImlhdCI6MTc0ODc1Nzc2NywiZXhwIjoxNzQ4OTczNzY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.LWVTUSM5UiA1IE7usIwgytGUkNoZzbt7DNjy63SJ1p0'),(574,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdmMDhiNWNjLTk5NDQtNGQ2MS04Mzk4LWEwYjg3NGVlODFjZSIsImlhdCI6MTc0ODc1Nzk1NSwiZXhwIjoxNzQ4OTczOTU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0xBdTab8YZglcFm2HJXqMahO9F2oDwxPdmutSL8AJnM'),(575,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjUzNjJlZTRmLTMxMjQtNGFkNi1iMDU2LWFiMDRlNzJhNDgxNyIsImlhdCI6MTc0ODc1OTUyOSwiZXhwIjoxNzQ4OTc1NTI5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Tu3VqZp_JixZAgJhWP3KXPsGL5B9YokngqpTjRm1IO8'),(576,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkZWZkZGYwLWFjZGUtNDNlMS05NmRjLTI1OTQ5ZmNmNWVhMCIsImlhdCI6MTc0ODc1OTkzNywiZXhwIjoxNzQ4OTc1OTM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.mRnF4yRpglSQzl_beUbtjdDBOXdlvnXQ17x5YcXPO2Y'),(577,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ0YzQ2Zjk3LWM5M2YtNGE2Ny04ZDJiLWVhYmU5NjAyNjdhYiIsImlhdCI6MTc0ODc2MDU4MiwiZXhwIjoxNzQ4OTc2NTgyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6KiRp_zU6DZtwlCtEZeLQpAZ7ilVhB-b-X9cUilcHnk'),(578,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY4MmIzNzEwLTc4NzItNGY3MC1iNjUzLWJlZjg0MzU1ZTI4ZCIsImlhdCI6MTc0ODc2MDY0NiwiZXhwIjoxNzQ4OTc2NjQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.l9W5IHLLaQYcfAUkWoflt2R7W2qblwB0JR752fFmxKY'),(579,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmNzc4MmVhLTFjYTAtNDIzNC05MTgyLTY3YzY1YmEzNzU3NyIsImlhdCI6MTc0ODc2MDc5MCwiZXhwIjoxNzQ4OTc2NzkwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jr1OwpJr_NRitjYvUEPw2kAZeKQx3HFR2-eg2w-UXZI'),(580,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjljY2FhOGY0LTdmNzQtNDJmYS1iZGQ0LTYzMTBhNjlkNGUxZCIsImlhdCI6MTc0ODk1OTQwNSwiZXhwIjoxNzQ5MTc1NDA1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wkkfQbqVWHjPPLklaeuSlmedi7rG46lhXkBE2OID9Fc'),(581,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRmOTA3NWRhLTcyNmItNDNiZC1hMGUxLTgxOTExNzgxMDVmMyIsImlhdCI6MTc0ODk1OTQyMSwiZXhwIjoxNzQ5MTc1NDIxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yZOuwmqJdnvo40z2aUlun1XD3lNsfeo_rirWpwZY13c'),(582,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA4YjlmMDU4LWQ5OGEtNDgxNi04YTQzLTI0ZDE5NTJjZmE0NiIsImlhdCI6MTc0OTY0ODEwMSwiZXhwIjoxNzQ5ODY0MTAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kDnG_XXq-kDFC1hAWUmbE-NUGc9Ka6_UPKzzvt2LJc4'),(583,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU3YWNmZjc0LWJkY2ItNGNmNy1iOTlmLTJlZDlhZmM1ZmJiMiIsImlhdCI6MTc0OTY0ODE1OSwiZXhwIjoxNzQ5ODY0MTU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1-VlxKqBIL9enYO490OqbBZk5d2rnlxhZ5ChBEE-nTc'),(584,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRmNzdiYTdlLTExMmEtNDFiYi04OTI2LTUxNTZjZmY3ODYyZSIsImlhdCI6MTc0OTY0OTk4NywiZXhwIjoxNzQ5ODY1OTg3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.q9sQDUwb4HTVOHkdszMTJpxtnor1iqZ9pwYtsODA9f8'),(585,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY1MzI0YWZkLTY3ZDQtNDBkMi04MzU2LWUxNjRjN2FmOTY0MyIsImlhdCI6MTc0OTY1MDEzNywiZXhwIjoxNzQ5ODY2MTM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.io-0RAT74jw7Deh2JymYrNrs60KO0T_WNG1YMkYc2TM'),(586,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc4ZTQ2MGViLWVkOGUtNDBiYy1hYzY5LWJjOGRhMzNiOWNkNSIsImlhdCI6MTc0OTY1MDI3MiwiZXhwIjoxNzQ5ODY2MjcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4HjZjyb17q1ZjzqpO3me_CUMGP8UK1evE1hjNhJPaWQ'),(587,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU0OTE4OWJmLTkzNWUtNDM3ZC1iMDdjLTFlNDJjNzZmY2VmZiIsImlhdCI6MTc0OTY1MDQ2NiwiZXhwIjoxNzQ5ODY2NDY2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.NPV32vNm1X1eMIxSoE-SznRfQ27ca-et9aTJ34H3FCU'),(588,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJkYThmYTlkLTQxNjctNDVjYy05Mzg2LThjY2Y3ZjQ1NmY4MCIsImlhdCI6MTc0OTY1MDUyOCwiZXhwIjoxNzQ5ODY2NTI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.OD0KfccigF7k4H1ULyzwJjxUdgL2BIp278L7tDq0lU4'),(589,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkzZjlhM2VlLTljZjktNGYyZC1hNDk4LTFhZmEyYzE1ZjBiMyIsImlhdCI6MTc0OTY1MDU1NCwiZXhwIjoxNzQ5ODY2NTU0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.JhXOTqUrA1wWzIRkXtVSr8br3E3U-g3KswttLrLQTmE'),(590,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUxNjU5Njk1LTQwNDktNGMxMS1hODI0LWRhNzAwMTQ5ZGI5NCIsImlhdCI6MTc0OTY1MDY1NSwiZXhwIjoxNzQ5ODY2NjU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.9OVYhaypO6ub8yWG8fT_rXLgkd9U95L7t1kj5ct21Pc'),(591,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVhMDEyNTQzLTIzMTAtNDU2Yi04MzllLTdiNWI0MDdkYTg0NCIsImlhdCI6MTc0OTY1MDgxMCwiZXhwIjoxNzQ5ODY2ODEwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.e3uTGO7exltEdpoLj-f3P-tPjLQHATf2ta5-P2cwUAQ'),(592,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZkNjM4M2E0LTk0NjMtNGYzNS05ZTU2LTllN2UzNmJhNzc0YiIsImlhdCI6MTc0OTY1MTYyNSwiZXhwIjoxNzQ5ODY3NjI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.p-ywsBzlacBc5gNT9WpzF4wKeqWVF-7MuSHDlGGk8Ds'),(593,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAyMjYyOWE3LTlmZDQtNDUyMS04NjNmLTRiZjYyNGZiZTI0MCIsImlhdCI6MTc0OTY1MTY0MywiZXhwIjoxNzQ5ODY3NjQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-_Fh38k5tqZ4puDPgRqp-QTrw1E3uJKlxiL6dHBvHVk'),(594,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMwOTk0NWI4LWI1NTAtNGQ4Yi1iYzI5LTBhNDYyNjkwNjZkYSIsImlhdCI6MTc0OTY1MzYyMywiZXhwIjoxNzQ5ODY5NjIzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2T8Cun8m-lFz94YTc53ZP7CempFcFGa1ck6yO2CdeDs'),(595,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjMwNjhmOGI4LWZmNjctNDBmNy1hYTJmLWRhYTY2OGE0MzMwMCIsImlhdCI6MTc0OTY1MzcwMCwiZXhwIjoxNzQ5ODY5NzAwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.09W2dde39ou_wxt5PyEdYyNw4Xuh4JfHZTyoVBTlCBs'),(596,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjViY2Q4NGI1LWI1ZTItNDM1Ni1hMTQ3LTA4NDE4OGEyNzQ0NCIsImlhdCI6MTc0OTY1NDkwMywiZXhwIjoxNzQ5ODcwOTAzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.87Q0jMaHHHpuxhhRXc82QfRN-hg5VwIizqq-y42B3qQ'),(597,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVmYTZmNjk3LTkwYjAtNDg2ZS04ZTc1LTRmMTFmNjMwMWViMiIsImlhdCI6MTc0OTY1NTYzNywiZXhwIjoxNzQ5ODcxNjM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.DSHd8ANUhUaScoaRYhFMUbdiKoNMalRK6jGNfSkWmXk'),(598,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI0MTI3YThlLWQ3N2ItNGRiNS1iNzQxLWIwMWExMjNhYzZmOCIsImlhdCI6MTc0OTY1NTY3NywiZXhwIjoxNzQ5ODcxNjc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.q_Lr4r6oH2XCr5RfHnI3yLL9A8wifkZQavDV7WRVKns'),(599,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhiYjg0MDhiLWFjOWMtNDdmNy05OTI0LTAwZDQ5ZGRlMmVlYiIsImlhdCI6MTc0OTY1NTgxOCwiZXhwIjoxNzQ5ODcxODE4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.QI3uhKzPhIJt5_I5r8fHJt0wdJWSq7Pvk8vOIFai-50'),(600,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVjNjkzZGE0LTE1NmMtNDc2Zi04Yzc0LTU0ZGRlZDAyODJlZiIsImlhdCI6MTc0OTY1NjAzNiwiZXhwIjoxNzQ5ODcyMDM2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.O7ox2wBHEyEOkG_wz-Ngo2LdjMAoHYwkMSYOm3NooJo'),(601,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVlMTUxNmE2LWE2YTgtNGRhOS04MTU3LWM2ZjlkZDgyMmFjZSIsImlhdCI6MTc0OTY1NjE4OCwiZXhwIjoxNzQ5ODcyMTg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XIOyYhLeIzqYB5eHC8q-Oc5AcJEPfZEA-uuVy9I0zGQ'),(602,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVjZGE0Yzc4LTQ3NjgtNDE4NC05M2EyLWU5ZmUyOThkMzk2MSIsImlhdCI6MTc0OTY1Nzc0MSwiZXhwIjoxNzQ5ODczNzQxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.y5iz2SmU8D0b482q7Do8Pw2vGMuXpASLPaKrwegqfdI'),(603,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ4OWY2YTJkLTc2MTMtNGY1NC1iNDg1LTljNmUzNzllODM4YyIsImlhdCI6MTc0OTY1Nzc3OSwiZXhwIjoxNzQ5ODczNzc5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.OMBOVyczXBjgX1OkpcSLf7eY65wJn4oA0zZhPxpv9eo'),(604,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVmNjQ3YzFkLWE1OTMtNGRmZS05ODYzLWZhODk3YmY5NGE1MiIsImlhdCI6MTc0OTczNjMwMCwiZXhwIjoxNzQ5OTUyMzAwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jV7fGyAvbTLelhE1Bia_3znlchTFu93IQXoWDIdlzhw'),(605,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFmNTg0MTQyLWNjNjktNGZkZS1iOTJlLTE5OTc0ZTBmZTY4YSIsImlhdCI6MTc0OTczNjcxMiwiZXhwIjoxNzQ5OTUyNzEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gTGSTSa2PpWcXeEpNTK0r7eotNiYdr6FLmkD1Y5vLrU'),(606,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA2NTRkMDA2LWY1YjktNDc2NC04MTZlLTAwOGFiNzBiYTc0YSIsImlhdCI6MTc0OTc0MTkyOCwiZXhwIjoxNzQ5OTU3OTI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.OeW8sRF1vszTBrcUE4jRF6FAbXF3GSLVT8Ulug6tgxs'),(607,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4NDBmYzY0LTI5NGUtNDFkYi05NjlhLWQ5N2UxNzU2ZTE5OCIsImlhdCI6MTc0OTc0MTkzMywiZXhwIjoxNzQ5OTU3OTMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zQKjBuJC13stTAZTjMzmTlQRYK52sXAqTgyvuHWGq78'),(608,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjgxYzNkM2RiLThjMjEtNDhlMi04ZTUzLTU2YTE0ZTc0Yjk1MCIsImlhdCI6MTc0OTgyODc2MiwiZXhwIjoxNzUwMDQ0NzYyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.d04ARh4gck6hFela4Kzccb-g5c8MIhbb10wKig0inq8'),(609,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyZjY0Y2QyLTYzMzAtNGNkYi04MWYyLWEyY2VjOTdmZmM1NSIsImlhdCI6MTc0OTgyOTA5NywiZXhwIjoxNzUwMDQ1MDk3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.cmPW7MffwysAKwVeM4J4B-bTCngfxlY6RGtkTmYSHIE'),(610,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJjNGFiOWExLWY2MWItNDcxOC04MTNmLTIyOTQyZTA2YWQwMiIsImlhdCI6MTc0OTgyOTQxNSwiZXhwIjoxNzUwMDQ1NDE1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VFrh7Q7_yem2vyeDlgChNB6yontgiFJxGRKPpdMW5yg'),(611,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkyODc5YWU5LWI1MGEtNDNlNi1hYzdiLTdhZDA3ZDE0NDU4YyIsImlhdCI6MTc0OTgyOTc5OCwiZXhwIjoxNzUwMDQ1Nzk4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.JiB-Ho-kGQh9Azu6Orjm5Un3T0XdbtbRo1TCBRK_2Ks'),(612,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY3ODgzN2FkLTlkZmYtNGZmMi05YTkxLWM5MmZkMGZmM2E1OSIsImlhdCI6MTc0OTgzMjA0MiwiZXhwIjoxNzUwMDQ4MDQyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.klAjNy426i00E_oDjeRJaF7gni94YoiuDM5DkjI5PD8'),(613,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY1NmE4OTQ4LTlmN2ItNGYzMy04MmZkLTM5NjVmY2I4ZDk4NSIsImlhdCI6MTc0OTg4MjYxMSwiZXhwIjoxNzUwMDk4NjExLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.galiHKL1XRzdG1dJ8wtSgITWAOVvQSbmdFdGRWBGJlI'),(614,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE5NmQ3NGFkLWZlMGItNDI3OS05MTFmLTM5OTgxNmI1Yjk5ZiIsImlhdCI6MTc0OTg4Mjg2MywiZXhwIjoxNzUwMDk4ODYzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iPcWs6Eohv-hLmLdR8wYFDf1Hy88zthxAgHXoU9QbZE'),(615,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhYjEzNDZjLTE2NDItNGQ4ZS1iZjljLTdkNTQyMzNkNmM2ZiIsImlhdCI6MTc0OTg4NDA1OCwiZXhwIjoxNzUwMTAwMDU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.t4f2I5_VF-e6f3mXka8Ottt6ho4v5opxDr0M1sF64cE'),(616,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkZjA0ZjI3LTdiODctNDg3Ny1iMjQzLTliNTliMGY4MmVlMSIsImlhdCI6MTc0OTg4NDQ1MCwiZXhwIjoxNzUwMTAwNDUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uYMf8H_2B8L5Y2Njk1k67zGYMkAtmY3aYh2iQPG9D_Y'),(617,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkMmNlNDhhLTEzNzYtNGMyYi1hY2VjLTM5ZjcxYWNkN2ZiZCIsImlhdCI6MTc0OTg4NDYyOCwiZXhwIjoxNzUwMTAwNjI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.riiW5s0G9Tib1WT5qvgs016lPIF0bJ89amF5vxw78o4'),(618,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA2ZTI0YmY5LWE3MmUtNDU4Zi1iOGU2LTViNWFiMzRhMWQ5NiIsImlhdCI6MTc0OTg4NTY2MiwiZXhwIjoxNzUwMTAxNjYyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gRDtKRmE25-bZAXJrcYDwFpVtOOa3YUC9URZ0Hn3cFE'),(619,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4ZTQ0NjM3LTI1ODEtNGEzOC04ODIxLTU3MmNlMGIyNmE2ZCIsImlhdCI6MTc0OTg4NjQzMywiZXhwIjoxNzUwMTAyNDMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.pK22oxH_PtLe0XBPqvty2rxxGRVX1ZW3jFOUUdoeXrA'),(620,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRlNzJmNWEyLTk0NWEtNDc4Yy1hMmU4LTk2NTFjYzNhN2U2ZiIsImlhdCI6MTc0OTg4NjkyNywiZXhwIjoxNzUwMTAyOTI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0fY_9x7Sn_rvzVSXc6mWBLB_YaIPjL6UIoIfGtxxxGg'),(621,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE2ZjFkZWRjLTNiOWItNGM2Mi04MWY3LTgzNzE0ZGNjZjdmOCIsImlhdCI6MTc1MDA2NjY5MSwiZXhwIjoxNzUwMjgyNjkxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ZVrxUrucMYTKHutCL9j40PxNChCtzsBT5UDNb6-TJ-Q'),(622,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNhMDFjY2YwLThjYTgtNDUzNS1iYThmLWI2NjljMjY1MTQ3MiIsImlhdCI6MTc1MDE2NjAzOCwiZXhwIjoxNzUwMzgyMDM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.qDtg2dx7XJ5OnWZ0afvTgekFuSp_bhHB04HgFzyT79M'),(623,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI1MmNhNDk2LTMzOTItNDRiZC1iNDk4LWUzNTZiMDM2MmQ3MiIsImlhdCI6MTc1MDE2NjcyMCwiZXhwIjoxNzUwMzgyNzIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jsx1ovir_bJV0smBxmtcyCcNaQInV6CF5Rs465_axOE'),(624,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJmZjFkNjY3LWFmMDEtNDQxMS05MjkyLWQ5MDM5YWU4MWM1MyIsImlhdCI6MTc1MDE2NjczOSwiZXhwIjoxNzUwMzgyNzM5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.-EZ0kueMyhmHEc_meEbXnOy0ye19cWkFFXpZ5fJB7W4'),(625,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA3MjkxYzllLTU4MWEtNGFlNC1hNzgzLWFhNjRkZjMyZmFlOCIsImlhdCI6MTc1MDE2NzM5MywiZXhwIjoxNzUwMzgzMzkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.8T8HZdcNnskBPTFGlx9rLsbcJPgDwEUnVA4HKWn6nvc'),(626,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUwNmZjZGExLWRmYmEtNDk4NS04Y2NjLThkOGUzNTM4YWQyMSIsImlhdCI6MTc1MDE2NzU0MiwiZXhwIjoxNzUwMzgzNTQyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2r0zRuDl-ILQZcsah4p90J37sRmJEyJi0wWLC-MflzM'),(627,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQxYTA4ODg5LWU5YmMtNDQzMC1hYjViLTkwZjM2ZTZlYTBiYSIsImlhdCI6MTc1MDE2NzU5MywiZXhwIjoxNzUwMzgzNTkzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.okYWqCRqI88QzVapxILF8kiBHwH-SfRAhWAKtH4G1fM'),(628,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4ZGM5M2JmLTJkYTctNDQyNC1hNTU2LTNmN2U4MzRkNzQzNiIsImlhdCI6MTc1MDE2ODMxNiwiZXhwIjoxNzUwMzg0MzE2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.y_u603TDWdfB0OAFiN41OoIBrLnpfK7PxNBfuxXX1kc'),(629,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNiMjYyN2Q0LTVkYTctNGU5Ny1hNzE0LTk5M2QxZWI1ZDEwOCIsImlhdCI6MTc1MDE2OTA3MSwiZXhwIjoxNzUwMzg1MDcxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.t0BsBRt1cY1WV1KoIAZjP2IqjErNFry-ngm8kL9-908'),(630,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU1MmNlNDgxLTllZmUtNGI0YS1iZmY5LTdiNjA5MDcxMzRhNSIsImlhdCI6MTc1MDE2OTI3OCwiZXhwIjoxNzUwMzg1Mjc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zhI8unwwMWtLKTmImGL4Io5wS6gg0v3e1UKgzWEF59U'),(631,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhOGJkZDAzLWMwMzAtNDE1Mi04NGRiLWE2MGZkZDE4MTY0MyIsImlhdCI6MTc1MDE2OTc1OSwiZXhwIjoxNzUwMzg1NzU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.U02739bAx0HDdttuH73vo1uYxR029O0VslAaHKjgEQA'),(632,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJlMWUwYWM1LWFiYjItNDQ4Ny1iMmYzLTA5MGM4MDkzOGY3OSIsImlhdCI6MTc1MDE2OTgwNCwiZXhwIjoxNzUwMzg1ODA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.c4zp08-j7aDEu4RCm9yL0LJmf2RTxTmGvawB4XRQK_Q'),(633,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwMTkzOGFmLWM4YTEtNDc5Zi05OWI1LTAzMTAyN2JhZDY5YiIsImlhdCI6MTc1MDE2OTg1NywiZXhwIjoxNzUwMzg1ODU3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.zCBZ41ijSOMWaIVbRGCESPb9Vu3_CDNhOXKklxJa-JY'),(634,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFjZGNlZDA1LWE4MjAtNDFmNS04MWMzLWI5OGM0OTRkNjdhYSIsImlhdCI6MTc1MDE3NDE3NywiZXhwIjoxNzUwMzkwMTc3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.yYG0lKzeriHmLhykGUQsJyTUN2nkrhLIf1n5fAfbnVY'),(635,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJiOGRkNWZkLWM1MWItNGJiYy04M2U0LTg2NDc4Y2EyN2ZmZSIsImlhdCI6MTc1MDE3NDIyNywiZXhwIjoxNzUwMzkwMjI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3mOx6I1xxfff_3S5NNoveDs7DhMlGPLigoma_xLPNtQ'),(636,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE4ZWVlYjg4LTZhOGEtNDVjYy1hOGMzLTU4MGU1Yjk0ODgwZSIsImlhdCI6MTc1MDE3NDQzOCwiZXhwIjoxNzUwMzkwNDM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2FH3SHM33iZsIzROE-HRHPv8pbcCdoZs_4aWL4_hl3Y'),(637,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0NWZkYzNlLTg5M2ItNDNmYy04ZDk1LTIwZWI1Zjk2OTMxYiIsImlhdCI6MTc1MDE3NDU3NSwiZXhwIjoxNzUwMzkwNTc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0G5U4j7sT0D8fTpiOfoacMciQVMfaCCMrpRRTSvNyUE'),(638,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM2NmY1MzI3LTlhY2MtNGFlOC05ZmUwLWM1ZjdhZDA1ZGMzNyIsImlhdCI6MTc1MDE3NDcyNSwiZXhwIjoxNzUwMzkwNzI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.YBXM9Buxxb-VzOWyJIGemSCSEbfr_8u9XJvGaeVFTa8'),(639,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjNkNWI2ODBkLTE2MzMtNGYzOC05NjEwLWI1MmQzZjEwZDAyZSIsImlhdCI6MTc1MDE3NDg5NCwiZXhwIjoxNzUwMzkwODk0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Y9XhNRX9PO3GfoVzhuqgLjhBxvHleoYYc8DN6yPC79s'),(640,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg2YmRjYjJhLTRhMzItNGQ5Mi05YWU5LTAxNTA5ZDE0OWQ3YiIsImlhdCI6MTc1MDE3NTM1NSwiZXhwIjoxNzUwMzkxMzU1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.r3cI1B9Zjb1VEFQkHLT8jzyObTrM-C01lWtzT7MFrkQ'),(641,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJhOWJjMjI5LWViZmMtNGI0ZS04MzM1LWVkOGY1NDU5NmRjNSIsImlhdCI6MTc1MDE3NTM4OCwiZXhwIjoxNzUwMzkxMzg4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.VELl0aGwmfKoEHtqHy8A8c5ecTmm22-hdNotCiyuXZg'),(642,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRiODUzMWIxLTZkN2YtNGU2Yy1hYWM1LWM2NjkyYjk5ZGMzZCIsImlhdCI6MTc1MDE3NTc2NCwiZXhwIjoxNzUwMzkxNzY0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.V_uFLu5qHlcw-nmKyfMivYksjRV4Bqn_Z3sWsQIbsJA'),(643,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmZWIwOWNmLTljYjUtNDc2ZS05ZTZjLWMxM2ZkYTExZTBkMSIsImlhdCI6MTc1MDE3NTgwOCwiZXhwIjoxNzUwMzkxODA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.l8tmdLltSVn2IYye3kU2XSCv-kkvqzQdEsteIDhqOj4'),(644,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQzZTc0NjZmLTgxY2YtNDU2Yy05Y2Y3LTVjOWNhNjg2NzQwMyIsImlhdCI6MTc1MDE3NjA3MiwiZXhwIjoxNzUwMzkyMDcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ygDgjmT9w7HiuZeS5adv9QtYwIYwka_AOlDlsuH0vWc'),(645,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVhOTJlM2RmLTIyOWItNDI5Zi1iMDA5LWJhNGViMTU3OGNiOSIsImlhdCI6MTc1MDE3NjEwNiwiZXhwIjoxNzUwMzkyMTA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.umsl7Q3KHuKgPZJ305h0R84OtJpiEKF-7vQ-ZfOkcZ4'),(646,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkxOWIzNzU3LWI5OGItNDhjZi04NjAwLWEwOTBjOWI3YTczNiIsImlhdCI6MTc1MDE3NjEzNywiZXhwIjoxNzUwMzkyMTM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.HagCMxCT1Namq0LbjkUapPnMrTH1vmSajnOzGHNpwfQ'),(647,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmYzdiZTAwLTdmMTUtNGI4My05MDkwLTU5M2M5YTFlYTEyNyIsImlhdCI6MTc1MDE3ODAwNiwiZXhwIjoxNzUwMzk0MDA2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uw-ceDbGZj1IW7xV6EPx_nlx0WksAqREwk9EojwcmpU'),(648,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU2ZDkzODFmLWJkZGMtNDAzOS1iMTM0LWQzZjgxMjk1ODYzZCIsImlhdCI6MTc1MDE3OTAyOCwiZXhwIjoxNzUwMzk1MDI4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3B7fG1y7doLWmV99AH9SPSWjf82DpcI3y63pcihXSZo'),(649,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc4ZGZlZmRkLWQ5NjctNDQ1OS05NDIyLTliZThjNmM4YzllZSIsImlhdCI6MTc1MDE3OTUwMiwiZXhwIjoxNzUwMzk1NTAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7cUt3U2uegwNoXyKxRPW_rlZWkFQnK7jVVXWanfLXoc'),(650,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYxMWU2NjU3LTc4YjAtNDAzNS1hNGU1LWVhZjhlNzU2YTBjMyIsImlhdCI6MTc1MDE3OTU0NiwiZXhwIjoxNzUwMzk1NTQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.4zVWFvF7t7aCgXfzrBFdJTPEEGZIMQOFa60c6CU4v24'),(651,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdkMzJhYWM4LTc0NTQtNDRlNy1hM2ZhLTc3OWQyYjQ0ZjMyNCIsImlhdCI6MTc1MDE3OTc1OCwiZXhwIjoxNzUwMzk1NzU4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3HO-tz9fBeBr5F_DoCKKSOlAraISR8Ym2QaT2wq_KuY'),(652,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFhMzUwYWFkLWViOWMtNGNhYi1hMjAxLTdjYzZhNmVkZmFkOSIsImlhdCI6MTc1MDE4MDYwNywiZXhwIjoxNzUwMzk2NjA3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XhablEwhtQy9DAGUAzt_Yu2UwaBuhVYRxgSdheAPAxA'),(653,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFhMGE1Mjk2LWU5ZDEtNDM0NC05Y2Q2LTM2NjRmYjdiNzUyNCIsImlhdCI6MTc1MDE4MTc0NSwiZXhwIjoxNzUwMzk3NzQ1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ioc3_V23rfnBW8Ven88T-FSC3yMklXIWg1ylvuq97MU'),(654,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc3Y2NkNDMxLTY2MjYtNDEzNi05ZWVmLTNhYmU3ZWI4ZDI4ZCIsImlhdCI6MTc1MDE4MTg1OSwiZXhwIjoxNzUwMzk3ODU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.hZWEqPA_fWpcFAH4wZ7rdpoyVax8GP_UF0LlFo3EapA'),(655,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjM5YTE5YjIzLTM1NmMtNDc5OS04OTgxLTg5ZmQzMjM1NmIxMSIsImlhdCI6MTc1MDIyOTQwOSwiZXhwIjoxNzUwNDQ1NDA5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2Bo0hkNLT97CqKIG52zoe3R9vDcUb-DUBM6eqIRqDyo'),(656,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFlMTFjOTBiLWUxMmUtNGJkNC1iMjk1LWIzMmUxMzBlZTdiMiIsImlhdCI6MTc1MDIyOTQ0NywiZXhwIjoxNzUwNDQ1NDQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.58sSosmc5GMZ6sOBgWrNPBq5vQFtwhFKmclsgwW0HB0'),(657,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhmMWY4YTQyLTEzZDMtNDRjMC04MTEzLTY3MjJkOTA0N2Y3NCIsImlhdCI6MTc1MDI1MzA4MywiZXhwIjoxNzUwNDY5MDgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ahiEDXaj5Flyjbz9icRmwf_p4qP0gWN0028OnXvFhCE'),(658,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQxMTUyYWZkLTBhYTEtNGY3Ni1iNGE0LTU1NTM5YzlkNzM0YyIsImlhdCI6MTc1MDI1NDQ4NiwiZXhwIjoxNzUwNDcwNDg2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.5Yw5yY7Jd_RmK4M2cDR2kh4DvHdl8n9urPq-TP_m9Jo'),(659,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIwYzcwZTIzLWFkZjAtNDE5Yy1hYzU5LTNjMzQ5MjA1YjJhYSIsImlhdCI6MTc1MDI1NDcwNCwiZXhwIjoxNzUwNDcwNzA0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.spmpIi4VF1g2cx5uvQE3M9BL4NKBYcUdKCD7NpaUQj4'),(660,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRmYzhlMTdkLWE2ZTMtNDM0OS1hNDM1LWFmYjVlYTcxOWI5NCIsImlhdCI6MTc1MDI1NTcwOCwiZXhwIjoxNzUwNDcxNzA4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.lL6YUGVc5eJ85Iowbql5DtTaL4HgDVYf_N2zENtojMA'),(661,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNiNDkzY2U0LTViODctNGU5Yi05YWNmLWJmY2MwNjJjNzNkNiIsImlhdCI6MTc1MDI1NjYwMSwiZXhwIjoxNzUwNDcyNjAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.1PLkYXXpoUeuVvaLfYFfE8eMT-P6Y8ck2e79LvPNAx8'),(662,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI0YmFlMmIzLWNmOWUtNDdiOC05NGU1LWRhMmIwZDU1Nzg5NCIsImlhdCI6MTc1MDI1NjY4MywiZXhwIjoxNzUwNDcyNjgzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CxHzuCJ_I_Pg_vHDRLbGbxfLwDyAXH_3XgFYbGaYKuA'),(663,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRiMTFmZmYwLWUwMzEtNGZmOC04MDA0LTBlNjI2OTNhNDNiNCIsImlhdCI6MTc1MDI1NjgzMSwiZXhwIjoxNzUwNDcyODMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.BlI13a8PKFPy_uY2_2qW9n3qHh16daGROjsT0dJK12I'),(664,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImY4N2U3YjA2LWU0NWItNDNkNi05MWM3LTE4NDYyYzE2ZDFhZCIsImlhdCI6MTc1MDM0MTgzMSwiZXhwIjoxNzUwNTU3ODMxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CjwcxDfWEiO7D_1SUkMZ9aprBN0gdaDh50--ErSjlFY'),(665,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjBiMDc1MGU4LWJhNzYtNDJlMC04YjU0LTc5ZTkzODY3NDlkZiIsImlhdCI6MTc1MDM0MjQ3NSwiZXhwIjoxNzUwNTU4NDc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.PfyBz0jptFGbPaAhrdrHDTKOKohQOj59cfeT5_l02P8'),(666,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRjZjZlYTFlLWU1YjAtNDA0NS1hYjJhLWIyODc4YzdlM2ViNyIsImlhdCI6MTc1MTk4MTQyNCwiZXhwIjoxNzUyMTk3NDI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.xWTv8RFcYPPcbpIYYT4_FC2zDJviUrEH_36-_PnVQyQ'),(667,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNjNmM3OTZiLTZjMDEtNGIxNC1iNDM5LTEwNDMwYmY5ZTA4YiIsImlhdCI6MTc1MTk4MTQ2NywiZXhwIjoxNzUyMTk3NDY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2q5LBDXxaroNgvK7MosJrRjnI0usTEOZb70wo2Zphkw'),(668,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdiMThjNGMwLThmZjItNDVkOC04MDRlLTc0OTgzMmRlMmYxNiIsImlhdCI6MTc1MTk4Mjg2NiwiZXhwIjoxNzUyMTk4ODY2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.KS_HeEnijhRpqMRVsscr9hP0eT4wQSYcafyw8evs7dk'),(669,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFiODM0NTRhLWQ3NWItNGM0OS1hMWZiLTUzMTRjZWUwZmE0MiIsImlhdCI6MTc1MTk4Mzk2OCwiZXhwIjoxNzUyMTk5OTY4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7P6hbckke7JsOFux0GKXWlfR4w4cjzVunvhInCDqfhI'),(670,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc4OGI5ZWRjLTRlZjYtNDA0Ni1iZjM3LWIxNWY5MmIzYmZkNSIsImlhdCI6MTc1MTk4NDQ0NSwiZXhwIjoxNzUyMjAwNDQ1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.gFCBed1nzuUl-lnbktoagtHLK5WK5IxW3Zp6d4xCCqU'),(671,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdlOTRiZDg3LTJhMGMtNDFhNS04MmVjLTY5MmMzM2ZkOTJmNSIsImlhdCI6MTc1MTk4NDQ4MCwiZXhwIjoxNzUyMjAwNDgwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.iMahekXaBK0F2ULIJhRtslZRkML96B4hDgMXHhLNb3w'),(672,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVjNWIyZDgxLWVlZDUtNGJiZi05MzQyLTZjZTZhZDUxNGZkNSIsImlhdCI6MTc1MTk4NTAzMywiZXhwIjoxNzUyMjAxMDMzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.H59G0Fv6qOHNL_ejUqRL0s5Am4yV9-YUjAmnQaQezyM'),(673,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ0ZmExN2I3LWMwZDktNGNkMy1iOWE3LWU3Y2Q2NjMxMjNmYiIsImlhdCI6MTc1MjI0NTc1MCwiZXhwIjoxNzUyNDYxNzUwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.fHq5n2dAi86_KesTlPEmfCG4PRrjYjNMtd-t4NRqDQQ'),(674,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIxMGVmMzI4LWYxNDEtNGViMi1hNGQyLWM4MTY5ZDllNDQzZCIsImlhdCI6MTc1MjI0NzM3MiwiZXhwIjoxNzUyNDYzMzcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.q7-Rn6jFCtd3h3OVAitnkjRmwxwHeTk_umW4iZR41V4'),(675,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJlMDkxNWYwLTExNDItNDFiZi1hMjdiLWE3ZDkxODM1OTQyYiIsImlhdCI6MTc1NTUyNTU0NiwiZXhwIjoxNzU1NzQxNTQ2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.UKsJR5lm3UJF-X_l9E-1x1pbrM2Yp0q7MsLPrsvofjE'),(676,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQ4YTFhYTYxLWJjOTMtNDFjNy04YTBmLTgyY2QzZmNhMjhlZSIsImlhdCI6MTc1NTUyNjE3OCwiZXhwIjoxNzU1NzQyMTc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jtB1yLhjV_p_cPLFqbvDtxymBBzgf1ZuTyOOFaYrWpY'),(677,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYwOTM2ZjQxLWZhZTQtNDE3OS1iNTVkLTRmODAzYjc4MjAwNyIsImlhdCI6MTc1NTUyNjQwMSwiZXhwIjoxNzU1NzQyNDAxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.vBwShfMiGpGOdAIzleMtTofIGTNqmCITJ25qXjwYQII'),(678,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk2MjUwMzI2LThiY2EtNDgxZi1iZGM0LThjMDRiYjcyNTI5NSIsImlhdCI6MTc1NTUyNjQxNywiZXhwIjoxNzU1NzQyNDE3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.RcF1h2PxfBsDvQgz_canfSf7xqPqEtUhw-kOrySalu4'),(679,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhiY2QzMGY5LTNhOTUtNDFhOS1hY2M0LTMxMzMzMTJiMmM5MiIsImlhdCI6MTc1NTUyNjQyNywiZXhwIjoxNzU1NzQyNDI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.NurbeK2II19CruMlv2SHWAwiBFoCMw-Qyycg4giNHDU'),(680,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijc2ZTE4NjBkLTZjNzYtNDg1Mi04ZTZlLTQxNjVmNzZkOTIzNyIsImlhdCI6MTc1NTUyNjU3MywiZXhwIjoxNzU1NzQyNTczLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Ionc6p-9QKpVUdpqL4JgbKze__Ue_-IkF7-8DKNPVAM'),(681,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImUyM2NiNmIzLTRjZmUtNGNhYi1hNjM5LWNmMWU5MmI2ZThlYiIsImlhdCI6MTc1NTUyNjU5NywiZXhwIjoxNzU1NzQyNTk3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.uuoAA0xDwbkRvEWBtAy_n0y_YxHzYztdX0iIz_kq26E'),(682,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFjZWM5ZTk0LTA0OWMtNDVhZC1hOTM0LTlhM2U3MjhkYzY3OSIsImlhdCI6MTc1NTUyNjc0OSwiZXhwIjoxNzU1NzQyNzQ5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.unjOHsoGApHvF-b_UQ9tEB7KPMtahFT7LH208Lplrrw'),(683,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkyZjVmODE0LWQyNDUtNGMxZS05ZjZiLTkwMzZlOGZhMDlmMiIsImlhdCI6MTc1NTUyNjgyNywiZXhwIjoxNzU1NzQyODI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.XluYz_ctih-W6U7ZTUsfaxUMpzrmtNocIPdPNxLaO6c'),(684,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAxZjQwZTA0LTA4N2UtNDU3ZC1hNTA2LTVhYmJhNjljMWFlNiIsImlhdCI6MTc1NTUyNjg0MywiZXhwIjoxNzU1NzQyODQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.brdnQxJVDb7C3SL83P1ULQleF4hgdSNsFaejFAMZPm8'),(685,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIxNGVlYzU4LTgyNzctNGQ1Yy05ZjM5LTRlZTM1ZWZmYmFkYSIsImlhdCI6MTc1NTY5Nzc3OCwiZXhwIjoxNzU1OTEzNzc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.3KGpOqcC0pr8uW_bWY9qJyd_3tykxJVZ6QGRrIktM00'),(686,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjlhMGU3NzdkLWEyN2MtNDJhNy1hODVhLTMxNTU5MDliZmY3MyIsImlhdCI6MTc1NTY5Nzk4MSwiZXhwIjoxNzU1OTEzOTgxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0TTASZS6Z6uiXIMvvpURkz1WHwhqw45Wss4RqwsIs8M'),(687,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJmZDRkNjlmLWQzNWMtNGUyYS05NTU2LTI5ZWZjZWE1MzM5NCIsImlhdCI6MTc1NTY5Nzk5MiwiZXhwIjoxNzU1OTEzOTkyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.j-Yv0AyEc6k02V39oxSq5eY4SA_zrCVeKvJ7U94pcTg'),(688,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdiOTIzYWVhLWNlYzQtNDgzZC05ZmQwLTVhM2MxMjBhNGRlYSIsImlhdCI6MTc1NTY5ODEyNSwiZXhwIjoxNzU1OTE0MTI1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.nkCJ2FJyvlyALGLh14v8H8EpmGIJf9LsAjJKNlG_Ulw'),(689,24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAxNDg0MGIwLWE1NzgtNDlkMy1iYzJlLWI2MWM5MWRlYWI3ZiIsImlhdCI6MTc1NTY5ODg2NywiZXhwIjoxNzU1OTE0ODY3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0p1oT_orpSVKkTVGzzNl-aifRVtx3KV_-eWr36IfYyw'),(690,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImMyOWFiMjMyLTNiMTctNGEwYi1hMmI0LTZhNWIxZDhiZjcwOSIsImlhdCI6MTc1NTY5OTAwMiwiZXhwIjoxNzU1OTE1MDAyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0._mNwoi_ZXp11krZd0arJz_wuUVcdZ71VPIAvEXA_FCQ'),(691,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ0MjI5ZWJlLTgwYmEtNGVhNC05M2UyLTA3YmMyMmE4ZGJmMiIsImlhdCI6MTc1NTY5OTQ0MywiZXhwIjoxNzU1OTE1NDQzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.CHzaNRFsny4E2uAZBCkd8SC4Ma-KnYkBjZsYeVs-x_w'),(692,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZiNThlOGViLWNlZmMtNDA4Zi05NGY5LTU1ZTVhYWFmNTliNSIsImlhdCI6MTc1NTY5OTYxMiwiZXhwIjoxNzU1OTE1NjEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.7EAGMUZ01yfEdliV0X6yOM47IYRRpdiaYInd-c8xRSc'),(693,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhjNGY1MWMyLTJiMDktNDU2Ni04NmFjLTRjMjgyZTdjMDRkNyIsImlhdCI6MTc1NTY5OTc3NiwiZXhwIjoxNzU1OTE1Nzc2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jnVbE0K2vto-sqWGioccInUopPoxknvM32nxPe-jK6A'),(694,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImIyMWFhYzNiLWJkYmQtNDhlMC1iZGRjLTU4ZTRjMWE4ZWU3OCIsImlhdCI6MTc1NTcwMDQ2OCwiZXhwIjoxNzU1OTE2NDY4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wSfUOe2etFEi-iKhTLFIgOXi6AKdIxBQxQzVq_YT17M'),(695,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkyZTZlMmI2LTQwYjYtNDI2Yy04YWFhLThmNjRhZTEwMTg1ZiIsImlhdCI6MTc1NTcwMDY0OCwiZXhwIjoxNzU1OTE2NjQ4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.Rgxkxld-zn5T3ZEuBbN1oe2Ce38ZgST5_q2eSGjXyK8'),(696,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRkOTFmYzkzLTRlZTUtNDE2YS05YmVkLTZhZTc0OTY4MjM3OCIsImlhdCI6MTc1NTcwMDY3MiwiZXhwIjoxNzU1OTE2NjcyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.wrBOPHELU_RGS6E7UaMacf2Bw7A5RohM8qXr2fYBFNA'),(697,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzNTE1YmNiLTBiMTYtNDIxOC1iZmNjLTQ2OTY3ZWUwODMwYiIsImlhdCI6MTc1NTcwMDY5NSwiZXhwIjoxNzU1OTE2Njk1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.KvZ33e2f74aHM2_t8fP6D05rg9yakCtkdH0Jab7a72Q'),(698,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY2NmUwZjY0LTcwOTMtNDExZi04NjA1LTYzMDczMDUzNzI1YSIsImlhdCI6MTc1NTcwMDcyMCwiZXhwIjoxNzU1OTE2NzIwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.JdYINtp3xlTLdSl4ear_Nx4tnyqrOWrbwVckCUGklZs'),(699,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkYzhkZWNkLWEzYzUtNDRiZS1iNjMyLTVmMzNhNDRkODQ4YSIsImlhdCI6MTc1NTcwMDc1MSwiZXhwIjoxNzU1OTE2NzUxLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.e0ayvHa59-mvjvbASmKb7m6XV_ZFe4-udYbQfSq1MS0'),(700,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmY2UxZjhmLTQxY2YtNDQyMC1iMjVjLWE0ZTA5NTM5ZjBlNiIsImlhdCI6MTc1NTcwMTYxOSwiZXhwIjoxNzU1OTE3NjE5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.J-MFhgAQYNFu6qAC0xEo0LoCWsa4QmODuE7e4kG8D6k'),(701,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYwMDVhOGVlLTcxNTEtNDkwMy04MmQ4LTFmOGJlMWJmNGZlYiIsImlhdCI6MTc1NTcwMTYzNywiZXhwIjoxNzU1OTE3NjM3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.xn3UILf1udhbxx5S2ackKTCdWXizhgHOm6wD1SNqcyw'),(702,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU2OWZmOTczLWZhMWEtNDYyMi04MmE5LWY3MDQ5YzY2MTQ3YiIsImlhdCI6MTc1NTcwMjI3NSwiZXhwIjoxNzU1OTE4Mjc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.aUbjcpXi6nvjOO2jxoYAznx77mNUzOQrvCA3FelkMcU'),(703,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY3Yjg1NmY1LWNhNzMtNGExNC05YmY2LTc1MzUwNjc4ODFhNSIsImlhdCI6MTc1NTcwNTMxMiwiZXhwIjoxNzU1OTIxMzEyLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.6TghPHH0w-PKb12jxxpfmDJJS3n9WR32psKZ9AH_DyY'),(704,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg0NjgyODNkLWM3MzAtNGEwOC05OThhLThkNDEwNmFjNDcxYyIsImlhdCI6MTc1NTcwNjA1MywiZXhwIjoxNzU1OTIyMDUzLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.czzT7a9jvhyHl-650uhEWEsKmKFQ8lBX4mjweOkSmAU'),(705,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRkNzgyZmU5LTRjMTYtNDU5Ny04NDQwLTY0ZGNiN2E5MjEzNiIsImlhdCI6MTc1NTcwNjY0NywiZXhwIjoxNzU1OTIyNjQ3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.kfN5O1ppQRv0zl7ukOsgs1k1xhKC8GAXJItD9pk-JNM'),(706,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg5ZjczZTczLTEwZWEtNGFhMS1iZmQ4LWIyNTU1NjcwZDhjNSIsImlhdCI6MTc1NTcwNjY2NCwiZXhwIjoxNzU1OTIyNjY0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.ydPgmVGobYd3PGdzF3F-ZUlvjKMQpsN3Zg4L6lLQTMY'),(707,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhlZTBkN2RjLTJhYzQtNDExZC04MDQyLWNmMDg0ZTlhMWY0YyIsImlhdCI6MTc1NzA4MTAyNCwiZXhwIjoxNzU3Mjk3MDI0LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.xWoYVDOFsnZXdxJK6MS65rIc-TYuuIJQqvRLU_MID4Y'),(708,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjljNmUxZjBjLTUwMDMtNGFmMC1hNmY1LWMyYTM5OGYxNTI1NCIsImlhdCI6MTc1NzA4MjE1OSwiZXhwIjoxNzU3Mjk4MTU5LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.0PJ_U_r7d6zrimq7FKTeMUD8H-83VO7X5POPiWivuck'),(709,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRkZGYzMmI5LTFhZGItNGZhMy05MWU5LWYyZTA4MTdlN2IxMiIsImlhdCI6MTc1NzA4MjI3OCwiZXhwIjoxNzU3Mjk4Mjc4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.2QDOhbG5q9Dqq2Lo6sS23Ee6Ep-zLJJ7iGNrYHJ0LhM'),(710,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk1ZDNkYWExLWVlZmMtNDFkOC04Y2ZmLWY0ODM0YjFjMDAzNiIsImlhdCI6MTc1NzA4MjMwMCwiZXhwIjoxNzU3Mjk4MzAwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.WKiSsg75fdFXmGSucSsRwXnttyKGfUN6BYkBZc-bXjI'),(711,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQyZGY2YTk5LWIxNjMtNDdhMi1iMjk1LTRlYTFkYWIxOTdmZSIsImlhdCI6MTc1NzA4MjYzNiwiZXhwIjoxNzU3Mjk4NjM2LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.83jGF_L1_Lwa2VYLnAH3wm040Q-sbTe5oHFrXpfq1fU'),(712,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg2OWQyYWI0LWU5OWMtNDMwYi05YTU2LWZiOWMzN2Y5ZjM4ZCIsImlhdCI6MTc1NzA4MjczOCwiZXhwIjoxNzU3Mjk4NzM4LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.i5DevU5IFLwfH6y3Z3gDMXELvbFL6w_QuNJcC6nMpgA'),(713,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmYzNhODYwLTgyMzctNDExNC04YmI2LTNmYzYyMmNlZmRiOSIsImlhdCI6MTc1NzA4MzEyNywiZXhwIjoxNzU3Mjk5MTI3LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.jAjux_uTj__pSfdkpE1KlaKsDHLHojwPKWCLtxY02sc'),(714,26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ5NzYyMzVjLTBiMjQtNGIyYS04YmY4LWI4MjllYmM4M2E2NCIsImlhdCI6MTc1NzA4MzE2MCwiZXhwIjoxNzU3Mjk5MTYwLCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.doI4efkLwe9rPtuLA3-Xka8aYXiS0psr-1YG6lLPAFU'),(715,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjY5MDYzZjZhLWMxODktNGQwNi04ZTVlLTJlN2UwZDFlYWJhMiIsImlhdCI6MTc1NzA4MzE3NSwiZXhwIjoxNzU3Mjk5MTc1LCJpc3MiOiJEeW5hTUl6YXRJQy0xOTEwIn0.E_paQ_dnGGp-KXuL9elYmWvaq59apuDDdMcz4nEd-Dg');
/*!40000 ALTER TABLE `refrescar_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_inactivo` datetime DEFAULT NULL,
  `usu_inactivo` int(11) DEFAULT NULL,
  `muestraEmpresa` varchar(1) DEFAULT NULL,
  `dashboardUrl` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkRolEmp_idx` (`empresa_id`),
  CONSTRAINT `fkRolEmp` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,1,'Administrador','S','2024-06-24 13:55:11','2025-06-17 13:25:30',1,1,NULL,NULL,'S','/movimientos'),(20,1,'API','S','2025-05-31 14:58:38',NULL,1,NULL,NULL,NULL,NULL,'/tablas-maestras/rol/'),(21,1,'Pallet Nuevo','S','2025-06-17 16:41:44',NULL,24,NULL,NULL,NULL,'S','/movimientos'),(22,74,'Administrador','S','2025-06-17 16:41:44',NULL,1,NULL,NULL,NULL,'S','/movimientos');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES (3,'Usuario','2024-12-18 12:27:35',NULL,1,NULL),(11,'Empresa','2024-12-18 14:56:48',NULL,1,NULL),(15,'Correo plantilla','2025-01-02 09:13:36',NULL,1,NULL),(28,'Palets','2025-06-17 13:22:39',NULL,1,NULL),(29,'Almacén','2025-06-17 16:39:46',NULL,24,NULL),(30,'Supermercado','2025-06-17 16:40:03',NULL,24,NULL),(31,'Almacén Principal','2025-06-17 16:40:17',NULL,24,NULL);
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_archivo`
--

DROP TABLE IF EXISTS `tipo_archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_archivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `seccion_id` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `orden` int(10) DEFAULT NULL,
  `multiple` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkTAEmpresa_idx` (`empresa_id`),
  KEY `fkTASeccion_idx` (`seccion_id`),
  CONSTRAINT `fkTAEmpresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fkTASeccion` FOREIGN KEY (`seccion_id`) REFERENCES `seccion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_archivo`
--

LOCK TABLES `tipo_archivo` WRITE;
/*!40000 ALTER TABLE `tipo_archivo` DISABLE KEYS */;
INSERT INTO `tipo_archivo` VALUES (3,1,11,'Imagen','Imagen',1,NULL,'2024-12-18 13:56:28','2025-03-21 16:38:35',1,1,'S'),(4,1,11,'Logo','Imagen',2,NULL,'2024-12-23 07:44:14','2025-03-21 16:41:24',1,1,'S'),(8,1,15,'Archivos','Imagen',1,'S','2025-01-02 08:14:30','2025-03-31 06:00:00',1,1,'S'),(17,1,3,'Avatar','Imagen',1,NULL,'2025-03-31 08:13:48',NULL,1,NULL,'S'),(24,1,30,'Archivo Prueba','Fichero',1,'S','2025-06-17 16:41:07',NULL,24,NULL,'S');
/*!40000 ALTER TABLE `tipo_archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_inactivo` datetime DEFAULT NULL,
  `usu_inactivo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkTDEmpresa_idx` (`empresa_id`),
  CONSTRAINT `fkTDEmpresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,1,'DNI','Documento Nacional de Identidad','S','2024-07-18 04:52:36','2025-04-10 10:16:09',0,2,'2024-07-18 09:07:40',2);
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traduccion`
--

DROP TABLE IF EXISTS `traduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traduccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idioma_id` int(11) NOT NULL,
  `clave` varchar(1000) DEFAULT NULL,
  `valor` varchar(1000) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkTradIdi_idx` (`idioma_id`),
  CONSTRAINT `fkTradIdi` FOREIGN KEY (`idioma_id`) REFERENCES `idioma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3397 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traduccion`
--

LOCK TABLES `traduccion` WRITE;
/*!40000 ALTER TABLE `traduccion` DISABLE KEYS */;
INSERT INTO `traduccion` VALUES (2766,1,'Sesión cerrada por inactividad','Sesión cerrada por inactividad','2025-06-17 15:28:55',NULL,1,NULL),(2767,1,'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.','Tu sesión ha expirado. Por favor, inicia sesión nuevamente.','2025-06-17 15:28:55',NULL,1,NULL),(2768,1,'Nombre','Nombre','2025-06-17 15:28:55',NULL,1,NULL),(2769,1,'Temperatura','Temperatura','2025-06-17 15:28:55',NULL,1,NULL),(2770,1,'Humedad','Humedad','2025-06-17 15:28:55',NULL,1,NULL),(2771,1,'Presión','Presión','2025-06-17 15:28:55',NULL,1,NULL),(2772,1,'Movimientos de Palets','Movimientos de Palets','2025-06-17 15:28:55',NULL,1,NULL),(2773,1,'Tabla','Tabla','2025-06-17 15:28:55',NULL,1,NULL),(2774,1,'Archivo','Archivo','2025-06-17 15:28:55',NULL,1,NULL),(2775,1,'Archivos','Archivos','2025-06-17 15:28:55',NULL,1,NULL),(2776,1,'Todos los campos deben de ser rellenados','Todos los campos deben de ser rellenados','2025-06-17 15:28:55',NULL,1,NULL),(2777,1,'Las imagenes deben de tener el formato correcto','Las imagenes deben de tener el formato correcto','2025-06-17 15:28:55',NULL,1,NULL),(2778,1,'El email debe de tener el formato correcto','El email debe de tener el formato correcto','2025-06-17 15:28:55',NULL,1,NULL),(2779,1,'Ha ocurrido un error creando el registro','Ha ocurrido un error creando el registro','2025-06-17 15:28:55',NULL,1,NULL),(2780,1,'Editar','Editar','2025-06-17 15:28:55',NULL,1,NULL),(2781,1,'Ver','Ver','2025-06-17 15:28:55',NULL,1,NULL),(2782,1,'Nueva','Nueva','2025-06-17 15:28:55',NULL,1,NULL),(2783,1,'Empresa','Empresa','2025-06-17 15:28:55',NULL,1,NULL),(2784,1,'Guardando','Guardando','2025-06-17 15:28:55',NULL,1,NULL),(2785,1,'Guardar','Guardar','2025-06-17 15:28:55',NULL,1,NULL),(2786,1,'Cancelar','Cancelar','2025-06-17 15:28:55',NULL,1,NULL),(2787,1,'Datos para la empresa','Datos para la empresa','2025-06-17 15:28:56',NULL,1,NULL),(2788,1,'Código','Código','2025-06-17 15:28:56',NULL,1,NULL),(2789,1,'Código de la empresa','Código de la empresa','2025-06-17 15:28:56',NULL,1,NULL),(2790,1,'Nombre de la empresa','Nombre de la empresa','2025-06-17 15:28:56',NULL,1,NULL),(2791,1,'Descripción','Descripción','2025-06-17 15:28:56',NULL,1,NULL),(2792,1,'Descripción de la empresa','Descripción de la empresa','2025-06-17 15:28:56',NULL,1,NULL),(2793,1,'Email de la empresa','Email de la empresa','2025-06-17 15:28:56',NULL,1,NULL),(2794,1,'Dirección de la cuenta de email que se va a usar para enviar correos automatizados','Dirección de la cuenta de email que se va a usar para enviar correos automatizados','2025-06-17 15:28:56',NULL,1,NULL),(2795,1,'Contraseña del email','Contraseña del email','2025-06-17 15:28:56',NULL,1,NULL),(2796,1,'Contraseña de la cuenta de email que se va a usar para enviar correos automatizados','Contraseña de la cuenta de email que se va a usar para enviar correos automatizados','2025-06-17 15:28:56',NULL,1,NULL),(2797,1,'Servicio de email','Servicio de email','2025-06-17 15:28:56',NULL,1,NULL),(2798,1,'El servicio que utiliza la cuenta de email, ejemplo: \"smtp.gmail.com\"','El servicio que utiliza la cuenta de email, ejemplo: \"smtp.gmail.com\"','2025-06-17 15:28:56',NULL,1,NULL),(2799,1,'Minutos de inactividad','Minutos de inactividad','2025-06-17 15:28:56',NULL,1,NULL),(2800,1,'La cantidad de tiempo en minutos que tardará en cerrar la sesión por inactividad al usuario','La cantidad de tiempo en minutos que tardará en cerrar la sesión por inactividad al usuario','2025-06-17 15:28:56',NULL,1,NULL),(2801,1,'Descripción','Descripción','2025-06-17 15:28:56',NULL,1,NULL),(2802,1,'Empresas','Empresas','2025-06-17 15:28:56',NULL,1,NULL),(2803,1,'Plantilla','Plantilla','2025-06-17 15:28:56',NULL,1,NULL),(2804,1,'Selecciona una plantilla','Selecciona una plantilla','2025-06-17 15:28:56',NULL,1,NULL),(2805,1,'Idioma','Idioma','2025-06-17 15:28:56',NULL,1,NULL),(2806,1,'Selecciona un idioma','Selecciona un idioma','2025-06-17 15:28:56',NULL,1,NULL),(2807,1,'Usuarios','Usuarios','2025-06-17 15:28:56',NULL,1,NULL),(2808,1,'Selecciona los usuarios','Selecciona los usuarios','2025-06-17 15:28:56',NULL,1,NULL),(2809,1,'Título del mail','Título del mail','2025-06-17 15:28:56',NULL,1,NULL),(2810,1,'Cuerpo del mensaje','Cuerpo del mensaje','2025-06-17 15:28:56',NULL,1,NULL),(2811,1,'Palabras','Palabras','2025-06-17 15:28:57',NULL,1,NULL),(2812,1,'Registro creado correctamente','Registro creado correctamente','2025-06-17 15:28:57',NULL,1,NULL),(2813,1,'Ha ocurrido un error creando el registro','Ha ocurrido un error creando el registro','2025-06-17 15:28:57',NULL,1,NULL),(2814,1,'Ha ocurrido un error creando el registro','Ha ocurrido un error creando el registro','2025-06-17 15:28:57',NULL,1,NULL),(2815,1,'Todos los campos deben de ser rellenados','Todos los campos deben de ser rellenados','2025-06-17 15:28:57',NULL,1,NULL),(2816,1,'Plantilla de correo','Plantilla de correo','2025-06-17 15:28:57',NULL,1,NULL),(2817,1,'Enviando','Enviando','2025-06-17 15:28:57',NULL,1,NULL),(2818,1,'Enviar','Enviar','2025-06-17 15:28:57',NULL,1,NULL),(2819,1,'Todos los campos deben de ser rellenados','Todos los campos deben de ser rellenados','2025-06-17 15:28:57',NULL,1,NULL),(2820,1,'Idioma','Idioma','2025-06-17 15:28:57',NULL,1,NULL),(2821,1,'Datos para el idioma','Datos para el idioma','2025-06-17 15:28:57',NULL,1,NULL),(2822,1,'Nombre del idioma','Nombre del idioma','2025-06-17 15:28:57',NULL,1,NULL),(2823,1,'Activo','Activo','2025-06-17 15:28:57',NULL,1,NULL),(2824,1,'Idiomas','Idiomas','2025-06-17 15:28:57',NULL,1,NULL),(2825,1,'Fecha de registro','Fecha de registro','2025-06-17 15:28:57',NULL,1,NULL),(2826,1,'Mas datos','Mas datos','2025-06-17 15:28:57',NULL,1,NULL),(2827,1,'Log de usuarios','Log de usuarios','2025-06-17 15:28:57',NULL,1,NULL),(2828,1,'Pais','Pais','2025-06-17 15:28:57',NULL,1,NULL),(2829,1,'Datos para el pais','Datos para el pais','2025-06-17 15:28:57',NULL,1,NULL),(2830,1,'Nombre del pais','Nombre del pais','2025-06-17 15:28:57',NULL,1,NULL),(2831,1,'Paises','Paises','2025-06-17 15:28:57',NULL,1,NULL),(2832,1,'Tipos de archivo','Tipos de archivo','2025-06-17 15:28:57',NULL,1,NULL),(2833,1,'Secciones','Secciones','2025-06-17 15:28:57',NULL,1,NULL),(2834,1,'Traducciones','Traducciones','2025-06-17 15:28:58',NULL,1,NULL),(2835,1,'Roles','Roles','2025-06-17 15:28:58',NULL,1,NULL),(2836,1,'Permisos','Permisos','2025-06-17 15:28:58',NULL,1,NULL),(2837,1,'Usuarios','Usuarios','2025-06-17 15:28:58',NULL,1,NULL),(2838,1,'Movimientos','Movimientos','2025-06-17 15:28:58',NULL,1,NULL),(2839,1,'Controlador','Controlador','2025-06-17 15:28:58',NULL,1,NULL),(2840,1,'Palets','Palets','2025-06-17 15:28:58',NULL,1,NULL),(2841,1,'Datos para el rol','Datos para el rol','2025-06-17 15:28:58',NULL,1,NULL),(2842,1,'Nombre del rol','Nombre del rol','2025-06-17 15:28:58',NULL,1,NULL),(2843,1,'Pantalla de inicio','Pantalla de inicio','2025-06-17 15:28:58',NULL,1,NULL),(2844,1,'Selecciona una pantalla de inicio','Selecciona una pantalla de inicio','2025-06-17 15:28:58',NULL,1,NULL),(2845,1,'Muestra el nombre de la empresa','Muestra el nombre de la empresa','2025-06-17 15:28:58',NULL,1,NULL),(2846,1,'Datos para la sección','Datos para la sección','2025-06-17 15:28:58',NULL,1,NULL),(2847,1,'Nombre de la sección','Nombre de la sección','2025-06-17 15:28:58',NULL,1,NULL),(2848,1,'Secciones','Secciones','2025-06-17 15:28:58',NULL,1,NULL),(2849,1,'Fichero','Fichero','2025-06-17 15:28:58',NULL,1,NULL),(2850,1,'Imagen','Imagen','2025-06-17 15:28:58',NULL,1,NULL),(2851,1,'Datos para el tipo de archivo','Datos para el tipo de archivo','2025-06-17 15:28:58',NULL,1,NULL),(2852,1,'Selecciona una sección','Selecciona una sección','2025-06-17 15:28:58',NULL,1,NULL),(2853,1,'Nombre del tipo de archivo','Nombre del tipo de archivo','2025-06-17 15:28:58',NULL,1,NULL),(2854,1,'Orden','Orden','2025-06-17 15:28:58',NULL,1,NULL),(2855,1,'Tipo','Tipo','2025-06-17 15:28:58',NULL,1,NULL),(2856,1,'Selecciona un tipo','Selecciona un tipo','2025-06-17 15:28:59',NULL,1,NULL),(2857,1,'Multiple','Multiple','2025-06-17 15:28:59',NULL,1,NULL),(2858,1,'Tipos de archivo','Tipos de archivo','2025-06-17 15:28:59',NULL,1,NULL),(2859,1,'Traducción','Traducción','2025-06-17 15:28:59',NULL,1,NULL),(2860,1,'Datos para la traducción','Datos para la traducción','2025-06-17 15:28:59',NULL,1,NULL),(2861,1,'Clave','Clave','2025-06-17 15:28:59',NULL,1,NULL),(2862,1,'Clave de la traducción','Clave de la traducción','2025-06-17 15:28:59',NULL,1,NULL),(2863,1,'Valor de la traducción en','Valor de la traducción en','2025-06-17 15:28:59',NULL,1,NULL),(2864,1,'Traducciones','Traducciones','2025-06-17 15:28:59',NULL,1,NULL),(2865,1,'Las imagenes deben de tener el formato correcto','Las imagenes deben de tener el formato correcto','2025-06-17 15:28:59',NULL,1,NULL),(2866,1,'El email debe de tener el formato correcto','El email debe de tener el formato correcto','2025-06-17 15:28:59',NULL,1,NULL),(2867,1,'El email no debe estar registrado en el sistema.','El email no debe estar registrado en el sistema.','2025-06-17 15:28:59',NULL,1,NULL),(2868,1,'Ha ocurrido un error creando el registro','Ha ocurrido un error creando el registro','2025-06-17 15:28:59',NULL,1,NULL),(2869,1,'Usuario','Usuario','2025-06-17 15:28:59',NULL,1,NULL),(2870,1,'Datos para el Usuario','Datos para el Usuario','2025-06-17 15:28:59',NULL,1,NULL),(2871,1,'Selecciona un rol','Selecciona un rol','2025-06-17 15:28:59',NULL,1,NULL),(2872,1,'Idioma','Idioma','2025-06-17 15:28:59',NULL,1,NULL),(2873,1,'Selecciona un idioma','Selecciona un idioma','2025-06-17 15:28:59',NULL,1,NULL),(2874,1,'Teléfono','Teléfono','2025-06-17 15:28:59',NULL,1,NULL),(2875,1,'Teléfono','Teléfono','2025-06-17 15:28:59',NULL,1,NULL),(2876,1,'Usuarios','Usuarios','2025-06-17 15:28:59',NULL,1,NULL),(2877,1,'Seleccione un archivo','Seleccione un archivo','2025-06-17 15:28:59',NULL,1,NULL),(2878,1,'Solo se pueden insertar imagenes en el campo','Solo se pueden insertar imagenes en el campo','2025-06-17 15:29:00',NULL,1,NULL),(2879,1,'El tamaño total de los archivos seleccionados excede el limite de','El tamaño total de los archivos seleccionados excede el limite de','2025-06-17 15:29:00',NULL,1,NULL),(2880,1,'Elegir','Elegir','2025-06-17 15:29:00',NULL,1,NULL),(2881,1,'Hoy','Hoy','2025-06-17 15:29:00',NULL,1,NULL),(2882,1,'Significado de los colores:','Significado de los colores:','2025-06-17 15:29:00',NULL,1,NULL),(2883,1,'Disponible','Disponible','2025-06-17 15:29:00',NULL,1,NULL),(2884,1,'No disponible','No disponible','2025-06-17 15:29:00',NULL,1,NULL),(2885,1,'Día previamente disponible que ha sido reservado para un evento','Día previamente disponible que ha sido reservado para un evento','2025-06-17 15:29:00',NULL,1,NULL),(2886,1,'No ha sido posible eliminar el registro ya que tiene dependencias.','No ha sido posible eliminar el registro ya que tiene dependencias.','2025-06-17 15:29:00',NULL,1,NULL),(2887,1,'NO','NO','2025-06-17 15:29:00',NULL,1,NULL),(2888,1,'SI','SI','2025-06-17 15:29:00',NULL,1,NULL),(2889,1,'Nuevo','Nuevo','2025-06-17 15:29:00',NULL,1,NULL),(2890,1,'Descargar','Descargar','2025-06-17 15:29:00',NULL,1,NULL),(2891,1,'Mostrar','Mostrar','2025-06-17 15:29:00',NULL,1,NULL),(2892,1,'Enviar correos','Enviar correos','2025-06-17 15:29:00',NULL,1,NULL),(2893,1,'Seleccionar operador','Seleccionar operador','2025-06-17 15:29:00',NULL,1,NULL),(2894,1,'Buscar por palabra clave','Buscar por palabra clave','2025-06-17 15:29:00',NULL,1,NULL),(2895,1,'Limpiar filtros','Limpiar filtros','2025-06-17 15:29:00',NULL,1,NULL),(2896,1,'¿Eliminar','¿Eliminar','2025-06-17 15:29:00',NULL,1,NULL),(2897,1,'¿Esta seguro de que desea eliminar el siguiente registro','¿Esta seguro de que desea eliminar el siguiente registro','2025-06-17 15:29:00',NULL,1,NULL),(2898,1,'Opciones','Opciones','2025-06-17 15:29:00',NULL,1,NULL),(2899,1,'Descargar archivo CSV','Descargar archivo CSV','2025-06-17 15:29:00',NULL,1,NULL),(2900,1,'Registros mostrados','Registros mostrados','2025-06-17 15:29:01',NULL,1,NULL),(2901,1,'Todos los registros','Todos los registros','2025-06-17 15:29:01',NULL,1,NULL),(2902,1,'Registro editado correctamente','Registro editado correctamente','2025-06-17 15:29:01',NULL,1,NULL),(2903,1,'Registro insertado correctamente','Registro insertado correctamente','2025-06-17 15:29:01',NULL,1,NULL),(2904,1,'Limpiar','Limpiar','2025-06-17 15:29:01',NULL,1,NULL),(2905,1,'OpcionesActivoSN','OpcionesActivoSN','2025-06-17 15:29:01',NULL,1,NULL),(2906,1,'Aplicar','Aplicar','2025-06-17 15:29:01',NULL,1,NULL),(2907,1,'Selecciona una opción','Selecciona una opción','2025-06-17 15:29:01',NULL,1,NULL),(2908,1,'Email enviado correctamente.','Email enviado correctamente.','2025-06-17 15:29:01',NULL,1,NULL),(2909,1,'Registro elmininado correctamente.','Registro elmininado correctamente.','2025-06-17 15:29:01',NULL,1,NULL),(2910,1,'El registro no se puede eliminar porque tiene otros registros hijos.','El registro no se puede eliminar porque tiene otros registros hijos.','2025-06-17 15:29:01',NULL,1,NULL),(2911,1,'Mostrando','Mostrando','2025-06-17 15:29:01',NULL,1,NULL),(2912,1,'a','a','2025-06-17 15:29:01',NULL,1,NULL),(2913,1,'de','de','2025-06-17 15:29:01',NULL,1,NULL),(2914,1,'registros','registros','2025-06-17 15:29:01',NULL,1,NULL),(2915,1,'Buscar por','Buscar por','2025-06-17 15:29:01',NULL,1,NULL),(2916,1,'No se han encontrado registros','No se han encontrado registros','2025-06-17 15:29:01',NULL,1,NULL),(2917,1,'Realiza una búsqueda para mostrar los datos','Realiza una búsqueda para mostrar los datos','2025-06-17 15:29:01',NULL,1,NULL),(2918,1,'¿Eliminar registro?','¿Eliminar registro?','2025-06-17 15:29:01',NULL,1,NULL),(2919,1,'Acciones','Acciones','2025-06-17 15:29:01',NULL,1,NULL),(2920,1,'¿Está seguro de que desea eliminar este registro?','¿Está seguro de que desea eliminar este registro?','2025-06-17 15:29:01',NULL,1,NULL),(2921,1,'Descargar archivo CSV','Descargar archivo CSV','2025-06-17 15:29:01',NULL,1,NULL),(2922,1,'Registros mostrados','Registros mostrados','2025-06-17 15:29:01',NULL,1,NULL),(2923,1,'Todos los registros','Todos los registros','2025-06-17 15:29:02',NULL,1,NULL),(2924,1,'El sistema ha generado el siguiente Qr para completar el proceso de registro y activar una cuenta, puede escanear el código QR que se muestra a continuación con un dispositivo móvil.','El sistema ha generado el siguiente Qr para completar el proceso de registro y activar una cuenta, puede escanear el código QR que se muestra a continuación con un dispositivo móvil.','2025-06-17 15:29:02',NULL,1,NULL),(2925,1,'o pulsar el siguiente enlance','o pulsar el siguiente enlance','2025-06-17 15:29:02',NULL,1,NULL),(2926,1,'También tiene la posibilidad de enviarlo por mail introduciendo el email destinatario en el siguiente campo','También tiene la posibilidad de enviarlo por mail introduciendo el email destinatario en el siguiente campo','2025-06-17 15:29:02',NULL,1,NULL),(2927,1,'Registro editado correctamente','Registro editado correctamente','2025-06-17 15:29:02',NULL,1,NULL),(2928,1,'Registro insertado correctamente','Registro insertado correctamente','2025-06-17 15:29:02',NULL,1,NULL),(2929,1,'Registro elmininado correctamente.','Registro elmininado correctamente.','2025-06-17 15:29:02',NULL,1,NULL),(2930,1,'Cerrar sesión','Cerrar sesión','2025-06-17 15:29:02',NULL,1,NULL),(2931,1,'Perfil','Perfil','2025-06-17 15:29:02',NULL,1,NULL),(2932,3,'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.','Your session has expired. Please log in again.','2025-06-17 15:28:55',NULL,1,NULL),(2933,3,'Nombre','Name','2025-06-17 15:28:55',NULL,1,NULL),(2934,3,'Temperatura','Temperature','2025-06-17 15:28:55',NULL,1,NULL),(2935,3,'Humedad','Humidity','2025-06-17 15:28:55',NULL,1,NULL),(2936,3,'Presión','Pressure','2025-06-17 15:28:55',NULL,1,NULL),(2937,3,'Movimientos de Palets','Pallet Movements','2025-06-17 15:28:55',NULL,1,NULL),(2938,3,'Tabla','Table','2025-06-17 15:28:55',NULL,1,NULL),(2939,3,'Archivo','File','2025-06-17 15:28:55',NULL,1,NULL),(2940,3,'Archivos','Files','2025-06-17 15:28:55',NULL,1,NULL),(2941,3,'Todos los campos deben de ser rellenados','All fields must be filled','2025-06-17 15:28:55',NULL,1,NULL),(2942,3,'Las imagenes deben de tener el formato correcto','Images must have the correct format','2025-06-17 15:28:55',NULL,1,NULL),(2943,3,'El email debe de tener el formato correcto','Email must have the correct format','2025-06-17 15:28:55',NULL,1,NULL),(2944,3,'Ha ocurrido un error creando el registro','An error occurred while creating the record','2025-06-17 15:28:55',NULL,1,NULL),(2945,3,'Editar','Edit','2025-06-17 15:28:55',NULL,1,NULL),(2946,3,'Ver','View','2025-06-17 15:28:55',NULL,1,NULL),(2947,3,'Nueva','New','2025-06-17 15:28:55',NULL,1,NULL),(2948,3,'Empresa','Company','2025-06-17 15:28:55',NULL,1,NULL),(2949,3,'Guardando','Saving','2025-06-17 15:28:55',NULL,1,NULL),(2950,3,'Guardar','Save','2025-06-17 15:28:55',NULL,1,NULL),(2951,3,'Cancelar','Cancel','2025-06-17 15:28:55',NULL,1,NULL),(2952,3,'Datos para la empresa','Company data','2025-06-17 15:28:56',NULL,1,NULL),(2953,3,'Código','Code','2025-06-17 15:28:56',NULL,1,NULL),(2954,3,'Código de la empresa','Company code','2025-06-17 15:28:56',NULL,1,NULL),(2955,3,'Nombre de la empresa','Company name','2025-06-17 15:28:56',NULL,1,NULL),(2956,3,'Descripción','Description','2025-06-17 15:28:56',NULL,1,NULL),(2957,3,'Descripción de la empresa','Company description','2025-06-17 15:28:56',NULL,1,NULL),(2958,3,'Email de la empresa','Company email','2025-06-17 15:28:56',NULL,1,NULL),(2959,3,'Dirección de la cuenta de email que se va a usar para enviar correos automatizados','Email account address to be used for sending automated emails','2025-06-17 15:28:56',NULL,1,NULL),(2960,3,'Contraseña del email','Email password','2025-06-17 15:28:56',NULL,1,NULL),(2961,3,'Contraseña de la cuenta de email que se va a usar para enviar correos automatizados','Password for the email account to be used for sending automated emails','2025-06-17 15:28:56',NULL,1,NULL),(2962,3,'Servicio de email','Email service','2025-06-17 15:28:56',NULL,1,NULL),(2963,3,'El servicio que utiliza la cuenta de email, ejemplo: \"smtp.gmail.com\"','The service used by the email account, example: \"smtp.gmail.com\"','2025-06-17 15:28:56',NULL,1,NULL),(2964,3,'Minutos de inactividad','Inactivity minutes','2025-06-17 15:28:56',NULL,1,NULL),(2965,3,'La cantidad de tiempo en minutos que tardará en cerrar la sesión por inactividad al usuario','The amount of time in minutes before the user session is closed due to inactivity','2025-06-17 15:28:56',NULL,1,NULL),(2966,3,'Descripción','Description','2025-06-17 15:28:56',NULL,1,NULL),(2967,3,'Empresas','Companies','2025-06-17 15:28:56',NULL,1,NULL),(2968,3,'Plantilla','Template','2025-06-17 15:28:56',NULL,1,NULL),(2969,3,'Selecciona una plantilla','Select a template','2025-06-17 15:28:56',NULL,1,NULL),(2970,3,'Idioma','Language','2025-06-17 15:28:56',NULL,1,NULL),(2971,3,'Selecciona un idioma','Select a language','2025-06-17 15:28:56',NULL,1,NULL),(2972,3,'Usuarios','Users','2025-06-17 15:28:56',NULL,1,NULL),(2973,3,'Selecciona los usuarios','Select users','2025-06-17 15:28:56',NULL,1,NULL),(2974,3,'Título del mail','Email subject','2025-06-17 15:28:56',NULL,1,NULL),(2975,3,'Cuerpo del mensaje','Message body','2025-06-17 15:28:56',NULL,1,NULL),(2976,3,'Palabras','Words','2025-06-17 15:28:57',NULL,1,NULL),(2977,3,'Registro creado correctamente','Record created successfully','2025-06-17 15:28:57',NULL,1,NULL),(2978,3,'Ha ocurrido un error creando el registro','An error occurred while creating the record','2025-06-17 15:28:57',NULL,1,NULL),(2979,3,'Todos los campos deben de ser rellenados','All fields must be filled','2025-06-17 15:28:57',NULL,1,NULL),(2980,3,'Plantilla de correo','Email template','2025-06-17 15:28:57',NULL,1,NULL),(2981,3,'Enviando','Sending','2025-06-17 15:28:57',NULL,1,NULL),(2982,3,'Enviar','Send','2025-06-17 15:28:57',NULL,1,NULL),(2983,3,'Idioma','Language','2025-06-17 15:28:57',NULL,1,NULL),(2984,3,'Datos para el idioma','Language data','2025-06-17 15:28:57',NULL,1,NULL),(2985,3,'Nombre del idioma','Language name','2025-06-17 15:28:57',NULL,1,NULL),(2986,3,'Activo','Active','2025-06-17 15:28:57',NULL,1,NULL),(2987,3,'Idiomas','Languages','2025-06-17 15:28:57',NULL,1,NULL),(2988,3,'Fecha de registro','Registration date','2025-06-17 15:28:57',NULL,1,NULL),(2989,3,'Mas datos','More data','2025-06-17 15:28:57',NULL,1,NULL),(2990,3,'Log de usuarios','User log','2025-06-17 15:28:57',NULL,1,NULL),(2991,3,'Pais','Country','2025-06-17 15:28:57',NULL,1,NULL),(2992,3,'Datos para el pais','Country data','2025-06-17 15:28:57',NULL,1,NULL),(2993,3,'Nombre del pais','Country name','2025-06-17 15:28:57',NULL,1,NULL),(2994,3,'Paises','Countries','2025-06-17 15:28:57',NULL,1,NULL),(2995,3,'Tipos de archivo','File types','2025-06-17 15:28:57',NULL,1,NULL),(2996,3,'Secciones','Sections','2025-06-17 15:28:57',NULL,1,NULL),(2997,3,'Traducciones','Translations','2025-06-17 15:28:58',NULL,1,NULL),(2998,3,'Roles','Roles','2025-06-17 15:28:58',NULL,1,NULL),(2999,3,'Permisos','Permissions','2025-06-17 15:28:58',NULL,1,NULL),(3000,3,'Usuarios','Users','2025-06-17 15:28:58',NULL,1,NULL),(3001,3,'Movimientos','Movements','2025-06-17 15:28:58',NULL,1,NULL),(3002,3,'Controlador','Controller','2025-06-17 15:28:58',NULL,1,NULL),(3003,3,'Palets','Pallets','2025-06-17 15:28:58',NULL,1,NULL),(3004,3,'Datos para el rol','Role data','2025-06-17 15:28:58',NULL,1,NULL),(3005,3,'Nombre del rol','Role name','2025-06-17 15:28:58',NULL,1,NULL),(3006,3,'Pantalla de inicio','Home screen','2025-06-17 15:28:58',NULL,1,NULL),(3007,3,'Selecciona una pantalla de inicio','Select a home screen','2025-06-17 15:28:58',NULL,1,NULL),(3008,3,'Muestra el nombre de la empresa','Show company name','2025-06-17 15:28:58',NULL,1,NULL),(3009,3,'Datos para la sección','Section data','2025-06-17 15:28:58',NULL,1,NULL),(3010,3,'Nombre de la sección','Section name','2025-06-17 15:28:58',NULL,1,NULL),(3011,3,'Secciones','Sections','2025-06-17 15:28:58',NULL,1,NULL),(3012,3,'Fichero','File','2025-06-17 15:28:58',NULL,1,NULL),(3013,3,'Imagen','Image','2025-06-17 15:28:58',NULL,1,NULL),(3014,3,'Datos para el tipo de archivo','File type data','2025-06-17 15:28:58',NULL,1,NULL),(3015,3,'Selecciona una sección','Select a section','2025-06-17 15:28:58',NULL,1,NULL),(3016,3,'Nombre del tipo de archivo','File type name','2025-06-17 15:28:58',NULL,1,NULL),(3017,3,'Orden','Order','2025-06-17 15:28:58',NULL,1,NULL),(3018,3,'Tipo','Type','2025-06-17 15:28:58',NULL,1,NULL),(3019,3,'Selecciona un tipo','Select a type','2025-06-17 15:28:59',NULL,1,NULL),(3020,3,'Multiple','Multiple','2025-06-17 15:28:59',NULL,1,NULL),(3021,3,'Tipos de archivo','File types','2025-06-17 15:28:59',NULL,1,NULL),(3022,3,'Traducción','Translation','2025-06-17 15:28:59',NULL,1,NULL),(3023,3,'Datos para la traducción','Translation data','2025-06-17 15:28:59',NULL,1,NULL),(3024,3,'Clave','Key','2025-06-17 15:28:59',NULL,1,NULL),(3025,3,'Clave de la traducción','Translation key','2025-06-17 15:28:59',NULL,1,NULL),(3026,3,'Valor de la traducción en','Translation value in','2025-06-17 15:28:59',NULL,1,NULL),(3027,3,'Traducciones','Translations','2025-06-17 15:28:59',NULL,1,NULL),(3028,3,'El email no debe estar registrado en el sistema.','Email must not be registered in the system.','2025-06-17 15:28:59',NULL,1,NULL),(3029,3,'Usuario','User','2025-06-17 15:28:59',NULL,1,NULL),(3030,3,'Datos para el Usuario','User data','2025-06-17 15:28:59',NULL,1,NULL),(3031,3,'Selecciona un rol','Select a role','2025-06-17 15:28:59',NULL,1,NULL),(3032,3,'Teléfono','Phone','2025-06-17 15:28:59',NULL,1,NULL),(3033,3,'Seleccione un archivo','Select a file','2025-06-17 15:28:59',NULL,1,NULL),(3034,3,'Solo se pueden insertar imagenes en el campo','Only images can be inserted in the field','2025-06-17 15:29:00',NULL,1,NULL),(3035,3,'El tamaño total de los archivos seleccionados excede el limite de','Total size of selected files exceeds the limit of','2025-06-17 15:29:00',NULL,1,NULL),(3036,3,'Elegir','Choose','2025-06-17 15:29:00',NULL,1,NULL),(3037,3,'Hoy','Today','2025-06-17 15:29:00',NULL,1,NULL),(3038,3,'Significado de los colores:','Color meaning:','2025-06-17 15:29:00',NULL,1,NULL),(3039,3,'Disponible','Available','2025-06-17 15:29:00',NULL,1,NULL),(3040,3,'No disponible','Not available','2025-06-17 15:29:00',NULL,1,NULL),(3041,3,'Día previamente disponible que ha sido reservado para un evento','Previously available day that has been booked for an event','2025-06-17 15:29:00',NULL,1,NULL),(3042,3,'No ha sido posible eliminar el registro ya que tiene dependencias.','It was not possible to delete the record because it has dependencies.','2025-06-17 15:29:00',NULL,1,NULL),(3043,3,'NO','NO','2025-06-17 15:29:00',NULL,1,NULL),(3044,3,'SI','YES','2025-06-17 15:29:00',NULL,1,NULL),(3045,3,'Nuevo','New','2025-06-17 15:29:00',NULL,1,NULL),(3046,3,'Descargar','Download','2025-06-17 15:29:00',NULL,1,NULL),(3047,3,'Mostrar','Show','2025-06-17 15:29:00',NULL,1,NULL),(3048,3,'Enviar correos','Send emails','2025-06-17 15:29:00',NULL,1,NULL),(3049,3,'Seleccionar operador','Select operator','2025-06-17 15:29:01',NULL,1,NULL),(3050,3,'Buscar por palabra clave','Search by keyword','2025-06-17 15:29:01',NULL,1,NULL),(3051,3,'Limpiar filtros','Clear filters','2025-06-17 15:29:01',NULL,1,NULL),(3052,3,'¿Eliminar','Delete?','2025-06-17 15:29:01',NULL,1,NULL),(3053,3,'¿Esta seguro de que desea eliminar el siguiente registro','Are you sure you want to delete the following record','2025-06-17 15:29:01',NULL,1,NULL),(3054,3,'Opciones','Options','2025-06-17 15:29:01',NULL,1,NULL),(3055,3,'Descargar archivo CSV','Download CSV file','2025-06-17 15:29:01',NULL,1,NULL),(3056,3,'Registros mostrados','Records displayed','2025-06-17 15:29:01',NULL,1,NULL),(3057,3,'Todos los registros','All records','2025-06-17 15:29:01',NULL,1,NULL),(3058,3,'Registro editado correctamente','Record successfully edited','2025-06-17 15:29:01',NULL,1,NULL),(3059,3,'Registro insertado correctamente','Record successfully inserted','2025-06-17 15:29:01',NULL,1,NULL),(3060,3,'Limpiar','Clear','2025-06-17 15:29:01',NULL,1,NULL),(3061,3,'OpcionesActivoSN','OptionsActiveYN','2025-06-17 15:29:01',NULL,1,NULL),(3062,3,'Aplicar','Apply','2025-06-17 15:29:01',NULL,1,NULL),(3063,3,'Selecciona una opción','Select an option','2025-06-17 15:29:01',NULL,1,NULL),(3064,3,'Email enviado correctamente.','Email sent successfully.','2025-06-17 15:29:01',NULL,1,NULL),(3065,3,'Registro elmininado correctamente.','Record successfully deleted.','2025-06-17 15:29:01',NULL,1,NULL),(3066,3,'El registro no se puede eliminar porque tiene otros registros hijos.','The record cannot be deleted because it has child records.','2025-06-17 15:29:01',NULL,1,NULL),(3067,3,'Mostrando','Showing','2025-06-17 15:29:01',NULL,1,NULL),(3068,3,'a','to','2025-06-17 15:29:01',NULL,1,NULL),(3069,3,'de','of','2025-06-17 15:29:01',NULL,1,NULL),(3070,3,'registros','records','2025-06-17 15:29:01',NULL,1,NULL),(3071,3,'Buscar por','Search by','2025-06-17 15:29:01',NULL,1,NULL),(3072,3,'No se han encontrado registros','No records found','2025-06-17 15:29:01',NULL,1,NULL),(3073,3,'Realiza una búsqueda para mostrar los datos','Perform a search to display the data','2025-06-17 15:29:01',NULL,1,NULL),(3074,3,'¿Eliminar registro?','Delete record?','2025-06-17 15:29:01',NULL,1,NULL),(3075,3,'Acciones','Actions','2025-06-17 15:29:01',NULL,1,NULL),(3076,3,'¿Está seguro de que desea eliminar este registro?','Are you sure you want to delete this record?','2025-06-17 15:29:01',NULL,1,NULL),(3077,3,'El sistema ha generado el siguiente Qr para completar el proceso de registro y activar una cuenta, puede escanear el código QR que se muestra a continuación con un dispositivo móvil.','The system has generated the following QR to complete the registration process and activate an account. You can scan the QR code below with a mobile device.','2025-06-17 15:29:02',NULL,1,NULL),(3078,3,'o pulsar el siguiente enlance','or click the following link','2025-06-17 15:29:02',NULL,1,NULL),(3079,3,'También tiene la posibilidad de enviarlo por mail introduciendo el email destinatario en el siguiente campo','You also have the option to send it by email by entering the recipient\'s email address in the field below','2025-06-17 15:29:02',NULL,1,NULL),(3080,3,'Cerrar sesión','Log out','2025-06-17 15:29:02',NULL,1,NULL),(3081,3,'Perfil','Profile','2025-06-17 15:29:02',NULL,1,NULL),(3082,17,'Sesión cerrada por inactividad','由于不活动，会话已关闭','2025-06-17 15:28:55',NULL,1,NULL),(3083,17,'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.','您的会话已过期，请重新登录','2025-06-17 15:28:55',NULL,1,NULL),(3084,17,'Nombre','名称','2025-06-17 15:28:55',NULL,1,NULL),(3085,17,'Temperatura','温度','2025-06-17 15:28:55',NULL,1,NULL),(3086,17,'Humedad','湿度','2025-06-17 15:28:55',NULL,1,NULL),(3087,17,'Presión','压力','2025-06-17 15:28:55',NULL,1,NULL),(3088,17,'Movimientos de Palets','托盘移动','2025-06-17 15:28:55',NULL,1,NULL),(3089,17,'Tabla','表格','2025-06-17 15:28:55',NULL,1,NULL),(3090,17,'Archivo','文件','2025-06-17 15:28:55',NULL,1,NULL),(3091,17,'Archivos','文件','2025-06-17 15:28:55',NULL,1,NULL),(3092,17,'Todos los campos deben de ser rellenados','所有字段必须填写','2025-06-17 15:28:55',NULL,1,NULL),(3093,17,'Las imagenes deben de tener el formato correcto','图片必须具有正确的格式','2025-06-17 15:28:55',NULL,1,NULL),(3094,17,'El email debe de tener el formato correcto','电子邮件必须具有正确的格式','2025-06-17 15:28:55',NULL,1,NULL),(3095,17,'Ha ocurrido un error creando el registro','创建记录时出错','2025-06-17 15:28:55',NULL,1,NULL),(3096,17,'Editar','编辑','2025-06-17 15:28:55',NULL,1,NULL),(3097,17,'Ver','查看','2025-06-17 15:28:55',NULL,1,NULL),(3098,17,'Nueva','新建','2025-06-17 15:28:55',NULL,1,NULL),(3099,17,'Empresa','公司','2025-06-17 15:28:55',NULL,1,NULL),(3100,17,'Guardando','保存中','2025-06-17 15:28:55',NULL,1,NULL),(3101,17,'Guardar','保存','2025-06-17 15:28:55',NULL,1,NULL),(3102,17,'Cancelar','取消','2025-06-17 15:28:55',NULL,1,NULL),(3103,17,'Datos para la empresa','公司数据','2025-06-17 15:28:56',NULL,1,NULL),(3104,17,'Código','代码','2025-06-17 15:28:56',NULL,1,NULL),(3105,17,'Código de la empresa','公司代码','2025-06-17 15:28:56',NULL,1,NULL),(3106,17,'Nombre de la empresa','公司名称','2025-06-17 15:28:56',NULL,1,NULL),(3107,17,'Descripción','描述','2025-06-17 15:28:56',NULL,1,NULL),(3108,17,'Descripción de la empresa','公司描述','2025-06-17 15:28:56',NULL,1,NULL),(3109,17,'Email de la empresa','公司邮箱','2025-06-17 15:28:56',NULL,1,NULL),(3110,17,'Dirección de la cuenta de email que se va a usar para enviar correos automatizados','用于发送自动邮件的电子邮件账户地址','2025-06-17 15:28:56',NULL,1,NULL),(3111,17,'Contraseña del email','邮箱密码','2025-06-17 15:28:56',NULL,1,NULL),(3112,17,'Contraseña de la cuenta de email que se va a usar para enviar correos automatizados','用于发送自动邮件的邮箱账户密码','2025-06-17 15:28:56',NULL,1,NULL),(3113,17,'Servicio de email','邮件服务','2025-06-17 15:28:56',NULL,1,NULL),(3114,17,'El servicio que utiliza la cuenta de email, ejemplo: \"smtp.gmail.com\"','邮箱账户使用的服务，例如：\"smtp.gmail.com\"','2025-06-17 15:28:56',NULL,1,NULL),(3115,17,'Minutos de inactividad','不活动时间(分钟)','2025-06-17 15:28:56',NULL,1,NULL),(3116,17,'La cantidad de tiempo en minutos que tardará en cerrar la sesión por inactividad al usuario','用户因不活动而关闭会话的时间(分钟)','2025-06-17 15:28:56',NULL,1,NULL),(3117,17,'Empresas','公司','2025-06-17 15:28:56',NULL,1,NULL),(3118,17,'Plantilla','模板','2025-06-17 15:28:56',NULL,1,NULL),(3119,17,'Selecciona una plantilla','选择模板','2025-06-17 15:28:56',NULL,1,NULL),(3120,17,'Idioma','语言','2025-06-17 15:28:56',NULL,1,NULL),(3121,17,'Selecciona un idioma','选择语言','2025-06-17 15:28:56',NULL,1,NULL),(3122,17,'Usuarios','用户','2025-06-17 15:28:56',NULL,1,NULL),(3123,17,'Selecciona los usuarios','选择用户','2025-06-17 15:28:56',NULL,1,NULL),(3124,17,'Título del mail','邮件标题','2025-06-17 15:28:56',NULL,1,NULL),(3125,17,'Cuerpo del mensaje','消息正文','2025-06-17 15:28:56',NULL,1,NULL),(3126,17,'Palabras','词语','2025-06-17 15:28:57',NULL,1,NULL),(3127,17,'Registro creado correctamente','记录创建成功','2025-06-17 15:28:57',NULL,1,NULL),(3128,17,'Plantilla de correo','邮件模板','2025-06-17 15:28:57',NULL,1,NULL),(3129,17,'Enviando','发送中','2025-06-17 15:28:57',NULL,1,NULL),(3130,17,'Enviar','发送','2025-06-17 15:28:57',NULL,1,NULL),(3131,17,'Datos para el idioma','语言数据','2025-06-17 15:28:57',NULL,1,NULL),(3132,17,'Nombre del idioma','语言名称','2025-06-17 15:28:57',NULL,1,NULL),(3133,17,'Activo','活跃','2025-06-17 15:28:57',NULL,1,NULL),(3134,17,'Idiomas','语言','2025-06-17 15:28:57',NULL,1,NULL),(3135,17,'Fecha de registro','注册日期','2025-06-17 15:28:57',NULL,1,NULL),(3136,17,'Mas datos','更多数据','2025-06-17 15:28:57',NULL,1,NULL),(3137,17,'Log de usuarios','用户日志','2025-06-17 15:28:57',NULL,1,NULL),(3138,17,'Pais','国家','2025-06-17 15:28:57',NULL,1,NULL),(3139,17,'Datos para el pais','国家数据','2025-06-17 15:28:57',NULL,1,NULL),(3140,17,'Nombre del pais','国家名称','2025-06-17 15:28:57',NULL,1,NULL),(3141,17,'Paises','国家','2025-06-17 15:28:57',NULL,1,NULL),(3142,17,'Tipos de archivo','文件类型','2025-06-17 15:28:57',NULL,1,NULL),(3143,17,'Secciones','部分','2025-06-17 15:28:57',NULL,1,NULL),(3144,17,'Traducciones','翻译','2025-06-17 15:28:58',NULL,1,NULL),(3145,17,'Roles','角色','2025-06-17 15:28:58',NULL,1,NULL),(3146,17,'Permisos','权限','2025-06-17 15:28:58',NULL,1,NULL),(3147,17,'Movimientos','移动','2025-06-17 15:28:58',NULL,1,NULL),(3148,17,'Controlador','控制器','2025-06-17 15:28:58',NULL,1,NULL),(3149,17,'Palets','托盘','2025-06-17 15:28:58',NULL,1,NULL),(3150,17,'Datos para el rol','角色数据','2025-06-17 15:28:58',NULL,1,NULL),(3151,17,'Nombre del rol','角色名称','2025-06-17 15:28:58',NULL,1,NULL),(3152,17,'Pantalla de inicio','主屏幕','2025-06-17 15:28:58',NULL,1,NULL),(3153,17,'Selecciona una pantalla de inicio','选择主屏幕','2025-06-17 15:28:58',NULL,1,NULL),(3154,17,'Muestra el nombre de la empresa','显示公司名称','2025-06-17 15:28:58',NULL,1,NULL),(3155,17,'Datos para la sección','部分数据','2025-06-17 15:28:58',NULL,1,NULL),(3156,17,'Nombre de la sección','部分名称','2025-06-17 15:28:58',NULL,1,NULL),(3157,17,'Fichero','文件','2025-06-17 15:28:58',NULL,1,NULL),(3158,17,'Imagen','图片','2025-06-17 15:28:58',NULL,1,NULL),(3159,17,'Datos para el tipo de archivo','文件类型数据','2025-06-17 15:28:58',NULL,1,NULL),(3160,17,'Selecciona una sección','选择部分','2025-06-17 15:28:58',NULL,1,NULL),(3161,17,'Nombre del tipo de archivo','文件类型名称','2025-06-17 15:28:58',NULL,1,NULL),(3162,17,'Orden','顺序','2025-06-17 15:28:58',NULL,1,NULL),(3163,17,'Tipo','类型','2025-06-17 15:28:58',NULL,1,NULL),(3164,17,'Selecciona un tipo','选择类型','2025-06-17 15:28:59',NULL,1,NULL),(3165,17,'Multiple','多选','2025-06-17 15:28:59',NULL,1,NULL),(3166,17,'Traducción','翻译','2025-06-17 15:28:59',NULL,1,NULL),(3167,17,'Datos para la traducción','翻译数据','2025-06-17 15:28:59',NULL,1,NULL),(3168,17,'Clave','键','2025-06-17 15:28:59',NULL,1,NULL),(3169,17,'Clave de la traducción','翻译键','2025-06-17 15:28:59',NULL,1,NULL),(3170,17,'Valor de la traducción en','翻译值在','2025-06-17 15:28:59',NULL,1,NULL),(3171,17,'El email no debe estar registrado en el sistema.','邮箱不能在系统中已注册','2025-06-17 15:28:59',NULL,1,NULL),(3172,17,'Usuario','用户','2025-06-17 15:28:59',NULL,1,NULL),(3173,17,'Datos para el Usuario','用户数据','2025-06-17 15:28:59',NULL,1,NULL),(3174,17,'Selecciona un rol','选择角色','2025-06-17 15:28:59',NULL,1,NULL),(3175,17,'Teléfono','电话','2025-06-17 15:28:59',NULL,1,NULL),(3176,17,'Seleccione un archivo','选择文件','2025-06-17 15:28:59',NULL,1,NULL),(3177,17,'Solo se pueden insertar imagenes en el campo','只能在该字段插入图片','2025-06-17 15:29:00',NULL,1,NULL),(3178,17,'El tamaño total de los archivos seleccionados excede el limite de','所选文件总大小超过限制','2025-06-17 15:29:00',NULL,1,NULL),(3179,17,'Elegir','选择','2025-06-17 15:29:00',NULL,1,NULL),(3180,17,'Hoy','今天','2025-06-17 15:29:00',NULL,1,NULL),(3181,17,'Significado de los colores:','颜色含义:','2025-06-17 15:29:00',NULL,1,NULL),(3182,17,'Disponible','可用','2025-06-17 15:29:00',NULL,1,NULL),(3183,17,'No disponible','不可用','2025-06-17 15:29:00',NULL,1,NULL),(3184,17,'Día previamente disponible que ha sido reservado para un evento','之前可用但已被活动预订的日期','2025-06-17 15:29:00',NULL,1,NULL),(3185,17,'No ha sido posible eliminar el registro ya que tiene dependencias.','由于存在依赖关系，无法删除记录','2025-06-17 15:29:00',NULL,1,NULL),(3186,17,'NO','否','2025-06-17 15:29:00',NULL,1,NULL),(3187,17,'SI','是','2025-06-17 15:29:00',NULL,1,NULL),(3188,17,'Nuevo','新建','2025-06-17 15:29:00',NULL,1,NULL),(3189,17,'Descargar','下载','2025-06-17 15:29:00',NULL,1,NULL),(3190,17,'Mostrar','显示','2025-06-17 15:29:00',NULL,1,NULL),(3191,17,'Enviar correos','发送邮件','2025-06-17 15:29:00',NULL,1,NULL),(3192,17,'Seleccionar operador','选择操作员','2025-06-17 15:29:00',NULL,1,NULL),(3193,17,'Buscar por palabra clave','按关键词搜索','2025-06-17 15:29:00',NULL,1,NULL),(3194,17,'Limpiar filtros','清除筛选条件','2025-06-17 15:29:00',NULL,1,NULL),(3195,17,'¿Eliminar','删除','2025-06-17 15:29:00',NULL,1,NULL),(3196,17,'¿Esta seguro de que desea eliminar el siguiente registro','您确定要删除此记录吗','2025-06-17 15:29:00',NULL,1,NULL),(3197,17,'Opciones','选项','2025-06-17 15:29:00',NULL,1,NULL),(3198,3,'Buscar','Search','2025-06-17 15:29:02',NULL,1,NULL),(3199,3,'Otros','Others','2025-06-17 15:29:02',NULL,1,NULL),(3200,3,'Tablas de sistema','System tables','2025-06-17 15:29:02',NULL,1,NULL),(3201,17,'Buscar','寻找','2025-06-17 15:29:02',NULL,1,NULL),(3202,17,'Otros','其他的','2025-06-17 15:29:02',NULL,1,NULL),(3203,17,'Tablas de sistema','系统表','2025-06-17 15:29:02',NULL,1,NULL),(3204,17,'Descargar archivo CSV','下载 CSV 文件','2025-06-17 15:29:00',NULL,1,NULL),(3205,17,'Registros mostrados','显示的记录','2025-06-17 15:29:01',NULL,1,NULL),(3206,17,'Todos los registros','所有记录','2025-06-17 15:29:01',NULL,1,NULL),(3207,17,'Registro editado correctamente','记录编辑成功','2025-06-17 15:29:01',NULL,1,NULL),(3208,17,'Registro insertado correctamente','记录插入成功','2025-06-17 15:29:01',NULL,1,NULL),(3209,17,'Limpiar','清除','2025-06-17 15:29:01',NULL,1,NULL),(3210,17,'OpcionesActivoSN','启用选项','2025-06-17 15:29:01',NULL,1,NULL),(3211,17,'Aplicar','应用','2025-06-17 15:29:01',NULL,1,NULL),(3212,17,'Selecciona una opción','选择一个选项','2025-06-17 15:29:01',NULL,1,NULL),(3213,17,'Email enviado correctamente.','邮件发送成功。','2025-06-17 15:29:01',NULL,1,NULL),(3214,17,'Registro elmininado correctamente.','记录删除成功。','2025-06-17 15:29:01',NULL,1,NULL),(3215,17,'El registro no se puede eliminar porque tiene otros registros hijos.','无法删除该记录，因为它有子记录。','2025-06-17 15:29:01',NULL,1,NULL),(3216,17,'Mostrando','正在显示','2025-06-17 15:29:01',NULL,1,NULL),(3217,17,'a','到','2025-06-17 15:29:01',NULL,1,NULL),(3218,17,'de','的','2025-06-17 15:29:01',NULL,1,NULL),(3219,17,'registros','记录','2025-06-17 15:29:01',NULL,1,NULL),(3220,17,'Buscar por','搜索依据','2025-06-17 15:29:01',NULL,1,NULL),(3221,17,'No se han encontrado registros','未找到记录','2025-06-17 15:29:01',NULL,1,NULL),(3222,17,'Realiza una búsqueda para mostrar los datos','请执行搜索以显示数据','2025-06-17 15:29:01',NULL,1,NULL),(3223,17,'¿Eliminar registro?','删除记录？','2025-06-17 15:29:01',NULL,1,NULL),(3224,17,'Acciones','操作','2025-06-17 15:29:01',NULL,1,NULL),(3225,17,'¿Está seguro de que desea eliminar este registro?','您确定要删除此记录吗？','2025-06-17 15:29:01',NULL,1,NULL),(3226,17,'El sistema ha generado el siguiente Qr para completar el proceso de registro y activar una cuenta, puede escanear el código QR que se muestra a continuación con un dispositivo móvil.','系统已生成以下二维码以完成注册流程并激活账户，您可以使用移动设备扫描下方的二维码。','2025-06-17 15:29:02',NULL,1,NULL),(3227,17,'o pulsar el siguiente enlance','或点击以下链接','2025-06-17 15:29:02',NULL,1,NULL),(3228,17,'También tiene la posibilidad de enviarlo por mail introduciendo el email destinatario en el siguiente campo','您也可以在下方输入收件人邮箱以通过邮件发送','2025-06-17 15:29:02',NULL,1,NULL),(3229,17,'Registro editado correctamente','记录编辑成功','2025-06-17 15:29:02',NULL,1,NULL),(3230,17,'Registro insertado correctamente','记录插入成功','2025-06-17 15:29:02',NULL,1,NULL),(3231,17,'Registro elmininado correctamente.','记录删除成功。','2025-06-17 15:29:02',NULL,1,NULL),(3232,17,'Cerrar sesión','注销','2025-06-17 15:29:02',NULL,1,NULL),(3233,17,'Perfil','个人资料','2025-06-17 15:29:02',NULL,1,NULL),(3234,18,'Sesión cerrada por inactividad','Sessão terminada por inatividade','2025-06-17 15:28:55',NULL,1,NULL),(3235,18,'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.','A sua sessão expirou. Por favor, inicie sessão novamente.','2025-06-17 15:28:55',NULL,1,NULL),(3236,18,'Nombre','Nome','2025-06-17 15:28:55',NULL,1,NULL),(3237,18,'Temperatura','Temperatura','2025-06-17 15:28:55',NULL,1,NULL),(3238,18,'Humedad','Humidade','2025-06-17 15:28:55',NULL,1,NULL),(3239,18,'Presión','Pressão','2025-06-17 15:28:55',NULL,1,NULL),(3240,18,'Movimientos de Palets','Movimentos de Paletes','2025-06-17 15:28:55',NULL,1,NULL),(3241,18,'Tabla','Tabela','2025-06-17 15:28:55',NULL,1,NULL),(3242,18,'Archivo','Ficheiro','2025-06-17 15:28:55',NULL,1,NULL),(3243,18,'Archivos','Ficheiros','2025-06-17 15:28:55',NULL,1,NULL),(3244,18,'Todos los campos deben de ser rellenados','Todos os campos devem ser preenchidos','2025-06-17 15:28:55',NULL,1,NULL),(3245,18,'Las imagenes deben de tener el formato correcto','As imagens devem ter o formato correto','2025-06-17 15:28:55',NULL,1,NULL),(3246,18,'El email debe de tener el formato correcto','O e-mail deve ter o formato correto','2025-06-17 15:28:55',NULL,1,NULL),(3247,18,'Ha ocurrido un error creando el registro','Ocorreu um erro ao criar o registo','2025-06-17 15:28:55',NULL,1,NULL),(3248,18,'Editar','Editar','2025-06-17 15:28:55',NULL,1,NULL),(3249,18,'Ver','Ver','2025-06-17 15:28:55',NULL,1,NULL),(3250,18,'Nueva','Nova','2025-06-17 15:28:55',NULL,1,NULL),(3251,18,'Empresa','Empresa','2025-06-17 15:28:55',NULL,1,NULL),(3252,18,'Guardando','A guardar','2025-06-17 15:28:55',NULL,1,NULL),(3253,18,'Guardar','Guardar','2025-06-17 15:28:55',NULL,1,NULL),(3254,18,'Cancelar','Cancelar','2025-06-17 15:28:55',NULL,1,NULL),(3255,18,'Datos para la empresa','Dados para a empresa','2025-06-17 15:28:56',NULL,1,NULL),(3256,18,'Código','Código','2025-06-17 15:28:56',NULL,1,NULL),(3257,18,'Código de la empresa','Código da empresa','2025-06-17 15:28:56',NULL,1,NULL),(3258,18,'Nombre de la empresa','Nome da empresa','2025-06-17 15:28:56',NULL,1,NULL),(3259,18,'Descripción','Descrição','2025-06-17 15:28:56',NULL,1,NULL),(3260,18,'Descripción de la empresa','Descrição da empresa','2025-06-17 15:28:56',NULL,1,NULL),(3261,18,'Email de la empresa','E-mail da empresa','2025-06-17 15:28:56',NULL,1,NULL),(3262,18,'Dirección de la cuenta de email que se va a usar para enviar correos automatizados','Endereço da conta de e-mail que será usada para enviar e-mails automatizados','2025-06-17 15:28:56',NULL,1,NULL),(3263,18,'Contraseña del email','Palavra-passe do e-mail','2025-06-17 15:28:56',NULL,1,NULL),(3264,18,'Contraseña de la cuenta de email que se va a usar para enviar correos automatizados','Palavra-passe da conta de e-mail que será usada para enviar e-mails automatizados','2025-06-17 15:28:56',NULL,1,NULL),(3265,18,'Servicio de email','Serviço de e-mail','2025-06-17 15:28:56',NULL,1,NULL),(3266,18,'El servicio que utiliza la cuenta de email, ejemplo: \"smtp.gmail.com\"','O serviço utilizado pela conta de e-mail, exemplo: \"smtp.gmail.com\"','2025-06-17 15:28:56',NULL,1,NULL),(3267,18,'Minutos de inactividad','Minutos de inatividade','2025-06-17 15:28:56',NULL,1,NULL),(3268,18,'La cantidad de tiempo en minutos que tardará en cerrar la sesión por inactividad al usuario','O tempo em minutos que levará para terminar a sessão por inatividade do utilizador','2025-06-17 15:28:56',NULL,1,NULL),(3269,18,'Descrição','Descrição','2025-06-17 15:28:56',NULL,1,NULL),(3270,18,'Empresas','Empresas','2025-06-17 15:28:56',NULL,1,NULL),(3271,18,'Plantilla','Modelo','2025-06-17 15:28:56',NULL,1,NULL),(3272,18,'Selecciona una plantilla','Selecione um modelo','2025-06-17 15:28:56',NULL,1,NULL),(3273,18,'Idioma','Idioma','2025-06-17 15:28:56',NULL,1,NULL),(3274,18,'Selecciona un idioma','Selecione um idioma','2025-06-17 15:28:56',NULL,1,NULL),(3275,18,'Usuarios','Utilizadores','2025-06-17 15:28:56',NULL,1,NULL),(3276,18,'Selecciona los usuarios','Selecione os utilizadores','2025-06-17 15:28:56',NULL,1,NULL),(3277,18,'Título del mail','Assunto do e-mail','2025-06-17 15:28:56',NULL,1,NULL),(3278,18,'Cuerpo del mensaje','Corpo da mensagem','2025-06-17 15:28:56',NULL,1,NULL),(3279,18,'Palabras','Palavras','2025-06-17 15:28:57',NULL,1,NULL),(3280,18,'Registro creado correctamente','Registo criado corretamente','2025-06-17 15:28:57',NULL,1,NULL),(3281,18,'Ha ocurrido un error creando el registro','Ocorreu um erro ao criar o registo','2025-06-17 15:28:57',NULL,1,NULL),(3282,18,'Todos los campos deben de ser rellenados','Todos os campos devem ser preenchidos','2025-06-17 15:28:57',NULL,1,NULL),(3283,18,'Plantilla de correo','Modelo de e-mail','2025-06-17 15:28:57',NULL,1,NULL),(3284,18,'Enviando','A enviar','2025-06-17 15:28:57',NULL,1,NULL),(3285,18,'Enviar','Enviar','2025-06-17 15:28:57',NULL,1,NULL),(3286,18,'Idioma','Idioma','2025-06-17 15:28:57',NULL,1,NULL),(3287,18,'Datos para el idioma','Dados para o idioma','2025-06-17 15:28:57',NULL,1,NULL),(3288,18,'Nombre del idioma','Nome do idioma','2025-06-17 15:28:57',NULL,1,NULL),(3289,18,'Activo','Ativo','2025-06-17 15:28:57',NULL,1,NULL),(3290,18,'Idiomas','Idiomas','2025-06-17 15:28:57',NULL,1,NULL),(3291,18,'Fecha de registro','Data de registo','2025-06-17 15:28:57',NULL,1,NULL),(3292,18,'Mas datos','Mais dados','2025-06-17 15:28:57',NULL,1,NULL),(3293,18,'Log de usuarios','Registo de utilizadores','2025-06-17 15:28:57',NULL,1,NULL),(3294,18,'Pais','País','2025-06-17 15:28:57',NULL,1,NULL),(3295,18,'Datos para el pais','Dados para o país','2025-06-17 15:28:57',NULL,1,NULL),(3296,18,'Nombre del pais','Nome do país','2025-06-17 15:28:57',NULL,1,NULL),(3297,18,'Paises','Países','2025-06-17 15:28:57',NULL,1,NULL),(3298,18,'Tipos de archivo','Tipos de ficheiro','2025-06-17 15:28:57',NULL,1,NULL),(3299,18,'Secciones','Secções','2025-06-17 15:28:57',NULL,1,NULL),(3300,18,'Traducciones','Traduções','2025-06-17 15:28:58',NULL,1,NULL),(3301,18,'Roles','Funções','2025-06-17 15:28:58',NULL,1,NULL),(3302,18,'Permisos','Permissões','2025-06-17 15:28:58',NULL,1,NULL),(3303,18,'Usuarios','Utilizadores','2025-06-17 15:28:58',NULL,1,NULL),(3304,18,'Movimientos','Movimentos','2025-06-17 15:28:58',NULL,1,NULL),(3305,18,'Controlador','Controlador','2025-06-17 15:28:58',NULL,1,NULL),(3306,18,'Palets','Paletes','2025-06-17 15:28:58',NULL,1,NULL),(3307,18,'Datos para el rol','Dados para a função','2025-06-17 15:28:58',NULL,1,NULL),(3308,18,'Nombre del rol','Nome da função','2025-06-17 15:28:58',NULL,1,NULL),(3309,18,'Pantalla de inicio','Ecrã inicial','2025-06-17 15:28:58',NULL,1,NULL),(3310,18,'Selecciona una pantalla de inicio','Selecione um ecrã inicial','2025-06-17 15:28:58',NULL,1,NULL),(3311,18,'Muestra el nombre de la empresa','Mostra o nome da empresa','2025-06-17 15:28:58',NULL,1,NULL),(3312,18,'Datos para la sección','Dados para a secção','2025-06-17 15:28:58',NULL,1,NULL),(3313,18,'Nombre de la sección','Nome da secção','2025-06-17 15:28:58',NULL,1,NULL),(3314,18,'Secciones','Secções','2025-06-17 15:28:58',NULL,1,NULL),(3315,18,'Fichero','Ficheiro','2025-06-17 15:28:58',NULL,1,NULL),(3316,18,'Imagen','Imagem','2025-06-17 15:28:58',NULL,1,NULL),(3317,18,'Datos para el tipo de archivo','Dados para o tipo de ficheiro','2025-06-17 15:28:58',NULL,1,NULL),(3318,18,'Selecciona una sección','Selecione uma secção','2025-06-17 15:28:58',NULL,1,NULL),(3319,18,'Nombre del tipo de archivo','Nome do tipo de ficheiro','2025-06-17 15:28:58',NULL,1,NULL),(3320,18,'Orden','Ordem','2025-06-17 15:28:58',NULL,1,NULL),(3321,18,'Tipo','Tipo','2025-06-17 15:28:58',NULL,1,NULL),(3322,18,'Selecciona un tipo','Selecione um tipo','2025-06-17 15:28:59',NULL,1,NULL),(3323,18,'Multiple','Múltiplo','2025-06-17 15:28:59',NULL,1,NULL),(3324,18,'Tipos de archivo','Tipos de ficheiro','2025-06-17 15:28:59',NULL,1,NULL),(3325,18,'Traducción','Tradução','2025-06-17 15:28:59',NULL,1,NULL),(3326,18,'Datos para la traducción','Dados para a tradução','2025-06-17 15:28:59',NULL,1,NULL),(3327,18,'Clave','Chave','2025-06-17 15:28:59',NULL,1,NULL),(3328,18,'Clave de la traducción','Chave da tradução','2025-06-17 15:28:59',NULL,1,NULL),(3329,18,'Valor de la traducción en','Valor da tradução em','2025-06-17 15:28:59',NULL,1,NULL),(3330,18,'Traducciones','Traduções','2025-06-17 15:28:59',NULL,1,NULL),(3331,18,'Las imagenes deben de tener el formato correcto','As imagens devem ter o formato correto','2025-06-17 15:28:59',NULL,1,NULL),(3332,18,'El email debe de tener el formato correcto','O e-mail deve ter o formato correto','2025-06-17 15:28:59',NULL,1,NULL),(3333,18,'El email no debe estar registrado en el sistema.','O e-mail não deve estar registado no sistema.','2025-06-17 15:28:59',NULL,1,NULL),(3334,18,'Ha ocurrido un error creando el registro','Ocorreu um erro ao criar o registo','2025-06-17 15:28:59',NULL,1,NULL),(3335,18,'Usuario','Utilizador','2025-06-17 15:28:59',NULL,1,NULL),(3336,18,'Datos para el Usuario','Dados para o Utilizador','2025-06-17 15:28:59',NULL,1,NULL),(3337,18,'Selecciona un rol','Selecione uma função','2025-06-17 15:28:59',NULL,1,NULL),(3338,18,'Idioma','Idioma','2025-06-17 15:28:59',NULL,1,NULL),(3339,18,'Selecciona un idioma','Selecione um idioma','2025-06-17 15:28:59',NULL,1,NULL),(3340,18,'Teléfono','Telefone','2025-06-17 15:28:59',NULL,1,NULL),(3341,18,'Usuarios','Utilizadores','2025-06-17 15:28:59',NULL,1,NULL),(3342,18,'Seleccione un archivo','Selecione um ficheiro','2025-06-17 15:28:59',NULL,1,NULL),(3343,18,'Solo se pueden insertar imagenes en el campo','Apenas podem ser inseridas imagens no campo','2025-06-17 15:29:00',NULL,1,NULL),(3344,18,'El tamaño total de los archivos seleccionados excede el limite de','O tamanho total dos ficheiros selecionados excede o limite de','2025-06-17 15:29:00',NULL,1,NULL),(3345,18,'Elegir','Escolher','2025-06-17 15:29:00',NULL,1,NULL),(3346,18,'Hoy','Hoje','2025-06-17 15:29:00',NULL,1,NULL),(3347,18,'Significado de los colores:','Significado das cores:','2025-06-17 15:29:00',NULL,1,NULL),(3348,18,'Disponible','Disponível','2025-06-17 15:29:00',NULL,1,NULL),(3349,18,'No disponible','Indisponível','2025-06-17 15:29:00',NULL,1,NULL),(3350,18,'Día previamente disponible que ha sido reservado para un evento','Dia previamente disponível que foi reservado para um evento','2025-06-17 15:29:00',NULL,1,NULL),(3351,18,'No ha sido posible eliminar el registro ya que tiene dependencias.','Não foi possível eliminar o registo porque tem dependências.','2025-06-17 15:29:00',NULL,1,NULL),(3352,18,'NO','NÃO','2025-06-17 15:29:00',NULL,1,NULL),(3353,18,'SI','SIM','2025-06-17 15:29:00',NULL,1,NULL),(3354,18,'Nuevo','Novo','2025-06-17 15:29:00',NULL,1,NULL),(3355,18,'Descargar','Descarregar','2025-06-17 15:29:00',NULL,1,NULL),(3356,18,'Mostrar','Mostrar','2025-06-17 15:29:00',NULL,1,NULL),(3357,18,'Enviar correos','Enviar e-mails','2025-06-17 15:29:00',NULL,1,NULL),(3358,18,'Seleccionar operador','Selecionar operador','2025-06-17 15:29:00',NULL,1,NULL),(3359,18,'Buscar por palabra clave','Pesquisar por palavra-chave','2025-06-17 15:29:00',NULL,1,NULL),(3360,18,'Limpiar filtros','Limpar filtros','2025-06-17 15:29:00',NULL,1,NULL),(3361,18,'¿Eliminar','Eliminar','2025-06-17 15:29:00',NULL,1,NULL),(3362,18,'¿Esta seguro de que desea eliminar el siguiente registro','Tem a certeza que deseja eliminar o seguinte registo','2025-06-17 15:29:00',NULL,1,NULL),(3363,18,'Opciones','Opções','2025-06-17 15:29:00',NULL,1,NULL),(3364,18,'Descargar archivo CSV','Descarregar ficheiro CSV','2025-06-17 15:29:00',NULL,1,NULL),(3365,18,'Registros mostrados','Registos mostrados','2025-06-17 15:29:01',NULL,1,NULL),(3366,18,'Todos los registros','Todos os registos','2025-06-17 15:29:01',NULL,1,NULL),(3367,18,'Registro editado correctamente','Registo editado corretamente','2025-06-17 15:29:01',NULL,1,NULL),(3368,18,'Registro insertado correctamente','Registo inserido corretamente','2025-06-17 15:29:01',NULL,1,NULL),(3369,18,'Limpiar','Limpar','2025-06-17 15:29:01',NULL,1,NULL),(3370,18,'OpcionesActivoSN','OpçõesAtivoSN','2025-06-17 15:29:01',NULL,1,NULL),(3371,18,'Aplicar','Aplicar','2025-06-17 15:29:01',NULL,1,NULL),(3372,18,'Selecciona una opción','Selecione uma opção','2025-06-17 15:29:01',NULL,1,NULL),(3373,18,'Email enviado correctamente.','E-mail enviado corretamente.','2025-06-17 15:29:01',NULL,1,NULL),(3374,18,'Registro elmininado correctamente.','Registo eliminado corretamente.','2025-06-17 15:29:01',NULL,1,NULL),(3375,18,'El registro no se puede eliminar porque tiene otros registros hijos.','O registo não pode ser eliminado porque tem outros registos dependentes.','2025-06-17 15:29:01',NULL,1,NULL),(3376,18,'Mostrando','A mostrar','2025-06-17 15:29:01',NULL,1,NULL),(3377,18,'a','a','2025-06-17 15:29:01',NULL,1,NULL),(3378,18,'de','de','2025-06-17 15:29:01',NULL,1,NULL),(3379,18,'registros','registos','2025-06-17 15:29:01',NULL,1,NULL),(3380,18,'Buscar por','Pesquisar por','2025-06-17 15:29:01',NULL,1,NULL),(3381,18,'No se han encontrado registros','Não foram encontrados registos','2025-06-17 15:29:01',NULL,1,NULL),(3382,18,'Realiza una búsqueda para mostrar los datos','Realize uma pesquisa para mostrar os dados','2025-06-17 15:29:01',NULL,1,NULL),(3383,18,'¿Eliminar registro?','Eliminar registo?','2025-06-17 15:29:01',NULL,1,NULL),(3384,18,'Acciones','Ações','2025-06-17 15:29:01',NULL,1,NULL),(3385,18,'¿Está seguro de que desea eliminar este registro?','Tem a certeza que deseja eliminar este registo?','2025-06-17 15:29:01',NULL,1,NULL),(3386,18,'Descargar archivo CSV','Descarregar ficheiro CSV','2025-06-17 15:29:01',NULL,1,NULL),(3387,18,'Registros mostrados','Registos mostrados','2025-06-17 15:29:01',NULL,1,NULL),(3388,18,'Todos los registros','Todos os registos','2025-06-17 15:29:02',NULL,1,NULL),(3389,18,'El sistema ha generado el siguiente Qr para completar el proceso de registro y activar una cuenta, puede escanear el código QR que se muestra a continuación con un dispositivo móvil.','O sistema gerou o seguinte QR para completar o processo de registo e ativar uma conta, pode escanear o código QR mostrado abaixo com um dispositivo móvel.','2025-06-17 15:29:02',NULL,1,NULL),(3390,18,'o pulsar el siguiente enlance','ou clicar no seguinte link','2025-06-17 15:29:02',NULL,1,NULL),(3391,18,'También tiene la posibilidad de enviarlo por mail introduciendo el email destinatario en el siguiente campo','Também tem a possibilidade de enviar por e-mail, introduzindo o e-mail do destinatário no seguinte campo','2025-06-17 15:29:02',NULL,1,NULL),(3392,18,'Registro editado correctamente','Registo editado corretamente','2025-06-17 15:29:02',NULL,1,NULL),(3393,18,'Registro insertado correctamente','Registo inserido corretamente','2025-06-17 15:29:02',NULL,1,NULL),(3394,18,'Registro elmininado correctamente.','Registo eliminado corretamente.','2025-06-17 15:29:02',NULL,1,NULL),(3395,18,'Cerrar sesión','Terminar sessão','2025-06-17 15:29:02',NULL,1,NULL),(3396,18,'Perfil','Perfil','2025-06-17 15:29:02',NULL,1,NULL);
/*!40000 ALTER TABLE `traduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `idioma_id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `activo_sn` varchar(1) DEFAULT NULL COMMENT '(S)i, (N)o',
  `telefono` varchar(20) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  `fecha_inactivo` datetime DEFAULT NULL,
  `usu_inactivo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkUsuEmp_idx` (`empresa_id`),
  KEY `fkUsuRoles_idx` (`rol_id`),
  KEY `fkUsuIdioma_idx` (`idioma_id`),
  CONSTRAINT `fkUsuEmp` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fkUsuIdioma` FOREIGN KEY (`idioma_id`) REFERENCES `idioma` (`id`),
  CONSTRAINT `fkUsuRolesEmp` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1,1,1,'agusjar@hotmail.com','agusjar@hotmail.com','S','123',NULL,'2024-06-24 13:58:19','2025-06-11 13:56:53',1,1,NULL,NULL),(6,1,1,1,'stefan@gmail.com','stefan@gmail.com','S','22211222',NULL,'2025-03-11 06:02:38','2025-06-01 05:58:12',1,1,NULL,NULL),(24,1,1,1,'Oscar','info@roomscontroltech.com','S','1',NULL,'2025-03-11 06:02:38','2025-06-01 05:58:12',1,1,NULL,NULL),(26,74,22,3,'PrbOscar','prbOscar@roomscontroltech.com','S','1',NULL,'2025-03-11 06:02:38','2025-08-20 15:10:22',1,26,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_credenciales`
--

DROP TABLE IF EXISTS `usuario_credenciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_credenciales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(512) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Usuario_UsuCredeciales_idx` (`usuario_id`),
  CONSTRAINT `fkUsuario_UsuCredeciales` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_credenciales`
--

LOCK TABLES `usuario_credenciales` WRITE;
/*!40000 ALTER TABLE `usuario_credenciales` DISABLE KEYS */;
INSERT INTO `usuario_credenciales` VALUES (1,'$2a$10$uWYaMEkJj6MpMpUGWBEAeOMhftRh6WkQYTdcJiMJAueg6ch89a7/q',1),(9,'$2a$10$uWYaMEkJj6MpMpUGWBEAeOMhftRh6WkQYTdcJiMJAueg6ch89a7/q',6),(10,'$2a$10$uWYaMEkJj6MpMpUGWBEAeOMhftRh6WkQYTdcJiMJAueg6ch89a7/q',24),(11,'$2a$10$uWYaMEkJj6MpMpUGWBEAeOMhftRh6WkQYTdcJiMJAueg6ch89a7/q',26);
/*!40000 ALTER TABLE `usuario_credenciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_password_historico`
--

DROP TABLE IF EXISTS `usuario_password_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_password_historico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `usu_creacion` int(11) NOT NULL,
  `usu_modificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkUPHUsuario_idx` (`usuario_id`),
  CONSTRAINT `fkUPHUsuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_password_historico`
--

LOCK TABLES `usuario_password_historico` WRITE;
/*!40000 ALTER TABLE `usuario_password_historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_password_historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_restablecer_password`
--

DROP TABLE IF EXISTS `usuario_restablecer_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_restablecer_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `codigoRecuperacion` varchar(100) DEFAULT NULL,
  `expiraEn` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuarioRestablecer_idx` (`usuario_id`),
  CONSTRAINT `fkUsuario_UsuarioRestablecerPassword` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_restablecer_password`
--

LOCK TABLES `usuario_restablecer_password` WRITE;
/*!40000 ALTER TABLE `usuario_restablecer_password` DISABLE KEYS */;
INSERT INTO `usuario_restablecer_password` VALUES (170,1,'agusjar@hotmail.com','705569','2025-01-31 11:10:32');
/*!40000 ALTER TABLE `usuario_restablecer_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_archivo_empresa`
--

DROP TABLE IF EXISTS `vista_archivo_empresa`;
/*!50001 DROP VIEW IF EXISTS `vista_archivo_empresa`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_archivo_empresa` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `url`,
 1 AS `descripcion`,
 1 AS `pantalla`,
 1 AS `tabla`,
 1 AS `tablaId`,
 1 AS `empresaId`,
 1 AS `nombreEmpresa`,
 1 AS `tipoArchivoId`,
 1 AS `nombreTipoArchivo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_empresa_rol`
--

DROP TABLE IF EXISTS `vista_empresa_rol`;
/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_empresa_rol` AS SELECT 
 1 AS `id`,
 1 AS `empresaId`,
 1 AS `nombreEmpresa`,
 1 AS `nombre`,
 1 AS `dashboardUrl`,
 1 AS `muestraEmpresa`,
 1 AS `activoSn`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_empresa_rol_permiso`
--

DROP TABLE IF EXISTS `vista_empresa_rol_permiso`;
/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol_permiso`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_empresa_rol_permiso` AS SELECT 
 1 AS `empresaId`,
 1 AS `nombreEmpresa`,
 1 AS `rol_id`,
 1 AS `rol_nombre`,
 1 AS `rol_activo_sn`,
 1 AS `permiso_id`,
 1 AS `permiso_modulo`,
 1 AS `permiso_controlador`,
 1 AS `permiso_accion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_empresa_rol_usuario`
--

DROP TABLE IF EXISTS `vista_empresa_rol_usuario`;
/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_empresa_rol_usuario` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `mail`,
 1 AS `telefono`,
 1 AS `activoSn`,
 1 AS `empresaId`,
 1 AS `nombreEmpresa`,
 1 AS `rolId`,
 1 AS `nombreRol`,
 1 AS `idiomaId`,
 1 AS `nombreIdioma`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_log_usuario_empresa`
--

DROP TABLE IF EXISTS `vista_log_usuario_empresa`;
/*!50001 DROP VIEW IF EXISTS `vista_log_usuario_empresa`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_log_usuario_empresa` AS SELECT 
 1 AS `id`,
 1 AS `usuario_id`,
 1 AS `fecha_registro`,
 1 AS `ip`,
 1 AS `mas_datos`,
 1 AS `nombre_usuario`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_log_usuario_usuario`
--

DROP TABLE IF EXISTS `vista_log_usuario_usuario`;
/*!50001 DROP VIEW IF EXISTS `vista_log_usuario_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_log_usuario_usuario` AS SELECT 
 1 AS `id`,
 1 AS `usuarioId`,
 1 AS `fechaRegistro`,
 1 AS `ip`,
 1 AS `masDatos`,
 1 AS `nombreUsuario`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_plantilla_email_idioma`
--

DROP TABLE IF EXISTS `vista_plantilla_email_idioma`;
/*!50001 DROP VIEW IF EXISTS `vista_plantilla_email_idioma`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_plantilla_email_idioma` AS SELECT 
 1 AS `id`,
 1 AS `nombreIdioma`,
 1 AS `idiomaId`,
 1 AS `empresaId`,
 1 AS `nombrePlantilla`,
 1 AS `activoSn`,
 1 AS `titulo`,
 1 AS `cuerpo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_tipo_archivo_empresa_seccion`
--

DROP TABLE IF EXISTS `vista_tipo_archivo_empresa_seccion`;
/*!50001 DROP VIEW IF EXISTS `vista_tipo_archivo_empresa_seccion`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_tipo_archivo_empresa_seccion` AS SELECT 
 1 AS `nombreEmpresa`,
 1 AS `nombreSeccion`,
 1 AS `id`,
 1 AS `nombre`,
 1 AS `tipo`,
 1 AS `orden`,
 1 AS `multiple`,
 1 AS `empresaId`,
 1 AS `seccionId`,
 1 AS `activoSn`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_traduccion_idioma`
--

DROP TABLE IF EXISTS `vista_traduccion_idioma`;
/*!50001 DROP VIEW IF EXISTS `vista_traduccion_idioma`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_traduccion_idioma` AS SELECT 
 1 AS `id`,
 1 AS `idiomaId`,
 1 AS `clave`,
 1 AS `valor`,
 1 AS `nombreIdioma`,
 1 AS `iso`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_traducciones`
--

DROP TABLE IF EXISTS `vista_traducciones`;
/*!50001 DROP VIEW IF EXISTS `vista_traducciones`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_traducciones` AS SELECT 
 1 AS `id`,
 1 AS `idiomaId`,
 1 AS `clave`,
 1 AS `castellano`,
 1 AS `ingles`,
 1 AS `inglesId`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_zonas_horarias`
--

DROP TABLE IF EXISTS `vista_zonas_horarias`;
/*!50001 DROP VIEW IF EXISTS `vista_zonas_horarias`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_zonas_horarias` AS SELECT 
 1 AS `id`,
 1 AS `nombre`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `zona_horaria`
--

DROP TABLE IF EXISTS `zona_horaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona_horaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona_horaria`
--

LOCK TABLES `zona_horaria` WRITE;
/*!40000 ALTER TABLE `zona_horaria` DISABLE KEYS */;
INSERT INTO `zona_horaria` VALUES (1,'GMT-12:00 Hora de la Isla Baker'),(2,'GMT-11:00 Hora de Niue, Hora Estándar de Samoa'),(3,'GMT-10:00 Hora Estándar de Hawái-Aleutianas, Hora de las Islas Cook'),(4,'GMT-09:00 Hora Estándar de Alaska, Hora de las Islas Gambier'),(5,'GMT-08:00 Hora Estándar del Pacífico'),(6,'GMT-07:00 Hora Estándar de la Montaña'),(7,'GMT-06:00 Hora Estándar Central'),(8,'GMT-05:00 Hora Estándar del Este'),(9,'GMT-04:00 Hora Estándar del Atlántico'),(10,'GMT-03:00 Hora de Argentina, Hora de Brasil'),(11,'GMT-02:00 Hora de Georgia del Sur/Islas Sandwich del Sur'),(12,'GMT-01:00 Hora Estándar de Azores, Hora de Cabo Verde'),(13,'GMT+00:00 Hora del Meridiano de Greenwich, Hora de Europa Occidental'),(14,'GMT+01:00 Hora de Europa Central, Hora de África Occidental'),(15,'GMT+02:00 Hora de Europa Oriental, Hora de África Central'),(16,'GMT+03:00 Hora de Moscú, Hora de África Oriental'),(17,'GMT+04:00 Hora Estándar del Golfo, Hora de Samara'),(18,'GMT+05:00 Hora Estándar de Pakistán, Hora de Ekaterimburgo'),(19,'GMT+06:00 Hora Estándar de Bangladés, Hora de Omsk'),(20,'GMT+07:00 Hora de Indochina, Hora de Krasnoyarsk'),(21,'GMT+08:00 Hora Estándar de China, Hora Estándar de Australia Occidental'),(22,'GMT+09:00 Hora Estándar de Japón, Hora Estándar de Corea'),(23,'GMT+10:00 Hora Estándar de Australia Oriental, Hora de Vladivostok'),(24,'GMT+11:00 Hora de las Islas Salomón, Hora de Magadán'),(25,'GMT+12:00 Hora Estándar de Nueva Zelanda, Hora de Fiyi');
/*!40000 ALTER TABLE `zona_horaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `vista_archivo_empresa`
--

/*!50001 DROP VIEW IF EXISTS `vista_archivo_empresa`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_archivo_empresa` AS select `a`.`id` AS `id`,`a`.`nombre` AS `nombre`,`a`.`url` AS `url`,`a`.`descripcion` AS `descripcion`,`a`.`pantalla` AS `pantalla`,`a`.`tabla` AS `tabla`,`a`.`id_tabla` AS `tablaId`,`e`.`id` AS `empresaId`,`e`.`nombre` AS `nombreEmpresa`,`ta`.`id` AS `tipoArchivoId`,`ta`.`nombre` AS `nombreTipoArchivo` from ((`archivo` `a` join `empresa` `e` on(`a`.`empresa_id` = `e`.`id`)) join `tipo_archivo` `ta` on(`a`.`tipo_archivo_id` = `ta`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_empresa_rol`
--

/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_empresa_rol` AS select `r`.`id` AS `id`,`e`.`id` AS `empresaId`,`e`.`nombre` AS `nombreEmpresa`,`r`.`nombre` AS `nombre`,`r`.`dashboardUrl` AS `dashboardUrl`,`r`.`muestraEmpresa` AS `muestraEmpresa`,`r`.`activo_sn` AS `activoSn` from (`empresa` `e` join `rol` `r` on(`e`.`id` = `r`.`empresa_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_empresa_rol_permiso`
--

/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol_permiso`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_empresa_rol_permiso` AS select `e`.`id` AS `empresaId`,`e`.`nombre` AS `nombreEmpresa`,`r`.`id` AS `rol_id`,`r`.`nombre` AS `rol_nombre`,`r`.`activo_sn` AS `rol_activo_sn`,`p`.`id` AS `permiso_id`,`p`.`modulo` AS `permiso_modulo`,`p`.`controlador` AS `permiso_controlador`,`p`.`accion` AS `permiso_accion` from ((`empresa` `e` join `rol` `r` on(`e`.`id` = `r`.`empresa_id`)) join `permiso` `p` on(`r`.`id` = `p`.`rol_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_empresa_rol_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vista_empresa_rol_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_empresa_rol_usuario` AS select `u`.`id` AS `id`,`u`.`nombre` AS `nombre`,`u`.`mail` AS `mail`,`u`.`telefono` AS `telefono`,`u`.`activo_sn` AS `activoSn`,`e`.`id` AS `empresaId`,`e`.`nombre` AS `nombreEmpresa`,`r`.`id` AS `rolId`,`r`.`nombre` AS `nombreRol`,`i`.`id` AS `idiomaId`,`i`.`nombre` AS `nombreIdioma` from (((`usuario` `u` join `empresa` `e` on(`u`.`empresa_id` = `e`.`id`)) join `rol` `r` on(`u`.`rol_id` = `r`.`id`)) join `idioma` `i` on(`u`.`idioma_id` = `i`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_log_usuario_empresa`
--

/*!50001 DROP VIEW IF EXISTS `vista_log_usuario_empresa`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_log_usuario_empresa` AS select `log_usuario`.`id` AS `id`,`log_usuario`.`usuario_id` AS `usuario_id`,`log_usuario`.`fecha_registro` AS `fecha_registro`,`log_usuario`.`ip` AS `ip`,`log_usuario`.`mas_datos` AS `mas_datos`,`usuario`.`nombre` AS `nombre_usuario` from (`log_usuario` join `usuario`) where `log_usuario`.`usuario_id` = `usuario`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_log_usuario_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vista_log_usuario_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_log_usuario_usuario` AS select `log_usuario`.`id` AS `id`,`log_usuario`.`usuario_id` AS `usuarioId`,`log_usuario`.`fecha_registro` AS `fechaRegistro`,`log_usuario`.`ip` AS `ip`,`log_usuario`.`mas_datos` AS `masDatos`,`usuario`.`nombre` AS `nombreUsuario` from (`log_usuario` join `usuario`) where `log_usuario`.`usuario_id` = `usuario`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_plantilla_email_idioma`
--

/*!50001 DROP VIEW IF EXISTS `vista_plantilla_email_idioma`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_plantilla_email_idioma` AS select `p`.`id` AS `id`,`i`.`nombre` AS `nombreIdioma`,`i`.`id` AS `idiomaId`,`p`.`empresa_id` AS `empresaId`,`p`.`nombre_plantilla` AS `nombrePlantilla`,`p`.`activo_sn` AS `activoSn`,`p`.`titulo` AS `titulo`,`p`.`cuerpo` AS `cuerpo` from (`idioma` `i` join `plantilla_email` `p` on(`i`.`id` = `p`.`idioma_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_tipo_archivo_empresa_seccion`
--

/*!50001 DROP VIEW IF EXISTS `vista_tipo_archivo_empresa_seccion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_tipo_archivo_empresa_seccion` AS select `e`.`nombre` AS `nombreEmpresa`,`s`.`nombre` AS `nombreSeccion`,`ta`.`id` AS `id`,`ta`.`nombre` AS `nombre`,`ta`.`tipo` AS `tipo`,`ta`.`orden` AS `orden`,`ta`.`multiple` AS `multiple`,`ta`.`empresa_id` AS `empresaId`,`ta`.`seccion_id` AS `seccionId`,`ta`.`activo_sn` AS `activoSn` from ((`tipo_archivo` `ta` join `empresa` `e` on(`ta`.`empresa_id` = `e`.`id`)) left join `seccion` `s` on(`ta`.`seccion_id` = `s`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_traduccion_idioma`
--

/*!50001 DROP VIEW IF EXISTS `vista_traduccion_idioma`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_traduccion_idioma` AS select `t`.`id` AS `id`,`t`.`idioma_id` AS `idiomaId`,`t`.`clave` AS `clave`,`t`.`valor` AS `valor`,`i`.`nombre` AS `nombreIdioma`,`i`.`iso` AS `iso` from (`traduccion` `t` join `idioma` `i` on(`t`.`idioma_id` = `i`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_traducciones`
--

/*!50001 DROP VIEW IF EXISTS `vista_traducciones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_traducciones` AS select `t`.`id` AS `id`,`t`.`idioma_id` AS `idiomaId`,`t`.`clave` AS `clave`,`t`.`valor` AS `castellano`,`ingles`.`valor` AS `ingles`,`ingles`.`id` AS `inglesId` from (`traduccion` `t` join `traduccion` `ingles` on(`t`.`clave` = `ingles`.`clave` and `ingles`.`idioma_id` = 3)) where `t`.`idioma_id` = 1 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_zonas_horarias`
--

/*!50001 DROP VIEW IF EXISTS `vista_zonas_horarias`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_zonas_horarias` AS select `zona_horaria`.`id` AS `id`,`zona_horaria`.`nombre` AS `nombre` from `zona_horaria` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-05 18:01:56
