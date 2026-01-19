<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="app bg-background relative flex flex-col">
	<Header></Header>
	<div
		class="mt-[calc(var(--header-height))] flex grid w-full flex-1 flex-grow grid-cols-12 grid-rows-1"
	>
		<div class="lg:col-span-2"></div>
		<div
			class="bg-background-secondary col-span-12 m-auto box-border flex min-h-[calc(100vh-40px)] w-full flex-grow p-4 lg:col-span-8 lg:max-w-5xl"
		>
			<main>
				{@render children()}
			</main>
		</div>
		<div class="lg:col-span-2"></div>
	</div>
	<Footer></Footer>
</div>
