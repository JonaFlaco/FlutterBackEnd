
-- Firts crate DataBase with name mydbcompany in POSTGRESQL

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(200) NOT NULL,
  description VARCHAR(150) NULL,
  price DOUBLE PRECISION DEFAULT NULL,  
  quantity INT NOT NULL  
);

-- insert fake data
INSERT INTO products (code, description, price, quantity) VALUES
('P001', 'Producto A', 10.99, 100),
('P002', 'Producto B', 15.49, 200),
('P003', 'Producto C', 7.95, 150),
('P004', 'Producto D', 12.50, 80),
('P005', 'Producto E', 20.00, 50);