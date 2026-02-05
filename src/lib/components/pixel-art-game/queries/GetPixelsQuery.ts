import { createQuery, type CreateQueryResult } from '@tanstack/svelte-query';
import type { Board } from './GetBoardQuery';
import { env } from '$env/dynamic/public';

export type Pixels = {
	position: number;
	color: number;
};

// Get pixels, but only after getBoardsQuery got data
export function getPixelsQuery(getBoardsQuery: CreateQueryResult<Board, Error>) {
	return createQuery<Pixels[]>(() => ({
		queryKey: ['pixels'],
		queryFn: () =>
			fetch(`${env.PUBLIC_API_URL}/boards/1`)
				.then((res) => res.json())
				.then((data) => data.result.pixels),
		enabled: !!getBoardsQuery.data, // Query will not run until boards are present
		retry: false
	}));
}
