<script lang="ts">
	import { FileIcon, FolderIcon } from '@lucide/svelte';
	import { TreeView, createTreeViewCollection } from '@skeletonlabs/skeleton-svelte';

	interface Node {
		id: string;
		name: string;
		children?: Node[];
	}

	const collection = createTreeViewCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'wood-projects',
					name: 'Wood Projects',
					children: [
						{
							id: 'wood-projects/crokinole-game-boards',
							name: 'Crokinole Game Boards'
						},
						{
							id: 'wood-projects/faux-violin',
							name: 'Faux Violin'
						},
						{
							id: 'wood-projects/end-tables',
							name: 'End Tables'
						},
						{
							id: 'wood-projects/kiwi-table',
							name: 'Kiwi Table'
						},
						{
							id: 'wood-projects/cutting-boards',
							name: 'Cutting Boards'
						}
					]
				},
				{
					id: 'software-projects',
					name: 'Software Projects',
					children: [
						{
							id: 'software-projects/nas-backup',
							name: 'NAS Backup Scheme'
						},
						{
							id: 'software-projects/pi-hole',
							name: 'Pi-Hole'
						},
						{
							id: 'software-projects/this-site',
							name: 'This Site'
						}
					]
				}
			]
		}
	});
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<div class="pt-4 pb-2">
		<h1 class="font-accent text-5xl font-bold italic">Projects</h1>
	</div>

	<p class="mb-4">
		Click into folders to see my projects. They're also located on the welcome page.
	</p>

	<TreeView {collection}>
		<TreeView.Label>All Projects</TreeView.Label>
		<TreeView.Tree>
			{#each collection.rootNode.children || [] as node, index (node)}
				{@render treeNode(node, [index])}
			{/each}
		</TreeView.Tree>
	</TreeView>

	{#snippet treeNode(node: Node, indexPath: number[])}
		<TreeView.NodeProvider value={{ node, indexPath }}>
			{#if node.children}
				<TreeView.Branch>
					<TreeView.BranchControl>
						<TreeView.BranchIndicator />
						<TreeView.BranchText>
							<FolderIcon class="size-4" />
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
					<FileIcon class="size-4" />
					{node.name}
				</TreeView.Item>
			{/if}
		</TreeView.NodeProvider>
	{/snippet}
</div>
