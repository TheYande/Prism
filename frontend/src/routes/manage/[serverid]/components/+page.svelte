<script lang="ts">
    import Switch from "../../../Switch.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    async function handleCheckedChange(comp: {
        name: string;
        checked: boolean;
        state: boolean;
    }) {
        if (comp.state != comp.checked) {
            const index =
                data.components.findIndex((c) => c.name == comp.name) ?? -1;
            await fetch(`/api/components/${data.serverid}/${comp.name.toLowerCase()}?state=${comp.checked ? "on" : "off"}`)

            data.components[index].state = comp.checked;
        }
    }
    $: {
        for (let comp of data.components) {
            handleCheckedChange(comp);
        }
    }
</script>

<div class="main">
    <div class="compgrid">
        {#each data.components as comp}
            <div class="comp">
                <div class="classnamehere">
                    <h2>{comp.name}</h2>
                    <Switch bind:checked={comp.checked} state={comp.state} />
                </div>
                <p>{comp.description}</p>
                {comp.checked}
                {comp.state}
            </div>
        {/each}
    </div>
</div>

<style>
    .classnamehere {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 0.5em;
    }
    .main {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .compgrid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 1rem;
        max-width: 66rem;
        width: 100%;
    }

    .comp {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: #181a20;
        padding: 0;
        padding: 1rem;
    }

    .comp h2,
    .comp p {
        margin: 0;
    }
</style>
