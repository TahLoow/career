<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import githubDark from '$lib/images/github-dark.svg';
</script>

<header>
	<div class="corner"></div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="fill-secondary" />
		</svg>
		<ul class="d-flex gap-2 justify-content-space-between bg-secondary">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="w-20">
				<a href="/" class="text-sm w-full text-start">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class="w-32">
				<a href="/about" class="text-2xl w-full text-center">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class="w-20">
				<a href="/about" class="text-sm w-full text-end">Cats</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="fill-secondary" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/TahLoow">			
			<img src={githubDark} alt="GitHub" class="hidden dark:block" />
			<img src={github} alt="GitHub" class="block dark:hidden" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;

	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		height: 100%;
		display: flex;
		justify-content: center; /* Align horizontal */
		align-items: center; /* Align vertical */
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		margin: auto;
		display: block;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
