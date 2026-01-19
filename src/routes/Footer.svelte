<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
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
</script>

{#snippet bookItem(title: string, author: string, href: string)}
	<li class="mt-1">
		<a {href}>
			<p class="hover:bg-secondary rounded-sm px-1">
				<span class="font-semibold">{title}</span> <span class="italic"> by {author}</span>
			</p>
		</a>
	</li>
{/snippet}

{#snippet catItem(name: string, icon: string, fullImage: string, notes: string[])}
	<li class="mt-1">
		<Tooltip positioning={{ placement: 'right', offset: { mainAxis: 50 } }} openDelay={0}>
			<Portal>
				<Tooltip.Positioner>
					<Tooltip.Content class="card preset-filled-surface-950-50 p-2">
						<span>
							<img src={fullImage} alt="Full image of {name}" class="w-[175px]" />
							<ul style="list-style-type: circle" class="pl-4">
								{#each notes as note}
									<li>
										<p>
											{note}
										</p>
									</li>
								{/each}
							</ul>
						</span>
						<Tooltip.Arrow
							class="[--arrow-background:var(--color-surface-950-50)] [--arrow-size:--spacing(2)]"
						>
							<Tooltip.ArrowTip />
						</Tooltip.Arrow>
					</Tooltip.Content>
				</Tooltip.Positioner>
			</Portal>
			<Tooltip.Trigger>
				<p class="hover:bg-secondary flex items-center rounded-sm pr-2 pl-1">
					<span class="flex w-8 justify-center">
						<img
							src={icon}
							alt="8-bit depiction of {name}"
							style="image-rendering: pixelated; image-rendering: crisp-edges; "
						/>
					</span>
					{name}
				</p>
			</Tooltip.Trigger>
		</Tooltip>
	</li>
{/snippet}

<footer class="mx-4 my-4">
	<div class="flex justify-center gap-8">
		<ul>
			<p class="mb-4 w-full text-lg font-semibold">Current Reads</p>
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
