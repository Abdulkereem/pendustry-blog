<!-- <script context="module">
  export async function load({page, fetch}){

  }
</script> -->
<script>
import NewPost from "$lib/Forms/NewPost.svelte";


  export let title;
  export let description;
  export let content;
  // export let title;
</script>

<div>
  <NewPost bind:title bind:content bind:description />
    
</div>