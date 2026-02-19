import { env } from '$env/dynamic/public';
import { getContext, setContext } from 'svelte';
import { getModeState } from '../light-switch/mode-state.svelte';
import { notificationService } from '../notification/notification.service.svelte';

export function getTurnstileState() {
	let turnstileState: TurnstileState = getContext('turnstile');

	if (!turnstileState) {
		turnstileState = new TurnstileState();
		setContext('turnstile', turnstileState);
	}

	return turnstileState;
}

interface Turnstile {
	execute: Function;
	getResponse: Function;
	implicitRender: Function;
	isExpired: Function;
	ready: Function;
	remove: Function;
	render: Function;
	reset: Function;
}

const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY;
// const turnstileSiteKey = '2x00000000000000000000AB'; // Always fails (visible)
// const turnstileSiteKey = '3x00000000000000000000FF'; // Forces challenge

export class TurnstileState {
	localSuccess = $state(false);
	localError = $state(false);
	localExpired = $state(false);
	localTimedOut = $state(false);

	sessionSuccess = $state(false);
	sessionError = $state(false);

	localLoading = $derived(
		!this.localSuccess && !this.localError && !this.localExpired && !this.localTimedOut
	);

	sessionEvent = new EventTarget();
	localEvent = new EventTarget();

	turnstile?: Turnstile;

	mode = getModeState();

	// Awaits a given promise, and handles errors/reauthentication on fetch failure
	async authFetch(fetchFn: Promise<any>) {
		let response = await fetchFn;

		if (response?.error === 'Turnstile verification required') {
			notificationService.info({
				title: 'Validation expired',
				description: 'Please try again after re-authenticating'
			});
			this.reset();
			this.turnstile?.reset();
		}

		return response;
	}

	// Resets state of object
	reset() {
		this.localSuccess = false;
		this.localError = false;
		this.localExpired = false;
		this.localTimedOut = false;

		this.sessionSuccess = false;
		this.sessionError = false;
	}

	// Renders a turnstile object onto a turnstile-widget element
	loadWidget(turnstile: any) {
		if (turnstile) {
			const turnstileConfig = {
				sitekey: turnstileSiteKey,
				theme: this.mode === 'system' ? 'auto' : this.mode,
				retry: 'never',
				['callback']: (token: string) => this.handleLocalSuccess(token),
				['error-callback']: (error: string) => this.onLocalError(error),
				['expired-callback']: () => this.onLocalExpired(),
				['timeout-callback']: () => this.onLocalTimeout()
			};

			turnstile.render('#turnstile-widget', turnstileConfig);
			this.turnstile = turnstile;
		}
	}

	// Once user has passed the turnstile challenge, auth via the server
	async handleLocalSuccess(token: string) {
		this.reset();
		this.localSuccess = true;

		let data: any;
		try {
			const response = await fetch(`${env.PUBLIC_API_URL}/auth/verify`, {
				body: JSON.stringify({ token }),
				method: 'POST',
				headers: { ['Content-Type']: 'json' },
				credentials: 'include'
			});

			data = await response.json();
		} catch (error) {
			this.sessionEvent.dispatchEvent(new CustomEvent('error'));
		}

		this.sessionSuccess = data.message === 'Session established';
		if (this.sessionSuccess) {
			this.sessionEvent.dispatchEvent(new CustomEvent('success'));
		} else {
			this.sessionEvent.dispatchEvent(new CustomEvent('error'));
		}
	}

	onLocalError(errorCode: string) {
		this.reset();
		this.localError = true;
		this.localEvent.dispatchEvent(new CustomEvent('error', { detail: errorCode }));
	}

	onLocalExpired() {
		this.reset();
		this.localExpired = true;
		this.localEvent.dispatchEvent(new CustomEvent('expired'));
	}

	onLocalTimeout() {
		this.reset();
		this.localTimedOut = true;
		this.localEvent.dispatchEvent(new CustomEvent('timeout'));
	}
}
