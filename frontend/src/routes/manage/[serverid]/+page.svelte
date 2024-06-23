<script lang="ts">
    import Tabs from "../../Tabs.svelte";
    import type { PageData } from "./$types";
    import svgmodules from "$lib/svgs/modules.svg";
    import { onMount } from "svelte";
    export let data: PageData;
</script>

<div class="main">
    <div class="stats">
        <div>
            <img class="icon" src={data.iconURL} alt="" />
            <h1>{data.name}</h1>
        </div>
        <p><b>Members:</b> {data.memberCount}</p>
        <div>
            <b>Emojis:</b>
            <div class="emojis">
                {#if data.emojis}
                    {#each data.emojis as emojiId}
                        <img
                           
                            class="emoji"
                            src="https://cdn.discordapp.com/emojis/{emojiId}"
                            alt=""
                        />
                    {/each}
                {/if}
            </div>
        </div>
        <div>
            <b>Stickers:</b>
            <div class="stickers">
                {#if data.stickers}
                    {#each data.stickers as emojiId}
                        <img
                            class="sticker"
                            src="https://media.discordapp.net/stickers/{emojiId}"
                            alt=""
                        />
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>

<!-- {JSON.stringify(data)} -->

<style>
    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .stats {
        display: flex;
        gap: 5px;
    }

    .stats div{
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
    
    }
    .icon {
        height: 4rem;
        width: 4rem;
        margin-right: 1rem;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    .emoji {
        height: 1.2em;
        margin: 0 0.2em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .emojis {
        display: flex;
        gap: 0;
        flex-direction: row;
        flex-wrap: wrap;
        width: 50vw;
        margin-left: 10px;
    }
    .sticker {
        height: 3.6em;
        margin: 0 0.2em;
        border-radius: 5px;
    }
    .stickers {
        display: flex;
        gap: 0;
        flex-direction: row;
        flex-wrap: wrap;
        width: 50vw;
        margin-left: 10px;
    }
</style>
