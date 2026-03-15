<script>
	import fishBevel from './images/fish-bevel.png';
	import bandsawCutout from './images/bandsaw-cutout.jpg';
	import fishLineup from './images/fish-lineup.jpg';
	import twoFish from './images/two-fish.jpg';
	import banner from './images/banner.jpg';
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
</script>

<BannerImage src={banner} alt="" />

<div class="prose self-center md:w-3/5">
	<h1>Wood Project: Fish Wall Ornaments</h1>
	<hr class="hr" />

	<p>
		My sister wanted a fun piece of decor for her birthday, similar to something she saw in a Philly
		coffee shop. My other sister, Erica and her fiance Tom, helped me put these fun fellas together.
	</p>

	<h2>Material</h2>
	<p>
		We made six fish, all cut from one board of upcycled wood from
		<a href="https://share.google/IVv3RtttVtKqwr6sm">Construction Junction</a>. It was labelled al
		miscellenous timber, but it looks to me like red oak.
	</p>

	<h2>Construction</h2>

	<h4>Cutouts</h4>
	<p>
		After agreeing on the desired shape, we cut the board into equal-length blocks that fit the
		design. We used the bandsaw to cut one fish as a template.
	</p>

	<div class="captioned-image">
		<ImageUnderlay
			src={bandsawCutout}
			alt="Image of us bandsawing the first fish"
			class="h-[400px]"
		/>
		<p>Bandsawing the first fish</p>
	</div>

	<p>We traced the template onto each block, and cut out the remaining fish.</p>

	<div class="captioned-image">
		<ImageUnderlay src={twoFish} alt="Image of two roughly cutout fish" class="h-[400px]" />
		<p>Two roughly cutout fish</p>
	</div>

	<h4>Bevels</h4>

	<p>
		I wanted some depth for a little flair. So, I used my hand plane to bevel the edges of the fish
		body up to the nose. It's subtle (moreso in a picture), but adds character.
	</p>

	<div class="captioned-image">
		<ImageUnderlay src={fishBevel} alt="Image of adding a bevel accent" class="h-[400px]" />
		<p>Adding a bevel accent</p>
	</div>

	<h2>Finishing</h2>

	<h4>Finish Sanding</h4>
	<p>
		We used the benchtop belt sander to clean up the edges of the fish. We made the tail's
		circumference large enough to cup the top of sander, so we could easily sand all of the concave
		and convex surfaces with one tool. Finally, we hit them with a random orbital sander, and
		applied a polyeurethane coat.
	</p>

	<div class="captioned-image">
		<ImageUnderlay src={fishLineup} alt="Image of unfinished fish" class="h-[400px]" />
		<p>Six fish, ready for sealing</p>
	</div>

	<h4>Staining and Sealing</h4>
	<p>
		I've been losing interest in oil-based stains and top-coats, but I still have a hardy supply. I
		applied two different MinWax stains (red oak + cherry) stains to draw out the reddish tones, and
		finished with ZAR matte polyeurethane.
	</p>

	<div class="captioned-image">
		<ImageUnderlay src={fishLineup} alt="Image of unfinished fish" class="h-[400px]" />
		<p>Six fish, ready for sealing</p>
	</div>

	<p>
		At the time of writing, she hasn't received them. Hopefully she doesn't see this post and enjoys
		them!
	</p>

	<div class="captioned-image">
		<ImageUnderlay src={banner} alt="Six fish, stained and ready for sealing" class="h-[400px]" />
		<p>Six fish, stained and ready for sealing</p>
	</div>

	<p>As always, thank you for reading!</p>
</div>
