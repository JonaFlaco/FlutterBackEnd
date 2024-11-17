CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(200) NOT NULL,
  type VARCHAR(150) NULL,
  brand VARCHAR DEFAULT NULL,  
  cpu VARCHAR NOT NULL  
  ram VARCHAR NOT NULL  
  hdd VARCHAR NOT NULL  
);


INSERT INTO products (code, type, brand, cpu, ram, hdd) VALUES
('P001', 'Producto A', 'dsa', 'ads', '200', '120'),
('P002', 'Producto B', 'dsa', 'ads', '200', '120'),
('P003', 'Producto C', 'dsa', 'ads', '200', '120'),
('P004', 'Producto D', 'dsa', 'ads', '200', '120'),
('P005', 'Producto E', 'dsa', 'ads', '200', '120');
