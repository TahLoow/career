import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		postMeta: {
			name: 'End Tables'
		}
	};
};
