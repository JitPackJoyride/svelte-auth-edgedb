module default {
	type User {
    	name: str;
  	}

	type Post {
		required title: str;
		required content: str;
		required author: User;
	}
}
