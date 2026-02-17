<script lang="ts">
	import { CircleAlertIcon, SmileIcon, TriangleAlertIcon } from '@lucide/svelte';
	import type { AlertVariant } from '../notification/notification.types';

	/**
	 * This component displays an alert within any container. It can
	 * display a title, message beneath the title, and variant (error/success/warning)
	 * The variant determines the base color and icon that is displayed.
	 */

	interface Props {
		title?: string; // emphasized text for the viewer
		message?: string; // detailed message for the viewer
		onClose?: () => void; // optional callback to enable manual closing. If not provided, then
		// the notification cannot be manually closed
		variant?: AlertVariant; // presets for color/icon
		closeTimeout?: number; // how long the alert should be present before disappearing
	}

	let { title, message, onClose, variant = 'success', closeTimeout }: Props = $props();

	if (onClose && closeTimeout) {
		setTimeout(onClose, closeTimeout);
	}
</script>

<!-- Alert container -->
<div
	class="js-alert-animation pointer-events-auto flex w-[100%] items-start gap-4 rounded border-l-4 p-4 shadow-md"
>
	<!-- Checkmark icon -->
	<div class="mt-0.5 flex-shrink-0">
		<div class="h-5 w-5">
			{#if variant === 'error'}
				<TriangleAlertIcon />
			{:else if variant === 'success'}
				<SmileIcon />
			{:else if variant === 'warning'}
				<CircleAlertIcon />
			{/if}
		</div>
	</div>

	<!-- Alert content -->
	<div class="flex-1 overflow-auto">
		<h3 class="text-lg font-semibold text-gray-900">
			{title}
		</h3>
		<p class="mt-1 text-sm text-gray-600">
			{message}
		</p>
	</div>

	<!-- Close button -->
	{#if onClose}
		<button
			class="flex-shrink-0 text-gray-400 hover:text-gray-600"
			onclick={onClose}
			aria-label="Close alert"
		>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{/if}
</div>

<style>
	@keyframes smooth-appear {
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
	.js-alert-animation {
		opacity: 0;
		transform: translateY(-10px);
		animation: smooth-appear 0.5s ease forwards;
	}
</style>
