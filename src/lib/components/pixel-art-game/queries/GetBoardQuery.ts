import { createQuery } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';

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
	return createQuery<Board>(() => ({
		queryKey: ['board'],
		queryFn: () => {
			return fetch(`${env.PUBLIC_API_URL}/boards`)
				.then((res) => res.json())
				.then((data) => data.result);
		},
		retry: false
	}));
}
