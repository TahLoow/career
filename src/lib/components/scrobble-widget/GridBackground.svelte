<script lang="ts">
	let container: HTMLElement | undefined = $state();
	let mouseX = $state(-1000);
	let mouseY = $state(-1000);

	function handleMouseMove(e: MouseEvent) {
		if (!container) {
			return;
		}
		const rect = container.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={container}
	onmousemove={handleMouseMove}
	class="cross-grid-container -translate-y-10"
	style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"
>
	<div class="cross-grid"></div>
</div>

<style>
	.cross-grid-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background-color: #00000020; /* Or your preferred background */
		/* Fades the edges to transparent */
		mask-image: radial-gradient(60% 40%, var(--color-surface-950-50) 30%, transparent 80%);
		-webkit-mask-image: radial-gradient(60% 40%, var(--color-surface-950-50) 30%, transparent 80%);
	}

	.cross-grid {
		width: 100%;
		height: 100%;
		/* Create the cross using two linear gradients */
		background-image:
			linear-gradient(to bottom, var(--color-surface-600-400) 1px, transparent 1px),
			linear-gradient(to right, var(--color-surface-600-400) 1px, transparent 1px);
		background-size: 60px 40px; /* Spacing between crosses */
		background-position: center;

		/* Base opacity for the crosses */
		opacity: 0.5;

		/* The glow logic */
		mask-image: radial-gradient(
			circle 150px at var(--mouse-x) var(--mouse-y),
			black 0%,
			rgba(0, 0, 0, 0.2) 100%
		);
		-webkit-mask-image: radial-gradient(
			circle 150px at var(--mouse-x) var(--mouse-y),
			black 0%,
			rgba(0, 0, 0, 0.2) 100%
		);

		transition: opacity 0.3s ease;
	}

	/* Refine the shape so it's a small cross, not a full grid line */
	.cross-grid::after {
		content: '';
		position: absolute;
		inset: 0;
		background-image: inherit;
		background-size: inherit;
		/* Using a mask to clip the lines into small plus signs */
		mask: radial-gradient(circle, var(--color-surface-950-50) 2px, transparent 3px);
		mask-repeat: repeat;
		mask-size: 60px 40px;
	}
</style>
