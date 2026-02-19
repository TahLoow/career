<script lang="ts">
	import { TriangleAlertIcon } from '@lucide/svelte';
	import Spinner from '../Spinner.svelte';
	import { onMount } from 'svelte';
	import { getPixelBoardState } from './pixel-board-state.svelte';
	import { getPixelAllowanceState } from './pixel-allowance-state.svelte';
	import PixelBoard from './PixelBoard.svelte';
	import Banner from './Banner.svelte';
	import ColorPalette from './ColorPalette.svelte';
	import { blockConcurrentTabs } from '$lib/utils/block-concurrent-tabs';
	import { page } from '$app/state';
	import { getTurnstileState } from '$lib/features/turnstile/turnstile-state.svelte';
	import Turnstile from '$lib/features/turnstile/Turnstile.svelte';

	const turnstileState = getTurnstileState();
	const pixelBoard = getPixelBoardState();
	const pixelAllowance = getPixelAllowanceState();

	const concurrencyBlock = blockConcurrentTabs(page.route.id!, '/pixel-board/duplicate-tab-error');

	const displayBoardContent = $derived(pixelBoard.ready && turnstileState.sessionSuccess);

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
	<div class="flex flex-col items-center justify-center gap-4 md:flex-row">
		<div class="w-full shrink-0 basis-full md:w-[500px] md:max-w-[500px]">
			<div class="flex w-full flex-col items-center">
				{#if pixelBoard.error}
					<div class="mt-4 flex flex-col items-center gap-3">
						<div class="h-8 w-8">
							<TriangleAlertIcon />
						</div>
						<p class="text-surface-contrast-400-600">An error occured! Please check back later</p>
					</div>
				{:else if !turnstileState.localSuccess}
					<Turnstile {turnstileState} />
				{:else if !turnstileState.sessionSuccess}
					<div class="h-8 w-8">
						<Spinner />
					</div>
					<p class="text-surface-contrast-400-600 mb-4">Establishing Session</p>
				{:else if !displayBoardContent}
					<div class="h-8 w-8">
						<Spinner />
					</div>
					<p class="text-surface-contrast-400-600 mb-4">Loading Board and Websockets</p>
				{/if}
			</div>

			<span class:hidden={!displayBoardContent}>
				<PixelBoard />
				<ColorPalette />
			</span>
		</div>

		<div class="self-stretch md:max-w-[300px]">
			<Banner {pixelAllowance} {displayBoardContent} />
		</div>
	</div>
{/await}
