<script lang="ts">
	import { Portal, Tooltip, useTooltip } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		name: string;
		icon: string;
		fullImage: string;
		notes: string[];
	}

	const { name, icon, fullImage, notes }: Props = $props();

	const tooltip = useTooltip({
		id: `cat-tooltip-${name}`,
		positioning: { placement: 'top', offset: { mainAxis: 50 } },
		openDelay: 0,
		closeOnClick: false
	});
</script>

<Tooltip.Provider value={tooltip}>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content class="card  preset-filled-surface-950-50 z-20 w-[175px] p-2">
				<span>
					<img src={fullImage} alt="Full image of {name}" class="mb-2 rounded-md" />
					<ul style="list-style-type: circle" class="pl-4">
						{#each notes as note}
							<li class="mt-1 leading-5">
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
	<Tooltip.Trigger
		class="cursor-default"
		onclick={() => {
			tooltip().setOpen(!tooltip().open);
		}}
	>
		<p
			class="card card-hover bg-surface-400 dark:bg-surface-700 flex items-center rounded-sm pr-2 pl-1"
		>
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
</Tooltip.Provider>
