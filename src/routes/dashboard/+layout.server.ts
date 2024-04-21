import e from '$dbschema/edgeql-js';

export const load = async ({ locals }) => {
	const client = locals.auth.session.client;

	let username: string | null = null;
	const user = await e
		.select(e.global.current_user, () => ({
			...e.User['*']
		}))
		.run(client);
	username = user?.name ?? null;

	return {
		username
	};
};
