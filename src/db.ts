import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
	POSTGRES_PORT
} = process.env;

let Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
	port: (POSTGRES_PORT as unknown) as number
});
	
export default Client;