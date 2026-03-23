<script lang="ts">
	import CoreValues from '../lib/features/core-values/CoreValues.svelte';

	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import { allPosts } from './posts/all-posts';
	import {
		ArrowDownIcon,
		BringToFrontIcon,
		ComputerIcon,
		EyeIcon,
		HandshakeIcon
	} from '@lucide/svelte';
	import { onDestroy, onMount, type Component } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';

	const sectionHeight = 'h-[calc(100dvh-var(--header-height))]';

	let hideCoreValues = $state(true);

	function triggerDisplayCoreValues(entries: IntersectionObserverEntry[]) {
		console.log('trigger');
		hideCoreValues = !entries[0].isIntersecting;
	}

	const options = {
		rootMargin: '0px',
		scrollMargin: '0px',
		threshold: 0
	};

	const observer = new IntersectionObserver(triggerDisplayCoreValues, options);

	onMount(() => {
		observer.observe(document.querySelector('#container-core-values')!);
	});

	onDestroy(() => {
		observer.disconnect();
	});
</script>

<svelte:head>
	<title>Paul - Welcome</title>
</svelte:head>

{#snippet postCard(title: string, description?: string, bannerImage?: string, route?: string)}
	<li class="w-full lg:w-[30%]">
		<a href={route} class="card card-hover bg-surface-300 dark:bg-surface-800 block h-full p-4">
			<article>
				<h4 class="h4 mb-2">{title}</h4>
				{#if bannerImage}
					<ImageUnderlay
						src={bannerImage}
						alt="Full image of {title}"
						expand={false}
						class="mb-6 h-[170px]"
					/>
				{/if}
				{#if description}
					<p>{description}</p>
				{/if}
			</article>
		</a>
	</li>
{/snippet}

{#snippet jumpButton(label: string, targetId: string, delay: number)}
	<button
		class="btn preset-filled-secondary-800-200 text-surface-100-900 btn-lg inline-flex animate-bounce items-center gap-6"
		onclick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
		in:fade={{ delay }}
	>
		<ArrowDownIcon class="size-6" />
		<p class="pt-1 text-center text-xl">{label}</p>
		<ArrowDownIcon class="size-6" />
	</button>
{/snippet}

<div class="{sectionHeight} flex flex-col justify-around">
	<div class="flex grow flex-col items-center justify-center">
		<h1
			class="font-accent flex items-end justify-center pt-8 pb-6 text-center text-5xl font-extralight lg:text-7xl"
		>
			Paul MacLean
		</h1>

		<p class="text-surface-600-400 w-full pb-12 text-center text-2xl leading-none italic">
			<span class="">Full Stack Developer</span>
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

<hr class="hr border-secondary-400 dark:border-secondary-200 border-t-6" />

<div id="welcome-main-content" class="min-h-dvh pt-20 pb-4">
	<section class="mb-4">
		<h2 class="text-secondary-800-200 font-2xl h2">Portfolio Projects</h2>
		<p class="py-2">Here are some the things I've been working on in the software space</p>

		<ul class="mt-4 flex w-full flex-wrap gap-4 px-2">
			{#each allPosts.findNode('software-projects')?.children as post}
				{@render postCard(post.name, post.description, post.bannerImage, post.route)}
			{/each}
		</ul>
	</section>
	<br class="h-4" />
	<section>
		<h2 class="h2 text-secondary-800-200 font-2xl">Personal Projects</h2>
		<p class=" py-2">
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
