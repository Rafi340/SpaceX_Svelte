<script>
	import { Card } from 'flowbite-svelte';
	import { defaults } from 'ol/control';
	import TileLayer from 'ol/layer/Tile';
	import Map from 'ol/Map';
	import OSM from 'ol/source/OSM';
	import View from 'ol/View';
	import { onMount } from 'svelte';
	import Mark from './components/mark.svelte';
	let { landpads } = $props();
	let map = $state();
	let ss = $state([]);
	$effect(async () => {
		console.log(' map svvelte', landpads);
		ss = landpads;
	});
	onMount(async () => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			}),

			controls: defaults({ zoom: false })
		});
	});
</script>

<Card size="lg" class="mb-2">
	<div class="flex justify-between items-start w-full">
		<div class="flex-col items-center">
			<div class="flex items-center mb-1">
				<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">MAP</h5>
			</div>
		</div>
	</div>
	<div id="map" class="h-[255px] w-full"></div>
</Card>
{#each ss as landpad}
	{#key map}
		<Mark {landpad} {map} />
	{/key}
{/each}

<style>
	#map {
		@apply h-[255px] w-[410px];
	}
</style>
