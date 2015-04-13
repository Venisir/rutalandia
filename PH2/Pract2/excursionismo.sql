-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 02-03-2015 a las 23:40:56
-- Versión del servidor: 5.6.14
-- Versión de PHP: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `excursionismo`
--
CREATE DATABASE IF NOT EXISTS `excursionismo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `excursionismo`;
GRANT ALL PRIVILEGES ON excursionismo.* to 'ph2'@'127.0.0.1' identified by 'ph2';
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `COMENTARIO`
--

DROP TABLE IF EXISTS `COMENTARIO`;
CREATE TABLE IF NOT EXISTS `COMENTARIO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TEXTO` text,
  `TITULO` varchar(200) NOT NULL,
  `LOGIN` varchar(20) NOT NULL,
  `ID_RUTA` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `LOGIN` (`LOGIN`),
  KEY `ID_RUTA` (`ID_RUTA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `COMENTARIO`
--

INSERT INTO `COMENTARIO` (`ID`, `FECHA`, `TEXTO`, `TITULO`, `LOGIN`, `ID_RUTA`) VALUES
(1, '2015-02-22 21:22:18', 'Primer comentario de la ruta 2', 'Ruta 2 - Comentario 1', 'usu1', 2),
(2, '2015-02-22 21:23:00', 'Primer comentario de la ruta 1', 'Ruta 1 - Comentario 1', 'usu1', 1),
(3, '2015-02-22 21:23:37', 'Segundo comentario de la ruta 1', 'Ruta 1 - Comentario 2', 'usu2', 1),
(4, '2015-02-26 21:58:49', 'Primer comentario de la ruta 3', 'Ruta 3 - Comentario 1', 'usu1', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FOTO`
--

DROP TABLE IF EXISTS `FOTO`;
CREATE TABLE IF NOT EXISTS `FOTO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` text,
  `ARCHIVO` varchar(20) NOT NULL,
  `ID_RUTA` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_RECORRIDO` (`ID_RUTA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `FOTO`
--

INSERT INTO `FOTO` (`ID`, `DESCRIPCION`, `ARCHIVO`, `ID_RUTA`) VALUES
(1, 'Primera foto de la primera ruta.', '1.jpg', 1),
(2, 'Segunda foto de la primera ruta.', '2.jpg', 1),
(3, 'Primera foto de la segunda ruta.', '3.jpg', 2),
(4, 'Segunda foto de la segunda ruta.', '4.jpg', 2),
(5, 'Tercera foto de la segunda ruta.', '5.jpg', 2),
(6, 'Tercera foto de la primera ruta', '6.jpg', 1),
(7, 'Primera foto de la tercera ruta.', '7.jpg', 3),
(8, 'Segunda foto de la primera ruta.', '8.jpg', 3),
(9, 'Tercera foto de la tercera ruta.', '9.jpg', 3),
(10, 'Cuarta foto de tercera ruta.', '10.jpg', 3),
(11, 'Quinta foto de la tercera ruta.', '11.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RUTA`
--

DROP TABLE IF EXISTS `RUTA`;
CREATE TABLE IF NOT EXISTS `RUTA` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` timestamp NULL DEFAULT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  `RECORRIDO` text NOT NULL,
  `DESCRIPCION` text,
  `LOGIN` varchar(20) NOT NULL,
  `DIFICULTAD` tinyint(4) NOT NULL DEFAULT '0',
  `DISTANCIA` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `LOGIN` (`LOGIN`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `RUTA`
--

INSERT INTO `RUTA` (`ID`, `FECHA`, `NOMBRE`, `RECORRIDO`, `DESCRIPCION`, `LOGIN`, `DIFICULTAD`, `DISTANCIA`) VALUES
(1, '2014-12-20 07:28:00', 'RUTA 1', 'RECORRIDO 1', 'Descripción de la ruta 1.', 'usu1', 4, 4.36),
(2, '2014-12-14 09:00:00', 'RUTA 2', 'RECORRIDO 2', 'Descripción de la ruta 2.', 'usu2', 0, 6.35),
(3, '2015-02-26 09:00:00', 'RUTA 3', 'RECORRIDO 3', 'Descripción de la ruta 3.', 'usu1', 4, 5.75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
CREATE TABLE IF NOT EXISTS `USUARIO` (
  `LOGIN` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `CLAVE` varchar(35) DEFAULT NULL,
  `TIEMPO` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`LOGIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`LOGIN`, `PASSWORD`, `NOMBRE`, `EMAIL`, `CLAVE`, `TIEMPO`) VALUES
('usu1', 'usu1', 'Usuario Uno', 'usu1@ph2.com', '743eb76e9e176f68a545f8c3f79152bd', '2015-02-26 21:48:48'),
('usu2', 'usu2', 'Usuario Dos', 'usu2@ph2.com', '0606ef93aa030c7a44463e6c94f33bdc', '2015-02-17 22:33:51'),
('usu3', 'usu3', 'Usuario Tres', 'usu3@ph2.com', NULL, NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `COMENTARIO`
--
ALTER TABLE `COMENTARIO`
  ADD CONSTRAINT `COMENTARIO_ibfk_1` FOREIGN KEY (`LOGIN`) REFERENCES `USUARIO` (`LOGIN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `COMENTARIO_ibfk_2` FOREIGN KEY (`ID_RUTA`) REFERENCES `RUTA` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `FOTO`
--
ALTER TABLE `FOTO`
  ADD CONSTRAINT `FOTO_ibfk_1` FOREIGN KEY (`ID_RUTA`) REFERENCES `RUTA` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `RUTA`
--
ALTER TABLE `RUTA`
  ADD CONSTRAINT `RUTA_ibfk_1` FOREIGN KEY (`LOGIN`) REFERENCES `USUARIO` (`LOGIN`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
