import { beforeNavigate } from '$app/navigation';
import { page } from '$app/state';
import { sleep } from '$lib/utils';

// Reroutes the user if this function is called in more than one tab. Prevents duplicate tabs from being open
export async function blockConcurrentTabs(route: string, redirect: string) {
	const channel = new BroadcastChannel(`${route}-${redirect}`);

	// Listen for messages from other tabs
	channel.onmessage = (event) => {
		// if user has navigated away from the original route, disregard any pings
		if (page.route.id !== route) {
			return;
		}

		if (event.data === 'PING') {
			// An existing tab hears a new tab opening
			channel.postMessage('PONG');
		} else if (event.data === 'PONG') {
			// This tab just opened and found another one already active
			window.location.href = redirect; // Redirect
		}
	};

	// Unsubscribe to messages when navigating away
	beforeNavigate(() => {
		channel.onmessage = () => undefined;
	});

	// Broadcast presence immediately on load
	channel.postMessage('PING');

	// Hail mary delay to prevent timers from starting before the channel replies
	return sleep(200);
}
