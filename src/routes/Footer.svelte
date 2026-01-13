<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

{#snippet bookItem(title: string, author: string, href: string)}
	<li class="mt-1">
		<a {href}>
			<p class="rounded-sm px-1 hover:bg-white">
				<span class="font-semibold">{title}</span> <span class="italic"> by {author}</span>
			</p>
		</a>
	</li>
{/snippet}

<footer class="">
	<div class="flex justify-center">
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
		<div class=""></div>
	</div>

	<Tooltip positioning={{ placement: 'top' }}>
		<Tooltip.Trigger>🦶</Tooltip.Trigger>
		<Portal>
			<Tooltip.Positioner>
				<Tooltip.Content class="card preset-filled-surface-950-50 p-2">
					<span>🥁🥁🐍</span>
					<Tooltip.Arrow
						class="[--arrow-background:var(--color-surface-950-50)] [--arrow-size:--spacing(2)]"
					>
						<Tooltip.ArrowTip />
					</Tooltip.Arrow>
				</Tooltip.Content>
			</Tooltip.Positioner>
		</Portal>
	</Tooltip>
</footer>
