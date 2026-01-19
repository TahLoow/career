<script lang="ts">
	import crokinoleImage from '$lib/images/wood-projects/crokinole.png';
	import cuttingboardImage from '$lib/images/wood-projects/cuttingboard.jpg';
	import kiwiImage from '$lib/images/wood-projects/kiwi.png';
	import tablesImage from '$lib/images/wood-projects/tables.png';
	import violinImage from '$lib/images/wood-projects/violin.png';
</script>

<svelte:head>
	<title>Paul MacLean - Home</title>
</svelte:head>

{#snippet softwareProjectCard(title: string, subtitle: string)}
	<li class="w-full lg:w-[30%]">
		<article class="bg-background rounded-md p-4">
			<h3 class="mb-2 text-xl">{title}</h3>
			<p>{subtitle}</p>
		</article>
	</li>
{/snippet}

{#snippet woodProjectCard(title: string, subtitle: string, image?: string)}
	<li class="w-full lg:w-[30%]">
		<article class="bg-background inline-flex flex-col flex-nowrap rounded-md p-4">
			<h3 class="mb-2 text-xl">{title}</h3>
			<img src={image} alt="Full image of {title}" class="mb-2 w-[175px] self-center" />
			<p>{subtitle}</p>
		</article>
	</li>
{/snippet}

<div>
	<div class="pt-4 pb-2">
		<h1 class="font-accent text-5xl italic">
			<span class="font-bold">Paul</span>
			<span class="font-light">MacLean</span>
		</h1>
		<p class="font-accent">Software Engineer</p>
	</div>

	<hr class="text-muted-foreground" />

	<div class="py-4">
		<section>
			<h2>Software Projects</h2>
			<p>Here are some of the things I've been working on!</p>

			<ul class="mt-4 flex w-full flex-wrap justify-between gap-4">
				{@render softwareProjectCard(
					'NAS Backup Scheme',
					'A multi-household backup scheme among family members, using network access storage (NAS) servers'
				)}
				{@render softwareProjectCard(
					'Pi-Hole',
					'An anti-ad and anti-tracking network middleware on my personal network'
				)}
				{@render softwareProjectCard('This Site!', 'How I built this site')}
			</ul>
		</section>
		<br class="h-4" />
		<section>
			<h2>Wood Projects</h2>
			<p>
				I do woodworking in my spare time. I enjoy making bespoke trinkets, but have recently been
				tackling bigger projects. My goal for 2026 is to have a table at a craft show!
			</p>
			<ul class="mt-4 flex flex-wrap justify-between gap-4">
				{@render woodProjectCard(
					'Crokinole Game Boards',
					`Me and my dad's current project: six crokinole boards. A lot like a miniature version of curling, but easy to learn and very engaging!`,
					crokinoleImage
				)}
				{@render woodProjectCard(
					`Faux Violin`,
					`One of my first projects: a miniature (non-functional) walnut violin for my violin instructor`,
					violinImage
				)}
				{@render woodProjectCard(
					'Maple End Tables',
					`A set of maple tables, for my mom’s birthday`,
					tablesImage
				)}
				{@render woodProjectCard(`Kiwi Table`, `A small conversation piece for my wife`, kiwiImage)}
				{@render woodProjectCard(
					`Cutting Boards`,
					`This one was for my grandma. I’ve made many as gifts!`,
					cuttingboardImage
				)}
			</ul>
		</section>
	</div>
</div>
