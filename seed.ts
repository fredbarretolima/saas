import bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { users } from './src/lib/server/db/schema.js';

const client = createClient({ url: 'file:./data/app.db' });
const db = drizzle(client);

async function createUser() {
	const hash = await bcrypt.hash('password123', 10);
	const id = crypto.randomUUID();
	await db.insert(users).values({
		id,
		email: 'admin@example.com',
		passwordHash: hash,
		name: 'Admin User',
		createdAt: new Date(),
		updatedAt: new Date()
	});
	console.log('User created: admin@example.com / password123');
	client.close();
}

createUser();
