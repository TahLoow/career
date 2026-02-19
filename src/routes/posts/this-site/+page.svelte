<script>
	import ImageUnderlay from '$lib/components/image-underlay/ImageUnderlay.svelte';
	import figmaImage from './images/figma.png';
</script>

<div class="prose mb-2 self-center md:w-3/5">
	<h1>Software Project: This Site</h1>
	<hr class="hr" />

	<h2>Why</h2>
	I made this site for three reasons:
	<ol>
		<li>I wanted a place to showcase things that I do, professional and not</li>
		<li>I wanted to learn something new, as opposed to a low-code site</li>
		<li>I wanted to improve my writing abilities</li>
	</ol>

	<h2>Hosting</h2>

	<p>
		I'm hosting this site on Vercel, with a domain from Cloudflare. This is a
		<span class="font-bold">static</span>
		site, so Vercel hosts it for free. Vercel also has amazing Git integration, deploying to the public
		branch as soon as a change is introduced to the <code>main</code> branch.
	</p>

	<h2>Frontend Tooling</h2>

	<p>This is a very simple site. I made it with the following core tools:</p>

	<h4>1. Svelte</h4>
	<p>
		I used Svelte because I enjoy it. Its syntax is lightweight and more intuitive than React. I've
		also used it regularly for the past two years, so it's a comfortable tool to use.
	</p>

	<h4>2. Skeleton Design System</h4>
	<p>
		I've worked with and without design systems before. For this site, I wanted a design system
		because a DIY/custom design system would be reinventing the wheel. The wheel would be less
		capable, more confusing, and ultimately uglier.
	</p>
	<p>
		Of the design systems I've used, some were too unopinionated (<a
			href="https://uswds-tailwind.com/components">USWDS</a
		>), and some were too opinionated (<a href="https://mui.com/material-ui/all-components/"
			>Material UI</a
		>) for my taste. I needed something lightweight, highly functional, and also stylistically
		modifiable when necessary. Skeleton works nicely for this.
	</p>

	<h4>3. Tailwind</h4>
	<p>
		<a href="https://tailwindcss.com/">Tailwind</a> comes standard with Skeleton. Rather than
		playing what-does-this-class-do all day, I can instead use the globally-recognizable tailwind
		inline classes. When I do need a custom class, I define it locally in the
		<code class="code">&lt;style&gt;</code>
		tag of my Svelte file, or globally in my <code class="code">app.css</code>. I like to prepend
		"css-" to custom classes, so I can recognize which classes aren't from Tailwind.
	</p>

	<h4>4. Figma</h4>
	<p>
		Like many others, I can get swept up in details. This tendency is a strength and a weakness, and
		I have to regularly recognize and counterbalance it. To stay focused on a core set of features,
		I drafted my home page with Figma.
	</p>

	<div class="captioned-image">
		<ImageUnderlay
			src={figmaImage}
			alt="Image of first Figma prototype for this site"
			class="h-[400px]"
		/>
		<p>Figma prototype</p>
	</div>

	<h2>Custom Pieces</h2>
	<p>
		Despite using Skeleton, most of this site is still hand built by me. Of the components I made,
		the most fun were:
	</p>
	<ul>
		<li>The pixel art cats in the footer (you can hover over them!)</li>
		<li>
			The dark mode selector, with <code>system</code>/<code>light</code>/<code>dark</code> modes
		</li>
		<li>The expandable image previewer</li>
		<li>The scrolling frame in the "<a href="/about">About</a>" section</li>
	</ul>
</div>
