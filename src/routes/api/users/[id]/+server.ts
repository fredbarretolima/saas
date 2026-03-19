import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '$lib/server/auth';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = params.id;
	const result = await getDb().select({
		id: users.id,
		email: users.email,
		name: users.name,
		createdAt: users.createdAt
	}).from(users).where(eq(users.id, userId)).limit(1);

	if (result.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json(result[0]);
};

export const PUT: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = params.id;
	const body = await request.json();
	const { name, email, password } = body;

	const existingUser = await getDb().select().from(users).where(eq(users.id, userId)).limit(1);
	if (existingUser.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	const updateData: { name?: string; email?: string; passwordHash?: string } = {};
	if (name) updateData.name = name;
	if (email) updateData.email = email;
	if (password) updateData.passwordHash = await hashPassword(password);

	if (Object.keys(updateData).length === 0) {
		return json({ error: 'No fields to update' }, { status: 400 });
	}

	await getDb().update(users).set(updateData).where(eq(users.id, userId));

	const updated = await getDb().select({
		id: users.id,
		email: users.email,
		name: users.name,
		createdAt: users.createdAt
	}).from(users).where(eq(users.id, userId)).limit(1);

	return json(updated[0]);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = params.id;

	if (userId === locals.user.id) {
		return json({ error: 'Cannot delete yourself' }, { status: 400 });
	}

	const result = await getDb().delete(users).where(eq(users.id, userId)).returning();

	if (result.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json({ success: true });
};
