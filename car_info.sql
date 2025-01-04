-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2024 at 07:25 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint UNSIGNED NOT NULL,
  `plate_no` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `country_code` varchar(3) COLLATE utf8mb4_general_ci NOT NULL,
  `total_seats` bigint DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `carmodels_id` bigint UNSIGNED NOT NULL,
  `cargallerys_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `plate_no`, `country_code`, `total_seats`, `price`, `carmodels_id`, `cargallerys_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'YG-29382', 'mm', 4, '4000.00', 2, 1, '2024-11-29 01:24:11.000', '2024-11-29 01:24:11.000', NULL),
(2, 'CAR-002', 'US', 4, '26000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(3, 'CAR-003', 'US', 5, '27000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(4, 'CAR-004', 'US', 5, '28000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(5, 'CAR-005', 'US', 4, '29000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(6, 'CAR-006', 'US', 6, '30000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(7, 'CAR-007', 'US', 4, '31000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(8, 'CAR-008', 'US', 4, '32000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(9, 'CAR-009', 'US', 5, '33000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(10, 'CAR-010', 'US', 4, '34000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(11, 'CAR-011', 'US', 4, '35000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(12, 'CAR-012', 'US', 4, '36000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(13, 'CAR-013', 'US', 6, '37000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(14, 'CAR-014', 'US', 5, '38000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(15, 'CAR-015', 'US', 4, '39000.00', 1, 1, '2024-11-29 01:55:42.000', '2024-11-29 01:55:42.000', NULL),
(38, 'YG-293821', 'mm', 4, '4000.00', 2, 1, '2024-11-29 01:24:11.000', '2024-11-29 01:24:11.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `car_brands`
--

CREATE TABLE `car_brands` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `brand_logo` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_brands`
--

INSERT INTO `car_brands` (`id`, `name`, `brand_logo`) VALUES
(1, 'TOYOTA', 'toyota_logo.png'),
(2, 'Ford', 'ford_logo.png'),
(3, 'Chevrolet', 'chevrolet.png');

-- --------------------------------------------------------

--
-- Table structure for table `car_galleries`
--

CREATE TABLE `car_galleries` (
  `id` bigint UNSIGNED NOT NULL,
  `image_path` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_galleries`
--

INSERT INTO `car_galleries` (`id`, `image_path`) VALUES
(1, '1732818030996182000_car.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `car_models`
--

CREATE TABLE `car_models` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `carbrands_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_models`
--

INSERT INTO `car_models` (`id`, `title`, `carbrands_id`) VALUES
(1, 'Toyota Camry', 1),
(2, ' Toyota Kluger,', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `ordered_car_id` bigint UNSIGNED NOT NULL,
  `orderer_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(225) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usertype` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_cars_plate_no` (`plate_no`),
  ADD KEY `fk_cars_car_model` (`carmodels_id`),
  ADD KEY `fk_cars_car_gallery` (`cargallerys_id`);

--
-- Indexes for table `car_brands`
--
ALTER TABLE `car_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_galleries`
--
ALTER TABLE `car_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_models`
--
ALTER TABLE `car_models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_car_models_car_brand` (`carbrands_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_car` (`ordered_car_id`),
  ADD KEY `fk_orders_user` (`orderer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `car_brands`
--
ALTER TABLE `car_brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `car_galleries`
--
ALTER TABLE `car_galleries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `car_models`
--
ALTER TABLE `car_models`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `fk_cars_car_gallery` FOREIGN KEY (`cargallerys_id`) REFERENCES `car_galleries` (`id`),
  ADD CONSTRAINT `fk_cars_car_model` FOREIGN KEY (`carmodels_id`) REFERENCES `car_models` (`id`);

--
-- Constraints for table `car_models`
--
ALTER TABLE `car_models`
  ADD CONSTRAINT `fk_car_models_car_brand` FOREIGN KEY (`carbrands_id`) REFERENCES `car_brands` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_car` FOREIGN KEY (`ordered_car_id`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`orderer_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
