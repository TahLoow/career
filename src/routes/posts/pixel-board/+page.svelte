<script>
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import BannerImage from '$lib/features/posts/banner-image/BannerImage.svelte';
	import banner from './images/banner.png';
	import highLevelDiagram from './images/high-level-diagram.png';
	import erd from './images/erd.png';
	import sessionAuth from './images/session-auth.png';
</script>

<BannerImage src={banner} alt="" />

<div class="prose mb-2 self-center md:w-3/5">
	<h1>Software Project: Pixel Board</h1>
	<hr class="hr" />

	<h2>Overview</h2>
	<p>
		The "pixel board" is an anonymous, collaborative, realtime drawing experiment. Visitors can
		place a couple pixels to alter the design of the board. My sister suggested this to me and I
		took some inspiration from the r/place subreddit. I had fun implementing this in a new
		cloudflare. This post goes over the origin, architecture, and complications with this fun
		project. Read more and learn how to cheat it (a little)! Unfortunately I can't devote my life to
		securing a pixel app, so please be kind.
	</p>

	<h2>Architecture</h2>
	<div class="captioned-image">
		<ImageUnderlay
			src={highLevelDiagram}
			alt="High-level architecture diagram"
			blur={false}
			class="rounded-none"
		/>
		<p>High-level architecture</p>
	</div>
	<p>
		I decided to use Cloudflare since I wanted to try something new + serverless. I started with
		their Hono server + Chanfana swagger tool + D1 (database) template. I ended up changing the
		datasource, but this helped me rough out my data scheme and API schema (available here
		<a href="https://api.paul-maclean.com/">here</a>).
	</p>

	<h3>Schema</h3>
	<div class="captioned-image">
		<ImageUnderlay src={erd} alt="Database schema" blur={false} class="rounded-none" />
		<p>Straightforward database ERD</p>
	</div>

	<p>
		This setup allows me to create multiple boards. The request logic only grabs the most recent
		board, and the most recent pixels. I don't delete overwritten pixels, so that I can generate
		GIFs of pixel placements later on. Whenever I want to create a new board, I simply add a new one
		to the DB.
	</p>

	<h3>Realtime / Websockets</h3>
	<p>
		I hit a snag when I realized that I wanted realtime streaming. Short-polling was an option, but
		would introduce unneeded network traffic, more DB queries, and pixel-update latency. Websockets
		are long-living connections, and can stream updates to clients. Due to the nature of Cloudflare
		workers, I expected multiple to be running in parallel. If each has its own websocket pool, then
		there's a serious chance of clients not getting updates. I needed a centralized, managed pool
		for tracking websockets and broadcasting messages. The solution was a Durable Object with
		Partyserver.
	</p>

	<h4>Durable Objects</h4>
	<p>
		<a href="https://developers.cloudflare.com/durable-objects/">Durable objects</a> are Cloudflare serverless
		primitives. They're globally-unique Javascript (or TS) classes with a SQLite database attached. This
		has three great advantages:
	</p>
	<ol>
		<li>I have one place to pool all of my websocket connections (Partyserver)</li>
		<li>I can reduce DB hits and latency by caching data in the class</li>
		<li>I can cleanly isolate my endpoints from my querying logic</li>
	</ol>
	<p>
		I moved all of my D1 queries into a Durable Object class and bound my worker to a new DO
		definition. This was easy, the hardest part was configuring partyserver to behave. But once I
		got transmissions working from client => worker => DO and back again, I was in the home stretch.
	</p>

	<h2>Security</h2>
	<p>
		As a personal experiment, this app is not built like a fortress. It is exploitable, and here,
		I'll share my reasons for why it is that way. There are two major requirements that make this
		project challenging from a security perspective:
	</p>
	<ol>
		<li>Participation is low-friction, e.g. no logins. Result: anonymous users</li>
		<li>The app has some measure of antiexploit</li>
	</ol>
	<p>
		This is a balancing act, especially considering my $0 budget. I personally consider the stakes
		to be low, so I prioritized anonymous submissions. I may reevaluate this as the project
		progresses, and I welcome any emails with suggestions.
	</p>
	<h3>Fingerprinting</h3>
	<p>
		Above all, I wanted device fingerprinting. This would allow non-invasive, behind-the-scenes,
		per-device tracking. Options were either free or had a high maintenance cost. Options I
		considered were:
	</p>
	<ol>
		<li>Cloudflare's Ephemeral IDs. Enterprise-only</li>
		<li>
			FingerprintJS. Per GitHub: "vulnerable to spoofing". Lots of rolling my own auth, which I'd
			rather avoid
		</li>
		<li>Fingerprint Identification. Premium version of FingerprintJS</li>
		<li>Stych device fingerprinting. Not permitted for personal projects</li>
	</ol>
	<h3>Anti-botting (Turnstile)</h3>
	<p>
		I also rely on Turnstile as a form of authentication, to ensure humans are in the loop. Each
		Turnstile token can only be verified once, so I decided to convert a user's first token into a
		JWT cookie. The JWT is then used as a "badge" of authentication, at least until it expires.
	</p>
	<div class="captioned-image">
		<ImageUnderlay
			src={sessionAuth}
			alt="Diagram of how users get a JWT"
			blur={false}
			class="rounded-none"
		/>
		<p>How users get a JWT</p>
	</div>
	When a user's token expires, the server responds with a<code>403</code> status. I wrote the board
	to then re-prompt the user with a new turnstile challenge, and then re-authenticate with the
	server.
	<h3>Rate Limiting</h3>
	<p>
		I needed something to prevent brute-force exploits. I went with the most accessible solution: IP
		rate limiting. This has the downside of blocking devices sharing the same network.
	</p>
	<h3>Multi-Tab Exploit</h3>
	<p>
		Because I don't have user accounts or device fingerprinting, I have no way to monitor how many
		pixels a user placed from the backend. This isn't ideal, but I've accepted the risk. I still
		wanted some measure of protection from casually sneaky people. I added a frontend measure to
		counteract the pixel board from being in multiple tabs at once, and stored the pixel counts and
		refresh counter into localstorage. There's no denying that this can be worked around, and I talk
		about how next.
	</p>
	<h3>How you can Exploit (a little)</h3>
	<p>
		You're welcome to use these tricks, but please don't abuse. There are two decent approaches. The
		first, very easy, is to open the pixel board in multiple different browsers (not tabs). Each
		will get you a new cache of pixels to place. If you get greedy, you will get stopped by the IP
		rate limiter. The second is to simply request pixels via different IPs, via VPNs. The Turnstile
		will (ideally) block abusive scripts.
	</p>
</div>
