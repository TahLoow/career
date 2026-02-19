<script lang="ts">
	import MapIndicator from '$lib/icons/map-indicator.svelte';
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import { allPosts } from './posts/all-posts';
	import PixelArtGame from '$lib/components/pixel-art-game/PixelArtGame.svelte';
</script>

<svelte:head>
	<title>Paul - Welcome</title>
</svelte:head>

{#snippet postCard(title: string, description?: string, bannerImage?: string, route?: string)}
	<li class="w-full lg:w-[30%]">
		<a href={route} class="card card-hover bg-surface-300 dark:bg-surface-800 block p-4">
			<article>
				<h4 class="h4 mb-2">{title}</h4>
				{#if bannerImage}
					<ImageUnderlay
						src={bannerImage}
						alt="Full image of {title}"
						expand={false}
						class="mb-6 max-h-[200px]"
					/>
				{/if}
				{#if description}
					<p>{description}</p>
				{/if}
			</article>
		</a>
	</li>
{/snippet}

<div class="pt-4">
	<h1 class="font-accent pb-2 text-5xl italic">
		<span class="font-bold">Paul</span>
		<span class="font-light">MacLean</span>
	</h1>
	<p class="font-accent inline-flex w-full flex-col items-center justify-between gap-2 md:flex-row">
		Software Engineer
		<span class="inline-flex">
			<MapIndicator class="mt-1 mr-1"></MapIndicator>
			<span class="text-nowrap">Pittsburgh, PA</span>
		</span>
	</p>
</div>

<hr class="hr border-surface-400 mt-3 border-t-6" />

<div class="py-8">
	<PixelArtGame />
</div>

<div class="pt-10 pb-4 lg:px-[10%]">
	<section class="mb-4">
		<h2 class="h2">Portfolio Projects</h2>
		<p class="py-2 text-lg">Here are some the things I've been working on in the software space</p>

		<ul class="mt-4 flex w-full flex-wrap gap-4 px-2">
			{#each allPosts.findNode('software-projects')?.children as post}
				{@render postCard(post.name, post.description, post.bannerImage, post.route)}
			{/each}
			<!-- {@render postCard('More to come!')} -->
		</ul>
	</section>
	<br class="h-4" />
	<section>
		<h2 class="h2">Personal Projects</h2>
		<p class="py-2 text-lg">
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
