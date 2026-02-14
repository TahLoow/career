import type PartySocket from 'partysocket';
import { createPixelQuery } from './queries/CreatePixelQuery';
import { getBoardQuery } from './queries/GetBoardQuery';
import { getPixelStreamQuery, type SocketState } from './queries/StreamPixelUpdates.svelte';
import type { PixelAllowance } from './pixel-allowance-state.svelte';

// User can place more pixels after this period
const PIXEL_BALANCE_REFRESH_PERIOD_SECONDS = 60 * 2 * 0.1; // 2 minutes

// User can place this many pixels per period
const PIXELS_PER_PERIOD = 3;

export class PixelBoardState {
	// Retrieve data for rendering the current board
	boardQuery = getBoardQuery();

	// Stream updates to the board
	socketState: SocketState = getPixelStreamQuery(
		(position: number, color: number) => (this.boardPixels[position] = color)
	);

	// Prepare to create pixels
	createPixelMutation = createPixelQuery(this.boardQuery.data?.id!);

	// How many pixels should be in the rows and columns of the board
	boardRows = $derived(this.boardQuery.data?.width ?? 0);
	boardColumns = $derived(this.boardQuery.data?.height ?? 0);

	// Dimensions of the user-displayed board container. Keep aspect ratio of board
	containerX = 700;
	containerY = $derived((this.boardColumns / this.boardRows) * this.containerX);

	// Whether to render the board. Must be ready for live updates
	loading = $derived(this.socketState.isConnecting || this.boardQuery.isLoading);

	// Whether an error exists in the presentational state
	error = $derived(this.boardQuery.error || this.socketState.error);

	// The board's pixels to render
	boardPixels: number[] = $state([]);

	// The color that the user has selected to paint with
	selectedColor: number = $state(1);

	constructor() {
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
		if (this.createPixelMutation.isPending) {
			return;
		}

		if (pixelAllowance.canPlace && this.boardPixels[position] !== this.selectedColor) {
			try {
				// Tell server to create the pixel
				await this.createPixelMutation.mutateAsync({ position, color: this.selectedColor });
				// Deduct 1 pixel
				pixelAllowance.deduct();
			} catch (error) {
				console.error(error);
			}
		}
	}
}
