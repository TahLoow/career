<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
	import Breadcrumbs, { type Crumb } from '$lib/features/breadcrumbs/Breadcrumbs.svelte';

	const crumbs: Crumb[] = $derived.by(() => {
		const postName = page.data?.postMeta?.name;

		const c: Crumb[] = [{ label: 'Projects', href: '/posts' }];
		if (postName) {
			c.push({ label: postName });
		}
		return c;
	});
</script>

<Breadcrumbs items={crumbs} />

<div class="flex flex-col">
	{@render children()}
</div>
