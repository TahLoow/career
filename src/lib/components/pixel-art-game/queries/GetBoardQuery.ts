import { createQuery } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';
import { getTurnstileState } from '$lib/features/turnstile/turnstile-state.svelte';

export type Pixel = {
	position: number;
	color: number;
};

export type Board = {
	id: number;
	width: number;
	height: number;
	pixels: Pixel[];
};

export function getBoardQuery() {
	const turnstile = getTurnstileState();
	return createQuery<Board>(() => ({
		queryKey: ['board'],
		queryFn: () => {
			return turnstile.authFetch(
				fetch(`${env.PUBLIC_API_URL}/boards`, { credentials: 'include' })
					.then((res) => res.json())
					.then((data) => data.result)
			);
		},
		retry: false,
		enabled: false
	}));
}
