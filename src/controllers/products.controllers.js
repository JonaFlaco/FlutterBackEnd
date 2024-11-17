import pool from "../db.js";

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

export const createProduct = async (req, res) => {  
  const { code, type, brand, cpu } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO products (code, type, brand, cpu) VALUES ($1, $2, $3, $4) RETURNING *",
      [code, type, brand, cpu]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

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

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { code, type, brand, cpu } = req.body;

  try {
    const { rowCount } = await pool.query(
      `UPDATE products SET 
        code = COALESCE($1, code), 
        type = COALESCE($2, type), 
        brand = COALESCE($3, brand), 
        cpu = COALESCE($4, cpu) 
      WHERE id = $5`,
      [code, type, brand, cpu, id]
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
