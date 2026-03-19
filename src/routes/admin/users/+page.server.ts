import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { users } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const allUsers = await getDb().select({
		id: users.id,
		email: users.email,
		name: users.name,
		createdAt: users.createdAt
	}).from(users);

	return {
		users: allUsers.map(u => ({
			id: u.id,
			email: u.email,
			name: u.name,
			createdAt: u.createdAt?.toISOString() ?? null
		}))
	};
};
