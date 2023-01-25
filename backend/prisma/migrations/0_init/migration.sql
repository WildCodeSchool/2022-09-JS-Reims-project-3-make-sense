-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `decision_id` INTEGER UNSIGNED NOT NULL,
    `date` DATETIME(0) NOT NULL DEFAULT (now()),

    INDEX `comment_user`(`user_id`),
    INDEX `decision_comment`(`decision_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `concerned` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_status` ENUM('experts', 'impacted') NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `decision_id` INTEGER UNSIGNED NOT NULL,

    INDEX `concerned_decision`(`decision_id`),
    INDEX `concerned_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `decision` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `deadline` DATE NOT NULL,
    `publish_date` DATE NOT NULL DEFAULT (curdate()),
    `start_content` TEXT NOT NULL,
    `impact` TEXT NOT NULL,
    `risk` TEXT NOT NULL,
    `advantage` TEXT NOT NULL,
    `middle_decision` TEXT NULL,
    `final_decision` TEXT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('in_progress', 'finished') NOT NULL DEFAULT 'in_progress',

    INDEX `decision_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `role` VARCHAR(15) NOT NULL DEFAULT 'visitor',
    `email` VARCHAR(50) NOT NULL,
    `hashed_password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `decision_comment` FOREIGN KEY (`decision_id`) REFERENCES `decision`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `concerned` ADD CONSTRAINT `concerned_decision` FOREIGN KEY (`decision_id`) REFERENCES `decision`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `concerned` ADD CONSTRAINT `concerned_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `decision` ADD CONSTRAINT `decision_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

