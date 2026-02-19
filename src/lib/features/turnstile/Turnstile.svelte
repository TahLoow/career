<script lang="ts">
	import { onMount } from 'svelte';
	import type { TurnstileState } from './turnstile-state.svelte';

	type Props = {
		turnstileState: TurnstileState;
	};

	const { turnstileState }: Props = $props();

	onMount(() => {
		// @ts-ignore
		window.initTurnstile = () => {
			const turnstile = window.turnstile;
			turnstileState.loadWidget(turnstile);
		};
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
