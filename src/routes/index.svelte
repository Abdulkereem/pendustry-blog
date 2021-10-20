<script context="module">
	import { LAPI } from './../Utilities/API/endpoints.js';
	import { page } from '$app/stores';
	import NoData from './../lib/Errors/NoData.svelte';

  export async function load({page, fetch}){
    let limit = page.query.get('limit');
    let _page = page.query.get('page');
    let search = page.query.get('search');
    let url = `${LAPI}published-articles?page=${_page?_page:1}&limit=${limit?limit:2}&search=${search?search:''}`
    let response = await fetch(url);
    try {
      if (response.ok){
        let {pagination, articles} = await response.json();
        let posts = articles.map(data=>{
          let goto = data.title.toLowerCase().replace(/ /g,'-').replace(/--/g, '-');
          goto = `${goto}-${data.id}`;
          return {...data, goto}
        })
        console.log({pagination});
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
  import Pagination from '$lib/Pagination.svelte';
  export let posts;
  export let pagination
  let {path, query} = $page;


</script>
<div>
  {#if posts.length}
    <Posts pagination={pagination} posts={posts}/>
    <Pagination 
      path={path} 
      total={pagination.total} 
      limit={pagination.per_page} 
      current={pagination.current_page} 
      last_page={pagination.last_page_url}
      length={pagination.total_pages}
      current_page_total={pagination.current_page_total}
      search={query.get('search')?query.get('search'):''}
    />
  {:else}
     <NoData message="Article" />
  {/if}
</div>
