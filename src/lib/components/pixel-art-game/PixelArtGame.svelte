<script lang="ts">
	import { EraserIcon, PaintbrushIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';

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

	const transparentColor = cellColors.findIndex((i) => i === 'transparent');
	const pixelsX = 16;
	const pixelsY = 10;
	const canvasX = 400;
	const canvasY = (pixelsY / pixelsX) * canvasX;
	let cells: number[] | undefined = $state(undefined);
	let selectedColor: number = $state(1);

	onMount(async () => {
		const x = await fetch('http://localhost:8787/boards/1');
		const dbCells = (await x.json()).result.pixels;
		const temp = new Array(pixelsX * pixelsY).fill(0);
		for (const cell of dbCells) {
			temp[cell.position] = cell.color;
		}
		cells = temp;
	});

	function handleCellClick(i: number) {
		if (cells) {
			cells[i] = selectedColor;
			console.log(cells);
		}
	}
</script>

{#if cells}
	<div style="width: {canvasX}px;">
		<div
			class="bg-surface-300-700 flex flex-wrap overflow-clip rounded-md"
			style="height: {canvasY}px;"
		>
			{#each cells as cellColorCode, cellIndex}
				<button
					class="bg-surface-300-700 hover:brightness-90"
					style="width: {canvasX / pixelsX}px; height: {canvasY / pixelsY}px;
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
