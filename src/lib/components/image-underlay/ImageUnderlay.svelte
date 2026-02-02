<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	type Props = {
		src: string;
		alt: string;
		class?: string;
	};

	const animation =
		'transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0';

	const { src, alt, class: _class = '' }: Props = $props();
</script>

<div class="relative flex w-full items-center justify-center overflow-hidden rounded-lg {_class}">
	<img
		{src}
		{alt}
		class="absolute inset-0 h-full w-full scale-110 object-cover blur-xl brightness-80 select-none"
		aria-hidden="true"
	/>
	<img {src} {alt} class="relative max-h-full max-w-full object-contain" />
	<Dialog>
		<Dialog.Trigger class="hover:bg-surface-950/10 absolute z-10 h-full w-full"></Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop class="bg-surface-50-950/50 fixed inset-0 z-50" />
			<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<Dialog.Content
					class="card bg-surface-100-900 flex h-[90dvh] w-[70vw] flex-col space-y-4 p-4 shadow-xl {animation}"
				>
					<header class="flex shrink-0 items-center justify-between">
						<Dialog.Title class="text-lg font-bold">{alt}</Dialog.Title>
						<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
							<XIcon class="size-4" />
						</Dialog.CloseTrigger>
					</header>
					<Dialog.Description class="w-full flex-1 overflow-auto">
						<img {src} {alt} class="h-full w-full object-scale-down" />
					</Dialog.Description>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</div>
