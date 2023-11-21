import Pg from 'pg' 
const pool = new Pg.Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "test"
    }
)

export default pool 