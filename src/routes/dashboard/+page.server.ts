import e from '$dbschema/edgeql-js';

export async function load({ locals }) {
	const client = locals.auth.session.client;
	const allPostsSelect = e.select(e.Post, () => ({
		...e.Post['*']
	}));
	const posts = await allPostsSelect.run(client);

	return {
		posts
	};
}
