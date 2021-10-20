<script>
	import { getAU } from './../../Utilities/Constants/responseParser.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Pagination from '$lib/Pagination.svelte';
  import AccountArticles from './AccountArticles.svelte';
  import HeadCover from "./HeadCover.svelte";
  import User from "./User.svelte";


  export let pagination;
  export let user;
  export let articles;
  let isOwner;
  onMount(()=>{
    isOwner = getAU();
  })
  let{ path,query} = $page;
  $: console.log(user);
</script>

<div> 
  {#if true || isOwner?.id !== user?.id}
     <!--Head cover content here -->
     <HeadCover user={user} total={pagination && pagination.total} />
  {/if}
  <div>
    <User user={user} total={pagination && pagination.total} />
    <AccountArticles  name={user.accName} pagination={pagination} articles={articles} />
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
  </div>
</div>

<style>

</style>