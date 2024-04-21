<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';

	let { children } = $props();
</script>

<Toaster position="bottom-right" richColors />

<main class="mx-auto max-w-screen-lg p-8">
	{@render children()}
</main>
