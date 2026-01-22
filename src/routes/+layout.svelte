<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="app relative flex flex-col">
	<Header></Header>
	<div
		class="mt-[calc(var(--header-height))] flex w-full flex-1 grow grid-cols-12 grid-rows-1 lg:px-16"
	>
		<div class="lg:col-span-2"></div>
		<div
			class="bg-surface-200 dark:bg-surface-900 col-span-12 m-auto box-border flex min-h-[calc(100vh-40px)] w-full grow p-4 lg:col-span-8 lg:max-w-6xl"
		>
			<main>
				{@render children()}
			</main>
		</div>
		<div class="lg:col-span-2"></div>
	</div>
	<Footer></Footer>
</div>
