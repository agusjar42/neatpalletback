-- ==============================================================================
-- Migration Script: Create empresa_pallet assignment table
-- ==============================================================================
-- Purpose:
-- 1) Create relation table between empresa and pallet
-- 2) Keep assignment data outside pallet main entity
-- ==============================================================================

CREATE TABLE IF NOT EXISTS `empresa_pallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresaId` int(11) DEFAULT NULL,
  `palletId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ep_empresa_idx` (`empresaId`),
  KEY `fk_ep_pallet_idx` (`palletId`),
  CONSTRAINT `fk_ep_empresa` FOREIGN KEY (`empresaId`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ep_pallet` FOREIGN KEY (`palletId`) REFERENCES `pallet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
