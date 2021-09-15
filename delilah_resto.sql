-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2021 a las 19:56:25
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `Order_id` int(5) NOT NULL COMMENT 'Primary key',
  `Status` enum('confirmado','en_preparacion','en_camino','entregado','Nuevo','Cancelado') NOT NULL,
  `Amount` int(10) NOT NULL,
  `Description` varchar(50) NOT NULL,
  `Payment_method` enum('Efectivo','Credito','Debito') NOT NULL,
  `Order_time` time NOT NULL,
  `User_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`Order_id`, `Status`, `Amount`, `Description`, `Payment_method`, `Order_time`, `User_id`) VALUES
(1, 'Nuevo', 2300, 'Orden de la web', 'Efectivo', '00:39:12', 5),
(14, 'Nuevo', 350, 'un pedido ', 'Credito', '23:29:34', 1),
(15, 'Nuevo', 350, 'un pedido ', 'Credito', '23:38:29', 1),
(16, 'Nuevo', 350, 'un pedido ', 'Credito', '23:40:03', 1),
(17, 'Nuevo', 350, 'un pedido ', 'Credito', '23:41:35', 1),
(18, 'Nuevo', 350, 'un pedido ', 'Credito', '23:42:50', 1),
(19, 'Nuevo', 350, 'un pedido ', 'Credito', '23:53:28', 1),
(20, 'en_preparacion', 350, 'un pedido ', 'Credito', '23:58:57', 1),
(22, 'Nuevo', 350, 'un pedido ', 'Credito', '00:17:15', 1),
(24, 'Nuevo', 350, 'un pedido ', 'Credito', '00:19:37', 1),
(25, 'Nuevo', 350, 'un pedido ', 'Credito', '00:20:24', 1),
(27, 'Nuevo', 350, 'un pedido ', 'Credito', '00:26:29', 1),
(28, 'Nuevo', 350, 'un pedido ', 'Credito', '00:27:20', 1),
(31, 'confirmado', 350, 'un pedido ', 'Credito', '01:00:25', 14),
(32, 'Nuevo', 350, 'un pedido ', 'Credito', '01:08:47', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE `orders_products` (
  `Between_id` int(5) NOT NULL COMMENT 'Primary key',
  `Order_id` int(5) NOT NULL,
  `Product_id` int(5) NOT NULL,
  `Quantity_products` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`Between_id`, `Order_id`, `Product_id`, `Quantity_products`) VALUES
(2, 1, 3, 1),
(5, 22, 2, 2),
(9, 24, 2, 2),
(11, 25, 2, 2),
(15, 27, 2, 2),
(17, 28, 2, 2),
(23, 31, 3, 2),
(24, 31, 6, 4),
(25, 32, 21, 1),
(26, 32, 6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `Product_id` int(5) NOT NULL COMMENT 'Primary key',
  `Product_name` varchar(50) NOT NULL,
  `Product_price` int(20) NOT NULL,
  `Photo` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`Product_id`, `Product_name`, `Product_price`, `Photo`) VALUES
(2, 'Salmon con papa noisette', 1500, 'https://cdn.queapetito.com/wp-content/uploads/2019/07/patatas-noisette-salmon.jpg'),
(3, 'Sushi California', 2000, 'https://www.hola.com/imagenes/cocina/recetas/20200221161232/sushi-maki-de-atun/0-787-34/sushi-maki-de-atun-m.jpg'),
(6, 'Mi nuevo Taco Mex Big', 1340, 'https://www.hola.com/imagenes/cocina/recetas/20200221161232/sushi-maki-de-atun/0-787-34/sushi-maki-de-atun-m.jpg'),
(21, 'Varenikis', 850, 'https://www.hola.com/imagenes/cocina/recetas/20200221161232/sushi-maki-de-atun/0-787-34/sushi-maki-de-atun-m.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `User_id` int(5) NOT NULL COMMENT 'Primary key',
  `Username` varchar(50) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Firstname` varchar(50) NOT NULL,
  `Lastname` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Adress` varchar(50) NOT NULL,
  `Admin_rol` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`User_id`, `Username`, `Password`, `Firstname`, `Lastname`, `Email`, `Phone`, `Adress`, `Admin_rol`) VALUES
(1, 'MiguelBal', '111111', 'Miguel', 'Balderrama', 'miguel@gmail.com', '+114455-3557', 'San Jose 3444, Buenos Aires', 0),
(2, 'Coder', '222222', 'Juan', 'Valdez', 'valdezz@gmail.com', '+7485986', 'Av Siempre Viva 1234, Springfield', 1),
(3, 'LucasRe', '3333', 'Lucas', 'Reyes', 'reyes@gmail.com', '+7485916', 'Av Siempre Viva 3333, Katty', 0),
(4, 'LucasReal', '3333', 'Lucas', 'Reyes', 'reyesreal@gmail.com', '+7485916', 'Av Siempre Viva 3333, Katty', 0),
(5, 'Angelcaido', '23456', 'Angel', 'Caido', 'angel@gmail.com', '+7485916', 'Av Siempre Viva 1234, Springfield', 0),
(6, 'Mathew', '23456', 'Matias', 'Pozniakova', 'matias@gmail.com', '+7485916', 'Av Siempre Viva 1234, Springfield', 0),
(7, 'Pablo', '23456', 'Pablouser', 'Paniagua', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(8, 'Pablo', '23456', 'Pablouser', 'Paniagua2', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(9, 'Lorito', '23456', 'Lorito', 'Loco', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(10, 'Lorito', '23456', 'Lorito', 'Loco', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(11, 'Lorito', '23456', 'Lorito', 'Loco', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(12, 'Lorito', '23456', 'Lorito', 'Loco', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(13, 'Lorito', '23456', 'Lorito', 'Loco', 'pablo@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 0),
(14, 'admin', '123456', 'admin', 'admin', 'admin@gmail.com', '+7485916', 'Av Siempre Viva 2546, Springfield', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Indices de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`Between_id`),
  ADD KEY `Order_id` (`Order_id`),
  ADD KEY `Order_id_2` (`Order_id`),
  ADD KEY `Product_id` (`Product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  MODIFY `Between_id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `Product_id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`Order_id`) REFERENCES `orders` (`Order_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`Product_id`) REFERENCES `products` (`Product_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
