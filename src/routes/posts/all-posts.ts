import { createTreeViewCollection } from '@skeletonlabs/skeleton-svelte';
import endTablesBannerImage from './end-tables/images/banner.png';

export interface PostNode {
	id: string;
	route?: string;
	name: string;
	bannerImage?: string;
	description?: string;
	children?: PostNode[];
}

export const allPosts = createTreeViewCollection<PostNode>({
	nodeToValue: (node) => node.id,
	nodeToString: (node) => node.name,
	rootNode: {
		id: 'root',
		name: '',
		children: [
			{
				id: 'software-projects',
				name: 'Software Projects',
				children: [
					{
						id: 'software-projects/this-site',
						route: '/posts/this-site',
						name: 'This Site!',
						description: 'Read more about how I made this site!'
					}
				]
			},
			{
				id: 'wood-projects',
				name: 'Wood Projects',
				children: [
					{
						id: 'wood-projects/end-tables',
						route: '/posts/end-tables',
						name: 'End Tables',
						description: `A set of maple tables, for my mom's birthday. You would not believe how easy it was.`,
						bannerImage: endTablesBannerImage
					}
				]
			}
		]
	}
});
