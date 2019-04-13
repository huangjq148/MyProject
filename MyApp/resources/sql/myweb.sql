/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : myweb

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2019-04-13 23:11:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_goods`
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pinming` varchar(255) DEFAULT NULL,
  `danwei` varchar(255) DEFAULT NULL,
  `guige` varchar(255) DEFAULT NULL,
  `jinjia` float(11,2) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `belongUser` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('1', '田七', 'g', '25头', '0.56', '', '3');
INSERT INTO `t_goods` VALUES ('2', '石斛', 'g', '好', '0.62', '', '3');
INSERT INTO `t_goods` VALUES ('3', '石斛', 'g', '普通', '0.45', '', '3');
INSERT INTO `t_goods` VALUES ('4', '野生天麻', 'g', '小', '0.30', '', '3');
INSERT INTO `t_goods` VALUES ('5', '桃胶', 'g', '包', '25.00', '', '3');
INSERT INTO `t_goods` VALUES ('6', '党参', '包', '250g', '27.50', '', '3');
INSERT INTO `t_goods` VALUES ('7', '银耳', '包', '250g', '18.00', '', '3');
INSERT INTO `t_goods` VALUES ('8', '红枸杞', '包', '250g', '15.00', '', '3');
INSERT INTO `t_goods` VALUES ('9', '玛咖', 'g', 'g', '0.05', '', '3');
INSERT INTO `t_goods` VALUES ('10', '天麻', 'g', '好', '0.32', '', '3');
INSERT INTO `t_goods` VALUES ('11', '5A密盏', 'g', '5A', '7.50', '', '3');
INSERT INTO `t_goods` VALUES ('12', '三角燕', 'g', '半干挑', '7.40', '', '3');
INSERT INTO `t_goods` VALUES ('13', '黑枸杞', '包', '大', '50.00', '', '3');
INSERT INTO `t_goods` VALUES ('14', '阿胶', '盒', '同仁堂', '400.00', '', '3');
INSERT INTO `t_goods` VALUES ('15', '白莲子', '包', '建宁', '37.50', '', '3');
INSERT INTO `t_goods` VALUES ('16', '西洋参', 'g', '山东2.5g', '0.48', '', '3');
INSERT INTO `t_goods` VALUES ('17', '海马', 'g', '本港1个以下', '5.00', '', '3');
INSERT INTO `t_goods` VALUES ('18', '虫草花', '包', '大', '19.00', '', '3');
INSERT INTO `t_goods` VALUES ('19', '西洋参节', 'g', '国产', '0.14', '', '3');
INSERT INTO `t_goods` VALUES ('20', '燕碎', 'g', '小燕碎', '3.50', '', '3');
INSERT INTO `t_goods` VALUES ('21', '四物', '包', '35g', '2.00', '', '3');
INSERT INTO `t_goods` VALUES ('22', '血茸片', 'g', '血片', '5.00', '', '3');
INSERT INTO `t_goods` VALUES ('23', '雪蛤膏', '盒', '25g', '130.00', '', '3');
INSERT INTO `t_goods` VALUES ('24', '黄芪', '包', '斜片', '12.00', '', '3');
INSERT INTO `t_goods` VALUES ('25', '高丽参', 'g', 'g', '0.80', '', '3');
INSERT INTO `t_goods` VALUES ('26', '红参', 'g', 'g', '0.56', '', '3');
INSERT INTO `t_goods` VALUES ('27', '囊丝燕碎', 'g', '囊丝', '3.40', '', '3');
INSERT INTO `t_goods` VALUES ('28', '西洋参', 'g', 'g', '0.28', '', '3');
INSERT INTO `t_goods` VALUES ('29', '燕窝-舒盏', 'g', 'g', '7.80', null, '3');
INSERT INTO `t_goods` VALUES ('30', '西洋参', '个', '加拿大3克尖', '0.35', '', '3');
INSERT INTO `t_goods` VALUES ('31', '黑枸杞', '包', '小', '17.50', '', '3');
INSERT INTO `t_goods` VALUES ('32', '田七', 'g', '60头', '0.32', '', '3');
INSERT INTO `t_goods` VALUES ('33', '阿胶糕', '盒', '500g', '75.00', '', '3');
INSERT INTO `t_goods` VALUES ('36', 'huangjq', '1', '1', '1.00', '1', '1');
INSERT INTO `t_goods` VALUES ('37', '西洋参（0.28）', 'g', 'g', '0.28', '', '3');
INSERT INTO `t_goods` VALUES ('38', '石蜂糖', '包', '500g', '8.00', '', '3');
INSERT INTO `t_goods` VALUES ('39', 'ceshi', 'g', 'g', '12.00', '1212', '1');
INSERT INTO `t_goods` VALUES ('40', '123', '123', '123', '123.00', '123', '1');
INSERT INTO `t_goods` VALUES ('41', '田七', 'g', '50头', '2.00', '', '1');

-- ----------------------------
-- Table structure for `t_photo`
-- ----------------------------
DROP TABLE IF EXISTS `t_photo`;
CREATE TABLE `t_photo` (
  `id` varchar(32) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `photoDate` varchar(32) DEFAULT NULL,
  `createTime` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of photo
-- ----------------------------
INSERT INTO `t_photo` VALUES ('3ab8db7058e111e992c301d103f503b1', 'sc', 'wc', '2019-04-09T16:00:00.000Z', '2019-04-07 10:59:58.760');
INSERT INTO `t_photo` VALUES ('79a4f280591111e9a04f61f98aad9d1e', 'asdzzzzzzzzzzzzzzz', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:45:20.168');
INSERT INTO `t_photo` VALUES ('93bcd5f058d711e9a57f4109e0fd8d9a', 'ssssssss', '但是发射点发到付', '2019-04-08T16:00:00.000Z', '2019-04-07 09:50:53.136');
INSERT INTO `t_photo` VALUES ('bab71eb0591111e996e4530f61b26d0d', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:47:09.339');
INSERT INTO `t_photo` VALUES ('db7a1d00591111e98bdc9db0411f076b', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:48:04.304');
INSERT INTO `t_photo` VALUES ('dcb0ed20590211e9b649c9b5971bc302', 'dasd', 'asdasd', '2019-04-09T16:00:00.000Z', '2019-04-07 15:00:43.891');
INSERT INTO `t_photo` VALUES ('e06cbca0590211e9b649c9b5971bc302', 'fasdf', 'afasdfa', '2019-04-01T16:00:00.000Z', '2019-04-07 15:00:50.154');
INSERT INTO `t_photo` VALUES ('e4126e40591111e98bdc9db0411f076b', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:48:18.724');
INSERT INTO `t_photo` VALUES ('e5aa9840590211e9b649c9b5971bc302', 'asdf', 'adsf', '2019-04-09T16:00:00.000Z', '2019-04-07 15:00:58.948');
INSERT INTO `t_photo` VALUES ('e8953510590211e9b649c9b5971bc302', 'afdad', 'fadf', '2019-04-23T16:00:00.000Z', '2019-04-07 15:01:03.841');
INSERT INTO `t_photo` VALUES ('eb1b1ca0590211e9b649c9b5971bc302', 'asdfa', 'sdfasdf', '2019-04-09T16:00:00.000Z', '2019-04-07 15:01:08.074');
INSERT INTO `t_photo` VALUES ('ed529610590211e9b649c9b5971bc302', 'asdf', 'asdfasdf', '2019-04-02T16:00:00.000Z', '2019-04-07 15:01:11.793');
INSERT INTO `t_photo` VALUES ('f08d75c0590211e9b649c9b5971bc302', 'asdfa', 'dfasdf', '2019-04-17T16:00:00.000Z', '2019-04-07 15:01:17.212');
INSERT INTO `t_photo` VALUES ('f2dfa320590211e9b649c9b5971bc302', 'adf', 'adfa', '2019-04-16T16:00:00.000Z', '2019-04-07 15:01:21.106');
INSERT INTO `t_photo` VALUES ('f533a540590211e9b649c9b5971bc302', 'adf', 'adfadf', '2019-04-02T16:00:00.000Z', '2019-04-07 15:01:25.012');

-- ----------------------------
-- Table structure for `t_traderecord`
-- ----------------------------
DROP TABLE IF EXISTS `t_traderecord`;
CREATE TABLE `t_traderecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shangpinid` int(11) DEFAULT NULL,
  `shuliang` int(11) DEFAULT '0',
  `jinhuojiage` float(88,2) DEFAULT NULL,
  `jiage` float(88,2) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `riqi` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `belongUser` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traderecord
-- ----------------------------
INSERT INTO `t_traderecord` VALUES ('1', '28', '445', '0.42', '0.42', '进货', '2017-09-04', '', '3');
INSERT INTO `t_traderecord` VALUES ('2', '28', '445', '0.80', '0.80', '出货', '2017-09-04', '', '3');
INSERT INTO `t_traderecord` VALUES ('3', '1', '1450', '0.56', '0.56', '进货', '2017-09-04', '', '3');
INSERT INTO `t_traderecord` VALUES ('5', '3', '500', '0.45', '0.45', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('6', '4', '440', '0.30', '0.30', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('7', '5', '3', '25.00', '25.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('8', '6', '8', '27.50', '27.50', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('9', '7', '5', '18.00', '18.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('10', '8', '3', '15.00', '15.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('11', '9', '1000', '0.05', '0.05', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('12', '10', '830', '0.32', '0.32', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('13', '12', '145', '7.40', '7.40', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('14', '13', '4', '50.00', '50.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('15', '14', '1', '400.00', '400.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('16', '15', '1', '37.50', '37.50', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('17', '16', '630', '0.48', '0.48', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('18', '17', '30', '5.00', '5.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('19', '18', '2', '19.00', '19.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('20', '19', '720', '0.14', '0.14', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('22', '20', '250', '3.50', '3.50', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('23', '21', '36', '2.00', '2.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('24', '22', '86', '5.00', '5.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('25', '23', '1', '130.00', '130.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('26', '24', '4', '12.00', '12.00', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('27', '25', '380', '0.80', '0.80', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('28', '26', '670', '0.56', '0.56', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('29', '27', '130', '3.40', '3.40', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('30', '13', '2', '90.00', '90.00', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('31', '18', '1', '48.00', '48.00', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('32', '16', '160', '1.10', '1.10', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('33', '1', '250', '0.90', '0.90', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('34', '19', '250', '0.90', '0.90', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('35', '27', '50', '6.00', '6.00', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('36', '25', '250', '1.90', '1.90', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('37', '29', '50', '7.80', '7.80', '进货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('38', '29', '50', '11.50', '11.50', '出货', '2017-09-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('39', '16', '67', '1.50', '1.50', '出货', '2017-09-09', '', '3');
INSERT INTO `t_traderecord` VALUES ('40', '5', '2', '41.00', '41.00', '出货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('41', '11', '173', '7.50', '7.50', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('42', '11', '58', '8.50', '8.50', '出货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('43', '16', '1000', '0.48', '0.48', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('44', '30', '1000', '0.35', '0.35', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('45', '13', '6', '50.00', '50.00', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('46', '31', '3', '17.50', '17.50', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('47', '32', '1000', '0.32', '0.32', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('48', '31', '3', '17.50', '17.50', '进货', '2017-09-11', '', '3');
INSERT INTO `t_traderecord` VALUES ('49', '31', '2', '40.00', '40.00', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('50', '30', '250', '0.45', '0.45', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('51', '30', '500', '0.70', '0.70', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('52', '26', '250', '0.60', '0.60', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('53', '11', '100', '10.00', '10.00', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('54', '12', '100', '9.80', '9.80', '出货', '2017-09-16', '', '3');
INSERT INTO `t_traderecord` VALUES ('56', '33', '5', '75.00', '75.00', '进货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('57', '33', '3', '138.00', '138.00', '出货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('58', '28', '700', '0.28', '0.28', '进货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('59', '28', '700', '0.40', '0.40', '出货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('60', '23', '2', '130.00', '130.00', '进货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('61', '28', '2000', '0.28', '0.28', '进货', '2017-09-20', '', '3');
INSERT INTO `t_traderecord` VALUES ('62', '33', '1', '148.00', '148.00', '出货', '2017-09-22', '', '3');
INSERT INTO `t_traderecord` VALUES ('63', '5', '2', '25.00', '25.00', '进货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('64', '5', '2', '48.00', '48.00', '出货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('65', '32', '200', '0.80', '0.80', '出货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('66', '32', '500', '0.90', '0.90', '出货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('67', '8', '1', '25.00', '25.00', '出货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('68', '37', '2000', '0.28', '0.28', '进货', '2017-09-24', '', '3');
INSERT INTO `t_traderecord` VALUES ('71', '31', '4', '45.00', '45.00', '出货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('72', '13', '6', '100.00', '100.00', '出货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('73', '5', '1', '58.00', '58.00', '出货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('74', '13', '1', '140.00', '140.00', '出货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('75', '32', '2000', '0.32', '0.32', '进货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('76', '13', '6', '50.00', '50.00', '进货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('78', '29', '100', '8.20', '8.20', '进货', '2017-09-26', '', '3');
INSERT INTO `t_traderecord` VALUES ('79', '25', '24', '2.00', '2.00', '出货', '2017-09-30', '', '3');
INSERT INTO `t_traderecord` VALUES ('80', '16', '55', '1.50', '1.50', '出货', '2017-09-30', '', '3');
INSERT INTO `t_traderecord` VALUES ('82', '11', '150', '7.50', '7.50', '进货', '2017-09-30', '', '3');
INSERT INTO `t_traderecord` VALUES ('84', '11', '50', '10.50', '10.50', '出货', '2017-09-30', '', '3');
INSERT INTO `t_traderecord` VALUES ('85', '8', '2', '25.00', '25.00', '出货', '2017-09-30', '', '3');
INSERT INTO `t_traderecord` VALUES ('86', '11', '50', '12.00', '12.00', '出货', '2017-10-05', '', '3');
INSERT INTO `t_traderecord` VALUES ('87', '5', '3', '28.00', '28.00', '进货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('88', '5', '1', '48.00', '48.00', '出货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('89', '38', '1', '8.00', '8.00', '进货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('90', '38', '1', '14.00', '14.00', '出货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('91', '7', '1', '28.00', '28.00', '出货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('92', '32', '100', '0.70', '0.70', '出货', '2017-10-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('93', '13', '1', '80.00', '80.00', '出货', '2017-11-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('94', '29', '100', '12.50', '12.50', '出货', '2017-11-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('95', '5', '1', '48.00', '48.00', '出货', '2017-11-07', '', '3');
INSERT INTO `t_traderecord` VALUES ('96', '35', '12', null, '4.00', '进货', '2018-02-01', '', '3');
INSERT INTO `t_traderecord` VALUES ('97', '35', '12', null, '4.00', '进货', '2018-02-02', '', '3');
INSERT INTO `t_traderecord` VALUES ('98', '35', '33', null, '43.00', '进货', '2018-02-03', '', '3');
INSERT INTO `t_traderecord` VALUES ('99', '35', '3', null, '1.00', '出货', '2018-03-26', '1', '3');

-- ----------------------------
-- Table structure for `t_purchase_record`
-- ----------------------------
DROP TABLE IF EXISTS `t_purchase_record`;
CREATE TABLE `t_purchase_record` (
  `id` varchar(32) NOT NULL,
  `goodsId` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `number` float DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `belongUserId` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_purchase_record
-- ----------------------------
INSERT INTO `t_purchase_record` VALUES ('24c1202a73c811e8adf67845c4ec7583', '41', '3', '100', '2018-06-02', '1', '太贵了\r\n');
INSERT INTO `t_purchase_record` VALUES ('390bf72077c811e8b83f7845c4ec7583', '41', '1', '1', '2018-06-06', '1', '1');
INSERT INTO `t_purchase_record` VALUES ('97dd5947756511e8802e7845c4ec7583', '39', '1', '100', '2018-06-01', '1', '');
INSERT INTO `t_purchase_record` VALUES ('be2abb5b73c711e8adf67845c4ec7583', '41', '1', '100', '2018-05-31', '1', '');
INSERT INTO `t_purchase_record` VALUES ('bec2287c756511e8802e7845c4ec7583', '36', '1', '111', '2018-06-01', '1', '');
INSERT INTO `t_purchase_record` VALUES ('c380a27973c711e8adf67845c4ec7583', '41', '12', '100', '2018-06-01', '1', '');
INSERT INTO `t_purchase_record` VALUES ('dd845997788311e88af57845c4ec7583', '41', '7', '44', '2018-06-25', '1', '');
INSERT INTO `t_purchase_record` VALUES ('e7f79e9e77bc11e8b83f7845c4ec7583', '41', '2', '12', '2018-06-05', '1', '12');

-- ----------------------------
-- Table structure for `t_sell_record`
-- ----------------------------
DROP TABLE IF EXISTS `t_sell_record`;
CREATE TABLE `t_sell_record` (
  `id` varchar(32) NOT NULL,
  `goodsId` int(11) DEFAULT NULL,
  `purchaseId` varchar(32) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `sellNumber` int(11) DEFAULT '0',
  `sellPrice` float DEFAULT NULL,
  `belongUserId` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_sell_record
-- ----------------------------
INSERT INTO `t_sell_record` VALUES ('064527aea94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-07', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('0718732ba94011e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('10beb509a93a11e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-26', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('2529f5b2a94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('38c663daa94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('4252dd65a94011e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-07-31', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('4c10f21fa94011e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('5349d3dda94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('552209b0a93911e8a8557845c4ec7583', '41', '24c1202a73c811e8adf67845c4ec7583', '3', '2018-08-26', '100', '105', '1', '太贵了\r\n');
INSERT INTO `t_sell_record` VALUES ('552377fda93911e8a8557845c4ec7583', '41', '390bf72077c811e8b83f7845c4ec7583', '1', '2018-08-26', '1', '5', '1', '1');
INSERT INTO `t_sell_record` VALUES ('5523b28da93911e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-26', '4', '22', '1', '');
INSERT INTO `t_sell_record` VALUES ('79121df7a94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-08', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('7e4c8dcfa94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-08', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('893ec55ba94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-08', '2', '2', '1', '');
INSERT INTO `t_sell_record` VALUES ('8bf124a6a93911e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-26', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('8d9aacf6a94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-08', '2', '2', '1', '');
INSERT INTO `t_sell_record` VALUES ('d9ce6f33a94311e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');
INSERT INTO `t_sell_record` VALUES ('e105826da93f11e8a8557845c4ec7583', '41', 'be2abb5b73c711e8adf67845c4ec7583', '1', '2018-08-01', '1', '1', '1', '');

-- ----------------------------
-- Table structure for `t_upload_file`
-- ----------------------------
DROP TABLE IF EXISTS `t_upload_file`;
CREATE TABLE `t_upload_file` (
  `id` varchar(32) NOT NULL,
  `recordId` varchar(32) DEFAULT NULL,
  `originalName` varchar(100) DEFAULT NULL,
  `realName` varchar(40) DEFAULT NULL,
  `createTime` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_upload_file
-- ----------------------------
INSERT INTO `t_upload_file` VALUES ('063f8d004fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('063f8d014fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('063f8d024fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('063f8d034fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('21d024904fd811e98023cd6c81ecb071', 'bd87d5004fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '99a01c523ec1413a964b01949f692b61.jpg', null);
INSERT INTO `t_upload_file` VALUES ('25e4c2704fd811e98023cd6c81ecb071', 'ae0334d04fc811e99e909b53c09c29c6', '200812308231244_2.jpg', '93d33d3328cb4e319d27ae5023fc293c.jpg', null);
INSERT INTO `t_upload_file` VALUES ('33c7db50591211e99be409824f5828af', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194900.jpg', '7ef29fa092a84831b95fe232a3aabf79.jpg', null);
INSERT INTO `t_upload_file` VALUES ('43644940591211e9bd6fcbf4fc85c20e', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190307194223.jpg', 'd20869a7722443c4b526e18408be4f9a.jpg', null);
INSERT INTO `t_upload_file` VALUES ('440fd4a04fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('440fd4a14fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('440fd4a24fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('440fd4a34fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('509cabd1508811e9a920c52b47dcc571', '509cabd0508811e9a920c52b47dcc571', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '308958f896ef485381d4e69339a074cb.jpg', null);
INSERT INTO `t_upload_file` VALUES ('5315c5d0591211e9bd6fcbf4fc85c20e', '79a4f280591111e9a04f61f98aad9d1e', '微信图片_20190319194900.jpg', 'f30b9757bef94c2a898e846d229e95c6.jpg', null);
INSERT INTO `t_upload_file` VALUES ('5ac22cc1508811e9a920c52b47dcc571', '5ac22cc0508811e9a920c52b47dcc571', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '308958f896ef485381d4e69339a074cb.jpg', null);
INSERT INTO `t_upload_file` VALUES ('909d86b0509611e98dd8cf588f749f11', 'a0798190508911e99f0c1d75804f15ee', '微信图片_20190319194906.jpg', 'a306704e541340c3b944ed448d822273.jpg', null);
INSERT INTO `t_upload_file` VALUES ('93bd241058d711e9a57f4109e0fd8d9a', '93bcd5f058d711e9a57f4109e0fd8d9a', '微信图片_20190319194900.jpg', 'c359fb35782a4f0991b1f2561190a51b.jpg', null);
INSERT INTO `t_upload_file` VALUES ('956e06214fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('956e06224fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('96b8b5e0508911e99f0c1d75804f15ee', '96b88ed0508911e99f0c1d75804f15ee', '2012111719294197.jpg', '96386efe073f4fbd9aa0228d70ce1509.jpg', null);
INSERT INTO `t_upload_file` VALUES ('9ee4ebf0509611e98dd8cf588f749f11', 'a0798190508911e99f0c1d75804f15ee', '200812308231244_2.jpg', '914e01af1edb4d08ab6c86691a20f493.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ad52f310594911e993847585d56810dc', '79a4f280591111e9a04f61f98aad9d1e', '微信图片_20190320233027.jpg', 'c23124b3de08436d871bbea9a0b73f41.jpg', null);
INSERT INTO `t_upload_file` VALUES ('b468c7904fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('b468c7914fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('bbd25bd04fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('bbd25bd14fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('bbd25bd24fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('bbd25bd34fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('bd87fc104fc811e99e909b53c09c29c6', 'bd87d5004fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', 'f6ed23de42e04df89bba8ece1acfcee0.jpg', null);
INSERT INTO `t_upload_file` VALUES ('c8ff77704fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('c8ff77714fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('c8ff77724fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('c8ff77734fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('cf8192e04fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('cf81b9f04fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('cf81b9f14fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', null);
INSERT INTO `t_upload_file` VALUES ('cf81b9f24fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', null);
INSERT INTO `t_upload_file` VALUES ('d037c4814fc811e99e909b53c09c29c6', 'd037c4804fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', 'd4d85da3bf0549e89265589f3dcdeeb7.jpg', null);
INSERT INTO `t_upload_file` VALUES ('d99c25b0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', '2012111719294197.jpg', '4e7f28694ded4d3f8936a968cb8d5ed9.jpg', null);
INSERT INTO `t_upload_file` VALUES ('da341ff0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '6b9020e83c2441a0963a9e5674e9175e.jpg', null);
INSERT INTO `t_upload_file` VALUES ('dac144c0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194906.jpg', '84a1daeaeff240048614fbd162fc8ba7.jpg', null);
INSERT INTO `t_upload_file` VALUES ('e614be60594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', '2012111719294197.jpg', '4e7f28694ded4d3f8936a968cb8d5ed9.jpg', null);
INSERT INTO `t_upload_file` VALUES ('e6150c80594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '6b9020e83c2441a0963a9e5674e9175e.jpg', null);
INSERT INTO `t_upload_file` VALUES ('e6150c81594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194906.jpg', '84a1daeaeff240048614fbd162fc8ba7.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f04fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190319194906.jpg', 'f8117589c1c24420bab7705a20ab5a24.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f14fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190319194900.jpg', '8a456a782525409cba3a0df88ae29d11.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f24fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190307194223.jpg', 'c7c592ca1ad24458a9c84785329339ea.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f34fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '200812308231244_2.jpg', 'f321a08ef5c746d89af35ff62d4fa9b1.jpg', null);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f44fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '2012111719294197.jpg', 'ee9c6beaea3f4dda8cdd9021fb372104.jpg', null);

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', '1');
INSERT INTO `t_user` VALUES ('2', 'huangjq2', 'huangjq');
INSERT INTO `t_user` VALUES ('3', '3', '3');

-- ----------------------------
-- View structure for `vw_chuhuo`
-- ----------------------------
DROP VIEW IF EXISTS `vw_chuhuo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_chuhuo` AS select `g`.`id` AS `id`,`g`.`pinming` AS `pinming`,`g`.`belongUser` AS `belongUser`,ifnull(sum(`t`.`shuliang`),0) AS `shuliang` from (`t_traderecord` `t` left join `t_goods` `g` on((`g`.`id` = `t`.`shangpinid`))) where (`t`.`type` = '出货') group by `g`.`id`,`g`.`belongUser` ;

-- ----------------------------
-- View structure for `vw_jinhuo`
-- ----------------------------
DROP VIEW IF EXISTS `vw_jinhuo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_jinhuo` AS select `g`.`id` AS `id`,`t`.`belongUser` AS `belongUser`,`g`.`pinming` AS `pinming`,ifnull(sum(`t`.`shuliang`),0) AS `shuliang` from (`t_traderecord` `t` left join `t_goods` `g` on((`g`.`id` = `t`.`shangpinid`))) where (`t`.`type` = '进货') group by `g`.`id`,`t`.`belongUser` ;

-- ----------------------------
-- View structure for `vw_kucun`
-- ----------------------------
DROP VIEW IF EXISTS `vw_kucun`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_kucun` AS select `j`.`id` AS `id`,`j`.`pinming` AS `pinming`,`j`.`belongUser` AS `belongUser`,ifnull(`j`.`shuliang`,0) AS `jinhuo`,ifnull(`c`.`shuliang`,0) AS `chuhuo`,(ifnull(`j`.`shuliang`,0) - ifnull(`c`.`shuliang`,0)) AS `kucun` from (`vw_jinhuo` `j` left join `vw_chuhuo` `c` on((`j`.`id` = `c`.`id`))) ;

-- ----------------------------
-- View structure for `vw_goodsinfo`
-- ----------------------------
DROP VIEW IF EXISTS `vw_goodsinfo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_goodsinfo` AS select `g`.`id` AS `id`,`g`.`pinming` AS `pinming`,`g`.`danwei` AS `danwei`,`g`.`guige` AS `guige`,`g`.`jinjia` AS `jinjia`,`g`.`remark` AS `remark`,`g`.`belongUser` AS `belongUser`,`k`.`kucun` AS `kucun` from (`t_goods` `g` left join `vw_kucun` `k` on((`k`.`id` = `g`.`id`))) ;

-- ----------------------------
-- View structure for `vw_trade_record`
-- ----------------------------
DROP VIEW IF EXISTS `vw_trade_record`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_trade_record` AS select `p`.`id` AS `id`,`p`.`goodsId` AS `goodsId`,`p`.`price` AS `purPrice`,`p`.`number` AS `number`,`p`.`date` AS `date`,'进货' AS `type`,0 AS `sellPrice`,`p`.`belongUserId` AS `belongUserId`,`p`.`remark` AS `remark` from `t_purchase_record` `p` union select `s`.`id` AS `id`,`s`.`goodsId` AS `goodsId`,`s`.`price` AS `purPrice`,`s`.`sellNumber` AS `sellNumber`,`s`.`date` AS `date`,'出货' AS `type`,`s`.`sellPrice` AS `sellPrice`,`s`.`belongUserId` AS `belongUserId`,`s`.`remark` AS `remark` from `t_sell_record` `s` ;

-- ----------------------------
-- View structure for `vw_trade_record_detail`
-- ----------------------------
DROP VIEW IF EXISTS `vw_trade_record_detail`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_trade_record_detail` AS select `g`.`pinming` AS `pinming`,`g`.`guige` AS `guige`,`t`.`id` AS `id`,`t`.`goodsId` AS `goodsId`,`t`.`purPrice` AS `purPrice`,`t`.`number` AS `number`,`t`.`date` AS `date`,`t`.`type` AS `type`,`t`.`sellPrice` AS `sellPrice`,`t`.`belongUserId` AS `belongUserId`,`t`.`remark` AS `remark` from (`t_goods` `g` join `vw_trade_record` `t`) where (`t`.`goodsId` = `g`.`id`) ;
