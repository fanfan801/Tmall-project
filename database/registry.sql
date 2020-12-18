/*
Navicat MySQL Data Transfer

Source Server         : fanfan
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : taobao

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-12-18 15:38:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for registry
-- ----------------------------
DROP TABLE IF EXISTS `registry`;
CREATE TABLE `registry` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `phone` tinyint(11) DEFAULT NULL,
  `password` tinyint(40) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of registry
-- ----------------------------
INSERT INTO `registry` VALUES ('1', '翻腾屯', '127', '40');
INSERT INTO `registry` VALUES ('2', '', '0', '127');
INSERT INTO `registry` VALUES ('3', 'fanfanfan', '127', '8');
INSERT INTO `registry` VALUES ('4', '大王的小迷妹', '127', '25');
INSERT INTO `registry` VALUES ('5', '吴锦锋', '127', '2');
INSERT INTO `registry` VALUES ('6', 'liuwen', '127', '127');
INSERT INTO `registry` VALUES ('7', 'xiaoxiao', '127', '25');
INSERT INTO `registry` VALUES ('8', 'fantengyun', '127', '25');
INSERT INTO `registry` VALUES ('9', 'qqq', '127', '8');
INSERT INTO `registry` VALUES ('12', '樊腾云', '127', '4');
