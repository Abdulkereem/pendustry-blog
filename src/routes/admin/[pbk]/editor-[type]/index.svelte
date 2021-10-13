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
  import { LAPI } from './../../../../Utilities/JSONS/endpoints.json'  
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

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.css">
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/htmlmixed/htmlmixed.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/xml/xml.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/css/css.js"></script>
</svelte:head>
{#if loaded}
  <div>  
    <NewPost draft={DRAFT} />
  </div>
{/if}
<style lang="scss">

</style>