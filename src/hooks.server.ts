import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const session = await validateSession(sessionId);
		if (session) {
			event.locals.user = {
				id: session.userId,
				email: session.userEmail,
				name: session.userName
			};
			event.locals.sessionId = session.sessionId;
		}
	}

	return resolve(event);
};
