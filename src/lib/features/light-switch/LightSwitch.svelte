<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
	import { ComputerIcon, MoonIcon, SunIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { getModeState, modes, type Mode } from './mode-state.svelte';

	let mode = getModeState();

	onMount(() => {
		// Get mode from localstorage
		const storedMode = getStoredMode();

		// Assert mode is in localstorage
		updateStoredMode(storedMode);

		// Update control
		mode = storedMode;
	});

	function getStoredMode(): Mode {
		return (localStorage.getItem('mode') || modes.system) as Mode;
	}

	function updateStoredMode(newMode?: Mode): void {
		if (newMode && modes[newMode]) {
			// Remember this mode via localstorage
			localStorage.setItem('mode', newMode);

			// Update the document whenever the mode changes
			document.documentElement.setAttribute('data-mode', newMode);
		} else {
			throw new Error('Invalid mode value: ' + mode);
		}
	}

	function handleValueChange({ value }: { value: string | null }) {
		// Persist the new value, update the document
		updateStoredMode(value as Mode);

		// Update the control
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
		<SegmentedControl.Indicator class="text-surface-100-900 preset-filled-secondary-800-200" />
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
