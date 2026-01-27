<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import { MoonIcon, SunIcon } from '@lucide/svelte';

	let checked = $state(false);

	$effect(() => {
		const mode = localStorage.getItem('mode') || 'light';
		checked = mode === 'dark';
	});

	const onCheckedChange = (event: { checked: boolean }) => {
		const mode = event.checked ? 'dark' : 'light';
		document.documentElement.setAttribute('data-mode', mode);
		localStorage.setItem('mode', mode);
		checked = event.checked;
	};
</script>

<svelte:head>
	<script>
		document.documentElement.setAttribute('data-mode', localStorage.getItem('mode') || 'dark');
	</script>
</svelte:head>

<Switch {checked} {onCheckedChange}>
	<Switch.Control class="bg-primary-400 dark:bg-primary-700">
		<Switch.Thumb>
			<Switch.Context>
				{#snippet children(switch_)}
					{#if switch_().checked}
						<MoonIcon class="size-3" />
					{:else}
						<SunIcon class="size-3" />
					{/if}
				{/snippet}
			</Switch.Context>
		</Switch.Thumb>
	</Switch.Control>
	<Switch.HiddenInput />
</Switch>
