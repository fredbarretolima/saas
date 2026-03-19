import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSession } from '$lib/server/auth';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (locals.sessionId) {
		await deleteSession(locals.sessionId);
	}

	cookies.delete('session', { path: '/' });
	throw redirect(302, '/login');
};
