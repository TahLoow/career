<script lang="ts">
	import { EraserIcon, PaintbrushIcon } from '@lucide/svelte';
	import { PIXEL_COLORS, TRANSPARENT_COLOR } from './pixel-board-constants';
	import type { PixelBoardState } from './pixel-board-state.svelte';

	type Props = {
		pixelBoardState: PixelBoardState;
	};

	const { pixelBoardState }: Props = $props();
</script>

<div class="flex justify-center pt-4">
	<div class="flex w-[350px] flex-col gap-2">
		<div class="grid auto-rows-fr grid-cols-4 place-items-center gap-2">
			{#each PIXEL_COLORS as cellColor, i}
				{#if cellColor !== 'transparent'}
					<button
						class="btn btn-icon relative h-6 text-white drop-shadow-md"
						style="background-color: {cellColor};"
						onclick={() => (pixelBoardState.selectedColor = i)}
						title="select color {cellColor}"
					>
						<PaintbrushIcon
							class="size-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
							opacity={PIXEL_COLORS[pixelBoardState.selectedColor] === cellColor ? 1 : 0}
						/>
					</button>
				{/if}
			{/each}
		</div>

		<button
			class="btn btn-icon bg-surface-400-600 h-6 w-8 self-center text-white"
			onclick={() => (pixelBoardState.selectedColor = TRANSPARENT_COLOR)}
			title="erase color"
		>
			{#if PIXEL_COLORS[pixelBoardState.selectedColor] === 'transparent'}
				<EraserIcon size="sm" class="size-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
			{:else}
				<EraserIcon class="size-4 stroke-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" opacity={0.3} />
			{/if}
		</button>
	</div>
</div>
