import { createQuery, type CreateQueryResult } from '@tanstack/svelte-query';
import type { Board } from './GetBoardQuery';
import { env } from '$env/dynamic/public';

export type Pixels = {
	position: number;
	color: number;
};

// Get pixels, but only after getBoardsQuery got data
export function getPixelsQuery(getBoardsQuery: CreateQueryResult<Board, Error>) {
	const pixelsQuery = createQuery<Pixels[]>(() => ({
		queryKey: ['pixels'],
		queryFn: async () =>
			(await (await fetch(`${env.PUBLIC_API_URL}/boards/1`)).json()).result.pixels,
		enabled: !!getBoardsQuery.data // Query will not run until boards are present
	}));
	return pixelsQuery;
}
