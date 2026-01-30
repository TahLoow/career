<script lang="ts">
	import { Portal, Tooltip, useTooltip } from '@skeletonlabs/skeleton-svelte';
	import { ExternalLink } from '@lucide/svelte';
	import anchoIcon from '$lib/icons/cats/ancho.png';
	import cheddarIcon from '$lib/icons/cats/cheddar.png';
	import cornIcon from '$lib/icons/cats/corn.png';
	import goobIcon from '$lib/icons/cats/goob.png';
	import pearIcon from '$lib/icons/cats/pear.png';
	import weegieIcon from '$lib/icons/cats/weegie.png';

	import anchoFull from '$lib/images/cats/ancho.png';
	import cheddarFull from '$lib/images/cats/cheddar.png';
	import cornFull from '$lib/images/cats/corn.png';
	import goobFull from '$lib/images/cats/goob.png';
	import pearFull from '$lib/images/cats/pear.png';
	import weegieFull from '$lib/images/cats/weegie.png';
	import CatTooltip from './CatTooltip.svelte';
</script>

{#snippet bookItem(title: string, author: string, href: string)}
	<li class="mt-2 flex">
		<a {href} class="card card-hover bg-surface-300 dark:bg-surface-700 block px-1 py-0.5">
			<p class="px-1">
				<ExternalLink size={16} strokeWidth={2} class="mb-1 inline" />
				<span class="font-semibold">{title}</span>
			</p>
			<p class="ml-2 text-xs leading-5 tracking-wider italic">
				{author}
			</p>
		</a>
	</li>
{/snippet}

{#snippet catItem(name: string, icon: string, fullImage: string, notes: string[])}
	<li class="mt-1">
		<CatTooltip {name} {icon} {fullImage} {notes} />
	</li>
{/snippet}

<footer class="bg-surface-200 dark:bg-surface-800 px-4 py-4">
	<div class="flex justify-center gap-16">
		<ul>
			<p class="mb-4 w-full text-lg font-semibold">My 2026 Reads</p>
			{@render bookItem('Darkness of Creation', 'Nicholas Carrol', 'https://a.co/d/9xh3Th2')}
			{@render bookItem(
				'Catalyst: A Rogue One Novel',
				'James Luceno',
				'https://www.hpb.com/search?q=+9781101967003'
			)}
			{@render bookItem(
				'On Writing',
				'Stephen King',
				'https://www.hpb.com/search?q=+9780671582364'
			)}
		</ul>
		<ul>
			<p class="mb-4 w-full text-lg font-semibold">Family Cats</p>
			{@render catItem('Luigi', weegieIcon, weegieFull, [
				`Nicknames: Weegie, Lui`,
				`Large and in charge`,
				`Corn's Roommate`,
				`Evicted due to crimes against Nova`
			])}
			{@render catItem('Cornbread', cornIcon, cornFull, [
				`Nicknames: Corn`,
				`Perfect in every way`
			])}
			{@render catItem('Rosie', cheddarIcon, cheddarFull, [
				`Nicknames: Cheddar, Cheese, Big Cheese`,
				`Has orange wedge on forehead`,
				`Yearns to destroy cornbread`,
				`Obsessed with phones`
			])}
			{@render catItem('Nova', goobIcon, goobFull, [
				`Nicknames: Goob`,
				`Troublemaker; subject of numerous complaints`,
				`Enjoys pizzelles`
			])}
			{@render catItem('Lily', pearIcon, pearFull, [
				`Nicknames: Pear, Pear-Bear, Care-Bear`,
				`Dainty and sweet`,
				`Nuzzles cacti for fun`
			])}
			{@render catItem('Anchovy', anchoIcon, anchoFull, [
				`Nicknames: Chobi, Chobani`,
				`Clinically insane`,
				`Born in Chicago`
			])}
		</ul>
	</div>
</footer>
