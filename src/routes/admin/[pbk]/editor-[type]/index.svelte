<script context="module">
  export async function load({page}){
    let {type} = page.params;
    return {
      props:{
        isNew: type == 'new',
      }
    }
  }
</script>
<script>
  import { onMount } from 'svelte';
  import { hToken } from './../../../../Utilities/Constants/responseParser.js';
  import NewPost from "$lib/Forms/NewPost.svelte";
  import axios from "axios";
  import { LAPI } from './../../../../Utilities/API/endpoints.js';
	import { page } from '$app/stores';

  export let isNew;
  let DRAFT;
  let error=false;
  let loaded=false;
  $: if(isNew){
    loaded = true;
  }else if(isNew === false){
    onMount(async()=>{
      try {
        let id = $page.params.type.split('?')[0];
        let {data:{draft}} = await axios.get(`${LAPI}single-draft/${id}`, {headers: hToken()});
        DRAFT = draft;
        console.log({draft});
      } catch (err) {
        console.log({err})
        error = true;
      }  
      loaded = true;
    })

  }


  

</script>


{#if loaded}
  <div>  
    <NewPost draft={DRAFT} />
  </div>
{/if}
<style lang="scss">

</style>