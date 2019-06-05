-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Jun 2019 um 21:27
-- Server-Version: 10.1.37-MariaDB
-- PHP-Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `kabaret`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellungen`
--

CREATE TABLE `bestellungen` (
  `BestellungsID` int(11) NOT NULL,
  `BestellungsPreis` double(3,2) NOT NULL,
  `GutscheinWert` double(3,2) DEFAULT NULL,
  `GeldErhalten` double(3,2) NOT NULL,
  `TrinkGeld` double(3,2) DEFAULT NULL,
  `Rueckgeld` double(3,2) NOT NULL,
  `Zeit` datetime NOT NULL,
  `Nutzer` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `getraenke`
--

CREATE TABLE `getraenke` (
  `GetraenkeID` int(11) NOT NULL,
  `Art` varchar(11) NOT NULL,
  `Groesse` double(3,2) NOT NULL,
  `Preis` double(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `getraenke`
--

INSERT INTO `getraenke` (`GetraenkeID`, `Art`, `Groesse`, `Preis`) VALUES
(1, 'Cola', 0.50, 1.00),
(2, 'Cola', 1.00, 1.50),
(4, 'WeiÃŸwein', 0.01, 0.01),
(6, 'Rotwein', 1.00, 4.00),
(7, 'Sekt', 1.00, 5.00),
(8, 'Kafee', 0.20, 1.00),
(9, 'Orangensaft', 0.50, 1.00),
(13, 'Tee', 0.20, 1.00),
(14, 'Apfelsaft', 0.50, 1.00),
(15, 'Bier', 0.50, 2.00);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produkte`
--

CREATE TABLE `produkte` (
  `produkteID` int(11) NOT NULL,
  `Art` varchar(30) NOT NULL,
  `Groesse` double(3,2) NOT NULL,
  `Preis` double(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zuordnungbestellunggetranke`
--

CREATE TABLE `zuordnungbestellunggetranke` (
  `ID` int(11) NOT NULL,
  `BestellungsID` int(10) UNSIGNED NOT NULL,
  `GetrankeID` int(10) UNSIGNED NOT NULL,
  `Menge` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bestellungen`
--
ALTER TABLE `bestellungen`
  ADD PRIMARY KEY (`BestellungsID`);

--
-- Indizes für die Tabelle `getraenke`
--
ALTER TABLE `getraenke`
  ADD PRIMARY KEY (`GetraenkeID`);

--
-- Indizes für die Tabelle `produkte`
--
ALTER TABLE `produkte`
  ADD PRIMARY KEY (`produkteID`);

--
-- Indizes für die Tabelle `zuordnungbestellunggetranke`
--
ALTER TABLE `zuordnungbestellunggetranke`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bestellungen`
--
ALTER TABLE `bestellungen`
  MODIFY `BestellungsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `getraenke`
--
ALTER TABLE `getraenke`
  MODIFY `GetraenkeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `produkte`
--
ALTER TABLE `produkte`
  MODIFY `produkteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `zuordnungbestellunggetranke`
--
ALTER TABLE `zuordnungbestellunggetranke`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
