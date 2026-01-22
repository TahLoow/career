<script lang="ts">
	import github from '$lib/images/github.svg';
	import githubDark from '$lib/images/github-dark.svg';
	import { page } from '$app/state';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Lightswitch from '$lib/features/light-switch/LightSwitch.svelte';
</script>

<header
	class="bg-surface-200 dark:bg-surface-900 fixed top-0 flex h-[--header-height] w-full justify-between py-2"
>
	<nav class="flex w-full px-16">
		<ul class="flex w-full items-end justify-start gap-2">
			{#snippet pagePill(label: string, route: string)}
				<li>
					<a
						href={route}
						class="{page.route.id === route
							? 'bg-secondary rounded-sm'
							: ''} font-muted px-4 py-0.5 font-sans font-semibold"
					>
						{label}
					</a>
				</li>
			{/snippet}

			<!-- Navigational buttons -->
			{@render pagePill('Welcome!', '/')}
			{@render pagePill('Projects', '/projects')}
			{@render pagePill('Background', '/background')}
			{@render pagePill('Contact', '/contact')}

			<li class="ml-5">
				<a href="https://github.com/TahLoow" class="h-[2em] w-[2em]">
					<img src={githubDark} alt="GitHub" class="hidden dark:block" />
					<img src={github} alt="GitHub" class="block dark:hidden" />
				</a>
			</li>

			<li>
				<a
					href="https://www.linkedin.com/in/paul-maclean"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Visit my LinkedIn profile"
					class="inline-flex h-6 w-6 items-center justify-center rounded-md
         bg-[#4C4C4C] transition-colors
         hover:bg-[#004182] focus:ring-2 focus:ring-[#4C4C4C] focus:outline-none"
				>
					<Linkedin class="h-3 w-3"></Linkedin>
				</a>
			</li>
			<li>
				<Lightswitch />
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	li {
		height: 100%;
		display: flex;
		justify-content: center; /* Align horizontal */
		align-items: center; /* Align vertical */
	}
</style>
