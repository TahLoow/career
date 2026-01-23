<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-surface-200 dark:bg-surface-900 relative flex flex-col">
	<Header></Header>
	<div
		class="mt-[calc(var(--header-height))] flex w-full flex-1 grow grid-cols-12 grid-rows-1 lg:px-16"
	>
		<div class="lg:col-span-1"></div>
		<main
			class="bg-surface-200 dark:bg-surface-900 col-span-12 m-auto box-border min-h-[calc(100vh-40px)] w-full p-4 lg:col-span-10 lg:max-w-7xl"
		>
			{@render children()}
		</main>
		<div class="lg:col-span-1"></div>
	</div>
	<Footer></Footer>
</div>
