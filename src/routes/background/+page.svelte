<script lang="ts">
	import { DownloadIcon, PauseIcon, PlayIcon } from '@lucide/svelte';

	let pause = $state(false);
</script>

<svelte:head>
	<title>Paul - Background</title>
	<meta name="Background" content="My background" />
</svelte:head>

<div class="flex w-full justify-center">
	<div class="card bg-surface-200-800 mt-8 w-full flex-col px-3 py-6 sm:w-2/3 sm:px-8">
		<h1 class="font-accent pb-4 text-3xl font-bold italic sm:text-5xl">Background</h1>

		<div class="mb-4">
			<div class="items-center gap-6 lg:flex">
				<div class="prose not-lg:mb-4 lg:basis-3/5">
					<h3>Bio</h3>
					<p>
						My line is <span class="font-bold">"I enjoy whatever I'm working on"</span>. So far,
						that's been machine learning, system design, backend, frontend, and so much more. I've
						been developing software for over a decade. I started making games in Lua, advanced to
						mentoring others, then formalized my own education with a Bachelor's and Master's in
						computer science. I've been making commercial and government software since 2022.
					</p>
					<h3>Resume</h3>
					<a
						href="/files/MacLean_Resume.pdf"
						class="btn dark:text-surface-200! text-surface-950! dark:preset-filled-surface-500! preset-filled-surface-300-700"
						download
					>
						<DownloadIcon class="size-4" />
						Download
					</a>
					<span class="ml-4 italic">Updated 1/29/2026</span>
					<h3>Education</h3>
					<ul>
						<li class="list-none">M.S. Computer Science, West Virginia University</li>
						<li class="list-none">B.S. Computer Science, PennWest California</li>
					</ul>
				</div>
				<button
					class="css-carousel-container relative h-[600px] w-full basis-2/5 overflow-auto rounded-sm px-4 text-left hover:backdrop-brightness-96 lg:min-w-[300px]"
					class:pause
					onclick={() => (pause = !pause)}
				>
					<div class="css-pause-button absolute right-0 z-10 mt-3 mr-3 opacity-40">
						{#if pause}
							<PlayIcon class="size-4" />
						{:else}
							<PauseIcon class="size-4" />
						{/if}
					</div>
					<div
						class="css-carousel-fade bg-surface-200-800 absolute top-0 left-0 z-9 h-full w-full"
					></div>
					<div class="flex h-full flex-auto items-center overflow-hidden">
						<ul class="css-carousel-list h-max flex-col">
							{#snippet items()}
								<li>
									Machine learning
									<ul>
										<li>Pandas</li>
										<li>Scikit-learn</li>
										<li>CV2</li>
									</ul>
								</li>
								<li>ETL pipelines</li>
								<li>
									Testing
									<ul>
										<li>Vitest</li>
										<li>Jest</li>
									</ul>
								</li>
								<li>
									CI/CD pipelines
									<ul>
										<li>Creation & usage</li>
										<li>Bitbucket Pipelines</li>
										<li>GitHub Actions</li>
										<li>Jenkins</li>
									</ul>
								</li>
								<li>
									System architecting
									<ul>
										<li>Requirements gathering</li>
										<li>Tool and network mapping</li>
										<li>Scalability</li>
									</ul>
								</li>
								<li>Modernization + legacy development</li>
								<li>
									Cloud
									<ul>
										<li>AWS</li>
									</ul>
								</li>
								<li>
									Backend systems
									<ul>
										<li>Nest JS</li>
										<li>Next JS</li>
										<li>Spring Boot</li>
									</ul>
								</li>
								<li>Microservices</li>
								<li>Monoliths</li>
								<li>
									Frontend systems
									<ul>
										<li>Next JS</li>
										<li>SvelteKit</li>
										<li>Ember</li>
									</ul>
								</li>
								<li>Embedded (Arduino)</li>
								<li>
									Database design
									<ul>
										<li>Postgres</li>
										<li>SQLite</li>
									</ul>
								</li>
								<li>Assembly</li>
							{/snippet}
							{@render items()}
							{@render items()}
						</ul>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.css-carousel-container {
		.css-carousel-fade {
			-webkit-mask-image: linear-gradient(
				to bottom,
				black 0%,
				transparent 5%,
				transparent 95%,
				black 100%
			);
			mask-image: linear-gradient(to bottom, black 0%, transparent 5%, transparent 95%, black 100%);
		}

		.css-carousel-list {
			animation:
				css-carousel-keyframes 0.8s cubic-bezier(0.1, 0.9, 0.2, 0.95) 1,
				css-carousel-keyframes 20s linear infinite;
			animation-delay: 0s, 0.8s;
			list-style-position: inside;

			> li {
				margin-bottom: 24px;
				font-size: large;
				font-family: var(--font-accent);
				letter-spacing: 2px;

				> ul {
					padding-left: 15px;
					list-style-position: inside;
					font-family: var(--base-font-family);
					letter-spacing: initial;

					> li {
						padding: 0;
						font-size: initial;

						&::before {
							content: '::';
							display: inline-block;
							margin-right: 8px;
							font-size: small;
							translate: 0 -2px;
						}
					}
				}
			}
		}

		&.pause {
			.css-carousel-list {
				animation-play-state: paused;
			}
		}

		&:hover {
			.css-carousel-list {
				@media (min-width: 500px) {
					animation-play-state: paused;
				}
			}

			.css-pause-button {
				opacity: 100%;
			}
		}
	}

	/* Source: Code with Hooria, https://www.youtube.com/watch?v=tEGapA8iEkE */
	@keyframes css-carousel-keyframes {
		from {
			transform: translateY(25%);
		}
		to {
			transform: translateY(-25%);
		}
	}
</style>
