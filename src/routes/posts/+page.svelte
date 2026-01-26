<script lang="ts">
	import { goto } from '$app/navigation';
	import { BriefcaseBusinessIcon, RocketIcon } from '@lucide/svelte';
	import { TreeView, useTreeView } from '@skeletonlabs/skeleton-svelte';
	import { allPosts, type PostNode } from './all-posts';

	// Create a controlled treeView object, so we can control it. Specifically, so we can
	// expand all nodes by default
	const treeView = useTreeView({
		id: 'posts-tree',
		collection: allPosts,
		defaultExpandedValue: allPosts.flatten().map((node) => node.id)
	});
</script>

<svelte:head>
	<title>Paul - Projects</title>
	<meta name="Projects" content="Projects I've worked on" />
</svelte:head>

<div class="card bg-surface-200-800 mt-8 w-2/3 flex-col px-8 py-6">
	<h1 class="font-accent pb-4 text-5xl font-bold italic">Projects</h1>

	<p class="mb-4">
		Click into folders to see my projects. They're also located on the welcome page.
	</p>

	<TreeView.Provider value={treeView} class="ml-4">
		<TreeView.Tree>
			{#each allPosts.rootNode.children || [] as node, index (node)}
				{@render treeNode(node, [index])}
			{/each}
		</TreeView.Tree>
	</TreeView.Provider>

	{#snippet treeNode(node: PostNode, indexPath: number[])}
		<TreeView.NodeProvider value={{ node, indexPath }}>
			{#if node.children}
				<TreeView.Branch>
					<TreeView.BranchControl>
						<TreeView.BranchIndicator />
						<TreeView.BranchText>
							<BriefcaseBusinessIcon class="size-4" />
							{node.name}
						</TreeView.BranchText>
					</TreeView.BranchControl>
					<TreeView.BranchContent>
						<TreeView.BranchIndentGuide />
						{#each node.children as childNode, childIndex (childNode)}
							{@render treeNode(childNode, [...indexPath, childIndex])}
						{/each}
					</TreeView.BranchContent>
				</TreeView.Branch>
			{:else}
				<TreeView.Item>
					<a
						href={node.route}
						class="inline-flex grow items-center gap-2"
						onclick={() => goto(node.route!)}
					>
						<RocketIcon class="size-4" />
						{node.name}
					</a>
				</TreeView.Item>
			{/if}
		</TreeView.NodeProvider>
	{/snippet}
</div>
