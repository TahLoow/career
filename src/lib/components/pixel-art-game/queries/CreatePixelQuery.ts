import { createMutation } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';
import { getTurnstileState } from '$lib/components/turnstile/turnstile-state.svelte';

export type PixelCreated = {
	success: boolean;
	result: null;
};

export type CreatePixelVariables = {
	position: number;
	color: number;
};

// Create a pixel
export function createPixelQuery(boardId: number) {
	const turnstileState = getTurnstileState();
	console.log(turnstileState.token);

	return createMutation<PixelCreated, Error, CreatePixelVariables>(() => ({
		queryKey: ['pixels', boardId],
		mutationFn: (variables: CreatePixelVariables): Promise<PixelCreated> =>
			fetch(`${env.PUBLIC_API_URL}/boards/1/pixels`, {
				method: 'POST',
				headers: {
					['Content-Type']: 'json'
					// ['CF-Turnstile-Key']: turnstileState.token!
				},
				body: JSON.stringify({
					...variables
				})
			}).then((res) => res.json()),
		enabled: false, // Query will not run until manually requested
		retry: false
	}));
}
