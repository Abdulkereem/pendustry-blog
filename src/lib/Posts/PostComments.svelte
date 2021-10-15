<script>
	import Fa from 'svelte-fa/src/fa.svelte';
  import { LAPI } from './../../Utilities/JSONS/endpoints.json';
  import { faChevronRight, faComment, faChevronLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

  export let comments
  export let total;
  export let id;
  let resError = false;
  let prev, last;
  let limit = 5
  let next =`${LAPI}comments/${id}?page=1&limit=${limit}`; 
  let loading = false;
  $: console.log(comments);
  const loadMore= async(type)=>{
    if(loading) return;
    loading = true;
    resError = false;
    try {
      let {data} = await axios.get(type?next:prev);
      console.log(data);
      next = data.pagination.next_page_url;
      prev=data.pagination.previous_page_url;
      last = data.pagination.last_page_url
      comments = data.comments;
    } catch (error) {
      console.log({error});
      resError = true;
    }
    loading = false;
  }
</script>

<div class="flex justify-center mb-10">
  <div class="w-full max-w-3xl px-3 xs:px-10 sm:px-14  ">
    <div class="flex items-center">
      <span class="mr-4 text-2xl font-medium">Discussions </span>
      <span class="text-gray-900 text-xl"><Fa icon={faComment} size="" /></span>
      <span class="ml-2 text-lg text-gray-900 font-medium text-opacity-70">
        {total}
      </span>
    </div>
    <div class:comments_container={(comments.length)}>
      {#each comments as comment (comment.id)}
        <div class="border mb-2 p-2 rounded xs::rounded-md">
          <div class="flex items-center justify-between">
            <span class="text-black font-mono font-extrabold text-opacity-80">
              {comment.name}
            </span>
            <span class="font-normal text-gray-900 text-opacity-60">
              {comment.createdAt}
            </span>
          </div>
          <div class="my-2 ml-2 text-gray-900 text-opacity-90">
            {comment.content}
          </div>
         </div>
      {/each}
      <!-- Fetching more indicator -->
      {#if loading}
         <div class="flex w-full px-10 my-2 justify-between">
          <span class="">
            <Fa icon={faSpinner} spin size="lg" />
          </span>
          <span class="">
            <Fa icon={faSpinner} spin size="lg" />
          </span>
         </div>
      {/if}
      <!-- Fetch more error container -->
      {#if resError}        
        <div class="errors">
          Oops! Something went wrong, please retry.
        </div>
      {/if}
      <!-- Pagination case -->
      <div>
        {#if total > limit}
          <div class="pagine relative">
            {#if prev}
              <span class="chev" on:click={()=>loadMore(0)}> 
                <Fa icon={faChevronLeft} size="lg" />
              </span>
            {/if}
            {#if next}
              <span class="chev" on:click={()=>loadMore(1)}>
                <Fa icon={faChevronRight} size="lg" />
              </span>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
<style lang="scss">
  .pagine{
    @apply w-full mx-auto h-11 px-2 py-2 max-w-sm flex items-center 
    bg-gray-100 rounded-md justify-center
  }
  
  .comments_container{
    @apply bg-white rounded p-3 mb-5 mt-3;
  }

  .errors{
    @apply text-red-400 text-center text-base
  }

  .chev{
    @apply text-indigo-900 rounded px-8 py-1 cursor-pointer text-opacity-80
    transition hover:bg-white hover:scale-105 hover:text-opacity-100 duration-500 ease-in-out
  }
</style>