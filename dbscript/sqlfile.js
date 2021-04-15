exports.sqlfile =
  `
CREATE DATABASE IF NOT EXISTS chakikadb;

USE chakikadb;

CREATE TABLE IF NOT EXISTS brands (
    brand_id int(11) NOT NULL,
    brand_name varchar(50) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  INSERT INTO brands (brand_id, brand_name) VALUES
  (1, 'Toyota'),
  (2, 'Nissan'),
  (3, 'Ford');
  
  
  CREATE TABLE IF NOT EXISTS categories (
    category_id int(11) NOT NULL,
    category_name varchar(35) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  INSERT INTO categories (category_id, category_name) VALUES
  (1, 'interior'),
  (2, 'exterior'),
  (3, 'Wheels');
  
  
  
  CREATE TABLE IF NOT EXISTS garage_cars (
    car_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    model_id int(11) NOT NULL,
    brand_id int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  CREATE TABLE IF NOT EXISTS location (
    location_id int(11) NOT NULL,
    location_name varchar(50) NOT NULL,
    latitude decimal(8,6) NOT NULL,
    longitude decimal(9,6) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
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
  
  
  CREATE TABLE IF NOT EXISTS models (
    model_id int(11) NOT NULL,
    model_name varchar(50) NOT NULL,
    model_year year(4) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  INSERT INTO models (model_id, model_name, model_year) VALUES
  (1, 'Camry', 2015),
  (2, 'Corolla', 2015),
  (3, 'Hilux', 2015),
  (4, 'Sunny', 2015),
  (5, 'Altima', 2015),
  (6, 'Maxima', 2015),
  (7, 'Explorer', 2015),
  (8, 'Taurus', 2015),
  (9, 'Fusion', 2015);
  
  
  
  CREATE TABLE IF NOT EXISTS orders (
    order_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    status enum('delivered','processed','pending') NOT NULL DEFAULT 'processed',
    order_date date NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  CREATE TABLE IF NOT EXISTS order_items (
    order_id int(11) NOT NULL,
    product_id int(11) NOT NULL,
    quantity int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  CREATE TABLE IF NOT EXISTS products (
    product_id int(11) NOT NULL,
    product_name varchar(60) NOT NULL,
    category_id int(11) NOT NULL,
    model_id int(11) DEFAULT NULL,
    brand_id int(11) DEFAULT NULL,
    image_url text DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
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
  
  
  
  CREATE TABLE IF NOT EXISTS requests (
    request_id int(11) NOT NULL,
    name varchar(100) NOT NULL,
    request_phone varchar(15) NOT NULL,
    subject varchar(300) NOT NULL,
    message text NOT NULL,
    user_id int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  INSERT INTO requests (request_id, name, request_phone, subject, message, user_id) VALUES
  (1, 'aryanmajeed', '07701288282', 'lol', 'lollll', 0),
  (2, 'aryanmajeed', '07701288282', 'lol', 'lollll', 0),
  (3, 'aryanmajeed', '07701288282', 'lol', 'lollll', 68),
  (4, 'lamo', '07701288282', 'boom', 'benzema', 72),
  (5, 'lamo2', '07701288282hh', 'boom2', 'benzema karim', 72),
  (6, 'chill fall', 'hhh', 'hh', 'hhhhhhh', 88),
  (7, 'chill fall', 'hhh', 'hh', 'hhhhhhh', 88),
  (8, 'chill fall', '', 'hh', 'hhhhhhh', 88),
  (9, 'chill fall', 'ffjjfj', 'hh', 'hhhhhhh', 88),
  (10, 'aryanmajeed', 'lmao', 'jhhhh', 'hhhhhhhhhhhhhhhhhhh', 88),
  (11, 'aryanmajeed', 'lmao', 'jhhhh', '', 88),
  (12, 'aryanmajeed', '555555', 'fjdh', 'hhhh', 88),
  (13, 'aryanmajeed', '555555', 'fjdh', 'hhhh', 88),
  (14, 'jhIH', 'H', 'hihin', 'hhsdfisdfhihih', 88),
  (15, 'aryanmajeed', 'lmao', 'thriller', 'boom', 68),
  (16, 'aryanmajeed', 'lmao', 'thriller', 'boom', 68);
  
  
  CREATE TABLE IF NOT EXISTS stocks (
    store_id int(11) NOT NULL,
    product_id int(11) NOT NULL,
    stock_quantity int(11) NOT NULL,
    unit_price decimal(12,2) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  CREATE TABLE IF NOT EXISTS stores (
    store_id int(11) NOT NULL,
    store_name varchar(50) NOT NULL,
    owner_name varchar(50) NOT NULL,
    owner_phone varchar(15) NOT NULL,
    location_id int(11) NOT NULL,
    email varchar(100) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
  
  CREATE TABLE IF NOT EXISTS users (
    user_id int(11) NOT NULL,
    fname varchar(50) NOT NULL,
    lname varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    phone varchar(15) NOT NULL,
    password varchar(74) NOT NULL,
    location_id int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
  
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
  (88, 'shelgir', 'raouf', 'lol@gmail.com', '01000100100', 'e1749d10ef2f555b6acbe72ee08d2dbd9e38b8820966f648683fda53c384a3e8', NULL);
  
  ALTER TABLE brands
    ADD PRIMARY KEY (brand_id);
  
  ALTER TABLE categories
    ADD PRIMARY KEY (category_id);
  
  ALTER TABLE garage_cars
    ADD PRIMARY KEY (car_id,user_id,model_id,brand_id),
    ADD KEY fk_garages_users1 (user_id),
    ADD KEY fk_garages_models1 (model_id),
    ADD KEY fk_garages_brands1 (brand_id);
  
  ALTER TABLE location
    ADD PRIMARY KEY (location_id);
  
  
  ALTER TABLE models
    ADD PRIMARY KEY (model_id);
  
  
  ALTER TABLE orders
    ADD PRIMARY KEY (order_id),
    ADD KEY fkIdx_20 (user_id);
  
  
  ALTER TABLE order_items
    ADD PRIMARY KEY (order_id,product_id),
    ADD KEY fkIdx_168 (order_id),
    ADD KEY fkIdx_171 (product_id);
  
  
  ALTER TABLE products
    ADD PRIMARY KEY (product_id),
    ADD UNIQUE KEY image_url (image_url) USING HASH,
    ADD KEY fkIdx_65 (category_id),
    ADD KEY fkIdx_68 (model_id),
    ADD KEY fkIdx_71 (brand_id);
  
  
  ALTER TABLE requests
    ADD PRIMARY KEY (request_id,user_id);
  
  
  ALTER TABLE stocks
    ADD PRIMARY KEY (store_id,product_id),
    ADD KEY fkIdx_157 (store_id),
    ADD KEY fkIdx_165 (product_id);
  
  
  ALTER TABLE stores
    ADD PRIMARY KEY (store_id),
    ADD KEY fkIdx_39 (location_id);
  
  ALTER TABLE users
    ADD PRIMARY KEY (user_id),
    ADD UNIQUE KEY email (email),
    ADD KEY fkIdx_36 (location_id);
  
  
  ALTER TABLE brands
    MODIFY brand_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
  
  ALTER TABLE categories
    MODIFY category_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
  
  ALTER TABLE garage_cars
    MODIFY car_id int(11) NOT NULL AUTO_INCREMENT;
  
  
  ALTER TABLE location
    MODIFY location_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
  
  ALTER TABLE models
    MODIFY model_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
  
  ALTER TABLE orders
    MODIFY order_id int(11) NOT NULL AUTO_INCREMENT;
  
  
  ALTER TABLE products
    MODIFY product_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
  
  
  ALTER TABLE requests
    MODIFY request_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
  
  
  ALTER TABLE stores
    MODIFY store_id int(11) NOT NULL AUTO_INCREMENT;
  
  
  ALTER TABLE users
    MODIFY user_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
  
  
  ALTER TABLE garage_cars
    ADD CONSTRAINT fk_garages_brands1 FOREIGN KEY (brand_id) REFERENCES brands (brand_id),
    ADD CONSTRAINT fk_garages_models1 FOREIGN KEY (model_id) REFERENCES models (model_id),
    ADD CONSTRAINT fk_garages_users1 FOREIGN KEY (user_id) REFERENCES users (user_id);
  
  
  ALTER TABLE orders
    ADD CONSTRAINT FK_19 FOREIGN KEY (user_id) REFERENCES users (user_id);
  
  ALTER TABLE order_items
    ADD CONSTRAINT FK_167 FOREIGN KEY (order_id) REFERENCES orders (order_id),
    ADD CONSTRAINT FK_170 FOREIGN KEY (product_id) REFERENCES products (product_id);
  
  
  ALTER TABLE products
    ADD CONSTRAINT FK_64 FOREIGN KEY (category_id) REFERENCES categories (category_id),
    ADD CONSTRAINT FK_67 FOREIGN KEY (model_id) REFERENCES models (model_id),
    ADD CONSTRAINT FK_70 FOREIGN KEY (brand_id) REFERENCES brands (brand_id);
  
  ALTER TABLE stocks
    ADD CONSTRAINT FK_156 FOREIGN KEY (store_id) REFERENCES stores (store_id),
    ADD CONSTRAINT FK_164 FOREIGN KEY (product_id) REFERENCES products (product_id);
  
  
  ALTER TABLE stores
    ADD CONSTRAINT FK_38 FOREIGN KEY (location_id) REFERENCES location (location_id);
  
  
  ALTER TABLE users
    ADD CONSTRAINT FK_35 FOREIGN KEY (location_id) REFERENCES location (location_id);
  COMMIT;
  
  
`