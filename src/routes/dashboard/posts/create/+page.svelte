<script lang="ts">
	import CreatePostForm from './create-post-form.svelte';

	let { data } = $props();
</script>

<CreatePostForm data={data.form} />
