SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `Main` ;
CREATE SCHEMA IF NOT EXISTS `Main` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `Main` ;

-- -----------------------------------------------------
-- Table `Main`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`User` ;

CREATE  TABLE IF NOT EXISTS `Main`.`User` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(64) NOT NULL ,
  `password` VARCHAR(65) NOT NULL ,
  `email` VARCHAR(500) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Event` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `user_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(256) NOT NULL ,
  `description` VARCHAR(5000) NOT NULL ,
  `start_time` DATETIME(0) NOT NULL ,
  `end_time` DATETIME(0) NOT NULL ,
  `email_remind` TINYINT(1) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`user_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`user_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Share_Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Share_Event` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Share_Event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `event_id` INT UNSIGNED NOT NULL ,
  `invited_id` INT UNSIGNED NOT NULL ,
  `accepted` TINYINT(1) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`event_id` ASC) ,
  INDEX `id_idx1` (`invited_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`event_id` )
    REFERENCES `Main`.`Event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id`
    FOREIGN KEY (`invited_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Tag` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Tag` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `user_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(32) NOT NULL ,
  `color` VARCHAR(6) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`user_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`user_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Event_Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Event_Tag` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Event_Tag` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `event_id` INT UNSIGNED NOT NULL ,
  `tag_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`event_id` ASC) ,
  INDEX `id_idx1` (`tag_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`event_id` )
    REFERENCES `Main`.`Event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id`
    FOREIGN KEY (`tag_id` )
    REFERENCES `Main`.`Tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Todo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Todo` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Todo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `user_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(256) NOT NULL ,
  `remind_time` DATETIME(0) NOT NULL ,
  `completed` TINYINT(1) NOT NULL ,
  `email_remind` TINYINT(1) NOT NULL ,
  `lapse_time` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`user_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`user_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Todo_Tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Todo_Tag` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Todo_Tag` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `tag_id` INT UNSIGNED NOT NULL ,
  `todo_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`tag_id` ASC) ,
  INDEX `id_idx1` (`todo_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`tag_id` )
    REFERENCES `Main`.`Tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id`
    FOREIGN KEY (`todo_id` )
    REFERENCES `Main`.`Todo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Subtask`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Subtask` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Subtask` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `parent_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(256) NOT NULL ,
  `completed` TINYINT(1) NOT NULL ,
  `email_remind` TINYINT(1) NOT NULL ,
  `lapse_time` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`parent_id` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`parent_id` )
    REFERENCES `Main`.`Todo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `Main` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
