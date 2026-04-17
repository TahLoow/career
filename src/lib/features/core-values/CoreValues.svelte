<script lang="ts">
	import CoreValueCard from './CoreValueCard.svelte';

	import { BringToFrontIcon, ComputerIcon, HandshakeIcon } from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';

	let showCoreValues = $state(false);

	function triggerDisplayCoreValues(entries: IntersectionObserverEntry[]) {
		if (entries[0].isIntersecting) {
			showCoreValues = true;
		}
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

<ul
	id="container-core-values"
	class="flex flex-col justify-center gap-20 rounded py-4 lg:h-2/5 lg:flex-row lg:px-12"
>
	{#if showCoreValues}
		<CoreValueCard
			icon={ComputerIcon}
			text="Stack<br />Versatile"
			context="Backend, frontend, and cloud. Also: machine learning, data pipelines, computer vision, embedded, and more. Also: TypeScript, Python, Lua, SQL, and more. The more tools you learn to use, the more insights you can bring to the next."
			sequence={1}
		/>
		<CoreValueCard
			icon={HandshakeIcon}
			text="Transparent<br />Communication"
			context="My open communication style helps me establish trusted and productive relationships with colleagues, stakeholders, and leadership. Anecdotally, trusted collaboration exposes requirement lapses before they materialize."
			sequence={2}
		/>
		<CoreValueCard
			icon={BringToFrontIcon}
			text="Outcome<br />Oriented"
			context="I learn the greater objectives and recognize when I'm going down the wrong path. I do this by staying attentive, learning feature objectives, and knowing what the users really want."
			sequence={3}
		/>
	{/if}
</ul>
