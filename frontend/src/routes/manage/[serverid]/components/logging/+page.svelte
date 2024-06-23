<script lang="ts">
    import DiscordSelect from '../../../../DiscordSelect.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<DiscordSelect options={data.channels} bind:chosen={data.current}/>
{data.current}