<script lang="ts">
	let { data, children } = $props();
</script>

<div class="-mx-3 mb-8 flex items-center gap-3 rounded-xl bg-slate-50 p-3 shadow-sm">
	<span class="mr-auto">
		<span class="text-slate-500">Signed in as </span>
		{data.username}
	</span>
</div>

{@render children()}
