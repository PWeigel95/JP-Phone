-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Mai 2022 um 15:10
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
(1, 'Gast'),
(2, 'Admin'),
(3, 'User');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `anrede` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `vorname` varchar(50) NOT NULL,
  `nachname` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `plz` varchar(100) NOT NULL,
  `ort` int(100) NOT NULL,
  `benutzername` varchar(100) NOT NULL,
  `passwort` varchar(200) NOT NULL,
  `zahlungsinformation_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `user_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `anrede`, `email`, `vorname`, `nachname`, `adresse`, `plz`, `ort`, `benutzername`, `passwort`, `zahlungsinformation_id`, `role_id`, `user_status`) VALUES
(1, 'Herr', 'abc@hotmail', 'test', 'user', '', '', 0, '', 'password', 0, 2, 0),
(2, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdfasdf', 'asdf', 'sad', 0, 'asdfasdf', '$2y$10$o3N80TiTC5ZM5dHhrSLK/eq3wRvySbpxAIQnKnfjtkTQ4f5rAnaMW', 1, 1, 1),
(3, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'asdf', 0, 'asdfasdf', '$2y$10$yq8mOx1LUjq1oDCTVHSqHeoWdZIMjNeFqfoU/mxMwMMFNct67XhdG', 1, 1, 1),
(4, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'asd', 0, 'asdfasdf', '$2y$10$Ifvc7vX1SvhyfQF0AxgZMOzvNyoPxvQxjfF/4HcE23AU6mQIebphy', 1, 1, 1),
(5, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'asd', 0, 'asdfasdf', '$2y$10$x0cJ7dlkfuaGfWqO8f7dDOLLLYJzFWb4JrJg4UOZtjjuASQcpLgRu', 1, 1, 1),
(6, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'asdf', 0, 'asdfasdf', '$2y$10$M2iKC8qMU3A7.2sIJBXEd.NaX63JMEky0CEJaOztsFLVgaZGsd.ym', 1, 1, 1),
(7, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'sdfg', 'asdf', 0, 'asdfasdf', '$2y$10$5eKWDSt5PV969KOMchrC6etzX4yh9UXau1LSGt/E0VATwLLaIVVTC', 1, 1, 1),
(8, 'Frau', 'asdf@hotmail.com', 'asdfas', 'asdf', 'asdf', 'as', 0, 'asdfasdf', '$2y$10$gsrSSq9jGVVbscESJtK2UO6M7OO2R5iF7cQlNrbnWr51dtqHrcuoK', 1, 1, 1),
(9, 'Frau', 'asdf@hotmail.com', 'asdfas', 'asdf', 'asdf', 'as', 0, 'asdfasdf', '$2y$10$qmfZx970oYQIMIk05fg0iORR.RFo.4tBe0Zbw8m88hm0z5IworWO6', 1, 1, 1),
(10, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'as', 0, 'asdfasdf', '$2y$10$WWb6Z9234p./KX71GAtXEOJTYyvOUYZujW5cGh77MDDuabjAJ4MIa', 1, 1, 1),
(11, 'Frau', 'asdf@hotmail.com', 'asd', 'asdf', 'asdf', 'asdf', 0, 'asdfasdf', '$2y$10$0FLkfJG1j76vNoVMUE566ObXcOAdmPlan7AH/Ye1LUbpBLnhCyU1y', 1, 1, 1),
(12, 'Frau', 'asdf@hotmail.com', 'asdf', 'asdf', 'asdf', 'asdf', 0, 'asdfasdf', '$2y$10$6zirokHB4dRlQA1z7FxBkuWnCHjoZkxRa2ou6DQq7Yvl/t5UQQfGe', 1, 1, 1);

--
-- Indizes der exportierten Tabellen
--

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
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
