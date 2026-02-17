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

// User can place more pixels after this period
export const PIXEL_BALANCE_REFRESH_PERIOD_SECONDS = 60 * 2 * 0.1; // 2 minutes

// User can place this many pixels per period
export const PIXELS_PER_PERIOD = 3;
