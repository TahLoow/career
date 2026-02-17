<script lang="ts">
	import { SkullIcon, TriangleAlertIcon } from '@lucide/svelte';
	import Spinner from '../Spinner.svelte';
	import { onMount, setContext } from 'svelte';
	import { PixelBoardState } from './pixel-board-state.svelte';
	import { PixelAllowance } from './pixel-allowance-state.svelte';
	import PixelBoard from './PixelBoard.svelte';
	import Banner from './Banner.svelte';
	import ColorPalette from './ColorPalette.svelte';
	import { blockConcurrentTabs } from '$lib/utils/block-concurrent-tabs';
	import { page } from '$app/state';
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
	import banner from '/src/routes/posts/pixel-board/images/banner.png';
	import Turnstile from '../turnstile/Turnstile.svelte';
	import { getTurnstileState } from '../turnstile/turnstile-state.svelte';

	const turnstileState = getTurnstileState();

	const pixelBoard = new PixelBoardState();
	const pixelAllowance = new PixelAllowance();

	const concurrencyBlock = blockConcurrentTabs(page.route.id!, '/pixel-board/duplicate-tab-error');

	onMount(() => {
		pixelAllowance.beginAllowanceLoop();
	});
</script>

{#await concurrencyBlock}
	<div class="mt-4 flex flex-col items-center gap-3">
		<div class="h-8 w-8">
			<Spinner />
		</div>
	</div>
{:then _}
	{#if pixelBoard.error}
		<div class="mt-4 flex flex-col items-center gap-3">
			<div class="h-8 w-8">
				<TriangleAlertIcon />
			</div>
			<p class="text-surface-contrast-400-600">An error occured! Please check back later</p>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center gap-4 md:flex-row">
			<div class="w-full shrink-0 basis-full md:w-[500px] md:max-w-[500px]">
				{#if pixelBoard.loading}
					<div class="mt-4 flex flex-col items-center gap-3">
						<div class="h-8 w-8">
							<Spinner />
						</div>
						<p class="text-surface-contrast-400-600 mb-4">Loading Board and Websockets</p>
					</div>
				{/if}

				{#if pixelBoard.ready && turnstileState.success}
					<PixelBoard {pixelBoard} {pixelAllowance} />
					<ColorPalette {pixelBoard} />
				{:else}
					<div class="mt-4 flex flex-col items-center">
						<Turnstile state={turnstileState} />
					</div>
				{/if}
			</div>

			<div class="self-stretch md:max-w-[300px]">
				<Banner {pixelAllowance} />
			</div>
		</div>
	{/if}
{/await}
