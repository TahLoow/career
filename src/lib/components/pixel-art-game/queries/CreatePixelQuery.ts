import { createMutation, createQuery, type CreateQueryResult } from '@tanstack/svelte-query';
import type { Board } from './GetBoardQuery';
import { env } from '$env/dynamic/public';
import { sleep } from '$lib/utils';

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
	return createMutation<PixelCreated, Error, CreatePixelVariables>(() => ({
		queryKey: ['pixels', boardId],
		mutationFn: (variables: CreatePixelVariables): Promise<PixelCreated> =>
			fetch(`${env.PUBLIC_API_URL}/boards/1/pixels`, {
				method: 'POST',
				headers: { ['Content-Type']: 'json' },
				body: JSON.stringify(variables)
			})
				.then((res) => res.json())
				.then(async (data) => {
					await sleep(1000);
					return data;
				}),
		enabled: false, // Query will not run until boards are present
		retry: false
	}));
}
