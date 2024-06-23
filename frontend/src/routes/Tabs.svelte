<script>
    import { slide} from "svelte/transition";

  /**
   * @type {{label:string,value:number,icon:any,component:any}[]}
   */
  export let items = [];
  export let activeTabValue = 1;
  export let data

  const handleClick = (/** @type {number} */ tabValue) => () =>
    (activeTabValue = tabValue);
</script>

<ul>
  {#each items as item}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <li class={activeTabValue === item.value ? "active" : ""}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:click={handleClick(item.value)}><img src="{item.icon}" alt=""><p>{item.label}</p></span>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div class="box" transition:slide>
      <svelte:component this={item.component} data={data} />
    </div>
  {/if}
{/each}

<style>
  .box {
    margin-bottom: 10px;
    padding: 40px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }
  li {
    margin-bottom: -1px;
  
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius:1rem;
    border-top-right-radius: 1rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  img {
height: 1.5em;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }

  p{
    margin: 0;
  }

  * {
    transition: all 0.5s;
  }
</style>
