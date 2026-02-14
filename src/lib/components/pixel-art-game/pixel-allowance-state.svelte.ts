import { onDestroy } from 'svelte';
import { LocalStore, localStore } from './local-storage-state.svelte';

// User can place more pixels after this period
const PIXEL_BALANCE_REFRESH_PERIOD_SECONDS = 60 * 2 * 0.1; // 2 minutes

// User can place this many pixels per period
const PIXELS_PER_PERIOD = 3;

export class PixelAllowance {
	balance = localStore('balance', PIXELS_PER_PERIOD);

	secondsPast = localStore('secondsPast', 0);

	secondsUntilRefresh = $derived(PIXEL_BALANCE_REFRESH_PERIOD_SECONDS - this.secondsPast.value);

	canPlace = $derived(this.balance.value > 0);

	displayTime = $derived(
		Math.floor(this.secondsUntilRefresh / 60) +
			':' +
			(this.secondsUntilRefresh % 60).toString().padStart(2, '0')
	);

	// ID for the allowance reload loop. Lets us clean up
	private reloadLoopId: undefined | number;

	constructor() {
		onDestroy(() => {
			clearInterval(this.reloadLoopId);
			console.log('destroyed');
		});
	}

	reloadBalanceLoop() {
		if (this.secondsPast.value >= PIXEL_BALANCE_REFRESH_PERIOD_SECONDS) {
			// reload balance
			this.balance.value = PIXELS_PER_PERIOD;
			this.secondsPast.value = 0;
		}
		// console.log(this.secondsPast);
		this.secondsPast.value++;
	}

	beginAllowanceLoop() {
		this.reloadLoopId = setInterval(() => this.reloadBalanceLoop(), 1000);
	}

	deduct() {
		this.balance.value = Math.max(0, this.balance.value - 1);
	}
}
