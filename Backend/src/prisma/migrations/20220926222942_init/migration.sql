-- CreateTable
CREATE TABLE `ComputerPart` (
    `id` VARCHAR(14) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `color` VARCHAR(15) NOT NULL,
    `price` DECIMAL(65, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
