import { browser } from '$app/environment';

export class LocalStore<T> {
	key = '';
	value = $state<T>() as T;

	constructor(key: string, defaultValue: T) {
		this.key = key;
		this.value = defaultValue;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, this.serialize(this.value));
		});

		window.addEventListener('storage', (event) => {
			// You can perform actions based on the specific key that changed
			if (event.key === key && event.newValue !== event.oldValue) {
				// Update UI or state in this window
				this.value = this.deserialize(event.newValue as string);
			}
		});
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T {
		return JSON.parse(item);
	}

	erase() {
		localStorage.removeItem(this.key);
	}
}

export function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value);
}
