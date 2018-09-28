-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema short-rents1.0
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema short-rents1.0
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `short-rents1.0` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema short-rents1.0
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema short-rents1.0
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `short-rents1.0` DEFAULT CHARACTER SET utf8 ;
USE `short-rents1.0` ;

-- -----------------------------------------------------
-- Table `short-rents1.0`.`house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`house` (
`hId` INT(11) NOT NULL,
`hName` VARCHAR(255) NULL DEFAULT NULL,
`hPic1` VARCHAR(255) NOT NULL,
`hPic2` VARCHAR(255) NOT NULL,
`hPic3` VARCHAR(255) NOT NULL,
`hPic4` VARCHAR(255) NOT NULL,
`hInfo` VARCHAR(255) NULL DEFAULT NULL,
`insideInfo` VARCHAR(255) NULL DEFAULT NULL,
`trafficInfo` VARCHAR(255) NULL DEFAULT NULL,
`surroundInfo` VARCHAR(255) NULL DEFAULT NULL,
`hType` VARCHAR(255) NULL DEFAULT NULL,
`hfacilily` VARCHAR(255) NULL DEFAULT NULL,
`hPrice` DOUBLE NULL DEFAULT NULL,
`hCity` VARCHAR(45) NULL DEFAULT NULL,
`hLocation` VARCHAR(45) NULL DEFAULT NULL,
`housecol` VARCHAR(45) NULL DEFAULT NULL,
`hBeds` INT(11) NULL DEFAULT NULL,
`hLimitPr` INT(11) NULL DEFAULT NULL,
`hThumbs` INT(11) NULL DEFAULT NULL,
`hScore` INT(11) NULL DEFAULT NULL,
PRIMARY KEY (`hId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`user` (
`uId` INT(11) NOT NULL AUTO_INCREMENT,
`uPhone` INT(11) NOT NULL,
`uPwd` VARCHAR(255) NOT NULL,
`uName` VARCHAR(45) NOT NULL,
`uHeadPic` VARCHAR(255) NULL DEFAULT NULL,
`uEmail` VARCHAR(45) NULL DEFAULT NULL,
`uTrueName` VARCHAR(45) NULL DEFAULT NULL,
`uCardId` VARCHAR(45) NULL DEFAULT NULL,
`uPossPort` VARCHAR(45) NULL DEFAULT NULL,
`uSex` BIT(1) NULL DEFAULT NULL,
`uBirth` DATE NULL DEFAULT NULL,
`uLocation` VARCHAR(45) NULL DEFAULT NULL,
`uRegisterTime` DATE NULL DEFAULT NULL,
`uInviteCode` INT(11) NULL DEFAULT NULL,
PRIMARY KEY (`uId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`diary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`diary` (
`dId` INT(11) NOT NULL,
`arrvialDate` DATE NULL DEFAULT NULL,
`dContent` VARCHAR(255) NULL DEFAULT NULL,
`dDate` DATE NULL DEFAULT NULL,
`recommend` BIT(1) NULL DEFAULT b'0',
`uId` INT(11) NOT NULL,
`hId` INT(11) NOT NULL,
`dTitle` VARCHAR(45) NULL,
`dThumbs` INT NULL,
PRIMARY KEY (`dId`),
INDEX `fk_diary_user1_idx` (`uId` ASC) VISIBLE,
INDEX `fk_diary_house1_idx` (`hId` ASC) VISIBLE,
CONSTRAINT `fk_diary_house1`
FOREIGN KEY (`hId`)
REFERENCES `short-rents1.0`.`house` (`hId`),
CONSTRAINT `fk_diary_user1`
FOREIGN KEY (`uId`)
REFERENCES `short-rents1.0`.`user` (`uId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`diaryAssessment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`diaryAssessment` (
`daId` INT NOT NULL,
`daDate` DATE NULL,
`daContent` VARCHAR(255) NULL,
`dId` INT(11) NOT NULL,
PRIMARY KEY (`daId`),
INDEX `fk_diaryAssessment_diary_idx` (`dId` ASC) VISIBLE,
CONSTRAINT `fk_diaryAssessment_diary`
FOREIGN KEY (`dId`)
REFERENCES `short-rents1.0`.`diary` (`dId`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `short-rents1.0` ;

-- -----------------------------------------------------
-- Table `short-rents1.0`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`admin` (
`adminId` INT(11) NOT NULL AUTO_INCREMENT,
`adminName` VARCHAR(16) NOT NULL,
`adminPwd` VARCHAR(255) NOT NULL,
PRIMARY KEY (`adminId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`discount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`discount` (
`disId` INT(11) NOT NULL,
`disType` VARCHAR(45) NULL DEFAULT NULL,
`disWay` VARCHAR(45) NULL DEFAULT NULL,
PRIMARY KEY (`disId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`order` (
`oId` INT(11) NOT NULL,
`arrvialDate` DATE NOT NULL,
`leaveDate` DATE NOT NULL,
`hPrice` DOUBLE NOT NULL,
`oDate` DATETIME NOT NULL,
`oStatus` VARCHAR(45) NULL DEFAULT NULL,
`uId` INT(11) NOT NULL,
`hId` INT(11) NOT NULL,
`disId` INT(11) NOT NULL,
PRIMARY KEY (`oId`),
INDEX `fk_order_user1_idx` (`uId` ASC) VISIBLE,
INDEX `fk_order_house1_idx` (`hId` ASC) VISIBLE,
INDEX `fk_order_discount1_idx` (`disId` ASC) VISIBLE,
CONSTRAINT `fk_order_discount1`
FOREIGN KEY (`disId`)
REFERENCES `short-rents1.0`.`discount` (`disId`),
CONSTRAINT `fk_order_house1`
FOREIGN KEY (`hId`)
REFERENCES `short-rents1.0`.`house` (`hId`),
CONSTRAINT `fk_order_user1`
FOREIGN KEY (`uId`)
REFERENCES `short-rents1.0`.`user` (`uId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`assessment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`assessment` (
`aId` INT(11) NOT NULL AUTO_INCREMENT,
`arrvialDate` DATE NULL DEFAULT NULL,
`aContent` VARCHAR(255) NULL DEFAULT NULL,
`aDate` DATE NULL DEFAULT NULL,
`aScore` INT(11) NULL DEFAULT NULL,
`uId` INT(11) NOT NULL,
`oId` INT(11) NOT NULL,
`hId` INT(11) NOT NULL,
PRIMARY KEY (`aId`),
INDEX `fk_assessment_user1_idx` (`uId` ASC) VISIBLE,
INDEX `fk_assessment_order1_idx` (`oId` ASC) VISIBLE,
INDEX `fk_assessment_house1_idx` (`hId` ASC) VISIBLE,
CONSTRAINT `fk_assessment_order1`
FOREIGN KEY (`oId`)
REFERENCES `short-rents1.0`.`order` (`oId`),
CONSTRAINT `fk_assessment_user1`
FOREIGN KEY (`uId`)
REFERENCES `short-rents1.0`.`user` (`uId`),
CONSTRAINT `fk_assessment_house1`
FOREIGN KEY (`hId`)
REFERENCES `short-rents1.0`.`house` (`hId`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`assessmentimg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`assessmentimg` (
`aImgId` INT(11) NOT NULL AUTO_INCREMENT,
`aImages` VARCHAR(255) NULL DEFAULT NULL,
`aId` INT(11) NOT NULL,
PRIMARY KEY (`aImgId`),
INDEX `fk_assessmentImg_assessment_idx` (`aId` ASC) VISIBLE,
CONSTRAINT `fk_assessmentImg_assessment`
FOREIGN KEY (`aId`)
REFERENCES `short-rents1.0`.`assessment` (`aId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`diaryimg`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`diaryimg` (
`dImgId` INT(11) NOT NULL,
`dImages` VARCHAR(255) NULL DEFAULT NULL,
`dId` INT(11) NOT NULL,
PRIMARY KEY (`dImgId`),
INDEX `fk_diaryImg_diary1_idx` (`dId` ASC) VISIBLE,
CONSTRAINT `fk_diaryImg_diary1`
FOREIGN KEY (`dId`)
REFERENCES `short-rents1.0`.`diary` (`dId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`occupant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`occupant` (
`occId` INT(11) NOT NULL,
`occName` VARCHAR(16) NULL DEFAULT NULL,
`occCordId` VARCHAR(45) NULL DEFAULT NULL,
`occBirthDate` DATE NULL DEFAULT NULL,
`occPhone` INT(11) NULL DEFAULT NULL,
`disId` INT(11) NOT NULL,
PRIMARY KEY (`occId`),
INDEX `fk_occupant_discount1_idx` (`disId` ASC) VISIBLE,
CONSTRAINT `fk_occupant_discount1`
FOREIGN KEY (`disId`)
REFERENCES `short-rents1.0`.`discount` (`disId`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`order_has_occupant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`order_has_occupant` (
`oId` INT(11) NOT NULL,
`occId` INT(11) NOT NULL,
PRIMARY KEY (`oId`, `occId`),
INDEX `fk_order_has_occupant_occupant1_idx` (`occId` ASC) VISIBLE,
INDEX `fk_order_has_occupant_order1_idx` (`oId` ASC) VISIBLE,
CONSTRAINT `fk_order_has_occupant_occupant1`
FOREIGN KEY (`occId`)
REFERENCES `short-rents1.0`.`occupant` (`occId`),
CONSTRAINT `fk_order_has_occupant_order1`
FOREIGN KEY (`oId`)
REFERENCES `short-rents1.0`.`order` (`oId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`reply` (
`rId` INT(11) NOT NULL AUTO_INCREMENT,
`rContent` VARCHAR(45) NULL DEFAULT NULL,
`rDate` DATE NULL DEFAULT NULL,
`aId` INT(11) NOT NULL,
PRIMARY KEY (`rId`),
INDEX `fk_reply_assessment1_idx` (`aId` ASC) VISIBLE,
CONSTRAINT `fk_reply_assessment1`
FOREIGN KEY (`aId`)
REFERENCES `short-rents1.0`.`assessment` (`aId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`save`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`save` (
`sId` INT(11) NOT NULL,
`sDate` DATE NULL DEFAULT NULL,
`hId` INT(11) NOT NULL,
PRIMARY KEY (`sId`),
INDEX `fk_save_house1_idx` (`hId` ASC) VISIBLE,
CONSTRAINT `fk_save_house1`
FOREIGN KEY (`hId`)
REFERENCES `short-rents1.0`.`house` (`hId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `short-rents1.0`.`user_save`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `short-rents1.0`.`user_save` (
`uId` INT(11) NOT NULL,
`sId` INT(11) NOT NULL,
PRIMARY KEY (`uId`, `sId`),
INDEX `fk_user_has_save_save1_idx` (`sId` ASC) VISIBLE,
INDEX `fk_user_has_save_user1_idx` (`uId` ASC) VISIBLE,
CONSTRAINT `fk_user_has_save_save1`
FOREIGN KEY (`sId`)
REFERENCES `short-rents1.0`.`save` (`sId`),
CONSTRAINT `fk_user_has_save_user1`
FOREIGN KEY (`uId`)
REFERENCES `short-rents1.0`.`user` (`uId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
