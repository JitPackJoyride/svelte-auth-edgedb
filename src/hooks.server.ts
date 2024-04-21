import { options } from '$lib/auth';
import { client } from '$lib/server/auth';
import { createUser } from '$lib/server/utils';
import serverAuth, { type AuthRouteHandlers } from '@edgedb/auth-sveltekit/server';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const { createServerRequestAuth, createAuthRouteHook } = serverAuth(client, options);

const createServerAuthClient: Handle = async ({ event, resolve }) => {
	event.locals.auth = createServerRequestAuth(event);

	const isSignedIn = await event.locals.auth.session.isSignedIn();
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!isSignedIn) {
			console.log('Redirecting to home during server hook.');
			throw redirect(
				303,
				`/?error=${encodeURIComponent('You must be signed in to access the dashboard.')}`
			);
		}
	}
	if (event.url.pathname === '/') {
		if (isSignedIn) {
			console.log('Redirecting to dashboard during server hook.');
			throw redirect(303, '/dashboard');
		}
	}

	return await resolve(event);
};

// You only need to configure callback functions for the types of auth you wish to use in your app.
const authRouteHandlers: AuthRouteHandlers = {
	onSignout() {
		throw redirect(303, '/');
	},
	async onBuiltinUICallback({ error, provider, tokenData, isSignUp }) {
		if (error) {
			throw redirect(
				303,
				`/?error=${encodeURIComponent(`Sign in with UI failed: ${error.message}`)}`
			);
		}

		if (!tokenData) {
			throw redirect(
				303,
				`/?info=${encodeURIComponent(
					`Your email address requires validation before you can sign in. ` +
						`Follow the link in the verification email to continue.`
				)}`
			);
		}

		if (isSignUp) {
			await createUser({ client, tokenData, provider });
		}

		throw redirect(303, '/dashboard');
	}
};

export const handle = sequence(createServerAuthClient, createAuthRouteHook(authRouteHandlers));
