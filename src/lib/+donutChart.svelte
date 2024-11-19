<script>
	import { Card, Chart, WidgetPlaceholder } from 'flowbite-svelte';
	let { landpads } = $props();
	console.log(landpads);
	let options = $state({});
	let labels = $derived(() => (landpads?.length ? landpads.map((pad) => pad.full_name) : []));

	let successRates = $derived(() =>
		landpads?.length
			? landpads.map((pad) =>
					pad.attempted_landings > 0
						? Number(((pad.successful_landings / pad.attempted_landings) * 100).toFixed(2))
						: 0
				)
			: []
	);
	$effect(async () => {
		options = {
			series: successRates(),
			colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#91F652'],
			chart: {
				height: 320,
				width: '100%',
				type: 'donut'
			},
			stroke: {
				colors: ['transparent'],
				lineCap: ''
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: {
								show: true,
								fontFamily: 'Inter, sans-serif',
								offsetY: 20
							},
							total: {
								showAlways: true,
								show: true,
								label: 'Landing Pads',
								fontFamily: 'Inter, sans-serif',
								formatter: function () {
									return landpads?.length || 0;
								}
							},
							value: {
								show: true,
								fontFamily: 'Inter, sans-serif',
								offsetY: -20,
								formatter: function (value) {
									return value;
								}
							}
						},
						size: '80%'
					}
				}
			},
			grid: {
				padding: {
					top: -2
				}
			},
			labels: labels(),
			dataLabels: {
				enabled: false
			},
			legend: {
				show: false,
				position: 'bottom',
				fontFamily: 'Inter, sans-serif'
			},
			yaxis: {
				labels: {
					formatter: function (value) {
						return value;
					}
				}
			},
			xaxis: {
				labels: {
					formatter: function (value) {
						return value;
					}
				},
				axisTicks: {
					show: false
				},
				axisBorder: {
					show: false
				}
			}
		};
	});
</script>

<Card size="lg">
	<div class="flex justify-between items-start w-full">
		<div class="flex-col items-center">
			<div class="flex items-center mb-1">
				<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
					Success Rate
				</h5>
			</div>
		</div>
	</div>
	{#if landpads && landpads.length}
		{#key options}
			<Chart {options} class="py-6" />
		{/key}
	{:else}
		<WidgetPlaceholder />
	{/if}
</Card>
