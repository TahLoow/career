<script lang="ts">
	import { Toast } from '@skeletonlabs/skeleton-svelte';
	import { notificationService } from './notification.service.svelte';
	import { CircleAlertIcon, SmileIcon, StickerIcon, TriangleAlertIcon } from '@lucide/svelte';

	type IconTypes = 'success' | 'error' | 'loading' | 'info' | 'warning';

	const x = StickerIcon;
</script>

{#snippet typeIcon(type: IconTypes)}
	{#if type === 'error'}
		<TriangleAlertIcon class="size-5" />
	{:else if type === 'success'}
		<SmileIcon class="size-5" />
	{:else if type === 'warning'}
		<CircleAlertIcon class="size-5" />
	{/if}
{/snippet}

<Toast.Group toaster={notificationService}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title class="inline-flex items-center gap-2 text-xl">
					<div class="inline-flex flex-wrap items-center gap-2">
						{#if toast?.meta?.icon}
							<!-- Render custom icon -->
							{@render toast.meta.icon()}
						{:else}
							<!-- Otherwise render default icon -->
							{@render typeIcon(toast.type as IconTypes)}
						{/if}
						{toast.title}
					</div>
				</Toast.Title>
				<Toast.Description>
					{toast.description}
				</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>

<!-- Notifications, up to a max (so the screen isn't bloated) -->
<!-- {#each notificationService.notifications as notification, i (notification.id)}
			{#if i < MAX_NOTIFICATIONS}
				<Alert
					title={notification.title}
					message={notification.message}
					closeTimeout={notification.duration}
					variant={notification.variant}
					onClose={() => notificationService.closeNotification(notification.id)}
				/>
			{/if}
		{/each} -->
