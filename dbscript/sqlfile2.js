exports.sqlfile = `
-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2021 at 07:49 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: chakikadb
--
CREATE DATABASE IF NOT EXISTS 8IwQQ8rqHU;

USE 8IwQQ8rqHU;
-- --------------------------------------------------------

--
-- Table structure for table brands
--

CREATE TABLE IF NOT EXISTS brands (
  brand_id int(11) NOT NULL AUTO_INCREMENT,
  brand_name varchar(50) NOT NULL,
  PRIMARY KEY (brand_id)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table brands
--

INSERT INTO brands (brand_id, brand_name) VALUES
(1, 'Toyota'),
(2, 'Nissan'),
(3, 'Ford');

-- --------------------------------------------------------

--
-- Table structure for table categories
--

CREATE TABLE IF NOT EXISTS categories (
  category_id int(11) NOT NULL AUTO_INCREMENT,
  category_name varchar(35) NOT NULL,
  PRIMARY KEY (category_id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table categories
--

INSERT INTO categories (category_id, category_name) VALUES
(1, 'interior'),
(2, 'exterior'),
(3, 'Wheels');

-- --------------------------------------------------------

--
-- Table structure for table discounts
--

CREATE TABLE IF NOT EXISTS discounts (
  product_id int(11) NOT NULL,
  discount_rate decimal(5,5) DEFAULT NULL,
  expire_date date DEFAULT NULL,
  UNIQUE KEY product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table discounts
--

INSERT INTO discounts (product_id, discount_rate, expire_date) VALUES
(1, '0.17000', '2021-05-13'),
(2, '0.14000', '2021-05-13'),
(12, '0.11000', '2021-05-13'),
(13, '0.37000', '2021-05-13'),
(15, '0.47000', '2021-06-13'),
(22, '0.15000', '2021-05-13'),
(23, '0.18000', '2021-06-13'),
(33, '0.37000', '2021-05-13'),
(53, '0.39000', '2021-06-13');

-- --------------------------------------------------------

--
-- Table structure for table garage_cars
--

CREATE TABLE IF NOT EXISTS garage_cars (
  car_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  model_id int(11) NOT NULL,
  brand_id int(11) NOT NULL,
  PRIMARY KEY (car_id,user_id,model_id,brand_id),
  KEY fk_garages_users1 (user_id),
  KEY fk_garages_models1 (model_id),
  KEY fk_garages_brands1 (brand_id)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=latin1;

--
-- Dumping data for table garage_cars
--

INSERT INTO garage_cars (car_id, user_id, model_id, brand_id) VALUES
(109, 91, 7, 3),
(114, 92, 2, 1),
(115, 92, 7, 3),
(116, 92, 6, 2),
(117, 92, 8, 3),
(120, 92, 4, 2),
(125, 68, 7, 3),
(126, 73, 7, 3),
(127, 68, 4, 2),
(131, 91, 8, 3),
(137, 80, 7, 3),
(138, 68, 1, 1),
(161, 87, 7, 3),
(165, 87, 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table location
--

CREATE TABLE IF NOT EXISTS location (
  location_id int(11) NOT NULL AUTO_INCREMENT,
  location_name varchar(50) NOT NULL,
  latitude decimal(8,6) NOT NULL,
  longitude decimal(9,6) NOT NULL,
  PRIMARY KEY (location_id)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table location
--

INSERT INTO location (location_id, location_name, latitude, longitude) VALUES
(1, 'Green', '18.338162', '-99.548574'),
(2, 'Fairfield', '45.455696', '4.413543'),
(3, 'Gulseth', '63.007458', '16.664049'),
(4, 'Westend', '-8.799026', '115.220088'),
(5, 'Buhler', '9.749437', '105.532783'),
(6, 'Bluestem', '25.112046', '99.161761'),
(7, 'Claremont', '59.341383', '18.058521'),
(8, 'Sundown', '4.141254', '117.648519'),
(9, 'Northwestern', '57.522596', '25.334830'),
(10, 'South', '-8.844900', '121.195600'),
(11, 'Gulseth', '-7.800363', '110.018167'),
(12, 'Havey', '19.763306', '96.078510'),
(13, 'Nancy', '-8.470224', '123.031062'),
(14, 'Golf View', '59.319296', '13.538959'),
(15, 'Pennsylvania', '8.895080', '-76.354590'),
(16, 'Gina', '19.338776', '-99.149747'),
(17, 'Almo', '16.129395', '120.537212'),
(18, 'Sommers', '48.987560', '2.297158'),
(19, 'Hagan', '45.973565', '134.187243'),
(20, 'Helena', '50.643436', '21.888524'),
(21, 'Independence', '36.040149', '101.433298'),
(22, 'Ryan', '15.757123', '121.549796'),
(23, 'Lillian', '36.954998', '65.125449'),
(24, 'Fieldstone', '-6.460817', '108.298731'),
(25, 'Vermont', '59.863758', '17.620587'),
(26, 'Express', '-10.074544', '-77.144921'),
(27, 'Carioca', '6.151442', '-5.951540'),
(28, 'Tennessee', '40.707450', '14.804607'),
(29, 'Hayes', '-7.152592', '111.897102'),
(30, 'Charing Cross', '7.414383', '81.830633'),
(31, 'Thierer', '22.781631', '108.273158'),
(32, 'Atwood', '-22.994129', '-51.193139'),
(33, 'Pearson', '19.176558', '-72.138651'),
(34, 'Shasta', '-23.177027', '-46.497012'),
(35, 'Morning', '47.073957', '28.680195'),
(36, 'Merrick', '42.081375', '48.279247'),
(37, 'New Castle', '24.497050', '103.418167'),
(38, 'Brown', '45.259988', '20.573557'),
(39, 'Texas', '9.423496', '-63.729674'),
(40, 'Grim', '45.995675', '20.027879'),
(41, 'Dwight', '59.834530', '15.690544'),
(42, 'Upham', '43.641097', '51.198511'),
(43, 'Village Green', '51.728685', '5.400870'),
(44, 'Oneill', '19.883740', '109.745545'),
(45, 'Utah', '13.739085', '-89.161075'),
(46, 'Pond', '53.294823', '69.404787'),
(47, 'Hallows', '23.116886', '113.237353'),
(48, 'Jana', '44.988449', '126.049702'),
(49, 'Scofield', '48.559733', '7.745927'),
(50, 'Summit', '43.918776', '125.290702');

-- --------------------------------------------------------

--
-- Table structure for table models
--

CREATE TABLE IF NOT EXISTS models (
  model_id int(11) NOT NULL AUTO_INCREMENT,
  model_name varchar(50) NOT NULL,
  model_year year(4) NOT NULL,
  PRIMARY KEY (model_id)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

--
-- Dumping data for table models
--

INSERT INTO models (model_id, model_name, model_year) VALUES
(1, 'Camry', 2010),
(2, 'Corolla', 2010),
(3, 'Hilux', 2010),
(4, 'Sunny', 2015),
(5, 'Altima', 2015),
(6, 'Maxima', 2015),
(7, 'Explorer', 2016),
(8, 'Taurus', 2016),
(9, 'Fusion', 2016);

-- --------------------------------------------------------

--
-- Table structure for table orders
--

CREATE TABLE IF NOT EXISTS orders (
  order_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  status tinyint(1) DEFAULT NULL,
  order_date date NOT NULL,
  PRIMARY KEY (order_id),
  KEY fkIdx_20 (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table orders
--

INSERT INTO orders (order_id, user_id, status, order_date) VALUES
(12, 68, 0, '2021-07-05'),
(13, 72, 0, '2021-07-05'),
(14, 91, 0, '2021-07-05'),
(15, 80, 0, '2021-07-05'),
(16, 87, 0, '2021-12-03');

-- --------------------------------------------------------

--
-- Table structure for table order_items
--

CREATE TABLE IF NOT EXISTS order_items (
  order_id int(11) NOT NULL,
  product_id int(11) NOT NULL,
  quantity int(11) NOT NULL,
  price decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (order_id,product_id),
  KEY fkIdx_168 (order_id),
  KEY fkIdx_171 (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table order_items
--

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(12, 3, 1, '177.00'),
(12, 23, 1, '105.41'),
(13, 20, 1, '103.75'),
(13, 47, 1, '111.00'),
(14, 34, 1, '166.00'),
(16, 8, 1, '193.00'),
(16, 11, 1, '143.00'),
(16, 13, 1, '97.02'),
(16, 20, 1, '125.00'),
(16, 30, 1, '86.00'),
(16, 36, 1, '42.00'),
(16, 38, 1, '156.00'),
(16, 59, 1, '148.00'),
(16, 61, 1, '155.00'),
(16, 70, 1, '79.00'),
(16, 71, 1, '135.00'),
(16, 72, 1, '165.00'),
(16, 75, 1, '75.00'),
(16, 76, 1, '100.00');

-- --------------------------------------------------------

--
-- Table structure for table products
--

CREATE TABLE IF NOT EXISTS products (
  product_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(60) NOT NULL,
  category_id int(11) NOT NULL,
  model_id int(11) DEFAULT NULL,
  brand_id int(11) DEFAULT NULL,
  image_url text DEFAULT NULL,
  PRIMARY KEY (product_id),
  UNIQUE KEY image_url (image_url) USING HASH,
  KEY fkIdx_65 (category_id),
  KEY fkIdx_68 (model_id),
  KEY fkIdx_71 (brand_id)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

--
-- Dumping data for table products
--

INSERT INTO products (product_id, product_name, category_id, model_id, brand_id, image_url) VALUES
(1, 'Toyota Amplifier', 1, 1, 1, NULL),
(2, 'Toyota Cushion Seat', 1, 2, 1, NULL),
(3, 'Toyota Stering Wheel', 1, 3, 1, NULL),
(4, 'Nissan Dashboard Panel', 1, 4, 2, NULL),
(5, 'Nissan Radio', 1, 5, 2, NULL),
(6, 'Nissan Gear Handler', 1, 6, 2, NULL),
(7, 'Ford Radio', 1, 7, 3, NULL),
(8, 'Ford Speed meter', 1, 8, 3, NULL),
(9, 'Ford Seatbelt', 1, 9, 3, NULL),
(10, 'Ford Cup Holder', 1, 9, 3, NULL),
(11, 'Toyota Bumper Front ', 2, 1, 1, NULL),
(12, 'Toyota Headlights', 2, 2, 1, NULL),
(13, 'Toyota Bumper Back', 2, 3, 1, NULL),
(14, 'Nissan Headlights', 2, 4, 2, NULL),
(15, 'Nissan Radiator', 2, 5, 2, NULL),
(16, 'Nissan Rear Door', 2, 6, 2, NULL),
(17, 'Ford Radiator', 2, 7, 3, NULL),
(18, 'Ford Tail-light', 2, 8, 3, NULL),
(19, 'Ford Headlights', 2, 9, 3, NULL),
(20, 'Ford Mirror', 2, 9, 3, NULL),
(21, 'Toyota Wheel', 3, 1, 1, NULL),
(22, 'Toyota Break Pads', 3, 2, 1, NULL),
(23, 'Toyota Tire', 3, 3, 1, NULL),
(24, 'Nissan Tire', 3, 4, 2, NULL),
(25, 'Nissan Break Pads', 3, 5, 2, NULL),
(26, 'Nissan Wheel Original', 3, 6, 2, NULL),
(27, 'Ford Wheel Korean', 3, 7, 3, NULL),
(28, 'Ford Wheel Korean', 3, 8, 3, NULL),
(29, 'Ford Break Pads', 3, 9, 3, NULL),
(30, 'Ford Tire German', 3, 9, 3, NULL),
(31, 'Toyota Radio Touchpad', 1, 1, 1, NULL),
(32, 'Toyota Stering Wheel Cover', 1, 2, 1, NULL),
(33, 'Toyota Cushion Seat Sport', 1, 3, 1, NULL),
(34, 'Nissan Cushion Seat', 1, 4, 2, NULL),
(35, 'Nissan Feet Rug', 1, 5, 2, NULL),
(36, 'Nissan Middle Mirror', 1, 6, 2, NULL),
(37, 'Ford Cushion', 1, 7, 3, NULL),
(38, 'Ford Middle Mirror', 1, 8, 3, NULL),
(39, 'Ford Rear Seat', 1, 9, 3, NULL),
(40, 'Ford Dashboard Panel', 1, 9, 3, NULL),
(41, 'Toyota Hood New', 2, 1, 1, NULL),
(42, 'Toyota Hood Second Hand ', 2, 2, 1, NULL),
(43, 'Totota Windsheild Green', 2, 3, 1, NULL),
(44, 'Nissan Windshield Blue', 2, 4, 2, NULL),
(45, 'Nissan Antenna two feet', 2, 5, 2, NULL),
(46, 'Nissan Headlight blue', 2, 6, 2, NULL),
(47, 'Ford Antenna three feet', 2, 7, 3, NULL),
(48, 'Ford Trunk Hood', 2, 8, 3, NULL),
(49, 'Ford Black Spoiler', 2, 9, 3, NULL),
(50, 'Ford White Spoiler', 2, 9, 3, NULL),
(51, 'Toyota Wheel blue', 3, 1, 1, NULL),
(52, 'Toyota Wheel red', 3, 2, 1, NULL),
(53, 'Toyota Break Pad red', 3, 3, 1, NULL),
(54, 'Nissan Wheel purple', 3, 4, 2, NULL),
(55, 'Nissan Wheel red', 3, 5, 2, NULL),
(56, 'Nissan Breaking Pad green', 3, 6, 2, NULL),
(57, 'Ford Breaking Pad green', 3, 7, 3, NULL),
(58, 'Ford Wheel pink', 3, 8, 3, NULL),
(59, 'Ford Tire German', 3, 9, 3, NULL),
(60, 'Ford Tire Korean', 3, 9, 3, NULL),
(61, 'Toyota Middle Mirror mini', 1, 1, 1, NULL),
(62, 'Toyota Cushion red', 1, 2, 1, NULL),
(63, 'Toyota Cushion black', 1, 3, 1, NULL),
(64, 'Nissan Radio old fashion', 1, 4, 2, NULL),
(65, 'Nissan Radio touchpad', 1, 5, 2, NULL),
(66, 'Nissan Stering Wheel cover', 1, 6, 2, NULL),
(67, 'Ford Cushion black', 1, 7, 3, NULL),
(68, 'Ford Stering Wheel orange cover', 1, 8, 3, NULL),
(69, 'Ford Stering Wheel airbag', 1, 9, 3, NULL),
(70, 'Ford Amplifier', 1, 9, 3, NULL),
(71, 'Toyota Front Bumper', 2, 1, 1, NULL),
(72, 'Toyota Back Bumper', 2, 2, 1, NULL),
(73, 'Toyota Wings white', 2, 3, 1, NULL),
(74, 'Nissan Wings orange', 2, 4, 2, NULL),
(75, 'Nissan fornt bumper', 2, 5, 2, NULL),
(76, 'Nissan back bumper', 2, 6, 2, NULL),
(77, 'Ford side spoilers', 2, 7, 3, NULL),
(78, 'Ford red windshields', 2, 8, 3, NULL),
(79, 'Ford black hood', 2, 9, 3, NULL),
(80, 'Ford wipers black', 2, 9, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table requests
--

CREATE TABLE IF NOT EXISTS requests (
  request_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  request_phone varchar(15) NOT NULL,
  subject varchar(300) NOT NULL,
  message text NOT NULL,
  user_id int(11) NOT NULL,
  PRIMARY KEY (request_id,user_id)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table requests
--

INSERT INTO requests (request_id, name, request_phone, subject, message, user_id) VALUES
(32, 'aryan', '555555', 'fjdh', 'nnn', 68),
(33, 'aryan', '07701288282', 'thriller', 'lmaoo', 92),
(34, 'aryan', '07701288282', 'lol', 'lol', 73),
(35, 'aryan', '07701996969', 'lol', 'rhfhhffh', 68),
(36, 'aryan', '07001001010', '19192929', 'this was sent using y@gmail.com', 91),
(37, 'Shelgir', '07701234567', 'Request for Camaro Windshield', 'Hello Dear\n\nI hope this message finds you well\n\nCan I get this product please: www.carid.com/product1\n\nRegards', 87);

-- --------------------------------------------------------

--
-- Table structure for table stocks
--

CREATE TABLE IF NOT EXISTS stocks (
  store_id int(11) NOT NULL,
  product_id int(11) NOT NULL,
  stock_quantity int(11) NOT NULL,
  unit_price decimal(12,2) NOT NULL,
  PRIMARY KEY (store_id,product_id),
  KEY fkIdx_157 (store_id),
  KEY fkIdx_165 (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table stocks
--

INSERT INTO stocks (store_id, product_id, stock_quantity, unit_price) VALUES
(1, 1, 0, '115.00'),
(1, 2, 8, '120.00'),
(1, 3, 5, '177.00'),
(1, 4, 9, '140.00'),
(1, 5, 3, '71.00'),
(1, 6, 10, '188.00'),
(1, 7, 10, '46.00'),
(1, 8, 2, '193.00'),
(2, 9, 2, '136.00'),
(2, 10, 8, '52.00'),
(2, 11, 9, '143.00'),
(2, 12, 2, '177.00'),
(2, 13, 1, '154.00'),
(2, 14, 9, '68.00'),
(2, 15, 6, '98.00'),
(2, 16, 9, '150.00'),
(3, 17, 0, '74.00'),
(3, 18, 10, '73.00'),
(3, 19, 7, '186.00'),
(3, 20, 6, '125.00'),
(3, 21, 3, '106.00'),
(3, 22, 7, '170.00'),
(3, 23, 6, '127.00'),
(3, 24, 8, '92.00'),
(4, 25, 1, '181.00'),
(4, 26, 6, '177.00'),
(4, 27, 9, '127.00'),
(4, 28, 6, '132.00'),
(4, 29, 10, '130.00'),
(4, 30, 5, '86.00'),
(4, 31, 2, '43.00'),
(4, 32, 7, '193.00'),
(5, 33, 6, '122.00'),
(5, 34, 2, '166.00'),
(5, 35, 2, '135.00'),
(5, 36, 5, '42.00'),
(5, 37, 7, '107.00'),
(5, 38, 10, '156.00'),
(5, 39, 3, '82.00'),
(5, 40, 0, '60.00'),
(6, 41, 8, '141.00'),
(6, 42, 6, '79.00'),
(6, 43, 3, '52.00'),
(6, 44, 6, '59.00'),
(6, 45, 8, '160.00'),
(6, 46, 2, '197.00'),
(6, 47, 10, '111.00'),
(6, 48, 1, '58.00'),
(7, 49, 6, '142.00'),
(7, 50, 1, '64.00'),
(7, 51, 2, '190.00'),
(7, 52, 8, '142.00'),
(7, 53, 8, '188.00'),
(7, 54, 7, '126.00'),
(7, 55, 7, '63.00'),
(7, 56, 2, '199.00'),
(8, 57, 3, '100.00'),
(8, 58, 8, '187.00'),
(8, 59, 4, '148.00'),
(8, 60, 7, '132.00'),
(8, 61, 9, '155.00'),
(8, 62, 9, '65.00'),
(8, 63, 1, '181.00'),
(8, 64, 5, '198.00'),
(9, 65, 1, '89.00'),
(9, 66, 10, '173.00'),
(9, 67, 10, '200.00'),
(9, 68, 1, '138.00'),
(9, 69, 9, '86.00'),
(9, 70, 5, '79.00'),
(9, 71, 3, '135.00'),
(9, 72, 2, '165.00'),
(10, 73, 2, '61.00'),
(10, 74, 7, '81.00'),
(10, 75, 4, '75.00'),
(10, 76, 8, '100.00'),
(10, 77, 7, '82.00'),
(10, 78, 1, '185.00'),
(10, 79, 9, '186.00'),
(10, 80, 4, '172.00');

-- --------------------------------------------------------

--
-- Table structure for table stores
--

CREATE TABLE IF NOT EXISTS stores (
  store_id int(11) NOT NULL AUTO_INCREMENT,
  store_name varchar(50) NOT NULL,
  owner_name varchar(50) NOT NULL,
  owner_phone varchar(15) NOT NULL,
  location_id int(11) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (store_id),
  KEY fkIdx_39 (location_id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table stores
--

INSERT INTO stores (store_id, store_name, owner_name, owner_phone, location_id, email) VALUES
(1, 'Karzan Store', 'Hart Drayson', '3182156782', 1, 'hdrayson0@cmu.edu'),
(2, 'Yoveo Store', 'Imogene Sargant', '5826043641', 2, 'isargant1@t-online.de'),
(3, 'Peshangay Kawa', 'Sigfrid Farres', '9855837991', 3, 'sfarres2@xinhuanet.com'),
(4, 'Zoombox Store', 'Tremain Di Iorio', '8964185233', 4, 'tdi3@storify.com'),
(5, 'Ashyay Kawan', 'Wernher Haddinton', '2361848409', 5, 'whaddinton4@issuu.com'),
(6, 'Pixoboo Store', 'Greta Peter', '5885524082', 6, 'gpeter5@ezinearticles.com'),
(7, 'Car Part Store', 'Deerdre Batty', '7201687217', 7, 'dbatty6@nasa.gov'),
(8, 'Hana Store', 'Chantalle Bramstom', '5679298584', 8, 'cbramstom7@eepurl.com'),
(9, 'Peshangay Babylon', 'Van Bretherick', '3634800762', 9, 'vbretherick8@epa.gov'),
(10, 'Peshangay Sarkew', 'Ceciley Larder', '7862426101', 10, 'clarder9@dailymotion.com');

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE IF NOT EXISTS users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  fname varchar(50) NOT NULL,
  lname varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(15) NOT NULL,
  password varchar(74) NOT NULL,
  location_id int(11) DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email),
  KEY fkIdx_36 (location_id)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;

--
-- Dumping data for table users
--

INSERT INTO users (user_id, fname, lname, email, phone, password, location_id) VALUES
(65, 'aryan', 'Majeed ', '5489@auis.edu.krd', '444444', '637b6764f7b5dd6bac6e53baf5a7200da499a39b4ad268a1ffe86156fd910e83', NULL),
(66, 'aryan', 'Majeed ', 'ajja@gmail.com', '07701288282', 'af8db9cfe8b35fd2f2e5a728332cc37342bc5a506bbec5c2b3e9d2f7d31b0e3d', NULL),
(67, 'aryan', 'Majeed ', 'ajfja@gmail.com', '07701288282', 'af8db9cfe8b35fd2f2e5a728332cc37342bc5a506bbec5c2b3e9d2f7d31b0e3d', NULL),
(68, 'aryan', 'majeed', 'a@gmail.com', '0770133333333', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(72, 'aryan', 'Majeed ', 'b@gmail.com', '07701288282', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(73, 'aryan', 'Majeed ', 'c@gmail.com', '07701288282', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(74, 'shelgir', 'raouf', 's@gmail.com', '07701996969', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(75, 'shelgir', 'raouf', 'd@gmail.com', '099999999900000', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(76, 'aryan', 'myo', 'e@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(77, 'aryan', 'myo', 'f@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(78, 'aryan', 'myo', 'g@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(79, 'aryan', 'myo', 'h@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(80, 'aryan', 'myo', 'ho@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(81, 'aryan', 'myo', 'hot@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(82, 'aryan', 'myo', 'hott@gmail.com', '077015522', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(83, 'aryan', 'Majeed ', 'ab@gmail.com', '555555', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(84, 'shelgir', 'raouf', 'ar@gmail.com', '07701288282', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(85, 'aryan', 'majdeed', 'aryanmajid@gmail.com', '0770229229', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(86, 'gh', 'bh', 'arh@gmail.com', '47747747', '9125959b8e6ab2b1f1417258f8725dc732d4d4512b04e000776264ccc5a9c44e', NULL),
(87, 'aryan', 'majeed', 'aryanmajid97@gmail.com', '07720200202', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(88, 'shelgir', 'raouf', 'lol@gmail.com', '01000100100', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(89, 'lol', 'lmao', 'am15489@auis.edu.krd', '0770000000', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(90, 'ara', 'ara ', 'z@gmail.com', '07701288282', 'ca3e19ecaa7e139f26a2a1e39afbc82ed706047cc85af3aa2c1c792bdf9b81da', NULL),
(91, 'ara', 'ara', 'y@gmail.com', '07701996969', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL),
(92, 'trivium ', 'rock', 'ara@gmail.com', '0770229229', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table discounts
--
ALTER TABLE discounts
  ADD CONSTRAINT discounts_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (product_id);

--
-- Constraints for table garage_cars
--
ALTER TABLE garage_cars
  ADD CONSTRAINT fk_garages_brands1 FOREIGN KEY (brand_id) REFERENCES brands (brand_id),
  ADD CONSTRAINT fk_garages_models1 FOREIGN KEY (model_id) REFERENCES models (model_id),
  ADD CONSTRAINT fk_garages_users1 FOREIGN KEY (user_id) REFERENCES users (user_id);

--
-- Constraints for table orders
--
ALTER TABLE orders
  ADD CONSTRAINT FK_19 FOREIGN KEY (user_id) REFERENCES users (user_id);

--
-- Constraints for table order_items
--
ALTER TABLE order_items
  ADD CONSTRAINT FK_167 FOREIGN KEY (order_id) REFERENCES orders (order_id),
  ADD CONSTRAINT FK_170 FOREIGN KEY (product_id) REFERENCES products (product_id);

--
-- Constraints for table products
--
ALTER TABLE products
  ADD CONSTRAINT FK_64 FOREIGN KEY (category_id) REFERENCES categories (category_id),
  ADD CONSTRAINT FK_67 FOREIGN KEY (model_id) REFERENCES models (model_id),
  ADD CONSTRAINT FK_70 FOREIGN KEY (brand_id) REFERENCES brands (brand_id);

--
-- Constraints for table stocks
--
ALTER TABLE stocks
  ADD CONSTRAINT FK_156 FOREIGN KEY (store_id) REFERENCES stores (store_id),
  ADD CONSTRAINT FK_164 FOREIGN KEY (product_id) REFERENCES products (product_id);

--
-- Constraints for table stores
--
ALTER TABLE stores
  ADD CONSTRAINT FK_38 FOREIGN KEY (location_id) REFERENCES location (location_id);

--
-- Constraints for table users
--
ALTER TABLE users
  ADD CONSTRAINT FK_35 FOREIGN KEY (location_id) REFERENCES location (location_id);

--
-- Events
--
CREATE EVENT IF NOT EXISTS expired_discount_removal
    ON SCHEDULE
      EVERY 1 DAY
    COMMENT 'Clears out expired discounts rows each week.'
    DO
      DELETE FROM discounts WHERE expire_date < curdate();

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

 `;
