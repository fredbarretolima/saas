import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createUser, verifyLogin, createSession } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		if (!name || !email || !password || !confirmPassword) {
			return fail(400, { error: 'All fields are required', name, email });
		}

		if (password !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match', name, email });
		}

		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters', name, email });
		}

		try {
			await createUser(email, password, name);
		} catch (e) {
			return fail(400, { error: 'Email already exists', name, email });
		}

		const user = await verifyLogin(email, password);
		if (!user) {
			return fail(500, { error: 'Failed to create session', name, email });
		}

		const sessionId = await createSession(user.id);
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/admin');
	}
};
