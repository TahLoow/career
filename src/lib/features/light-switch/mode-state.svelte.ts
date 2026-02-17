export const modes = {
	system: 'system',
	light: 'light',
	dark: 'dark'
} as const;
export type Mode = keyof typeof modes;

export let mode: Mode = $state(modes.system);

export function getModeState() {
	return mode;
}
