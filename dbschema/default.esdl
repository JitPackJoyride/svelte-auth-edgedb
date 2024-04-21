using extension auth;

module default {
	global current_user := (
		assert_single((
			select User { id, name }
			filter .identity = global ext::auth::ClientTokenIdentity
		))
	);

	type User {
    	name: str;
    	required identity: ext::auth::Identity;
  	}

	type Post {
		required title: str;
		required content: str;
		required author: User;
		can_edit := .author = global current_user;

		access policy author_has_full_access
		allow all
		using (.author ?= global current_user);

		access policy others_read_only
		allow select;
	}
}
