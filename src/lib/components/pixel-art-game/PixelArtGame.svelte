<script lang="ts">
	import { TriangleAlertIcon } from '@lucide/svelte';
	import Spinner from '../Spinner.svelte';
	import { onMount } from 'svelte';
	import { PixelBoardState } from './pixel-board-state.svelte';
	import { PixelAllowance } from './pixel-allowance.svelte';
	import PixelBoard from './PixelBoard.svelte';
	import Banner from './Banner.svelte';
	import ColorPalette from './ColorPalette.svelte';

	const pixelBoardState = new PixelBoardState();
	const pixelAllowance = new PixelAllowance();

	onMount(() => {
		console.log('mount');
		pixelAllowance.beginAllowanceLoop();
	});
</script>

{#if pixelBoardState.error}
	<div class="mt-4 flex flex-col items-center gap-3">
		<div class="h-8 w-8">
			<TriangleAlertIcon />
		</div>
		<p class="text-surface-contrast-400-600">An error occured! Please check back later</p>
	</div>
{:else if pixelBoardState.loading}
	<div class="mt-4 flex flex-col items-center gap-3">
		<div class="h-8 w-8">
			<Spinner />
		</div>
		<p class="text-surface-contrast-400-600">Loading Board and Websockets</p>
	</div>
{:else}
	<div class="flex justify-center gap-4">
		<div class="shrink-0" style="width: {pixelBoardState.containerX}px;">
			<PixelBoard {pixelBoardState} {pixelAllowance} />
			<ColorPalette {pixelBoardState} />
		</div>

		<div class="max-w-[300px] self-stretch" style="height: {pixelBoardState.containerY}px;">
			<Banner {pixelAllowance} />
		</div>
	</div>
{/if}

<style>
	.css-pixel:hover {
		.css-crosshair {
			display: block;
		}

		.css-shadow {
			display: none;
		}
	}
</style>
