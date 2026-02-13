<script>
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
	import banner from './images/banner.png';
</script>

<BannerImage src={banner} alt="" />

<div class="prose mb-2 self-center md:w-3/5">
	<h1>Software Project: Pixel Board</h1>
	<hr class="hr" />

	<h2>What</h2>
	<p>
		The "pixel board" is an anonymous, collaborative, realtime drawing experiment. Visitors can
		place a couple pixels to alter the design of the board.
	</p>
</div>
