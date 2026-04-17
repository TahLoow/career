<script>
	import Header from './Header.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	let { children } = $props();

	import { onMount } from 'svelte';
	import NotificationContainer from '$lib/features/notification/notificationContainer.svelte';
	import { notificationService } from '$lib/features/notification/notification.service.svelte';
	import { HandMetal } from '@lucide/svelte';
	import { localStore } from '$lib/utils/local-storage-state.svelte';

	import ScrobbleWidget from '$lib/components/scrobble-widget/ScrobbleWidget.svelte';

	const welcomed = localStore('welcome', false);

	onMount(() => {
		if (!welcomed.value) {
			notificationService.info({
				title: 'Welcome!',
				description: 'Please explore, and thank you for visiting! ',
				meta: { icon }
			});
		}
		welcomed.value = true;
	});

	const queryClient = new QueryClient();
</script>

{#snippet icon()}
	<HandMetal />
{/snippet}

<QueryClientProvider client={queryClient}>
	<div class="relative flex flex-col">
		<Header />
		<div
			class="mt-[calc(var(--header-height))] flex w-full flex-1 grow grid-cols-12 grid-rows-1 lg:px-16"
		>
			<main
				class="col-span-12 m-auto box-border min-h-[-webkit-fill-available] min-h-[calc(100dvh-40px)] w-full px-3 sm:px-4 sm:pb-8 lg:col-span-10 lg:max-w-7xl"
			>
				{@render children()}
			</main>
		</div>

		<Footer />

		<dialog
			open={true}
			class="sticky bottom-4 flex h-25 w-full flex-col justify-end bg-transparent not-lg:px-8 lg:fixed lg:bottom-12 lg:ml-8 lg:w-100 xl:w-120"
		>
			<ScrobbleWidget />
		</dialog>
	</div>
</QueryClientProvider>

<NotificationContainer />
