<script>
	import Header from './Header.svelte';
	import Footer from '../lib/components/footer/Footer.svelte';
	import '../app.css';
	import { createToaster, Toast } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();

	import { onMount } from 'svelte';
	import { ConstructionIcon } from '@lucide/svelte';

	const toaster = createToaster({
		placement: 'top'
	});

	onMount(() => {
		toaster.info({});
	});
</script>

<div class="bg-surface-50 dark:bg-surface-950 relative flex flex-col">
	<Header></Header>
	<div
		class="mt-[calc(var(--header-height))] flex w-full flex-1 grow grid-cols-12 grid-rows-1 lg:px-16"
	>
		<div class="lg:col-span-1"></div>
		<main
			class="col-span-12 m-auto box-border min-h-[calc(100vh-40px)] w-full p-3 sm:p-4 lg:col-span-10 lg:max-w-7xl"
		>
			{@render children()}
		</main>
		<div class="lg:col-span-1"></div>
	</div>
	<Footer></Footer>
</div>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title class="inline-flex items-center gap-2 text-xl"
					><ConstructionIcon />Under Construction<ConstructionIcon /></Toast.Title
				>
				<Toast.Description>Please explore, and thank you for visiting!</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
