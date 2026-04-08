<script lang="ts">
	import CoreValues from '../lib/features/core-values/CoreValues.svelte';

	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import { allPosts } from './posts/all-posts';
	import { ArrowDownIcon } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import GridBackground from '$lib/components/scrobble-widget/GridBackground.svelte';

	const sectionHeight = 'h-[calc(100dvh-var(--header-height))]';
</script>

<svelte:head>
	<title>Paul - Welcome</title>
</svelte:head>

{#snippet postCard(title: string, description?: string, bannerImage?: string, route?: string)}
	<li class="w-full lg:w-[30%]">
		<a href={route} class="card card-hover bg-surface-100-900 block h-full p-4">
			<article>
				<h4 class="h4 font-accent mb-2">{title}</h4>
				{#if bannerImage}
					<ImageUnderlay
						src={bannerImage}
						alt="Full image of {title}"
						expand={false}
						class="mb-6 h-[170px]"
					/>
				{/if}
				{#if description}
					<p class="text-lg">{description}</p>
				{/if}
			</article>
		</a>
	</li>
{/snippet}

{#snippet jumpButton(label: string, targetId: string, delay: number)}
	<div class="relative">
		<button
			class="btn preset-filled-secondary-700-300 text-surface-100-900 hover:text-surface-900-100 btn-lg inline-flex animate-bounce items-center gap-6 shadow-lg hover:bg-transparent"
			onclick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
			in:fade={{ delay }}
		>
			<ArrowDownIcon class="size-6" />
			<p class="pt-1 text-center text-xl">{label}</p>
			<ArrowDownIcon class="size-6" />
		</button>
		<span class="scrobble-backdrop h-full w-full"> </span>
	</div>
{/snippet}

<div class="{sectionHeight} relative flex flex-col justify-around">
	<GridBackground />

	<div class="flex grow flex-col items-center justify-center">
		<h1
			class="font-accent flex items-end justify-center pt-8 pb-4 text-center text-5xl font-extralight lg:text-7xl"
		>
			Paul MacLean
		</h1>

		<p class="text-surface-600-400 w-full pb-12 text-center text-2xl leading-none font-bold">
			<span>Full Stack Developer</span>
		</p>

		<p class="wrap-none px-8 pt-8 text-center text-lg text-pretty">
			With over a decade of coding, I quickly adapt to what I'm working on.
		</p>
		<p class="wrap-none px-8 pt-2 text-center text-lg text-pretty">
			Moreover, I'm always invested in the outcomes of my work.
		</p>
	</div>
	<div class="hidden flex-col items-center justify-end pt-6 pb-12 md:flex">
		{@render jumpButton('Core Work Values', 'section-core-work-values', 200)}
	</div>
</div>

<section id="section-core-work-values" class="flex min-h-dvh flex-col justify-around">
	<div class="flex grow flex-col items-center justify-center pb-20">
		<CoreValues />
	</div>

	<div class="hidden flex-col items-center justify-end pb-12 md:flex">
		{@render jumpButton('Portfolio', 'welcome-main-content', 2000)}
	</div>
</section>

<div id="welcome-main-content" class="m-auto flex min-h-dvh w-4/5 flex-col gap-12 pt-20 pb-4">
	<section class="mb-4">
		<h2 class="text-secondary-800-200 font-2xl h2 font-accent">Portfolio Projects</h2>
		<p class="py-2 text-lg">Here are some the things I've been working on in the software space</p>

		<ul class="mt-4 flex w-full flex-wrap gap-4 px-2">
			{#each allPosts.findNode('software-projects')?.children as post}
				{@render postCard(post.name, post.description, post.bannerImage, post.route)}
			{/each}
		</ul>
	</section>
	<section>
		<h2 class="h2 text-secondary-800-200 font-2xl font-accent">Personal Projects</h2>
		<p class=" py-2 text-lg">
			I do woodworking in my spare time. I enjoy making bespoke trinkets, but have recently been
			tackling bigger projects. My goal for 2026 is to have a table at a craft show!
		</p>
		<ul class="mt-4 flex flex-wrap gap-4 px-2">
			{#each allPosts.findNode('wood-projects')?.children as post}
				{@render postCard(post.name, post.description, post.bannerImage, post.route)}
			{/each}
		</ul>
	</section>
</div>

<style>
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
