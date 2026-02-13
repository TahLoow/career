export const PIXEL_COLORS: string[] = [
	'transparent',
	'#1a1417',
	'#4b2f29',
	'#af4b3b',
	'#c18549',
	'#ebdcbd',
	'#8db35e',
	'#7c8381',
	'#384d64'
] as const;

// Color code for transparent cells
export const TRANSPARENT_COLOR = PIXEL_COLORS.findIndex((i) => i === 'transparent');
