import { createTreeViewCollection } from '@skeletonlabs/skeleton-svelte';
import endTablesBannerImage from './end-tables/images/banner.png';
import pixelBoardBannerImage from './pixel-board/images/banner.png';
import thisSiteBannerImage from './this-site/images/banner.png';
import fishBannerImage from './fish-wall-ornaments/images/banner.jpg';

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
						name: 'This Site',
						bannerImage: thisSiteBannerImage,
						description: 'A walk-through of how I made this site: tools, platforms, and sundries'
					},
					{
						id: 'software-projects/pixel-board',
						route: '/posts/pixel-board',
						name: 'Pixel Board',
						bannerImage: pixelBoardBannerImage,
						description:
							'A realtime, collaborative, authenticated minigame. Contribute one pixel at a time'
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
					},
					{
						id: 'wood-projects/end-tables',
						route: '/posts/fish-wall-ornaments',
						name: 'Fish Wall Ornaments',
						description: `A miniature project- a school of red oak fish, as a birthday gift`,
						bannerImage: fishBannerImage
					}
				]
			}
		]
	}
});
