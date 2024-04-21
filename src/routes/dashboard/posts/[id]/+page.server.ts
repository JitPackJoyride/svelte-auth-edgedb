export const load = async ({ locals, params }) => {
	const post = {
		title: "Post title",
		content: "Post content",
		can_edit: false
	}

	return {
		post
	};
};
