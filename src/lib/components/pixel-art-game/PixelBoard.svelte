<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import type { PixelBoardState } from './pixel-board-state.svelte';
	import { PIXEL_COLORS, TRANSPARENT_COLOR } from './pixel-board-constants';
	import type { PixelAllowance } from './pixel-allowance-state.svelte';
	import { HourglassIcon } from '@lucide/svelte';
	import ColorMarker from '$lib/icons/color-marker.svelte';

	type Props = {
		pixelBoard: PixelBoardState;
		pixelAllowance: PixelAllowance;
	};

	const { pixelBoard, pixelAllowance }: Props = $props();

	const pixelHeightPct = $derived((1 / pixelBoard.boardRows) * 100);
	const pixelWidthPct = $derived((1 / pixelBoard.boardColumns) * 100);
</script>

<div
	class="bg-surface-300-700 flex shrink-0 flex-wrap overflow-clip rounded-md"
	style="aspect-ratio: {pixelBoard.boardRows / pixelBoard.boardColumns};"
>
	{#each pixelBoard.boardPixels as cellColorCode, cellIndex (cellIndex)}
		<button
			title="color cell {cellIndex} "
			onclick={() => pixelBoard.createPixel(cellIndex, pixelAllowance)}
			class="css-pixel bg-surface-300-700 {cellColorCode === TRANSPARENT_COLOR
				? ''
				: 'border-b border-l'} transition-colors hover:brightness-90"
			style="width: {pixelHeightPct}%; 
					height: {pixelWidthPct}%; 
					background-color: {PIXEL_COLORS[cellColorCode]}; 
					border-color: color-mix(in srgb, {PIXEL_COLORS[cellColorCode]} 95%, black);"
		>
			{#if pixelBoard.createPixelMutation.variables?.position === cellIndex && pixelBoard.createPixelMutation.isPending}
				<!-- Render the loading spinner if a pixel is WIP -->
				<Spinner class="text-surface-950-50 bg-surface-50-950/60 scale-75 rounded-[50%]" />
			{:else}
				<!-- Render the cursor crosshair -->
				<div class="css-crosshair hidden">
					{#if pixelAllowance.balance.value === 0}
						<HourglassIcon class="bg-surface-50-950/60 m-auto h-4/5 w-4/5 rounded-sm p-1" />
					{:else}
						<ColorMarker class="h-full w-full" />
					{/if}
				</div>

				<!-- This is not optimal and that a background image would be better -->
				<div
					class="css-shadow m-auto h-2/3 w-2/3 rounded-md shadow-[0.5px_0px_1px_0.5px_rgba(0,0,0,0.2),0_0.5px_0.5px_rgba(255,255,255,0.1)] backdrop-brightness-102"
				></div>
			{/if}
		</button>
	{/each}
</div>

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
