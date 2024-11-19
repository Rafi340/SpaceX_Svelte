<script>
	import {
		Badge,
		Button,
		Modal,
		Progressbar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	let { landpads, columns } = $props();
	let isDetailsOpen = $state(false);
	let landpad = $state(null);

	function showDetails(row) {
		landpad = row;
		isDetailsOpen = true;
	}
</script>

<Table shadow>
	<TableHead
		class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
	>
		{#each columns as column}
			<TableHeadCell>{column.label}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each landpads as row}
			<TableBodyRow>
				<TableBodyCell>{row.full_name}</TableBodyCell>
				<TableBodyCell>{row.location.name}</TableBodyCell>
				<TableBodyCell>{row.location.region}</TableBodyCell>
				<TableBodyCell
					><Button size="xs" onclick={() => showDetails(row)} color="light">View Details</Button
					></TableBodyCell
				>
				<TableBodyCell>
					<Progressbar
						progress={row.attempted_landings > 0
							? ((row.successful_landings / row.attempted_landings) * 100).toFixed(2)
							: '0'}
						color="green"
					/>

					<div>
						{row.attempted_landings > 0
							? ((row.successful_landings / row.attempted_landings) * 100).toFixed(2)
							: 'N/A'}
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<a href={row.wikipedia} target="_blank" rel="noopener noreferrer">
						<img src="/linkIcon.svg" class="h-3 sm:h-5" alt="Wikipedia Link" />
					</a>
				</TableBodyCell>
				<TableBodyCell>
					<Badge
						large
						color={row.status == 'active' ? 'green' : row.status == 'retired' ? 'red' : 'indigo'}
						>{String(row.status[0]).toUpperCase() + String(row.status).slice(1)}</Badge
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<Modal title={'Details - ' + landpad?.full_name} bind:open={isDetailsOpen} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{landpad?.details}</p>
</Modal>
