-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Jun 2022 um 19:33
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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `description`, `image_url`) VALUES
(1, 'Apple iPhone 11', '699.00', 'Apple iPhone 11', 'res/img/products/Apple iPhone 11.png'),
(2, 'Apple iPhone 12', '849.00', 'Apple iPhone 12', 'res/img/products/Apple iPhone 11.png'),
(3, 'Apple iPhone 13', '1049.00', 'Apple iPhone 13', 'res/img/products/Apple iPhone 11.png'),
(4, 'Apple 5', '299.99', 'Apple 5', ''),
(5, 'Apple 4', '199.00', 'Apple 4', '');

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
  `erstellungsdatum` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `benutzername`, `passwort`, `zahlungsinformation_id`, `role_id`, `erstellungsdatum`) VALUES
(13, 'Herr', 'test@hotmail.com', 'testuser test', 'weigel test', 'teststraße', '1080', 'Wientest', 'testuser', '$2y$10$Z0Xvj.rlleA4rxPIZrPCLOKFnfPgZ6yLhQA3dP5NH3uNBAOE5nkA2', 1, 2, '31-May-2022 19:43:32');

--
-- Indizes der exportierten Tabellen
--

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
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT für Tabelle `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT für Tabelle `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
