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
		queryFn: async () => (await (await fetch('http://localhost:8787/boards')).json()).result[0]
	}));
}
