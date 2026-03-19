import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { verifyLogin, createSession } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required', email });
		}

		const user = await verifyLogin(email, password);
		if (!user) {
			return fail(401, { error: 'Invalid email or password', email });
		}

		const sessionId = await createSession(user.id);
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		throw redirect(302, '/admin');
	}
};
