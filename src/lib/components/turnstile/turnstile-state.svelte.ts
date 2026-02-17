import { getContext, setContext } from 'svelte';

interface CallbackConfig {
	onSuccessCallback?: Function;
	onErrorCallback?: Function;
	onExpiredCallback?: Function;
	onTimeoutCallback?: Function;
}

export function getTurnstileState() {
	let turnstileState: TurnstileState = getContext('turnstile');

	if (!turnstileState) {
		turnstileState = new TurnstileState();
		setContext('turnstile', turnstileState);
	}

	return turnstileState;
}

export class TurnstileState {
	success = $state(false);
	error = $state(false);
	expired = $state(false);
	timedOut = $state(false);

	token?: string = $state();

	loading = $derived(!this.success && !this.error && !this.expired && !this.timedOut);

	constructor(public handlers: CallbackConfig = {}) {}

	reset() {
		this.success = false;
		this.error = false;
		this.expired = false;
		this.timedOut = false;
		this.token = '';
	}

	onSuccess(token: string) {
		this.reset();
		this.success = true;
		this.token = token;
		this.handlers.onSuccessCallback?.(token);
		console.log('success 1');
		console.log(this.handlers.onSuccessCallback);
	}

	onError(errorCode: string) {
		this.reset();
		this.error = true;
		this.handlers.onErrorCallback?.(errorCode);
	}

	onExpired() {
		this.reset();
		this.expired = true;
		this.handlers.onExpiredCallback?.();
	}

	onTimeout() {
		this.reset();
		this.timedOut = true;
		this.handlers.onTimeoutCallback?.();
	}
}
