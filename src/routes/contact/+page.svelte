<script lang="ts">
	import {
		ArrowDownIcon,
		ArrowLeftIcon,
		ArrowRightIcon,
		MailIcon,
		PhoneIcon,
		SmileIcon,
		StickerIcon
	} from '@lucide/svelte';
	import { createToaster, Toast } from '@skeletonlabs/skeleton-svelte';

	async function handleCopy() {
		await navigator.clipboard.writeText('macleanp98@gmail.com');
		toaster.info({ description: 'Copied to clipboard!' });
	}

	const toaster = createToaster({
		placement: 'top'
	});
</script>

<svelte:head>
	<title>Paul - Contact</title>
	<meta name="Contact" content="Getting in contact with me" />
</svelte:head>

<div class="flex w-full justify-center">
	<div class="card bg-surface-200-800 mt-8 w-full flex-col px-3 py-6 sm:w-2/3 sm:px-8">
		<h1 class="font-accent pb-4 text-5xl font-bold italic">Contact</h1>

		<div class="prose mb-4">
			<p>I'd love to talk. Reach out!</p>
			<p>May take up to 48 hours to see your email, but I check it regularly.</p>
		</div>

		<div class="mb-4 inline-flex w-full justify-center gap-4 sm:hidden">
			<ArrowDownIcon />
			<ArrowDownIcon />
		</div>

		<div class="inline-flex w-full items-center justify-center gap-4">
			<ArrowRightIcon class="hidden sm:block" />
			<button
				class="btn preset-tonal inline-flex items-center self-center font-mono select-auto"
				onclick={handleCopy}
			>
				<MailIcon class="mr-1 h-4 select-none" />
				macleanp98@gmail.com
			</button>
			<ArrowLeftIcon class="hidden sm:block" />
		</div>
	</div>
</div>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title class="inline-flex items-center gap-2 text-xl"
					>Copied to clipboard <StickerIcon /></Toast.Title
				>
				<Toast.Description>Hear from you soon!</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
