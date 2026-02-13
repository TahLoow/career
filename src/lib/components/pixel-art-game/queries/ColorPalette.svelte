<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import ColorMarker from '$lib/icons/color-marker.svelte';
	import { HourglassIcon } from '@lucide/svelte';
	import { transparentColor, cellColors } from '../PixelArtGame.svelte';

	type Props = {
		height: number;
		width: number;
		boardRows: number;
		boardColumns: number;
		pixelBalance: number;
		boardPixels: number[];
		handleCellClick: (cellIndex: number) => void;
	};

	const {
		height,
		width,
		boardRows,
		boardColumns,
		pixelBalance,
		boardPixels,
		handleCellClick
	}: Props = $props();
</script>

<div
	class="bg-surface-300-700 flex shrink-0 flex-wrap overflow-clip rounded-md"
	style="height: {height}px;"
>
	{#each boardPixels as cellColorCode, cellIndex}
		<button
			title="color cell {cellIndex} "
			onclick={() => handleCellClick(cellIndex)}
			class="css-pixel bg-surface-300-700 {cellColorCode === transparentColor
				? ''
				: 'border-b border-l'} transition-colors hover:brightness-90"
			style="width: {width / boardRows}px; 
					height: {height / boardColumns}px; 
					background-color: {cellColors[cellColorCode]}; 
					border-color: color-mix(in srgb, {cellColors[cellColorCode]} 95%, black);"
		>
			{#if createPixel.variables?.position === cellIndex && createPixel.isPending}
				<!-- Render the loading spinner if a pixel is WIP -->
				<Spinner class="text-surface-950-50 bg-surface-50-950/60 scale-75 rounded-[50%]" />
			{:else}
				<!-- Render the cursor crosshair -->
				<div class="css-crosshair hidden">
					{#if pixelBalance === 0}
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
