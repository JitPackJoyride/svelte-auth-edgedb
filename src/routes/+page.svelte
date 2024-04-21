<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import Info from 'lucide-svelte/icons/info';
	import { queryParam, ssp } from 'sveltekit-search-params';

	const info = queryParam('info', ssp.string(), {
		showDefaults: false
	});
	const error = queryParam('error', ssp.string(), {
		showDefaults: false
	});
</script>

<div class="w-min min-w-[32rem] p-8">
	<h1 class="text-start text-3xl font-semibold">SvelteKit + EdgeDB Auth</h1>

	<p class="my-4">
		This is a simple app to demonstrate how to integrate EdgeDB Auth into your Svelte app, with the
		help of the
		{' '}<code class="rounded-md bg-slate-50 p-1">@edgedb/auth-sveltekit</code>{' '}
		library.
	</p>

	{#if $error}
		<Alert.Root variant="destructive">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{$error}</Alert.Description>
		</Alert.Root>
	{/if}

	{#if $info}
		<Alert.Root>
			<Info class="h-4 w-4" />
			<Alert.Description>{$info}</Alert.Description>
		</Alert.Root>
	{/if}
</div>
