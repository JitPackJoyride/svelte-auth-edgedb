<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	const { post } = data;
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/dashboard">Posts</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>{post.title}</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>

<div class="mt-4 flex items-center justify-between">
	<h1 class="text-start text-3xl font-semibold">{post.title}</h1>
	{#if post.can_edit}
		<Button
			onclick={() => {
				toast.info('Editing is not implemented yet.');
			}}>Edit</Button
		>
	{/if}
</div>
<p class="my-4">{post.content}</p>
