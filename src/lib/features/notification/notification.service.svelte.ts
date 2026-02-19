import { createToaster } from '@skeletonlabs/skeleton-svelte';

export const notificationService = createToaster({
	placement: 'bottom-end',
	max: 3
});
