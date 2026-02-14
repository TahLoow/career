<script lang="ts">
	import type { PixelAllowance } from './pixel-allowance-state.svelte';

	type Props = {
		pixelAllowance: PixelAllowance;
	};

	const { pixelAllowance }: Props = $props();
</script>

<div class="bg-surface-200-800 flex h-full flex-col rounded-md p-6">
	<span class="prose">
		<h2 class="h4">Pixel Board</h2>
		<p>
			You and other viewers can place pixels on the board. Boards are ocassionally saved and reset.
			<a href="/posts/pixel-board">Read more</a>
		</p>
	</span>
	<div class="flex grow flex-col justify-center pb-6">
		<p class="text-md w-full text-center text-2xl font-thin">
			<span class="font-bold">{pixelAllowance.balance.value}</span> pixel{pixelAllowance.balance
				.value === 1
				? ''
				: 's'} left
		</p>
		<p class="text-md w-full text-center italic">
			(refresh in
			<span class="code text-lg">
				{pixelAllowance.displayTime}
			</span> seconds)
		</p>
	</div>
</div>
