import { getDb } from '$lib/server/db';
import { users, sessions } from '$lib/server/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export async function createUser(email: string, password: string, name: string) {
	const existingUser = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
	if (existingUser.length > 0) {
		throw new Error('User already exists');
	}

	const passwordHash = await hashPassword(password);
	const id = randomUUID();

	await getDb().insert(users).values({
		id,
		email,
		passwordHash,
		name
	});

	return { id, email, name };
}

export async function verifyLogin(email: string, password: string) {
	const result = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
	if (result.length === 0) {
		return null;
	}

	const user = result[0];
	const valid = await verifyPassword(password, user.passwordHash);
	if (!valid) {
		return null;
	}

	return { id: user.id, email: user.email, name: user.name };
}

export async function createSession(userId: string): Promise<string> {
	const sessionId = randomUUID();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

	await getDb().insert(sessions).values({
		id: sessionId,
		userId,
		expiresAt
	});

	return sessionId;
}

export async function validateSession(sessionId: string) {
	const result = await getDb()
		.select({
			sessionId: sessions.id,
			userId: sessions.userId,
			userEmail: users.email,
			userName: users.name,
			expiresAt: sessions.expiresAt
		})
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(
			and(
				eq(sessions.id, sessionId),
				gt(sessions.expiresAt, new Date())
			)
		)
		.limit(1);

	if (result.length === 0) {
		return null;
	}

	return result[0];
}

export async function deleteSession(sessionId: string) {
	await getDb().delete(sessions).where(eq(sessions.id, sessionId));
}

export async function deleteAllUserSessions(userId: string) {
	await getDb().delete(sessions).where(eq(sessions.userId, userId));
}
