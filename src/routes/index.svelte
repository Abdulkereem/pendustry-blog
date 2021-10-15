<script context="module">
	import NoData from './../lib/Errors/NoData.svelte';
  import {LAPI} from './../Utilities/JSONS/endpoints.json';
   export async function load({page, fetch}){

    let url = `${LAPI}published-articles`
    let response = await fetch(url);
    try {
      if (response.ok){
        let {pagination, articles} = await response.json();
        let posts = articles.map(data=>{
          let goto = data.title.toLowerCase().replace(/ /g,'-').replace(/--/g, '-');
          goto = `${goto}-${data.id}`;
          return {...data, goto}
        })
        console.log({posts});
        return{
          props:{
            posts,
            pagination
          }
        }
      }else{
        return{
          status: response.status,
          error: new Error(`Something went wrong, ${response}`)
        }
      }      
    } catch (error) {
      // console.log({error});
    }

   }
</script>
<script>
  import Posts from "$lib/Posts/Posts.svelte";
  export let posts;
  export let pagination


</script>
<div>
  {#if posts.length}
     <Posts pagination={pagination} posts={posts}/>
  {:else}
     <NoData message="Article" />
  {/if}
</div>
