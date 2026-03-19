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
		<Header></Header>
		<div
			class="mt-[calc(2rem+var(--header-height))] flex w-full flex-1 grow grid-cols-12 grid-rows-1 lg:px-16"
		>
			<div class="lg:col-span-1"></div>
			<main
				class="col-span-12 m-auto box-border min-h-[-webkit-fill-available] min-h-[calc(100dvh-40px)] w-full p-3 pb-8 sm:p-4 sm:pb-8 lg:col-span-10 lg:max-w-7xl"
			>
				{@render children()}
			</main>
			<div class="lg:col-span-1"></div>
		</div>
		<Footer></Footer>
	</div>
</QueryClientProvider>

<NotificationContainer />
