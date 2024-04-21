import e from '$dbschema/edgeql-js';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const client = locals.auth.session.client;
	const singlePostSelect = e.select(e.Post, () => ({
		...e.Post['*'],
		filter_single: {
			id: params.id
		}
	}));
	const post = await singlePostSelect.run(client);

	if (!post) {
		throw error(404, {
			message: `Post with id ${params.id} not found`
		});
	}

	return {
		post
	};
};
