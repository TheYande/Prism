<script lang="ts">
    import { onMount } from "svelte";

    export let data: { user: discordOauthUser | null; token: string | null };
    onMount(() => {
        if (data.token) document.location = "/";
        else document.location = "https://discord.com/oauth2/authorize?client_id=1250188801599340664&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&scope=identify+guilds";
    });
</script>

{data.user?.username}
