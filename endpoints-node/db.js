import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config(); //carga las variables hechas en .env

// config
const pool = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10, //limite de conexion que puede conectar
        queueLimit: 0, //maxima cantidad de request

    }
)

export default pool;