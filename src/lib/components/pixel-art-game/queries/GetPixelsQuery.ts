import { createQuery, type CreateQueryResult } from '@tanstack/svelte-query';
import type { Board } from './GetBoardQuery';
import { env } from '$env/dynamic/public';

export type Pixels = {
	position: number;
	color: number;
};

export function getPixelsQuery(getBoardsQuery: CreateQueryResult<Board, Error>) {
	// Second query: get projects, but only after userId is available
	const pixelsQuery = createQuery<Pixels[]>(() => ({
		queryKey: ['projects'],
		queryFn: async () =>
			(await (await fetch('http://localhost:8787/boards/1')).json()).result.pixels,
		enabled: !!getBoardsQuery.data // Query will not run until boards are present
	}));
	return pixelsQuery;
}
