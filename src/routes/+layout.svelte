<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="app bg-background flex flex-col">
	<Header></Header>
	<div class="flex grid w-full flex-1 flex-grow grid-cols-12 grid-rows-1">
		<div class="col-span-2 flex flex-1 justify-center">
			<span class="w-[min(calc((100vw-68rem)/2),80px)]"></span>
		</div>
		<div class="main-content col-span-8 flex flex-1">
			<main>
				{@render children()}
			</main>
		</div>
		<div class="col-span-2 flex flex-1 justify-center">
			<span class="w-[min(calc((100vw-68rem)/2),80px)]"></span>
		</div>
	</div>
	<Footer></Footer>
</div>

<style>
	.main-content {
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
