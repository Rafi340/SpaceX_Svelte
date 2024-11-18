<script>
    import { Badge, Button, Progressbar, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    let { landpads, columns } = $props();
    $inspect('inspect landpads', landpads);
    function showDetails(details) {
        console.log(details)
    }
    
  </script>
  
  <Table shadow size='xs'>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        {#each columns as column}
        <TableHeadCell>{column.label}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
    {#each landpads as row}
        <TableBodyRow>
            <TableBodyCell>{row.full_name}</TableBodyCell>
            <TableBodyCell>{row.location.name}</TableBodyCell>
            <TableBodyCell>{row.location.region}</TableBodyCell>
            <TableBodyCell><Button size="xs" onclick={() => showDetails(row.details)} color="light">View Details</Button></TableBodyCell>
            <TableBodyCell><Progressbar progress={((row.successful_landings / row.attempted_landings) * 100)} color="green" />
            
            <div>{((row.successful_landings / row.attempted_landings) * 100)}</div>
            </TableBodyCell>
            <TableBodyCell> <a href={row.wikipedia} target="_blank" rel="noopener noreferrer">
                <img src="/linkIcon.svg" class="h-3 sm:h-5" alt="Wikipedia Link" />
              </a> </TableBodyCell>
            <TableBodyCell>
                <Badge large color={row.status == 'active' ? 'green' : row.status == 'retired' ? 'red' : 'indigo' }>{String(row.status[0]).toUpperCase() + String(row.status).slice(1)}</Badge>
            </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
   
  </Table>