<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';

	import { page } from '$app/state';
	import Lightswitch from '$lib/features/light-switch/LightSwitch.svelte';
	import { GithubIcon, LinkedinIcon } from '@lucide/svelte';
	import { AppBar, useDialog } from '@skeletonlabs/skeleton-svelte';

	import { XIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	const appBarDialog = useDialog({ id: 'app-bar-dialog' });

	// The following animations are optional.
	// These may also be included inline.
	const animBackdrop =
		'transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100';
	const animModal =
		'transition transition-discrete opacity-0 -translate-x-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0';
</script>

{#snippet pagePill(label: string, route: string)}
	<li>
		<a
			href={route}
			onclick={() => {
				appBarDialog().setOpen(false);
			}}
			class="{(page.route.id === '/' && route === '/') ||
			(page.route.id?.startsWith(route) && route !== '/')
				? 'stripes text-shadow-surface-100 dark:text-shadow-surface-800 text-shadow-lg '
				: ''} border-surface-400 dark:border-surface-200 transition-border hover:bg-surface-200 hover:dark:bg-surface-800 card card-hover inline-flex h-full w-full items-center self-stretch px-7 py-2 font-sans text-lg font-semibold duration-75 hover:border-b-3"
		>
			{label}
		</a>
	</li>
{/snippet}

{#snippet routes()}
	{@render pagePill('Welcome!', '/')}
	{@render pagePill('Projects', '/posts')}
	{@render pagePill('Background', '/background')}
	{@render pagePill('Contact', '/contact')}
{/snippet}

<AppBar
	class="bg-surface-200 dark:bg-surface-800/50 border-surface-400/50 fixed top-0 z-50 h-[var(--header-height)] border-b backdrop-blur-lg"
>
	<AppBar.Toolbar class="justify-apart h-full grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<Dialog>
				<Dialog.Provider value={appBarDialog}>
					<Dialog.Trigger class="btn-icon btn-icon-lg hover:preset-tonal block lg:hidden">
						<MenuIcon />
					</Dialog.Trigger>
					<Portal>
						<Dialog.Backdrop
							class="bg-surface-50-950/50 fixed inset-0 z-50 transition transition-discrete {animBackdrop}"
						/>
						<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
							<Dialog.Content
								class="card bg-surface-100-900 h-screen w-sm space-y-4 p-4 shadow-xl {animModal}"
							>
								<header class="flex items-center justify-between">
									<Dialog.Title class="text-2xl font-bold">Drawer</Dialog.Title>
									<Dialog.CloseTrigger class="btn-icon preset-tonal">
										<XIcon />
									</Dialog.CloseTrigger>
								</header>
								<ul class="flex flex-col justify-center gap-2">
									{@render routes()}
								</ul>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Provider>
			</Dialog>
		</AppBar.Lead>
		<AppBar.Headline class="hidden h-full lg:flex">
			<ul class="flex items-stretch justify-start gap-4">
				{@render routes()}
			</ul>
		</AppBar.Headline>
		<AppBar.Trail class="flex justify-end">
			<ul class="inline-flex items-center gap-2">
				<li class="ml-5">
					<a href="https://github.com/TahLoow" type="button" class="btn-icon hover:preset-tonal">
						<GithubIcon class="size-6" />
					</a>
				</li>

				<li>
					<a
						href="https://www.linkedin.com/in/paul-maclean"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit my LinkedIn profile"
						type="button"
						class="btn-icon hover:preset-tonal"
					>
						<LinkedinIcon class="size-6" />
					</a>
				</li>
				<li>
					<Lightswitch />
				</li>
			</ul>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>

<!-- <script lang="ts">
	import { page } from '$app/state';
	import Lightswitch from '$lib/features/light-switch/LightSwitch.svelte';
	import { GithubIcon, LinkedinIcon } from '@lucide/svelte';
</script>
 -->

<!-- <header
	class="bg-surface-200 dark:bg-surface-800 fixed top-0 z-50 flex h-[var(--header-height)] w-full justify-between py-2"
>
	<nav class="inline-flex w-full justify-between px-16">
		<ul class="flex items-end justify-start gap-4">
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
</style> -->
