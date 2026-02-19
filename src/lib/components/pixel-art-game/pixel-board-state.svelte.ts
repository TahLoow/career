import { createPixelQuery } from './queries/CreatePixelQuery';
import { getBoardQuery } from './queries/GetBoardQuery';
import { getPixelStreamQuery, type SocketState } from './queries/StreamPixelUpdates.svelte';
import type { PixelAllowance } from './pixel-allowance-state.svelte';
import { getTurnstileState } from '$lib/features/turnstile/turnstile-state.svelte';
import { getContext, setContext } from 'svelte';

export function getPixelBoardState() {
	let pixelBoardState: PixelBoardState = getContext('pixel-board');

	if (!pixelBoardState) {
		pixelBoardState = new PixelBoardState();
		setContext('pixel-board', pixelBoardState);
	}

	return pixelBoardState;
}

export class PixelBoardState {
	// Retrieve data for rendering the current board
	boardQuery = getBoardQuery();

	// Stream updates to the board
	socketState: SocketState = getPixelStreamQuery(
		(position: number, color: number) => (this.boardPixels[position] = color)
	);

	// Prepare to create pixels
	createPixelMutation = createPixelQuery();

	// How many pixels should be in the rows and columns of the board
	boardRows = $derived(this.boardQuery.data?.width ?? 0);
	boardColumns = $derived(this.boardQuery.data?.height ?? 0);

	// Whether to render the board. Must be ready for live updates
	loading = $derived(this.socketState.isConnecting || this.boardQuery.isLoading);

	// Whether an error exists in the presentational state
	error = $derived(this.boardQuery.error || this.socketState.error);

	ready = $derived(this.boardQuery.isSuccess && this.socketState.isConnected);

	// The board's pixels to render
	boardPixels: number[] = $state([]);

	// The color that the user has selected to paint with
	selectedColor: number = $state(1);

	constructor() {
		const turnstileState = getTurnstileState();

		turnstileState.sessionEvent.addEventListener('sessionSuccess', () => {
			this.socketState.socket.reconnect();
			this.boardQuery.refetch();
		});

		// Build the boardPixels array whenever the boardQuery reruns. Typically only uses first run
		$effect(() => {
			if (this.boardQuery.isSuccess && this.boardQuery.data) {
				const temp = new Array(this.boardRows * this.boardColumns).fill(0);
				for (const pixel of this.boardQuery.data.pixels) {
					temp[pixel.position] = pixel.color;
				}
				this.boardPixels = temp;
			}
		});
	}

	async createPixel(position: number, pixelAllowance: PixelAllowance) {
		// prevent multiple parallel pixel placements
		if (this.createPixelMutation.isPending) {
			return;
		}

		if (!pixelAllowance.canPlace) {
			return;
		}

		// don't place pixels that are already that color
		if (this.boardPixels[position] === this.selectedColor) {
			return;
		}

		// Tell server to create the pixel
		const response = await this.createPixelMutation.mutateAsync({
			position,
			color: this.selectedColor,
			boardId: this.boardQuery.data?.id!
		});

		if (response.success) {
			// Deduct 1 pixel
			pixelAllowance.deduct();
		}
	}
}
