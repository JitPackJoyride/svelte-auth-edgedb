<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
</script>

<div class="space-y-4">
	<div class="flex justify-between">
		<h1 class="text-3xl font-semibold">Posts</h1>
		<Button href="/dashboard/posts/create">Create new</Button>
	</div>
	{#if data.posts.length === 0}
		<p class="text-lg text-slate-500">No posts found.</p>
	{/if}
	<div class="flex flex-col">
		{#each data.posts as post}
			<div class="my-4 rounded-lg bg-slate-50 p-4 shadow-md">
				<a href={`/dashboard/posts/${post.id}`} class="text-xl font-semibold">{post.title}</a>
			</div>
		{/each}
	</div>
</div>
