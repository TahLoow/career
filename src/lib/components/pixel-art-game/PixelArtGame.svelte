<script lang="ts">
	import { EraserIcon, PaintbrushIcon } from '@lucide/svelte';
	import { getBoardQuery } from './queries/GetBoardQuery';
	import { getPixelsQuery } from './queries/GetPixelsQuery';
	import { createPixelQuery } from './queries/CreatePixelQuery';
	import Spinner from '../Spinner.svelte';
	import { sleep } from '$lib/utils';
	import ColorMarker from '$lib/icons/color-marker.svelte';

	const cellColors: string[] = [
		'transparent',
		'#1a1417',
		'#4b2f29',
		'#af4b3b',
		'#c18549',
		'#ebdcbd',
		'#8db35e',
		'#7c8381',
		'#384d64'
	] as const;

	// Color code for transparent cells
	const transparentColor = cellColors.findIndex((i) => i === 'transparent');

	// Retrieve data for rendering the board
	const boardQuery = getBoardQuery();
	const pixelsQuery = getPixelsQuery(boardQuery);

	const createPixel = createPixelQuery(boardQuery.data?.id!);

	// How many pixels should be in the rows and columns of the board
	const boardRows = $derived(boardQuery.data?.width ?? 0);
	const boardColumns = $derived(boardQuery.data?.height ?? 0);

	// Dimensions of the user-displayed board container. Keep aspect ratio of board
	const containerX = 700;
	const containerY = $derived((boardColumns / boardRows) * containerX);

	// The board's pixels to render
	let boardPixels: number[] = $state([]);

	// The color that the user has selected to paint with
	let selectedColor: number = $state(1);

	$effect(() => {
		if (pixelsQuery.isSuccess && pixelsQuery.data) {
			const temp = new Array(boardRows * boardColumns).fill(0);
			for (const pixel of pixelsQuery.data) {
				temp[pixel.position] = pixel.color;
				boardPixels = temp;
			}
		}
	});

	async function handleCellClick(i: number) {
		if (!createPixel.isPending) {
			try {
				await createPixel.mutateAsync({ position: i, color: selectedColor });
				pixelsQuery.refetch();
			} catch (error) {
				console.error(error);
			}
		}
	}
</script>

{#if boardPixels.length}
	<div style="width: {containerX}px;">
		<div
			class="bg-surface-300-700 flex flex-wrap overflow-clip rounded-md"
			style="height: {containerY}px;"
		>
			{#each boardPixels as cellColorCode, cellIndex}
				<button
					title="color cell {cellIndex} "
					onclick={() => handleCellClick(cellIndex)}
					class="css-pixel bg-surface-300-700 {cellColorCode === transparentColor
						? ''
						: 'border-b border-l'} transition-colors hover:brightness-90"
					style="width: {containerX / boardRows}px; 
						height: {containerY / boardColumns}px; 
						background-color: {cellColors[cellColorCode]}; 
						border-color: color-mix(in srgb, {cellColors[cellColorCode]} 95%, black);"
				>
					{#if createPixel.variables?.position === cellIndex && createPixel.isPending}
						<!-- Render the loading spinner if a pixel is WIP -->
						<Spinner class="text-surface-950-50 bg-surface-50-950/60 scale-75 rounded-[50%]" />
					{:else}
						<!-- Render the cursor crosshair -->
						<div class="css-crosshair hidden">
							<ColorMarker class="h-full w-full" />
						</div>

						<!-- This is not optimal and that a background image would be better -->
						<div
							class="css-shadow m-auto h-2/3 w-2/3 rounded-md shadow-[0.5px_0px_1px_0.5px_rgba(0,0,0,0.2),0_0.5px_0.5px_rgba(255,255,255,0.1)] backdrop-brightness-102"
						></div>
					{/if}
				</button>
			{/each}
		</div>

		<div class="mx-auto flex max-w-[350px] flex-col justify-center gap-2 px-8 py-3">
			<div class="grid auto-rows-fr grid-cols-4 place-items-center gap-2">
				{#each cellColors as cellColor, i}
					{#if cellColor !== 'transparent'}
						<button
							class="btn btn-icon relative h-6 text-white drop-shadow-md"
							style="background-color: {cellColor};"
							onclick={() => (selectedColor = i)}
							title="select color {cellColor}"
						>
							<PaintbrushIcon
								class="size-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
								opacity={cellColors[selectedColor] === cellColor ? 1 : 0}
							/>
						</button>
					{/if}
				{/each}
			</div>

			<button
				class="btn btn-icon bg-surface-400-600 h-6 w-8 self-center text-white"
				onclick={() => (selectedColor = transparentColor)}
				title="erase color"
			>
				{#if cellColors[selectedColor] === 'transparent'}
					<EraserIcon size="sm" class="size-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
				{:else}
					<EraserIcon
						class="size-4 stroke-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
						opacity={0.3}
					/>
				{/if}
			</button>
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
