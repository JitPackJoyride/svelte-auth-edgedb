<script>
	import '../app.pcss';
	let { children } = $props();
</script>

<main class="mx-auto max-w-screen-lg p-8">
	{@render children()}
</main>
