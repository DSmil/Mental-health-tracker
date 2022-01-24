const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
}

const proConfig ={
  connctionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig:devConfig);

module.exports = pool;
