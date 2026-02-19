import { createMutation } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';
import { getTurnstileState } from '$lib/features/turnstile/turnstile-state.svelte';

export type PixelCreated = {
	success: boolean;
	result: null;
};

export type CreatePixelVariables = {
	position: number;
	color: number;
	boardId: number;
};

// Create a pixel
export function createPixelQuery() {
	const turnstile = getTurnstileState();

	return createMutation<PixelCreated, Error, CreatePixelVariables>(() => ({
		queryKey: ['pixels'],
		mutationFn: (variables: CreatePixelVariables): Promise<PixelCreated> =>
			turnstile.authFetch(
				fetch(`${env.PUBLIC_API_URL}/boards/${variables.boardId}/pixels`, {
					method: 'POST',
					headers: {
						['Content-Type']: 'json'
					},
					body: JSON.stringify({
						position: variables.position,
						color: variables.color
					}),
					credentials: 'include'
				}).then((res) => res.json())
			),
		enabled: false, // Query will not run until manually requested
		retry: false
	}));
}
