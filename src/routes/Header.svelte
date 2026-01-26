<script lang="ts">
	import { page } from '$app/state';
	import Lightswitch from '$lib/features/light-switch/LightSwitch.svelte';
	import { GithubIcon, LinkedinIcon } from '@lucide/svelte';
</script>

{#snippet pagePill(label: string, route: string)}
	<li>
		<a
			href={route}
			class="{(page.route.id === '/' && route === '/') ||
			(page.route.id?.startsWith(route) && route !== '/')
				? 'stripes text-shadow-surface-100 dark:text-shadow-surface-800 text-shadow-lg '
				: ''} border-surface-400 dark:border-surface-200 transition-border bg-surface-200 dark:bg-surface-800 card card-hover inline-flex h-2/3 items-center px-7 py-0.5 font-sans text-lg font-semibold duration-75 hover:border-b-3"
		>
			{label}
		</a>
	</li>
{/snippet}

<header
	class="bg-surface-200 dark:bg-surface-800 fixed top-0 z-50 flex h-[var(--header-height)] w-full justify-between py-2"
>
	<nav class="inline-flex w-full justify-between px-16">
		<ul class="flex items-end justify-start gap-4">
			<!-- Navigational buttons -->
			{@render pagePill('Welcome!', '/')}
			{@render pagePill('Projects', '/posts')}
			{@render pagePill('Background', '/background')}
			{@render pagePill('Contact', '/contact')}
		</ul>
		<ul class="flex items-end justify-start gap-2">
			<li class="ml-5">
				<a
					href="https://github.com/TahLoow"
					class="hover:bg-surface-600 card dark:hover:bg-surface-900 inline-flex h-[2em] w-[2em] items-center justify-center"
				>
					<GithubIcon />
				</a>
			</li>

			<li>
				<a
					href="https://www.linkedin.com/in/paul-maclean"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Visit my LinkedIn profile"
					class="card hover:bg-surface-600 dark:hover:bg-surface-900 inline-flex h-[2em] w-[2em] items-center justify-center rounded-md
         focus:ring-2"
				>
					<LinkedinIcon />
				</a>
			</li>
			<li>
				<Lightswitch />
			</li>
		</ul>
	</nav>
</header>

<style>
	li {
		height: 100%;
		display: flex;
		justify-content: center; /* Align horizontal */
		align-items: center; /* Align vertical */
	}
</style>
