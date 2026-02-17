<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getModeState } from '$lib/features/light-switch/mode-state.svelte';
	import { onMount } from 'svelte';
	import type { TurnstileState } from './turnstile-state.svelte';

	type Props = {
		state: TurnstileState;
	};

	const { state }: Props = $props();

	const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY;
	// const turnstileSiteKey = '2x00000000000000000000AB'; // Always fails (visible)
	// const turnstileSiteKey = '3x00000000000000000000FF'; // Forces challenge

	const mode = getModeState();

	onMount(() => {
		// @ts-ignore
		window.onSuccessCallback = (token: string) => {
			state.onSuccess(token);
		};

		// @ts-ignore
		window.onErrorCallback = (errorCode: string) => {
			state.onError(errorCode);
		};

		// @ts-ignore
		window.onExpiredCallback = () => {
			state.onExpired();
		};

		// @ts-ignore
		window.onTimeoutCallback = () => {
			state.onTimeout();
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div
	class="cf-turnstile"
	data-sitekey={turnstileSiteKey}
	data-theme={mode === 'system' ? 'auto' : mode}
	data-size="normal"
	data-callback="onSuccessCallback"
	data-error-callback="onErrorCallback"
	data-expired-callback="onExpiredCallback"
	data-timeout-callback="onTimeoutCallback"
	data-error
></div>
