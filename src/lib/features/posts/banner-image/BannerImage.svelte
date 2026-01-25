<script lang="ts">
	type Props = {
		src: string;
		alt: string;
	};

	const { src, alt }: Props = $props();
</script>

<div
	class="relative mb-6 flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg"
>
	<img
		{src}
		{alt}
		class="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
		aria-hidden="true"
	/>
	<img {src} {alt} class="relative z-10 max-h-full max-w-full object-contain" />
</div>
