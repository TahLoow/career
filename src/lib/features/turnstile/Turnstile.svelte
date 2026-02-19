<script lang="ts" module>
	const script = document.createElement('script');
	script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
	script.async = true;
	document.body.appendChild(script);

	await new Promise<unknown>((resolve, reject) => {
		script.addEventListener('load', resolve, { once: true });
		script.addEventListener('error', reject, { once: true });
	});

	const turnstile = window.turnstile;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { TurnstileState } from './turnstile-state.svelte';

	type Props = {
		turnstileState: TurnstileState;
	};

	const { turnstileState }: Props = $props();

	onMount(() => {
		// @ts-ignore
		turnstileState.loadWidget(turnstile);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=initTurnstile"
		defer
	></script>
</svelte:head>

<div id="turnstile-widget"></div>
