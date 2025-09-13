import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()


const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,        
  password: process.env.DBPASSWORD,  
  database: process.env.DB_NAME,
  port: process.env.PORT
});

export default db

