<script>
	import Header from './Header.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header></Header>

	<main>
		{@render children()}
	</main>

	<footer>
		<Tooltip.Root>
			<Tooltip.Trigger><h2>🦶</h2></Tooltip.Trigger>
			<Tooltip.Content><p>Footer 🥁🥁🐍</p></Tooltip.Content>
		</Tooltip.Root>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
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
