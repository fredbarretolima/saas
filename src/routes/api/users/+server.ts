import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const allUsers = await getDb().select({
		id: users.id,
		email: users.email,
		name: users.name,
		createdAt: users.createdAt
	}).from(users);

	return json(allUsers);
};
