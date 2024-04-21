import { createClient } from 'edgedb';

export const client = createClient({
	/**
	 * NOTE: When developing locally you will need to set tls security to insecure,
	 * because the dev server uses self-signed certificates which will cause api calls
	 * with the fetch api to fail.
	 */
	tlsSecurity: 'insecure'
});
