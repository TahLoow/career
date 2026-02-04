import { createQuery } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';

export type Board = {
	id: number;
	width: number;
	height: number;
};

export function getBoardQuery() {
	return createQuery<Board>(() => ({
		queryKey: ['board'],
		queryFn: async () => (await (await fetch(`${env.PUBLIC_API_URL}/boards`)).json()).result[0]
	}));
}
