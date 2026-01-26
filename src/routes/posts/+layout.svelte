<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
	import Breadcrumbs, { type Crumb } from '$lib/features/breadcrumbs/Breadcrumbs.svelte';
	import { allPosts } from './all-posts';

	const crumbs: Crumb[] = $derived.by(() => {
		// Grab the post metadata from the posts tree. Browser's route must equal the metadata's route
		const postName = allPosts.flatten().filter((node) => {
			return node.route === page.route.id;
		})[0]?.name;

		return postName ? [{ label: 'Projects', href: '/posts' }, { label: postName }] : [];
	});
</script>

<Breadcrumbs items={crumbs} />

<div class="flex flex-col items-center justify-center">
	{@render children()}
</div>
