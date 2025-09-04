// controllers/userController.js
const db = require('../config/db');

// Get all users
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetch users:', err);
      return res.status(500).json({ error: 'Gagal mengambil data' });
    }
    res.json(results);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetch user:', err);
      return res.status(500).json({ error: 'Gagal mengambil data' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
    res.json(results[0]);
  });
};

// Create new user
exports.createUser = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      console.error('Error insert user:', err);
      return res.status(500).json({ error: 'Gagal menambahkan user' });
    }
    res.status(201).json({ message: 'User berhasil ditambahkan', id: result.insertId });
  });
};

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) {
      console.error('Error update user:', err);
      return res.status(500).json({ error: 'Gagal memperbarui user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
    res.json({ message: 'User berhasil diperbarui' });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error delete user:', err);
      return res.status(500).json({ error: 'Gagal menghapus user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
    res.json({ message: 'User berhasil dihapus' });
  });
};
