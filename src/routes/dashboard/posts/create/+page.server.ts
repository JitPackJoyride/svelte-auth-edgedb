import e from '$dbschema/edgeql-js';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const client = event.locals.auth.session.client;

		await e
			.insert(e.Post, {
				title: form.data.title,
				content: form.data.content,
				author: e.global.current_user
			})
			.run(client);

		throw redirect(303, '/dashboard');
	}
};
