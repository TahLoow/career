<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<div class="pb-2 pt-4">
		<h1>Welcome!</h1>
		<p>
			I'm Paul MacLean. I have a decade of software engineering experience, and I love to learn and
			teach!
		</p>
	</div>

	<hr />

	<div class="h-100 py-4">
		<article>
			<h2>Why</h2>
			<p>
				I wanted a location to store my authentic self, like a small morsel of me that folks around
				me don't get to see.
			</p>
		</article>
		<article>
			<h2>How</h2>
			<p>
				I built this site's interface from the <a href="https://svelte.dev/docs/kit/introduction"
					>SvelteKit</a
				>
				demo. I use components from <a href="https://ui.shadcn.com">shadcn-ui</a>, which under the
				hood is battle-tested radix-ui components. I chose shadcn-ui because the components are
				styled out the gate
				<strong>and</strong> exposes the TailwindCSS classes that let me customize further. Most importantly,
				it handles accessibility fundamentals with minimal intervention.
			</p>
		</article>
	</div>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
