-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Lip 2022, 20:55
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `domowabibloteka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `books`
--

CREATE TABLE `books` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `title` varchar(100) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `surname` varchar(35) DEFAULT NULL,
  `release` year(4) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `books`
--

INSERT INTO `books` (`id`, `title`, `name`, `surname`, `release`, `category`) VALUES
('0615bbb8-b4e1-11ec-8fa5-28d244c467fd', 'Grama to nie Drama. Angielska gramatyka, czyli czasy i inne dziewne rzeczy cześć 1', 'Witt', 'Witt', NULL, NULL),
('3531e849-f885-11ec-be0b-002713c642bb', 'react', 'Adam', 'Major', 2022, 'Programowanie'),
('38b7a511-b4e1-11ec-8fa5-28d244c467fd', 'React 16. Framework dla profesjonalistów', 'Adam', 'Freeman', 2020, 'Programowanie'),
('5a840373-b4e1-11ec-8fa5-28d244c467fd', 'React i Redux. Praktyczne tworzenie aplikacji WWW', 'Kirupa', 'Chinnathambi', 2019, 'Programowanie'),
('6ec93b2f-b4e1-11ec-8fa5-28d244c467fd', 'Mózg na Dektoksie', 'Perlmutter', 'David', 2021, 'Fantasy'),
('ad345754-b4e0-11ec-8fa5-28d244c467fd', 'Grama to nie Drama. Angielska gramatyka, czyli czasy i inne dziewne rzeczy cześć 1', 'Arlena', 'Witt', 2017, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `name` varchar(30) NOT NULL,
  `podkategoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `category`
--

INSERT INTO `category` (`name`, `podkategoria`) VALUES
('Edukacja', 'Nauka Angielskiego'),
('Fantasy', NULL),
('Historia', NULL),
('Programowanie', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(25) NOT NULL,
  `surname` varchar(35) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `clients`
--

INSERT INTO `clients` (`id`, `name`, `surname`, `email`, `phone`) VALUES
('76e437bc-f883-11ec-be0b-002713c642bb', 'Stefański', 'Wojciech', 'staf@vp.pl', '908-909-222'),
('809fe3d2-b4e1-11ec-8fa5-28d244c467fd', 'Kuba', 'Brzęczek', NULL, NULL),
('8a4549da-b4e1-11ec-8fa5-28d244c467fd', 'Małgorzata', 'Makowska', NULL, NULL),
('c909c473-2b3f-4df3-ae8b-8b9eca34b7a9', 'Kowalski', 'Grzegorz', 'Qszax@vp.pl', '450-999-092');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rentals`
--

CREATE TABLE `rentals` (
  `rentId` varchar(36) NOT NULL DEFAULT uuid(),
  `bookId` varchar(36) DEFAULT NULL,
  `clientId` varchar(36) DEFAULT NULL,
  `startRent` varchar(20) NOT NULL DEFAULT '',
  `endRent` varchar(20) NOT NULL DEFAULT '',
  `state` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `rentals`
--

INSERT INTO `rentals` (`rentId`, `bookId`, `clientId`, `startRent`, `endRent`, `state`) VALUES
('26a18246-f893-11ec-be0b-002713c642bb', '38b7a511-b4e1-11ec-8fa5-28d244c467fd', '76e437bc-f883-11ec-be0b-002713c642bb', '2022-06-30', '2022-06-30', 0),
('4d0e6fe9-c47f-491b-b868-df902c8c4c73', '5a840373-b4e1-11ec-8fa5-28d244c467fd', '809fe3d2-b4e1-11ec-8fa5-28d244c467fd', '2022-7-15', 'Fri Jul 15 2022 18:2', 0),
('94abbf81-b4e1-11ec-8fa5-28d244c467fd', '6ec93b2f-b4e1-11ec-8fa5-28d244c467fd', '8a4549da-b4e1-11ec-8fa5-28d244c467fd', '2022-04-05', 'Fri Jul 15 2022 17:5', 0),
('b052cf68-d24b-4715-acbd-e6d2851d7456', '38b7a511-b4e1-11ec-8fa5-28d244c467fd', '76e437bc-f883-11ec-be0b-002713c642bb', '2022-7-15', 'Fri Jul 15 2022 18:2', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_books_category` (`category`);

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`rentId`),
  ADD KEY `FK_rentals_books` (`bookId`),
  ADD KEY `FK_rentals_clients` (`clientId`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `FK_books_category` FOREIGN KEY (`category`) REFERENCES `category` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `FK_rentals_books` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_rentals_clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
