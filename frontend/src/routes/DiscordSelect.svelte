<script>
    export let type = "channel"
    /**
     * @type {any[]}
     */
     export let options = []
     export let chosen = ""
</script>

<div class="container">
    <select bind:value={chosen}>
        {#each options as option}
            <option class="{type}" value="{option.id}">
                {option.name}
            </option>
        {/each}
    </select>
</div>

<style>
    .channel{
        background-color: #111;
    }
    select {
        background-color: #111;
    }
</style>