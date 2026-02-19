<script lang="ts">
	import type { PixelAllowance } from './pixel-allowance-state.svelte';

	type Props = {
		pixelAllowance: PixelAllowance;
		displayBoardContent: boolean;
	};

	const { pixelAllowance, displayBoardContent }: Props = $props();
</script>

<div class="bg-surface-200-800 flex h-full max-h-full flex-col rounded-md py-6">
	<div
		class="flex grow flex-col gap-4 overflow-auto px-6 {displayBoardContent
			? ''
			: 'justify-between'}"
	>
		<span class="prose">
			<h2 class="h4">Pixel Board</h2>
		</span>
		{#if displayBoardContent}
			<div class="bg-surface-300-700 mb-6 flex grow flex-col justify-center rounded-sm p-3">
				<p class="text-md w-full text-center text-2xl font-thin">
					<span class="font-bold">{pixelAllowance.balance.value}</span> pixel{pixelAllowance.balance
						.value === 1
						? ''
						: 's'} left!
				</p>
				<p class="text-md w-full text-center italic">
					(refresh in
					<span class="code text-lg">
						{pixelAllowance.displayTime}
					</span> seconds)
				</p>
			</div>
		{/if}
		<span class="prose">
			<p>
				You and other viewers can place pixels on the board. Boards are ocassionally saved and
				reset. Harassing imagery is not permitted.
				<a href="/posts/pixel-board">Read more</a>
			</p>
		</span>
	</div>
</div>
