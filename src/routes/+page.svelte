<script lang="ts">
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import { allPosts } from './posts/all-posts';
	import {
		ArrowDownIcon,
		BringToFrontIcon,
		ComputerIcon,
		EyeIcon,
		HandshakeIcon
	} from '@lucide/svelte';
	import { type Component } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';
	import PixelArtGame from '$lib/components/pixel-art-game/PixelArtGame.svelte';

	const sectionHeight = 'h-[calc(100dvh-var(--header-height))]';
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

{#snippet coreValueSnippet(icon: Component, text: string, sequence: number)}
	<li
		class="shadow-secondary-950-50 min-w-48 grow basis-0 shadow-2xl {sequence === 2
			? ''
			: 'mt-8'} transition-all"
		in:fly={{
			y: -60,
			easing: expoIn,
			// duration: 1000,
			// delay: (sequence - 1) * 500 + 1000
			delay: 0,
			duration: 0
		}}
	>
		<button class="text-surface-900-100 flex h-full flex-col justify-around px-6 py-4">
			<span class="flex grow flex-col items-center gap-3 pt-6 text-center text-2xl font-extrabold">
				<p>{text}</p>
				<svelte:component this={icon} class="size-7" />
			</span>
			<EyeIcon class="text-surface-600-400 w-full animate-pulse" />
		</button>
	</li>
{/snippet}

<div class="{sectionHeight} flex flex-col justify-around">
	<div class="flex grow flex-col items-center justify-center">
		<h1 class="font-accent flex items-end justify-center pb-6 text-center text-7xl font-extralight">
			Paul MacLean
		</h1>

		<p class="text-surface-600-400 w-full pb-12 text-center text-2xl leading-none italic">
			<span class="">Full Stack Developer</span>
		</p>

		<p class="wrap-none pt-8 text-center text-lg text-pretty">
			With over a decade of coding, I quickly adapt to what I'm working on.
			<br />
			Moreover, I'm proactive and invested in all facets of my work.
		</p>
	</div>
	<div class="flex flex-col items-center justify-end pb-12">
		<button
			class="btn preset-filled-secondary-600-400 text-surface-100-900 btn-lg inline-flex animate-bounce items-center gap-6"
			onclick={() =>
				document.getElementById('section-core-work-values')?.scrollIntoView({ behavior: 'smooth' })}
			in:fade={{ delay: 200 }}
		>
			<ArrowDownIcon class="size-6" />
			<p class="pt-1 text-center text-xl">My Core Work Values</p>
			<ArrowDownIcon class="size-6" />
		</button>
	</div>
</div>

<section id="section-core-work-values" class="flex h-[100dvh] flex-col justify-around">
	<div class=" flex grow flex-col justify-center">
		<ul class=" mx-auto flex h-1/3 w-3/5 justify-center gap-20">
			{@render coreValueSnippet(BringToFrontIcon, 'Feature Ownership', 1)}
			{@render coreValueSnippet(HandshakeIcon, 'Transparent Collaboration', 2)}
			{@render coreValueSnippet(ComputerIcon, 'Stack Flexibility', 3)}
		</ul>
	</div>

	<div class="flex flex-col items-center justify-end pb-12">
		<button
			class="btn preset-filled-secondary-600-400 text-surface-100-900 btn-lg inline-flex animate-bounce items-center gap-6"
			onclick={() =>
				document.getElementById('welcome-main-content')?.scrollIntoView({ behavior: 'smooth' })}
			in:fade={{ delay: 2000 }}
		>
			<ArrowDownIcon class="size-6" />
			<p class="pt-1 text-center text-xl">Portfolio</p>
			<ArrowDownIcon class="size-6" />
		</button>
	</div>
</section>

<hr class="hr border-secondary-400 dark:border-secondary-200 border-t-6" />

<!-- <div class="py-8">
	<PixelArtGame />
</div> -->

<div id="welcome-main-content" class="pt-20 pb-4">
	<section class="mb-4">
		<h2 class="text-secondary-800-200 font-2xl h2">Portfolio Projects</h2>
		<p class="py-2">Here are some the things I've been working on in the software space</p>

		<ul class="mt-4 flex w-full flex-wrap gap-4 px-2">
			{#each allPosts.findNode('software-projects')?.children as post}
				{@render postCard(post.name, post.description, post.bannerImage, post.route)}
			{/each}
			<!-- {@render postCard('More to come!')} -->
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
