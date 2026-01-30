<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
	import { ComputerIcon, MoonIcon, SunIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export const modes = {
		system: 'system',
		light: 'light',
		dark: 'dark'
	} as const;
	type Mode = keyof typeof modes;

	let mode: Mode = $state(modes.system);

	onMount(() => {
		const userModeDefined = localStorage.getItem('mode') as Mode;

		updateDocument();

		mode = userModeDefined;
	});

	function updateDocument() {
		const storedMode = localStorage.getItem('mode') as Mode;

		if (storedMode && storedMode in modes) {
			document.documentElement.setAttribute('data-mode', storedMode);
		} else {
			throw new Error('Invalid mode value: ' + mode);
		}
	}

	function handleValueChange({ value }: { value: string | null }) {
		if (value && value in modes) {
			localStorage.setItem('mode', value);
		} else {
			throw new Error('Invalid mode value: ' + mode);
		}

		updateDocument();

		mode = value as Mode;
	}
</script>

<svelte:head>
	<script>
		if (localStorage.getItem('mode')) {
			document.documentElement.setAttribute('data-mode', localStorage.getItem('mode'));
		}
	</script>
</svelte:head>

<SegmentedControl defaultValue="system" value={mode} onValueChange={handleValueChange}>
	<SegmentedControl.Control class="border-surface-300-700 p-1">
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
