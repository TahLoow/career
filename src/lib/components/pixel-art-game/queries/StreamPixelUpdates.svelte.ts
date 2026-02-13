import { env } from '$env/dynamic/public';
import PartySocket from 'partysocket';

interface SocketState {
	error: Error | null;
	isConnecting: boolean;
	isConnected: boolean;
}

// Retrieve pixel updates live, and call onUpdate callback
export function getPixelStreamQuery(onUpdate: (position: number, color: number) => any) {
	// State-friendly representation of the most essential things I need to track
	let socketState = $state<SocketState>({
		error: null,
		isConnecting: true,
		isConnected: false
	});

	// Establish websocket
	const socket = new PartySocket({
		host: env.PUBLIC_API_URL,
		party: env.PUBLIC_SOCKET_PARTY,
		room: env.PUBLIC_SOCKET_ROOM
	});

	// Use update callback to update local board pixels
	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		onUpdate(data.position, data.color);
	};

	// State updaters, so I don't need another package
	socket.onopen = () => {
		socketState.isConnected = true;
		socketState.isConnecting = false;
	};

	socket.onclose = () => {
		socketState.isConnected = false;
		socketState.isConnecting = false;
	};

	socket.onerror = (event) => {
		socketState.error = event.error;
		console.error(event.error);
	};

	return { socket, socketState };
}
