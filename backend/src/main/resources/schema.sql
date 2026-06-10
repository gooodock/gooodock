CREATE DATABASE subscription_db;
GRANT ALL PRIVILEGES ON subscription_db.* TO 'ohgiraffers'@'%';
SHOW GRANTS FOR 'ohgiraffers'@'%';
USE subscription_db;

-- 1. 회원 테이블 (tbl_member)
CREATE TABLE tbl_member (
                            member_idx INT AUTO_INCREMENT COMMENT '회원IDX',
                            email VARCHAR(255) NOT NULL COMMENT '아이디(이메일)',
                            password VARCHAR(255) NOT NULL COMMENT '비밀번호',
                            name VARCHAR(100) NOT NULL COMMENT '이름',
                            PRIMARY KEY (member_idx)
) COMMENT='회원';

-- 2. 구독정보 테이블 (tbl_subscription)
CREATE TABLE tbl_subscription (
                                  subscribe_idx INT AUTO_INCREMENT COMMENT '구독IDX',
                                  platform_name VARCHAR(100) NOT NULL COMMENT '플랫폼명',
                                  platform_price INT NOT NULL COMMENT '플랫폼가격',
                                  delete_yn CHAR(1) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                                  regist_sub_date DATE NOT NULL COMMENT '최초구독일',
                                  update_sub_date DATE NOT NULL COMMENT '갱신구독일',
                                  member_idx INT NOT NULL COMMENT '회원IDX',
                                  PRIMARY KEY (subscribe_idx),
                                  CONSTRAINT fk_sub_member_idx FOREIGN KEY (member_idx)
                                      REFERENCES tbl_member (member_idx) ON DELETE CASCADE
) COMMENT='구독정보';

-- 3. 알림 테이블 (tbl_notification)
CREATE TABLE tbl_notification (
                                  notification_idx INT AUTO_INCREMENT COMMENT '알림IDX',
                                  member_idx       INT NOT NULL COMMENT '회원IDX',
                                  subscribe_idx    INT NOT NULL COMMENT '구독IDX',
                                  read_yn          CHAR(1) NOT NULL DEFAULT 'N' COMMENT '읽음여부',
                                  read_date        DATETIME NULL COMMENT '읽은날짜',
                                  PRIMARY KEY (notification_idx),
                                  CONSTRAINT fk_noti_member_idx FOREIGN KEY (member_idx)
                                      REFERENCES tbl_member (member_idx) ON DELETE CASCADE,
                                  CONSTRAINT fk_noti_subscribe_idx FOREIGN KEY (subscribe_idx)
                                      REFERENCES tbl_subscription (subscribe_idx) ON DELETE CASCADE
) COMMENT='알림';

INSERT INTO `subscription_db`.`tbl_member` (`member_idx`, `email`, `password`, `name`) VALUES ('1', 'test@gmail.com', 'test@1234', '테스트');

INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('2', 'Tving', '14900', 'N', '2019-07-09', '2026-05-26', '1');
UPDATE `subscription_db`.`tbl_subscription` SET `platform_name` = 'YouTube' WHERE (`subscribe_idx` = '1');
INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('3', 'NETFLIX', '5900', 'N', '2024-05-28', '2026-05-26', '1');
INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('4', 'Wavve', '19800', 'N', '2024-12-03', '2026-05-26', '1');
INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('5', 'Claude', '33750', 'N', '2025-10-18', '2026-05-26', '1');
INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('6', 'Coupang', '19900', 'N', '2026-04-27', '2026-05-26', '1');
INSERT INTO `subscription_db`.`tbl_subscription` (`subscribe_idx`, `platform_name`, `platform_price`, `delete_yn`, `regist_sub_date`, `update_sub_date`, `member_idx`) VALUES ('7', 'Naver Membership', '4900', 'N', '2026-04-27', '2026-05-26', '1');
