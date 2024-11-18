<script>
  import DataTable from '$lib/+dataTable.svelte';
  import { SPACEX_API } from '$lib/constant/apiEndPoints/index.js';
  import { apiData, apiError, get, isLoading } from '$lib/store/apiStore.js';
  import { ListPlaceholder } from 'flowbite-svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    get(SPACEX_API.landpads());
  });
  const columns = [
  {label: 'FULL NAME' , key: 'full_name'},
  {label: 'LOCATION NAME', key: 'location.name'},
  {label: 'Region', key: 'location.region'},
  {label: 'Details', key: 'details'},
  {label: 'Success Rate', key: 'details'},
  {label: 'WIKIPEDIA LINK', key: 'wikipedia'},
  {label: 'STATUS', key: 'status'},

];

</script>
<main>
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="col-span-1 lg:col-span-2 border-r pr-4">
                {#if $isLoading}
            <ListPlaceholder />
          {:else if $apiError}
            <p>Error: {$apiError}</p>
          {:else if $apiData}
            <DataTable landpads={$apiData} columns={columns} />
          {:else}
            <p>No data available.</p>
          {/if}
            </div>
            <div class="col-span-1 pl-4">
                <!-- <MapElement landpads={landpads} /> -->
            </div>
        </div>
    </div>

   
    
  </main>

