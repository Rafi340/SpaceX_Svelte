<script>
	import DataTable from '$lib/+dataTable.svelte';
	import DonutChart from '$lib/+donutChart.svelte';
	import OlMapLayer from '$lib/+olMapLayer.svelte';
	import FilterIcon from '$lib/components/svg/FilterIcon.svelte';
	import GroupIcon from '$lib/components/svg/GroupIcon.svelte';
	import GroupIcon2 from '$lib/components/svg/GroupIcon2.svelte';
	import { SPACEX_API } from '$lib/constant/apiEndPoints/index.js';
	import { apiData, apiError, get, isLoading } from '$lib/store/apiStore.js';
	import { ListPlaceholder, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let selectedStatus = $state('');

	onMount(() => {
		get(SPACEX_API.landpads());
	});

	const filteredLandpads = $derived(() => {
		return selectedStatus
			? $apiData.filter((landpad) => landpad.status === selectedStatus)
			: $apiData;
	});
	const columns = [
		{ label: 'FULL NAME', key: 'full_name' },
		{ label: 'LOCATION NAME', key: 'location.name' },
		{ label: 'Region', key: 'location.region' },
		{ label: 'Details', key: 'details' },
		{ label: 'Success Rate', key: 'details' },
		{ label: 'WIKIPEDIA LINK', key: 'wikipedia' },
		{ label: 'STATUS', key: 'status' }
	];
	let statusList = [
		{ value: 'active', name: 'Active' },
		{ value: 'retired', name: 'Retired' },
		{ value: 'under construction', name: 'Under Construction' }
	];
	function handleStatus(filter) {
		filteredData = $apiData.filter((landpad) => landpad.status === filter);
	}
</script>

<main>
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="col-span-1 lg:col-span-2 pr-4">
				{#if $isLoading}
					<ListPlaceholder />
				{:else if $apiError}
					<p>Error: {$apiError}</p>
				{:else if $apiData}
					<div class="w-full pt-5 pb-5 text-center mb-2">
						<div class="relative flex flex-col md:flex-row items-center justify-between">
							<div class="flex space-x-1 border rounded p-1 mb-4 md:mb-0">
								<div class="pr-2 border-r border-gray-300">
									<GroupIcon />
								</div>

								<GroupIcon2 />
							</div>

							<div>
								<div class="relative flex items-center">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3">
										<FilterIcon />
									</div>

									<Select
										class="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
										items={statusList}
										bind:value={selectedStatus}
										let:item
									>
										<option value={item.value}>{item.name}</option>
									</Select>
								</div>
							</div>
						</div>
					</div>
					<DataTable landpads={filteredLandpads()} {columns} />
				{:else}
					<p>No data available.</p>
				{/if}
			</div>

			<div class="col-span-1 pl-5">
				<OlMapLayer landpads={filteredLandpads()} />

				{#if !$isLoading}
					<DonutChart landpads={filteredLandpads()} />
				{/if}
			</div>
		</div>
	</div>
</main>
