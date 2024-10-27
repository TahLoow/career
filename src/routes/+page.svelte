<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<div class="pb-2 pt-4">
		<h1>Welcome!</h1>
		<p>I'm Paul MacLean, and I love to learn and teach!</p>
	</div>

	<hr />

	<div class="h-100 py-4">
		<article>
			<h2>How I Built This Site</h2>
			<p>
				I built this site's interface from the <a href="https://svelte.dev/docs/kit/introduction"
					>SvelteKit</a
				>
				demo. I use components from <a href="https://ui.shadcn.com">shadcn-ui</a>, which under the
				hood is battle-tested radix-ui components. I chose shadcn-ui because the components are
				styled out the gate
				<strong>and</strong> exposes the tailwind classes that let me customize further. Most
				importantly, it handles accessibility fundamentals with minimal intervention.  
			</p>
			<!-- <Button href="/dashboard" variant="secondary" class="h-7">Read More</Button> -->
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
