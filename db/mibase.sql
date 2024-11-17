CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(200) NOT NULL,
  description VARCHAR(150) NULL,
  brand VARCHAR DEFAULT NULL,  
  cpu INT NOT NULL  
);

INSERT INTO products (code, type, brand, cpu) VALUES
('P001', 'Producto A', 'dsa', 'ads'),
('P002', 'Producto B', 'dsa', 'ads'),
('P003', 'Producto C', 'dsa', 'ads'),
('P004', 'Producto D', 'dsa', 'ads'),
('P005', 'Producto E', 'dsa', 'ads');
