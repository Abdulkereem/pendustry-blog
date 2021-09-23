
<script context="module">
  import {API} from './../../Utilities/jsons/endpoints.json'
  export async function load({page, fetch, session, stuff}){
    const url = `${API}/get-user/${page.params.pbk}`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					article: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
  }

</script>
<script>
  import { session } from "$app/stores";
  import { faUser } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

 export let  articles;
  
  const menuList = ['name', 'Published', 'Draft'];
</script>
<div class=".cover">
  <!--Right Profile box -->
  <div class="profile">
    <!-- Image -->
    <div>
      <Fa icon={faUser} />
    </div>
    <!-- MenuListBox -->
    {#each menuList as menu, index  (index) }
      <div>{menu}</div>
    {/each}

  </div>

  <!-- Articles -->
  <div class="articles">

    {#if !articles}
      <div></div>
    {:else}
      <div>
        {#each Array(50).fill(0).Map((e,i)=>e+i) as article,index (index) }
          <div>{article}</div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .cover{
    @apply w-full w-max-full block md:grid gap-5 grid-cols-5 ;
  }

  .profile{
   @apply block ;
  }

  .articles{
    @apply block grid-span-4 ;
  }
  .
</style>