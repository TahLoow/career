<script>
	import { CircleQuestionMarkIcon, ExternalLinkIcon, MusicIcon, XIcon } from '@lucide/svelte';
	import { getScrobbleQuery } from './queries/GetScrobbleQuery';
	import TidalLogo from './TidalLogo.svelte';
	import { fly } from 'svelte/transition';

	// Object containing all state of the latest scrobble
	let scrobbleQuery = getScrobbleQuery();

	// Whether the widget is collapsed
	let widgetCollapsed = $state(false);
</script>

{#if scrobbleQuery.isSuccess}
	<div
		class="bg-surface-100-900 inline-flex max-w-none overflow-clip rounded shadow-xl outline transition-all duration-300 {widgetCollapsed
			? ' outline-surface-300-700 max-h-25 w-9 '
			: 'w-full outline-transparent'}"
		in:fly={{
			x: '-20'
		}}
	>
		<menu
			class="text-surface-800-100 z-3 flex min-w-9 flex-col items-center items-stretch justify-between p-1"
		>
			{#if !widgetCollapsed}
				<a
					class="border-surface-50-950 hover:text-secondary-50-950 hover:bg-secondary-300 dark:hover:secondary-700 flex aspect-square w-full items-center justify-center rounded"
					href={scrobbleQuery.data?.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ExternalLinkIcon class="size-4" />
				</a>
				<a
					class="border-surface-50-950 hover:text-secondary-50-950 hover:bg-secondary-300 dark:hover:secondary-700 flex aspect-square w-full items-center justify-center rounded"
					href={'/posts/scrobble'}
				>
					<CircleQuestionMarkIcon class="size-4" />
				</a>
			{:else}
				<MusicIcon class="mt-1 mb-3 aspect-square size-4 w-full" />
			{/if}
			<button
				class=" hover:text-secondary-50-950 hover:bg-secondary-300 dark:hover:secondary-700 flex aspect-square w-full items-center justify-center rounded {widgetCollapsed
					? 'bg-secondary-500 text-secondary-50-950 dark:bg-secondary-200'
					: ''}"
				onclick={() => (widgetCollapsed = !widgetCollapsed)}
			>
				<XIcon
					class="size-4 transition-transform duration-300 {widgetCollapsed ? 'rotate-135' : ''}"
				/>
			</button>
		</menu>

		{#if !widgetCollapsed}
			<summary class="z-2 inline-flex h-25 grow rounded-xl">
				<!-- Album cover -->
				{#if scrobbleQuery.data?.images.large}
					<img
						class="h-25 w-25 min-w-25 shadow-sm"
						alt="Album Cover"
						src={scrobbleQuery.data?.images.large}
					/>
				{/if}

				<div
					class="relative inline-flex grow rounded-r px-4 py-2 {scrobbleQuery.data?.images.large
						? ''
						: 'px-6'}"
				>
					<div class="relative z-2 flex h-full grow flex-col justify-center gap-1">
						<p class="line-clamp-2 leading-tight font-extrabold">
							{scrobbleQuery.data?.name}
						</p>

						<p class="text-surface-700-300 line-clamp-1 text-sm">
							{scrobbleQuery.data?.artist.name}
						</p>
					</div>

					<!-- Streaming service + recency indicator -->
					<div
						class="text-surface-700-300 relative flex w-10 shrink-0 flex-col items-center justify-between py-1.5"
					>
						{#if scrobbleQuery.data?.currentlyPlaying}
							<div class="flex items-center justify-center gap-1">
								<div class="flex h-full w-min items-center gap-0.5">
									<div
										class="bar bg-surface-700-300"
										style="--duration: 1.1s; --delay: 0.4s;"
									></div>
									<div
										class="bar bg-surface-700-300"
										style="--duration: 1.7s; --delay: 0.1s;"
									></div>
									<div
										class="bar bg-surface-700-300"
										style="--duration: 1.2s; --delay: 0.8s;"
									></div>
								</div>
								<p class="text-right text-xs leading-none">Live</p>
							</div>
						{:else if scrobbleQuery.data?.datePlayed}
							<p class="text-right text-xs leading-none">Recently</p>
						{/if}
						<TidalLogo class="shrink-0" />
					</div>

					<!-- Blurry animated bars -->
					<span class="absolute top-0 left-0 z-1 flex h-full w-full items-center px-5 blur-sm">
						<div class="inline-flex h-8/10 w-full items-center justify-between">
							{#each { length: 8 } as _, i}
								<div class="bg-surface-400-600/80 scrobble-backdrop w-2"></div>
							{/each}
						</div>
					</span>
				</div>
			</summary>

			<!-- Ambient animated glow -->
			<span
				class="absolute top-0 left-0 z-1 inline-flex h-full w-full items-center justify-between blur-2xl"
			>
				{#each { length: 8 } as _, i}
					<div class="bg-secondary-400-600/20 scrobble-backdrop w-1/2"></div>
				{/each}
			</span>
		{/if}
	</div>
{/if}

<style>
	.bar {
		animation: wave var(--duration) ease-in-out var(--delay) infinite;
		width: 1px;
		transform: translateZ(0);
	}

	@keyframes wave {
		0%,
		100% {
			height: 2px;
		}
		50% {
			height: 10px;
		}
	}

	@keyframes spike-low {
		0%,
		100% {
			height: 10px;
		}
		50% {
			height: 30%;
		}
	}

	@keyframes spike-medium {
		0%,
		100% {
			height: 10px;
		}
		50% {
			height: 70%;
		}
	}

	@keyframes spike-high {
		0%,
		10%,
		100% {
			height: 10px;
		}
		50% {
			height: 100%;
		}
	}

	.scrobble-backdrop {
		animation: spike-medium 2s ease-in-out infinite;
	}

	.scrobble-backdrop:nth-child(3n) {
		animation-name: spike-medium;
		animation-duration: 1.3s;
	}
	.scrobble-backdrop:nth-child(3n + 1) {
		animation-name: spike-low;
		animation-duration: 1.7s;
		animation-delay: -0.9s;
	}
	.scrobble-backdrop:nth-child(3n + 2) {
		animation-name: spike-high;
		animation-duration: 1.4s;
		animation-delay: -1.2s;
	}

	/* Staggering the start times */
	.scrobble-backdrop:nth-child(even) {
		animation-delay: 0.2s;
	}
	.scrobble-backdrop:nth-child(odd) {
		animation-delay: 0.4s;
	}
</style>
