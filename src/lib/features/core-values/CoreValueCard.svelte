<script lang="ts">
	import { EyeIcon } from '@lucide/svelte';
	import { type Component } from 'svelte';
	import { fly } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';

	interface CoreValueCardProps {
		icon: Component;
		text: string;
		context: string;
		sequence: number;
	}

	const { icon, text, context, sequence }: CoreValueCardProps = $props();

	let hovered = $state(false);
</script>

<li
	class="h-80 w-72 grow transition-all lg:basis-0"
	in:fly={{
		y: -60,
		easing: expoIn,
		duration: 300,
		delay: (sequence - 1) * 500
		// delay: 0,
		// duration: 0
	}}
>
	<button
		class="text-surface-900-100 flex h-full w-full basis-0 flex-col justify-around gap-4 px-6 py-8 shadow-2xl {hovered
			? 'text-surface-100-900! bg-secondary-700-300'
			: 'shadow-secondary-800-200'}"
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}
		ontouchstart={() => (hovered = !hovered)}
		onfocus={() => (hovered = true)}
		onblur={() => (hovered = false)}
	>
		<div class="grow overflow-auto font-extrabold select-none">
			<div class="flex flex-col items-center gap-3 text-center text-2xl" class:hidden={hovered}>
				<p>{@html text}</p>
				<svelte:component this={icon} strokeWidth="2" class="size-7" />
			</div>
			<div class="text-center" class:hidden={!hovered}>
				{context}
			</div>
		</div>
		<EyeIcon class="w-full animate-pulse" />
	</button>
</li>
