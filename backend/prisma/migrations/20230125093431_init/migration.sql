-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_user`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `decision_comment`;

-- DropForeignKey
ALTER TABLE `concerned` DROP FOREIGN KEY `concerned_decision`;

-- DropForeignKey
ALTER TABLE `concerned` DROP FOREIGN KEY `concerned_user`;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `decision_comment` FOREIGN KEY (`decision_id`) REFERENCES `decision`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `concerned` ADD CONSTRAINT `concerned_decision` FOREIGN KEY (`decision_id`) REFERENCES `decision`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `concerned` ADD CONSTRAINT `concerned_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
