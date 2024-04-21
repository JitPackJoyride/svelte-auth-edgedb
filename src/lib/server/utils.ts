import e from '$dbschema/edgeql-js';
import type { BuiltinProviderNames, Client, TokenData } from '@edgedb/auth-sveltekit/server';
import { z } from 'zod';

export async function createUser({
	client,
	tokenData,
	provider
}: {
	client: Client;
	tokenData: TokenData;
	provider?: BuiltinProviderNames;
}) {
	console.log('Creating user with provider', provider);
	let username: string | null = null;
	if (provider && provider === 'builtin::oauth_google' && tokenData.provider_token) {
		try {
			const userInfo = await getGoogleUserInfo(tokenData.provider_token);
			username = userInfo.name;
		} catch (e) {
			console.error(
				`Failed to fetch Google user info for user identity ${tokenData.identity_id}:`,
				e
			);
		}
	}

	const identityQuery = e.select(e.ext.auth.Identity, () => ({
		filter_single: {
			id: tokenData.identity_id
		}
	}));
	const emailFactorQuery = e.select(e.ext.auth.EmailFactor, () => ({
		email: true,
		filter_single: {
			identity: e.select(e.ext.auth.LocalIdentity, () => ({
				filter_single: {
					id: tokenData.identity_id
				}
			}))
		}
	}));
	const userQuery = e.insert(e.User, {
		identity: identityQuery,
		name: username ?? emailFactorQuery.email
	});

	const user = await userQuery.run(client);

	console.log('User created', user.id);
}

async function getGoogleUserInfo(token: string) {
	const url = new URL('https://www.googleapis.com/oauth2/v3/userinfo');
	url.searchParams.set('access_token', token);
	const data = await fetch(url);
	const googleUserInfoSchema = z.object({
		sub: z.string(),
		name: z.string(),
		given_name: z.string(),
		family_name: z.string(),
		picture: z.string().url(),
		email: z.string().email(),
		email_verified: z.boolean(),
		locale: z.string()
	});
	const googleUserInfo = googleUserInfoSchema.parse(await data.json());
	console.log('Fetched Google user info:', googleUserInfo);
	return googleUserInfo;
}
