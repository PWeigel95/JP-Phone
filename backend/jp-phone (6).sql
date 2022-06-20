-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Jun 2022 um 11:48
-- Server-Version: 10.4.21-MariaDB
-- PHP-Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `jp-phone`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Apple'),
(2, 'Xiaomi'),
(3, 'Samsung');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `billing_name` varchar(255) NOT NULL,
  `billing_address` varchar(255) NOT NULL,
  `billing_zipcode` varchar(255) NOT NULL,
  `billing_place` varchar(255) NOT NULL,
  `invoice_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_price`, `creation_date`, `billing_name`, `billing_address`, `billing_zipcode`, `billing_place`, `invoice_id`) VALUES
(1, 13, '1348.99', '2022-06-17 14:48:34', 'Herr testuser test weigel test', 'teststraße', '1080', 'Wientest', '202206000000'),
(2, 13, '1398.00', '2022-06-17 14:49:45', 'Herr testuser test weigel test', 'teststraße', '1080', 'Wientest', '202206000002'),
(3, 13, '3095.99', '2022-06-17 14:50:23', 'Herr testuser test weigel test', 'teststraße', '1080', 'Wientest', '202206000003'),
(4, 14, '2999.90', '2022-06-17 15:03:54', 'Frau gast gast', 'gaststraße', '1001', 'Wien', '202206000004'),
(5, 14, '2099.93', '2022-06-17 15:17:29', 'Frau gast gast', 'gaststraße', '1001', 'Wien', '202206000005');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_products`
--

CREATE TABLE `order_products` (
  `order_product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price_per_item` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `order_products`
--

INSERT INTO `order_products` (`order_product_id`, `order_id`, `product_id`, `amount`, `price_per_item`, `total_price`) VALUES
(1, 0, 4, 1, '299.99', '299.99'),
(2, 0, 3, 1, '1049.00', '1049.00'),
(3, 2, 1, 2, '699.00', '1398.00'),
(4, 3, 5, 1, '199.00', '199.00'),
(5, 3, 4, 1, '299.99', '299.99'),
(6, 3, 3, 1, '1049.00', '1049.00'),
(7, 3, 2, 1, '849.00', '849.00'),
(8, 3, 1, 1, '699.00', '699.00'),
(9, 4, 4, 10, '299.99', '2999.90'),
(10, 5, 4, 7, '299.99', '2099.93');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `description`, `image_url`, `category_id`) VALUES
(1, 'Apple iPhone 11', '699.00', 'Apple iPhone 11', 'res/img/products/Apple iPhone 11.png', 1),
(2, 'Apple iPhone 12', '849.00', 'Apple iPhone 12', 'res/img/products/Apple iPhone 11.png', 1),
(3, 'Apple iPhone 13', '1049.00', 'Apple iPhone 13', 'res/img/products/Apple iPhone 11.png', 1),
(4, 'Apple 5', '299.99', 'Apple 5', '', 1),
(7, 'Samsung Test', '400.00', 'Samsung Test', '', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`id`, `description`) VALUES
(1, 'User'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `anrede` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `vorname` varchar(100) NOT NULL,
  `nachname` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `plz` varchar(100) NOT NULL,
  `ort` varchar(100) NOT NULL,
  `benutzername` varchar(100) NOT NULL,
  `passwort` varchar(200) NOT NULL,
  `zahlungsinformation_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `erstellungsdatum` varchar(255) NOT NULL,
  `user_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `benutzername`, `passwort`, `zahlungsinformation_id`, `role_id`, `erstellungsdatum`, `user_status`) VALUES
(13, 'Herr', 'test@hotmail.com', 'testuser test', 'weigel test', 'teststraße', '1080', 'Wientest', 'testuser', '$2y$10$Z0Xvj.rlleA4rxPIZrPCLOKFnfPgZ6yLhQA3dP5NH3uNBAOE5nkA2', 1, 2, '31-May-2022 19:43:32', 'aktiv'),
(14, 'Frau', 'gast@hotmail.com', 'gast', 'gast', 'gaststraße', '1001', 'Wien', 'gast', '$2y$10$rdhsIW5dZzHxZGFsoXKKAu.D6ZPFZ7SrOo4wc2Ak2cK4/xQLk459C', 1, 1, '17-Jun-2022 15:03:38', 'aktiv');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indizes für die Tabelle `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`order_product_id`);

--
-- Indizes für die Tabelle `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
