import pool from "../db.js";

// SELECCIONAR POR ID
export const getProduct = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({
        message: "Product not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// SELECCIONAR TODOS
export const getProducts = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorX",
    });
  }
};

// INSERTAR EL PRODUCTO SELECCIONADO
export const createProduct = async (req, res) => {  
  const { code, type, brand, cpu, ram, hdd } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO products (code, type, brand, cpu, ram, hdd) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [code, type, brand, cpu, ram, hdd]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ELIMINAR EL PRODUCTO POR ID
export const deleteProduct = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM products WHERE id = $1",
      [req.params.id]
    );

    if (rowCount === 0)
      return res.status(404).json({
        message: "Product not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ACTUALIZAR EL PRODUCTO POR ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { code, type, brand, cpu, ram, hdd } = req.body;

  try {
    const { rowCount } = await pool.query(
      `UPDATE products SET 
        code = COALESCE($1, code), 
        type = COALESCE($2, type), 
        brand = COALESCE($3, brand), 
        cpu = COALESCE($4, cpu) 
        ram = COALESCE($5, ram) 
        hdd = COALESCE($6, hdd) 
      WHERE id = $5`,
      [code, type, brand, cpu, id, ram, hdd]
    );

    if (rowCount === 0)
      return res.status(404).json({
        message: "Product not found",
      });

    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
