// Database Configuration
// This file is for future database integration

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  dialect: process.env.DB_DIALECT || 'postgres'
};

module.exports = dbConfig; 