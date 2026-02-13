import type PartySocket from 'partysocket';
import { createPixelQuery } from './queries/CreatePixelQuery';
import { getBoardQuery } from './queries/GetBoardQuery';
import { getPixelStreamQuery, type SocketState } from './queries/StreamPixelUpdates.svelte';
import { onDestroy, onMount } from 'svelte';

// User can place more pixels after this period
const PIXEL_BALANCE_REFRESH_PERIOD_SECONDS = 60 * 2 * 0.1; // 2 minutes

// User can place this many pixels per period
const PIXELS_PER_PERIOD = 3;

export class PixelAllowance {
	balance = $state(PIXELS_PER_PERIOD);

	secondsPast = $state(0);

	secondsUntilRefresh = $derived(PIXEL_BALANCE_REFRESH_PERIOD_SECONDS - this.secondsPast);

	canPlace = $derived(this.balance > 0);

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
		});
	}

	reloadBalanceLoop() {
		if (this.secondsPast >= PIXEL_BALANCE_REFRESH_PERIOD_SECONDS) {
			// reload balance
			this.balance = PIXELS_PER_PERIOD;
			this.secondsPast = 0;
		}
		// console.log(this.secondsPast);
		this.secondsPast++;
	}

	beginAllowanceLoop() {
		this.reloadLoopId = setInterval(() => this.reloadBalanceLoop(), 1000);
	}

	deduct() {
		this.balance = Math.max(0, this.balance - 1);
	}
}
