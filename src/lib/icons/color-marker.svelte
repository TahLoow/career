<script lang="ts">
	const { class: _class } = $props();
</script>

<svg
	class={_class}
	width="100"
	height="100"
	viewBox="0 0 100 100"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Top-left corner -->
	<line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="8" />
	<line x1="10" y1="10" x2="10" y2="30" stroke="currentColor" stroke-width="8" />

	<!-- Top-right corner -->
	<line x1="70" y1="10" x2="90" y2="10" stroke="currentColor" stroke-width="8" />
	<line x1="90" y1="10" x2="90" y2="30" stroke="currentColor" stroke-width="8" />

	<!-- Bottom-left corner -->
	<line x1="10" y1="70" x2="10" y2="90" stroke="currentColor" stroke-width="8" />
	<line x1="10" y1="90" x2="30" y2="90" stroke="currentColor" stroke-width="8" />

	<!-- Bottom-right corner -->
	<line x1="90" y1="70" x2="90" y2="90" stroke="currentColor" stroke-width="8" />
	<line x1="70" y1="90" x2="90" y2="90" stroke="currentColor" stroke-width="8" />

	<!-- Top-left corner  -->
	<line
		x1="10"
		y1="10"
		x2="30"
		y2="10"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>
	<line
		x1="10"
		y1="10"
		x2="10"
		y2="30"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>

	<!-- Top-right corner -->
	<line
		x1="70"
		y1="10"
		x2="90"
		y2="10"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>
	<line
		x1="90"
		y1="10"
		x2="90"
		y2="30"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>

	<!-- Bottom-left corner -->
	<line
		x1="10"
		y1="70"
		x2="10"
		y2="90"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>
	<line
		x1="10"
		y1="90"
		x2="30"
		y2="90"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>

	<!-- Bottom-right corner -->
	<line
		x1="90"
		y1="70"
		x2="90"
		y2="90"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>
	<line
		x1="70"
		y1="90"
		x2="90"
		y2="90"
		stroke="currentColor"
		stroke-width="4"
		style="-webkit-filter: invert(100%); filter: invert(100%)"
	/>
</svg>
