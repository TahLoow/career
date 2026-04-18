<script>
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
	import scrobbleDiagram from './images/scrobble-diagram.png';
	import banner from './images/banner.png';
</script>

<BannerImage src={banner} alt="" />

<div class="prose mb-2 self-center md:w-3/5">
	<h1>Project: Music Scrobbler</h1>
	<hr class="hr" />

	The music "scrobbler" is a widget that shows the music I've most recently, or currently am,
	listening to. I like listening to music, and although my taste isn't everyone's appetite, I wanted
	to share it on my site. Plus, it seemed like it'd be fun to make (it was)!

	<h2>The Streaming Platform: Tidal</h2>

	<p>
		I use <a href="https://www.tidal.com">Tidal</a> to stream music. They don't provide any embeds for
		what I'm looking for, so I had to make my own component and integration. They do have an API, but
		it was missing some essential information, like album cover art and play history.
	</p>

	<h2>The Scrobbler: Last.fm</h2>

	<p>
		<a href="https://www.last.fm">Last.fm</a> is a music tracking and analytics service. They integrate
		with major streaming services like Spotify, Tidal, and SoundCloud. Once I connected my Tidal account
		to Last.fm, all Tidal tracks I listened to were immediately sent over to Last.fm. A record of a listen
		is called a "scrobble", per Last.fm. I thus began scrobbling.
	</p>

	<h2>The API</h2>

	<p>
		Last.fm has one API method, <code>user.getrecenttracks</code>, that got all of the data I
		needed: the most recent track, whether it's currently playing or not, and the album art. I used
		my Hono Cloudflare Worker as an interface to this API method. I also added an IP rate limiter to
		prevent typical single-origin IP spam.
	</p>

	<h2>Architecture</h2>
	<p>
		This was a simple project building off of my existing stack, so the architecture was
		straightforward.
	</p>

	<div class="captioned-image">
		<ImageUnderlay
			src={scrobbleDiagram}
			alt="Image of the architectural diagram"
			class="h-[400px]"
		/>
		<p>Architecture Diagram</p>
	</div>

	<h2>The Component</h2>
	<p>
		I had to make the component from scratch, including the design. This was an iterative process,
		and I landed on a sleek, collapsible design with ambient, pulsing bars resembling soundwaves. My
		wife introduced me to glassmorphism, which I think looks very cool, so I went with that. It's my
		favorite design so far. Thanks for reading!
	</p>
</div>
