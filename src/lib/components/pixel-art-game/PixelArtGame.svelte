<script lang="ts">
	import { EraserIcon, HourglassIcon, PaintbrushIcon, TriangleAlertIcon } from '@lucide/svelte';
	import { getBoardQuery } from './queries/GetBoardQuery';
	import { createPixelQuery } from './queries/CreatePixelQuery';
	import Spinner from '../Spinner.svelte';
	import { getPixelStreamQuery } from './queries/StreamPixelUpdates.svelte';
	import { onMount } from 'svelte';
	import ColorPalette from './queries/ColorPalette.svelte';

	export const cellColors: string[] = [
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

	// User can place more pixels after this period
	const PIXEL_BALANCE_REFRESH_PERIOD_SECONDS = 60 * 2 * 0.1; // 2 minutes

	// User can place this many pixels per period
	const PIXELS_PER_PERIOD = 3;

	// Color code for transparent cells
	export const transparentColor = cellColors.findIndex((i) => i === 'transparent');

	// Retrieve data for rendering the current board
	const boardQuery = getBoardQuery();

	// Stream updates to the board
	const { socketState } = getPixelStreamQuery(
		(position: number, color: number) => (boardPixels[position] = color)
	);

	// Prepare to create pixels
	const createPixel = createPixelQuery(boardQuery.data?.id!);

	// How many pixels should be in the rows and columns of the board
	const boardRows = $derived(boardQuery.data?.width ?? 0);
	const boardColumns = $derived(boardQuery.data?.height ?? 0);

	// Dimensions of the user-displayed board container. Keep aspect ratio of board
	const containerX = 700;
	const containerY = $derived((boardColumns / boardRows) * containerX);

	// Whether to render the board. Must be ready for live updates
	const loading = $derived(socketState.isConnecting || boardQuery.isLoading);

	// The board's pixels to render
	let boardPixels: number[] = $state([]);

	// The color that the user has selected to paint with
	let selectedColor: number = $state(1);

	let pixelBalance = $state(PIXELS_PER_PERIOD);

	let secondsPast = $state(0);

	let secondsUntilRefresh = $derived(PIXEL_BALANCE_REFRESH_PERIOD_SECONDS - secondsPast);

	function reloadBalance() {
		pixelBalance = PIXELS_PER_PERIOD;
		secondsPast = 0;
	}

	onMount(() => {
		const reloadLoop = () => {
			if (secondsPast >= PIXEL_BALANCE_REFRESH_PERIOD_SECONDS) {
				reloadBalance();
			}
			secondsPast++;
			setTimeout(reloadLoop, 1000);
		};
		reloadLoop();
	});

	$effect(() => {
		if (boardQuery.isSuccess && boardQuery.data) {
			const temp = new Array(boardRows * boardColumns).fill(0);
			for (const pixel of boardQuery.data.pixels) {
				temp[pixel.position] = pixel.color;
				boardPixels = temp;
			}
		}
	});

	async function handleCellClick(i: number) {
		if (!createPixel.isPending) {
			try {
				if (pixelBalance > 0) {
					if (boardPixels[i] !== selectedColor) {
						await createPixel.mutateAsync({ position: i, color: selectedColor });

						pixelBalance--;
					}
					// Cell is updated via the getPixelStreamQuery
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
</script>

{#if socketState.error}
	<div class="mt-4 flex flex-col items-center gap-3">
		<div class="h-8 w-8">
			<TriangleAlertIcon />
		</div>
		<p class="text-surface-contrast-400-600">An error occured! Please check back later</p>
	</div>
{:else if loading}
	<div class="mt-4 flex flex-col items-center gap-3">
		<div class="h-8 w-8">
			<Spinner />
		</div>
		<p class="text-surface-contrast-400-600">Loading Board and Websockets</p>
	</div>
{:else}
	<div class="flex justify-center gap-4">
		<div class="shrink-0" style="width: {containerX}px;">
			<ColorPalette />

			<div class="flex justify-center pt-4">
				<div class="flex w-[350px] flex-col gap-2">
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
		</div>

		<div class="max-w-[300px] self-stretch" style="height: {containerY}px;">
			<div class="bg-surface-200-800 flex h-full flex-col rounded-md p-6">
				<span class="prose">
					<h2 class="h4">Pixel Board</h2>
					<p>
						You and other viewers can place pixels on the board. Boards are ocassionally saved and
						reset. Inspired by <a href="https://rplace.live/">r/place</a>.
					</p>
				</span>
				<div class="flex grow flex-col justify-center pb-6">
					<p class="text-md w-full text-center text-2xl font-thin">
						<span class="font-bold">{pixelBalance}</span> pixel{pixelBalance === 1 ? '' : 's'} left
					</p>
					<p class="text-md w-full text-center italic">
						(refresh in
						<span class="code text-lg">
							{Math.floor(secondsUntilRefresh / 60)}:{('' + (secondsUntilRefresh % 60)).padStart(
								2,
								'0'
							)}
						</span> seconds)
					</p>
				</div>
			</div>
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
