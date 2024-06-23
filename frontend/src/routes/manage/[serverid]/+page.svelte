<script lang="ts">
    import Tabs from "../../Tabs.svelte";
    import type { PageData } from "./$types";
    import svgmodules from "$lib/svgs/modules.svg";
    import { onMount } from "svelte";
    export let data: PageData;
</script>

<div>
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
               <img class="emoji" src="https://cdn.discordapp.com/emojis/{emojiId}" alt="" />
           {/each}
         {/if}
      </div>
    </div>
    <div>
        <b>Stickers:</b>
      <div class="stickers">
         {#if data.stickers}
           {#each data.stickers as emojiId}
               <img class="sticker" src="https://media.discordapp.net/stickers/{emojiId}" alt="" />
           {/each}
         {/if}
      </div>
    </div>
    
</div>
<!-- {JSON.stringify(data)} -->

<style>
    div div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
    }
    .icon {
        height: 4rem;
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
        flex-direction: column;
        flex-wrap: wrap;
        height: 3.6em;
    }
    .sticker {
        height: 3.6em;
        margin: 0 0.2em;
        border-radius: 5px;
        
    }
</style>
