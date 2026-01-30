<script lang="ts">
	import { SegmentedControl, Switch } from '@skeletonlabs/skeleton-svelte';
	import { ComputerIcon, MoonIcon, SunIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export const modes = {
		system: 'system',
		userLight: 'light',
		userDark: 'dark'
	};
	type Mode = keyof typeof modes;

	let mode: Mode = $state('system');

	let darkChecked = $state(false);

	// $derived.by(() => {
	// 	const modeOverride = localStorage.getItem('mode');

	// 	if (modeOverride) {
	// 		document.documentElement.setAttribute(
	// 			'data-mode',
	// 			modeOverride === 'dark' ? 'dark' : 'light'
	// 		);
	// 	} else {
	// 		const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	// 		if (systemDarkMode) {
	// 		}
	// 	}
	// });

	// onMount(() => {
	// 	const userModeDefined = localStorage.getItem('mode');

	// 	if (userModeDefined) {
	// 		const userMode = localStorage.getItem('mode');
	// 		darkChecked = userMode === 'dark';
	// 		document.documentElement.setAttribute('data-mode', userMode!);
	// 		console.log('using user set mode: ' + darkChecked);
	// 	} else {
	// 		darkChecked = window.matchMedia('(prefers-color-scheme: dark)').matches;
	// 		document.documentElement.setAttribute('data-mode', 'system');
	// 		console.log('using system mode:' + darkChecked);
	// 	}

	// 	console.log(darkChecked);
	// });

	const handleValueChange = ({ value }: { value: string | null }) => {
		console.log(value);

		if (value === 'system') {
			console.log('deleting localstorage selection');
			localStorage.removeItem('mode');
			document.documentElement.setAttribute('data-mode', 'system');
		} else if (value === 'light' || value === 'dark') {
			localStorage.setItem('mode', value);
			document.documentElement.setAttribute('data-mode', value);
		} else {
			console.error('Invalid mode value: ' + mode);
		}

		mode = value as Mode;
	};
</script>

<svelte:head>
	<script>
		if (localStorage.getItem('mode')) {
			document.documentElement.setAttribute('data-mode', localStorage.getItem('mode'));
		}
	</script>
</svelte:head>

<SegmentedControl defaultValue="system" value={mode} onValueChange={handleValueChange}>
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item class="w-4" value="system" title="system" aria-label="system">
			<SegmentedControl.ItemText>
				<ComputerIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item class="w-4" value="light" title="light" aria-label="light">
			<SegmentedControl.ItemText>
				<SunIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item class="w-4" value="dark" title="dark" aria-label="dark">
			<SegmentedControl.ItemText>
				<MoonIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
