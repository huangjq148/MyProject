/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : recorder

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 08/04/2020 17:46:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `clickCount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUser` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_article
-- ----------------------------
INSERT INTO `t_article` VALUES ('8b3305b0781311eaa366b568abcf0f2e', '这是第一篇日志', '8787ed1078d911eabbf43df49fe5f1f0', '<p>今天是2020年4月6日</p><p>在家工作已两个月，两个月前，公司接了腾讯的防疫健康小程序，我们便进入了疯狂的加班阶段，一天17~8个小时成了家常便饭。</p><p>这两个月内：</p><ol><li>学习了小程序的开发部署流程，开发记账小程序</li><li>重新拾起了git，使用github pages部署了自己的前端工程</li><li>重构了自己的node后端小框架</li><li>学习了css，模拟淘宝首页写了个demo，</li><li>学习了react基本搭建开发流程</li><li>学习webpack的基本使用，终于稍微能看懂webpack的配置文件</li><li>使用vue-cli + iview搭建了本项目</li></ol>', '0', NULL, '2020-04-06 22:33:12', '2020-04-07 22:17:21');
INSERT INTO `t_article` VALUES ('a38d55a0781011eaa366b568abcf0f2e', 'asfasdf', '6d0bd5f078d911eabbf43df49fe5f1f0', '<p>asdfasdf</p>', '0', NULL, '2020-04-06 22:12:24', '2020-04-07 23:01:42');
INSERT INTO `t_article` VALUES ('a6761db0781011eaa366b568abcf0f2e', 'dfasdfa', '6d0bd5f078d911eabbf43df49fe5f1f0', '<p>dfafasdfasdf</p>', '0', NULL, '2020-04-06 22:12:29', '2020-04-07 23:00:51');

-- ----------------------------
-- Table structure for t_article_type
-- ----------------------------
DROP TABLE IF EXISTS `t_article_type`;
CREATE TABLE `t_article_type`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `photoPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUser` varbinary(32) DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_article_type
-- ----------------------------
INSERT INTO `t_article_type` VALUES ('6d0bd5f078d911eabbf43df49fe5f1f0', '分类二', '/server/file/download/b4885b0469cc44d4b7dd925b2c406b97.png', 'asdasdasd', NULL, '2020-04-07 22:09:42', '2020-04-07 22:12:08');
INSERT INTO `t_article_type` VALUES ('8787ed1078d911eabbf43df49fe5f1f0', '分类一', '/server/file/download/6bdd1076d221443a90676da185456ad3.jpg', '分类一的描述啊vfvw', NULL, '2020-04-07 22:10:26', '2020-04-08 15:53:44');

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pinming` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `danwei` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `guige` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `jinjia` float(11, 2) DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `stock` float(11, 0) DEFAULT 0 COMMENT '库存',
  `totalMoney` float(11, 0) DEFAULT 0,
  `belongUser` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('12', '三角燕', 'g', '半干挑', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('14', '阿胶', '盒', '同仁堂', 0.00, '', 0, 0, '3', NULL, '2020-03-24 12:22:14');
INSERT INTO `t_goods` VALUES ('15', '白莲子', '包', '建宁', 0.00, '', 0, 0, '3', NULL, '2020-03-24 17:03:29');
INSERT INTO `t_goods` VALUES ('16', '西洋参', 'g', '山东2.5g', 0.00, '', 0, 0, '3', NULL, '2020-03-24 17:02:08');
INSERT INTO `t_goods` VALUES ('17', '海马', 'g', '本港1个以下', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('18', '虫草花', '包', '大', 0.00, '', 0, 0, '3', NULL, '2020-03-24 21:32:48');
INSERT INTO `t_goods` VALUES ('19', '西洋参节', 'g', '国产', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('1b442e206c0911eaa60bcb95426e4e52', 'h6u', '7', '6h顶顶顶', 0.00, '7', 1, 1, NULL, '2020-03-22 14:48:15', '2020-03-23 15:17:36');
INSERT INTO `t_goods` VALUES ('2', '石斛', 'g', '好', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('20', '燕碎', 'g', '小燕碎', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('21', '四物', '包', '35g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('22', '血茸片', 'g', '血片', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('23', '雪蛤膏', '盒', '25g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('24', '黄芪', '包', '斜片', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('2472f3106db611eab0165fa4aaf40047', '测试', '1', '啊倒萨', 2.00, '21', 0, 0, NULL, '2020-03-24 17:59:25', '2020-03-25 15:54:05');
INSERT INTO `t_goods` VALUES ('25', '高丽参', 'g', 'g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('26', '红参', 'g', 'g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('27', '囊丝燕碎', 'g', '囊丝', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('28', '西洋参', 'g', 'g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('29', '燕窝-舒盏', 'g', 'g', 0.00, NULL, 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('3', '石斛', 'g', '普通', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('30', '西洋参', '个', '加拿大3克尖', 0.00, '', 0, 0, '3', NULL, '2020-03-25 12:42:45');
INSERT INTO `t_goods` VALUES ('31', '黑枸杞', '包', '小', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('32', '田七', 'g', '60头', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('33', '阿胶糕', '盒', '500g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('34d718806cdf11ea8add0d775ec0cc54', 'asd', '231', 'asdqwdq', 123.00, '23', 0, 0, NULL, '2020-03-23 16:20:50', '2020-03-23 22:59:32');
INSERT INTO `t_goods` VALUES ('36', 'huangjq', '1', '1', 0.00, '1', 0, 0, '1', NULL, NULL);
INSERT INTO `t_goods` VALUES ('37', '西洋参（0.28）', 'g', 'g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('38', '石蜂糖', '包', '500g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('39', 'ceshi', 'g', 'g', 0.00, '1212', 0, 0, '1', NULL, NULL);
INSERT INTO `t_goods` VALUES ('4', '野生天麻', 'g', '小', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('40', '123', '123', '123', 0.00, '123', 0, 0, '1', NULL, NULL);
INSERT INTO `t_goods` VALUES ('41', '田七', 'g', '50头', 0.00, '', 0, 0, '1', NULL, NULL);
INSERT INTO `t_goods` VALUES ('5', '桃胶', 'g', '包', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('6', '党参', '包', '250g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('7', '银耳', '包', '250g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('8', '红枸杞', '包', '250g', 0.00, '', 0, 0, '3', NULL, NULL);
INSERT INTO `t_goods` VALUES ('9', '玛咖', 'g', 'g', 0.00, '', 0, 0, '3', NULL, NULL);

-- ----------------------------
-- Table structure for t_photo
-- ----------------------------
DROP TABLE IF EXISTS `t_photo`;
CREATE TABLE `t_photo`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `photoDate` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUser` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_photo
-- ----------------------------
INSERT INTO `t_photo` VALUES ('3ab8db7058e111e992c301d103f503b1', 'sc', 'wc', '2019-04-09T16:00:00.000Z', '2019-04-07 10:59:58.760', NULL, NULL);
INSERT INTO `t_photo` VALUES ('79a4f280591111e9a04f61f98aad9d1e', 'asdzzzzzzzzzzzzzzz', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:45:20.168', NULL, NULL);
INSERT INTO `t_photo` VALUES ('93bcd5f058d711e9a57f4109e0fd8d9a', 'ssssssss', '但是发射点发到付', '2019-04-08T16:00:00.000Z', '2019-04-07 09:50:53.136', NULL, NULL);
INSERT INTO `t_photo` VALUES ('bab71eb0591111e996e4530f61b26d0d', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:47:09.339', NULL, NULL);
INSERT INTO `t_photo` VALUES ('db7a1d00591111e98bdc9db0411f076b', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:48:04.304', NULL, NULL);
INSERT INTO `t_photo` VALUES ('dcb0ed20590211e9b649c9b5971bc302', 'dasd', 'asdasd', '2019-04-09T16:00:00.000Z', '2019-04-07 15:00:43.891', NULL, NULL);
INSERT INTO `t_photo` VALUES ('e06cbca0590211e9b649c9b5971bc302', 'fasdf', 'afasdfa', '2019-04-01T16:00:00.000Z', '2019-04-07 15:00:50.154', NULL, NULL);
INSERT INTO `t_photo` VALUES ('e4126e40591111e98bdc9db0411f076b', 'asd', 'asdasd', '2019-04-16T16:00:00.000Z', '2019-04-07 16:48:18.724', NULL, NULL);
INSERT INTO `t_photo` VALUES ('e5aa9840590211e9b649c9b5971bc302', 'asdf', 'adsf', '2019-04-09T16:00:00.000Z', '2019-04-07 15:00:58.948', NULL, NULL);
INSERT INTO `t_photo` VALUES ('e8953510590211e9b649c9b5971bc302', 'afdad', 'fadf', '2019-04-23T16:00:00.000Z', '2019-04-07 15:01:03.841', NULL, NULL);
INSERT INTO `t_photo` VALUES ('eb1b1ca0590211e9b649c9b5971bc302', 'asdfa', 'sdfasdf', '2019-04-09T16:00:00.000Z', '2019-04-07 15:01:08.074', NULL, NULL);
INSERT INTO `t_photo` VALUES ('ed529610590211e9b649c9b5971bc302', 'asdf', 'asdfasdf', '2019-04-02T16:00:00.000Z', '2019-04-07 15:01:11.793', NULL, NULL);
INSERT INTO `t_photo` VALUES ('f08d75c0590211e9b649c9b5971bc302', 'asdfa', 'dfasdf', '2019-04-17T16:00:00.000Z', '2019-04-07 15:01:17.212', NULL, NULL);
INSERT INTO `t_photo` VALUES ('f2dfa320590211e9b649c9b5971bc302', 'adf', 'adfa', '2019-04-16T16:00:00.000Z', '2019-04-07 15:01:21.106', NULL, NULL);
INSERT INTO `t_photo` VALUES ('f533a540590211e9b649c9b5971bc302', 'adf', 'adfadf', '2019-04-02T16:00:00.000Z', '2019-04-07 15:01:25.012', NULL, NULL);

-- ----------------------------
-- Table structure for t_trade_record
-- ----------------------------
DROP TABLE IF EXISTS `t_trade_record`;
CREATE TABLE `t_trade_record`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodsId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `number` float(11, 2) DEFAULT NULL,
  `price` float(10, 2) DEFAULT NULL,
  `cost` float(10, 2) DEFAULT NULL,
  `tradeDate` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUserId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_trade_record
-- ----------------------------
INSERT INTO `t_trade_record` VALUES ('07ed34c06e7011ea885e739bcea0c47e', '1b442e206c0911eaa60bcb95426e4e52', '0', 1.00, 1.00, NULL, '2020-03-25', NULL, NULL, '2020-03-25 16:10:03', NULL);

-- ----------------------------
-- Table structure for t_upload_file
-- ----------------------------
DROP TABLE IF EXISTS `t_upload_file`;
CREATE TABLE `t_upload_file`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `recordId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `originalName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `realName` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUser` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_upload_file
-- ----------------------------
INSERT INTO `t_upload_file` VALUES ('063f8d004fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('063f8d014fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('063f8d024fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('063f8d034fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('21d024904fd811e98023cd6c81ecb071', 'bd87d5004fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '99a01c523ec1413a964b01949f692b61.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('25e4c2704fd811e98023cd6c81ecb071', 'ae0334d04fc811e99e909b53c09c29c6', '200812308231244_2.jpg', '93d33d3328cb4e319d27ae5023fc293c.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('33c7db50591211e99be409824f5828af', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194900.jpg', '7ef29fa092a84831b95fe232a3aabf79.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('43644940591211e9bd6fcbf4fc85c20e', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190307194223.jpg', 'd20869a7722443c4b526e18408be4f9a.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('440fd4a04fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('440fd4a14fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('440fd4a24fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('440fd4a34fd411e9a3d5eb4aa4f4dca1', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('509cabd1508811e9a920c52b47dcc571', '509cabd0508811e9a920c52b47dcc571', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '308958f896ef485381d4e69339a074cb.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('5315c5d0591211e9bd6fcbf4fc85c20e', '79a4f280591111e9a04f61f98aad9d1e', '微信图片_20190319194900.jpg', 'f30b9757bef94c2a898e846d229e95c6.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('5ac22cc1508811e9a920c52b47dcc571', '5ac22cc0508811e9a920c52b47dcc571', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '308958f896ef485381d4e69339a074cb.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('909d86b0509611e98dd8cf588f749f11', 'a0798190508911e99f0c1d75804f15ee', '微信图片_20190319194906.jpg', 'a306704e541340c3b944ed448d822273.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('93bd241058d711e9a57f4109e0fd8d9a', '93bcd5f058d711e9a57f4109e0fd8d9a', '微信图片_20190319194900.jpg', 'c359fb35782a4f0991b1f2561190a51b.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('956e06214fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('956e06224fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('96b8b5e0508911e99f0c1d75804f15ee', '96b88ed0508911e99f0c1d75804f15ee', '2012111719294197.jpg', '96386efe073f4fbd9aa0228d70ce1509.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('9ee4ebf0509611e98dd8cf588f749f11', 'a0798190508911e99f0c1d75804f15ee', '200812308231244_2.jpg', '914e01af1edb4d08ab6c86691a20f493.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ad52f310594911e993847585d56810dc', '79a4f280591111e9a04f61f98aad9d1e', '微信图片_20190320233027.jpg', 'c23124b3de08436d871bbea9a0b73f41.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('b468c7904fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('b468c7914fc811e99e909b53c09c29c6', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('bbd25bd04fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('bbd25bd14fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('bbd25bd24fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('bbd25bd34fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('bd87fc104fc811e99e909b53c09c29c6', 'bd87d5004fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', 'f6ed23de42e04df89bba8ece1acfcee0.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('c8ff77704fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('c8ff77714fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('c8ff77724fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('c8ff77734fd311e9a33ea90746a34bbb', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('cf8192e04fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('cf81b9f04fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('cf81b9f14fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '2012111719294197.jpg', '60e77806f4f144438aad7114b912d802.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('cf81b9f24fd311e9a104bd1f10e181a8', '956e06204fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', '25e3640bfab44b95b44b950d9a574eaf.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('d037c4814fc811e99e909b53c09c29c6', 'd037c4804fc811e99e909b53c09c29c6', '微信图片_20190319194906.jpg', 'd4d85da3bf0549e89265589f3dcdeeb7.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('d99c25b0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', '2012111719294197.jpg', '4e7f28694ded4d3f8936a968cb8d5ed9.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('da341ff0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '6b9020e83c2441a0963a9e5674e9175e.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('dac144c0594711e997aba398fa4f36b3', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194906.jpg', '84a1daeaeff240048614fbd162fc8ba7.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('e614be60594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', '2012111719294197.jpg', '4e7f28694ded4d3f8936a968cb8d5ed9.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('e6150c80594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', 'c9f1c139b6003af30f44ee573b2ac65c1038b629.jpg', '6b9020e83c2441a0963a9e5674e9175e.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('e6150c81594711e9b7cb11285be71e30', '3ab8db7058e111e992c301d103f503b1', '微信图片_20190319194906.jpg', '84a1daeaeff240048614fbd162fc8ba7.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f04fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190319194906.jpg', 'f8117589c1c24420bab7705a20ab5a24.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f14fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190319194900.jpg', '8a456a782525409cba3a0df88ae29d11.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f24fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '微信图片_20190307194223.jpg', 'c7c592ca1ad24458a9c84785329339ea.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f34fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '200812308231244_2.jpg', 'f321a08ef5c746d89af35ff62d4fa9b1.jpg', NULL, NULL, NULL);
INSERT INTO `t_upload_file` VALUES ('ee8ef2f44fc811e9952d6fb248fc3f39', 'ee8ecbe04fc811e9952d6fb248fc3f39', '2012111719294197.jpg', 'ee9c6beaea3f4dda8cdd9021fb372104.jpg', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `belongUser` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updateTime` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', '1', NULL, NULL, NULL);
INSERT INTO `t_user` VALUES ('2', 'huangjq2', 'huangjq', NULL, NULL, NULL);
INSERT INTO `t_user` VALUES ('3', '3', '3', NULL, NULL, NULL);

-- ----------------------------
-- View structure for vw_trade_info
-- ----------------------------
DROP VIEW IF EXISTS `vw_trade_info`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `vw_trade_info` AS select `t_trade_record`.`id` AS `id`,`t_trade_record`.`goodsId` AS `goodsId`,`t_trade_record`.`type` AS `type`,`t_trade_record`.`number` AS `number`,`t_trade_record`.`price` AS `price`,`t_trade_record`.`cost` AS `cost`,`t_trade_record`.`tradeDate` AS `tradeDate`,`t_trade_record`.`remark` AS `remark`,`t_trade_record`.`belongUserId` AS `belongUserId`,`t_trade_record`.`createTime` AS `createTime`,`t_trade_record`.`updateTime` AS `updateTime`,concat(`t_goods`.`pinming`,'（规格：',`t_goods`.`guige`,'）') AS `pinming` from (`t_trade_record` join `t_goods` on((`t_trade_record`.`goodsId` = `t_goods`.`id`)));

SET FOREIGN_KEY_CHECKS = 1;
