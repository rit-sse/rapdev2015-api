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
  `password` VARCHAR(97) NOT NULL ,
  `email` VARCHAR(500) NOT NULL ,
  `salt` VARCHAR(32) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Event` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `owner_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(256) NOT NULL ,
  `description` VARCHAR(5000) NOT NULL ,
  `start_time` TIMESTAMP NOT NULL DEFAULT NOW() ,
  `end_time` TIMESTAMP NOT NULL DEFAULT '2020-02-02 02:02:02' ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`owner_id` ASC) ,
  CONSTRAINT `owner_user_id`
    FOREIGN KEY (`owner_id` )
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
  CONSTRAINT `tag_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Main`.`Calendar_Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Main`.`Calendar_Item` ;

CREATE  TABLE IF NOT EXISTS `Main`.`Calendar_Item` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `item_owner_id` INT UNSIGNED NOT NULL ,
  `email_reminder` TINYINT(1) NULL ,
  `event` INT UNSIGNED NOT NULL ,
  `invited_by_id` INT UNSIGNED NOT NULL ,
  `accepted` TINYINT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `item_owner_id_idx` (`item_owner_id` ASC) ,
  INDEX `item_event_id_idx` (`event` ASC) ,
  CONSTRAINT `item_owner_id`
    FOREIGN KEY (`item_owner_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_event_id`
    FOREIGN KEY (`event` )
    REFERENCES `Main`.`Event` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_shared_by_id`
    FOREIGN KEY (`invited_by_id` )
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
  INDEX `id_idx1` (`tag_id` ASC) ,
  INDEX `id_idx` (`event_id` ASC) ,
  CONSTRAINT `event_tag_event_id`
    FOREIGN KEY (`event_id` )
    REFERENCES `Main`.`Calendar_Item` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `event_tag_tag`
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
  `remind_time` DATETIME NOT NULL ,
  `completed` TINYINT(1) NOT NULL ,
  `email_remind` TINYINT(1) NOT NULL ,
  `lapse_time` INT UNSIGNED NOT NULL ,
  `parent` INT UNSIGNED NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_idx` (`user_id` ASC) ,
  INDEX `todo_parent_id_idx` (`parent` ASC) ,
  CONSTRAINT `todo_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `Main`.`User` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `todo_parent_id`
    FOREIGN KEY (`parent` )
    REFERENCES `Main`.`Todo` (`id` )
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
  CONSTRAINT `todo_tag_tag_id`
    FOREIGN KEY (`tag_id` )
    REFERENCES `Main`.`Tag` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `todo_tag_todo_id`
    FOREIGN KEY (`todo_id` )
    REFERENCES `Main`.`Todo` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `Main` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
