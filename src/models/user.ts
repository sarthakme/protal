import Client from '../db';
import bcrypt from 'bcrypt';

export interface User {
	username: string,
	password: string
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserClass {
	async create(user: User): Promise<User> {
		const u: User = {
			username: '',
			password: ''
		};
		try {
			const conn = await Client.connect();
            let sql = 'INSERT INTO users (username, password) VALUES ($1, $2)';
            const hash = bcrypt.hashSync(user.password + (pepper as string), parseInt(saltRounds as string));
            await conn.query(sql, [user.username, hash]);
            sql = 'SELECT * FROM users WHERE username = ($1)';
            let result = await conn.query(sql, [user.username]);
            conn.release();
            return result.rows[0];
		} catch (err) {
            console.log(`Error inserting: ${err}`);
            return u;
        }
	}
	
	async validate(user: User): Promise<User> {
		const u: User = {
			username: '',
			password: ''
		};
		try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE username = ($1)';
            const result = await conn.query(sql, [user.username]);
            conn.release();
            if (result.rows.length === 0)
				return u;
            if (bcrypt.compareSync(user.password + (pepper as string), String(result.rows[0].password)))
                return result.rows[0];
            else
				return u;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return u;
        }
	}
}