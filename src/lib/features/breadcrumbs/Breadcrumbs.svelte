<script lang="ts">
	export type Crumb = {
		label: string;
		href?: string; // omit for current page
	};

	type Props = {
		items: Crumb[];
	};

	const { items }: Props = $props();
</script>

{#if items.length > 1}
	<nav aria-label="Breadcrumb" class="mb-4 text-lg">
		<ol class="text-surface-600 dark:text-surface-300 flex flex-wrap items-center gap-2">
			{#each items as item, i}
				<li class="flex items-center gap-2">
					{#if i > 0}
						<span class="text-surface-400 dark:text-surface-500">/</span>
					{/if}

					{#if item.href && i !== items.length - 1}
						<a
							href={item.href}
							class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
						>
							{item.label}
						</a>
					{:else}
						<span aria-current="page" class="text-surface-900 dark:text-surface-50 font-medium">
							{item.label}
						</span>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}
