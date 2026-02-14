<script lang="ts">
	import { TriangleAlertIcon } from '@lucide/svelte';
	import Spinner from '../Spinner.svelte';
	import { onMount } from 'svelte';
	import { PixelBoardState } from './pixel-board-state.svelte';
	import { PixelAllowance } from './pixel-allowance-state.svelte';
	import PixelBoard from './PixelBoard.svelte';
	import Banner from './Banner.svelte';
	import ColorPalette from './ColorPalette.svelte';
	import { blockConcurrentTabs } from '$lib/utils/block-concurrent-tabs';
	import { page } from '$app/state';

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
	{:else if pixelBoard.loading}
		<div class="mt-4 flex flex-col items-center gap-3">
			<div class="h-8 w-8">
				<Spinner />
			</div>
			<p class="text-surface-contrast-400-600">Loading Board and Websockets</p>
		</div>
	{:else}
		<div class="flex justify-center gap-4">
			<div class="shrink-0" style="width: {pixelBoard.containerX}px;">
				<PixelBoard {pixelBoard} {pixelAllowance} />
				<ColorPalette {pixelBoard} />
			</div>

			<div class="max-w-[300px] self-stretch" style="height: {pixelBoard.containerY}px;">
				<Banner {pixelAllowance} />
			</div>
		</div>
	{/if}
{/await}
