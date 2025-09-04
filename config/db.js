// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
});

// Nama database dari .env
const dbName = process.env.DB_NAME || 'testdb';

// Coba koneksi ke MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Gagal konek ke MySQL:', err);
    return;
  }
  console.log('✅ Berhasil konek ke MySQL server');

  // Cek apakah database sudah ada
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
    if (err) {
      console.error('❌ Gagal membuat/memastikan database:', err);
      return;
    }
    console.log(`✅ Database '${dbName}' siap digunakan`);

    // Pindah ke database yang benar
    connection.changeUser({ database: dbName }, (err) => {
      if (err) {
        console.error('❌ Gagal menggunakan database:', err);
      } else {
        console.log(`✅ Menggunakan database '${dbName}'`);
      }
    });
  });
});

module.exports = connection;
