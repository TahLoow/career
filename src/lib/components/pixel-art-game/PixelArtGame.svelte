<script lang="ts">
	import { EraserIcon, PaintbrushIcon } from '@lucide/svelte';
	import { getBoardQuery } from './queries/GetBoardQuery';
	import { getPixelsQuery } from './queries/GetPixelsQuery';

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

	// How many pixels should be in the rows and columns of the board
	const boardRows = $derived(boardQuery.data?.width ?? 0);
	const boardColumns = $derived(boardQuery.data?.height ?? 0);

	// Dimensions of the user-displayed board container. Keep aspect ratio of board
	const containerX = 400;
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

	function handleCellClick(i: number) {
		if (boardPixels) {
			boardPixels[i] = selectedColor;
			console.log(boardPixels);
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
					class="bg-surface-300-700 hover:brightness-90"
					style="width: {containerX / boardRows}px; height: {containerY / boardColumns}px;
        {cellColors[cellColorCode] !== 'transparent'
						? `background-color: ${cellColors[cellColorCode]};`
						: ''}"
					onclick={() => handleCellClick(cellIndex)}
					title="color cell {cellIndex}"
				></button>
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
