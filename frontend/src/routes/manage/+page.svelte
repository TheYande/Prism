<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>



<div class="i-am-on-acid-arnt-i">
    <p>logged in as {data.user?.username}</p>
    <p>servers you admin in:</p>
    {#if data.user?.guilds}
        <div class="guilds">
            {#each data.user.guilds.sort((a,b) => +b.perms_array.includes("ManageGuild") - +a.perms_array.includes("ManageGuild") ).sort((a,b) => +b.perms_array.includes("Administrator") - +a.perms_array.includes("Administrator") ) as guild}
                <div class="guild">
                   <a href="/manage/{guild.id}">
                     <img
                         src="{guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : ` `}"
                         alt=""
                     />
                   </a>
                    <div class="guild-name">
                        <p>{guild.name}</p>
                        
                    </div>
                </div>
            {/each}
        </div>
        {:else}
        <p>you is not is log in</p>
        <a href="/login">login</a>
    {/if}
</div >

<style>

    .i-am-on-acid-arnt-i {
        display: flex;
        align-items: center;
        flex-direction: column;
        /* width: 100%; */
    }
    .guilds {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        gap: 1rem;
        max-width: 66rem;
        width: 100%;
        

    
    }
    .guild {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* width: 10rem; */
        margin: 5px;
    
        
    }

    .guild img {
        height: 10em;
        border-radius: 10%;
        margin: 0;
        
    }

    .guild-name {
        margin: 0;
        justify-content: center;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        text-align: center;
        height: 40px;
    }
</style>
