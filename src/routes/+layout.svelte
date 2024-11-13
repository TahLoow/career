<script>
	import Header from './Header.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	

	<div class="flex flex-1 flex-col">
		<Header></Header>
		<div class="flex flex-1 grid w-full grid-cols-12 grid-rows-1 bg-red-900">
			<div class="flex flex-1 justify-center col-span-2">
				<span class="w-[min(calc((100vw-68rem)/2),80px)] bg-green-400">hello</span>
			</div>
			<div class="flex flex-1 col-span-8 main-content">
				<main>
					{@render children()}
				</main>
			</div>
			<div class="flex flex-1 justify-center col-span-2">
				<span class="w-[min(calc((100vw-68rem)/2),80px)] bg-green-400">hello</span>
			</div>
		</div>
		<footer>
			<Tooltip.Root>
				<Tooltip.Trigger><h2>🦶</h2></Tooltip.Trigger>
				<Tooltip.Content><p>Footer 🥁🥁🐍</p></Tooltip.Content>
			</Tooltip.Root>
		</footer>
	</div>


</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
