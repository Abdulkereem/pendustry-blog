
<script>
	import { toFullMonth } from './../../Utilities/Constants/times.js';
	import axios from 'axios';
	import { removedReadTime, parseError, hToken } from './../../Utilities/Constants/responseParser.js';
	import { page } from '$app/stores';
	import NoArticleTemplate from './NoArticleTemplate.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { fillMage } from './../../Utilities/Constants/posts.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { LAPI, banner_url, dp_url } from './../../Utilities/JSONS/endpoints.json'

  export let drafts;
  export let total;
  
  let {path} = $page; 
  let fetching= false, errMessage, pagination;

  const fetchMoreDrafts=async(type=null)=>{
    alert(type)
    if(fetching) return;
    errMessage = null;
    fetching= true;
    try {
      let url= type=='last'? pagination.previous_page_url: 
      pagination?.next_page_url?pagination.next_page_url : `${LAPI}drafts?page=2&limit=5`
      let {data} = await axios.get(url, {headers:hToken()});
      // console.log(data);
      drafts = data.drafts.map(d=>{
        let createdAt = toFullMonth(d.createdAt);
        let updatedAt = toFullMonth(d.updatedAt);
        let banner = `${banner_url}${d.banner}`;
        return  {...d, createdAt, updatedAt, banner};
      })
      pagination = data.pagination;      
    } catch (error) {
      console.log({error});
      errMessage = parseError(error);
    }
    fetching = false
  }
</script>

<div class="cover">
  {#if !drafts}
    <!-- No post message -->
    <NoArticleTemplate message="You have no article saved to Draft" />
  {:else}
    <div class="info-head">TOTAL DRAFT(S):  {total}</div>
    <div class="post-cover">
      {#each drafts as draft,i (draft.id)}
        <div class="map">
          <!-- caption container -->
          <div class="caption-container">
            
            <img class="caption" src="{draft.banner}" alt="draft" />
          </div>
          <!-- content container -->
          <div class="lg-texts">
            <!-- title -->
            <div class="self-start title">
              {draft.title}
            </div>
            <!-- description -->
            <div class="sub my-3">
              { removedReadTime(draft.description).slice(0,80)} 
              {removedReadTime(draft.description).length > 80?'...':''}
            </div>
            <!--Updated date-->
            <div class="text-opacity-80 text-sm font-medium text-gray-900 ">
              Updated On: {draft.updatedAt}
            </div>
            <!-- Created date -->
            <div class="text-opacity-70 text-sm font-medium text-gray-900 ">
             Created On: {draft.createdAt}
            </div>
            <!-- Action buttons -->
            <div class="flex justify-between items-center mt-3">
              <div class="w-full mr-1">
                <button class="button ">                  
                    <a class="link" href="{path}/drafts/{draft.id}" >
                      <span class="">Preview </span> 
                    </a> 
                </button>
              </div>
              <div class="w-full ml-1"> 
                <button class="button">
                  <a class="link" href="{path}/editor-{draft.id}" sveltekit:prefetch>
                    Edit
                  </a>
                </button>
              </div>
            </div>
          </div>
          <!-- / summary end -->
        </div>    
      {/each }
    </div>
    
    <!-- If there is error from fetching more drafts -->
    {#if errMessage}
      <div class="errors">
        {errMessage}
      </div>
       <!-- content here -->
    {/if}

    {#if fetching}
      <div class="flex justify-center items-center my-3">
        <Fa icon={faSpinner} size="lg" spin />
        <Fa icon={faSpinner} size="lg" spin />
        <Fa icon={faSpinner} size="lg" spin />
      </div>
    {/if}

    <!-- If pagination overload !.e total more than intial fetched 5-->
    <div class="w-full ">
      {#if total > 5}
        <div class="flex w-full justify-center  my-3 bg-white rounded items-center">
          {#if pagination?.previous_page_url}
             <span class="cursor-pointer p-2 tracking-tighter" 
                on:click={()=>fetchMoreDrafts('last')}
              >
                &lt;&lt;
              </span>
          {/if}
          {#if !pagination || pagination?.next_page_url}
            <span class="ml-10 cursor-pointer p-2 tracking-tighter" 
              on:click={()=>fetchMoreDrafts('next')}
            >
              &gt;&gt;
            </span>
          {/if}
        </div>
      {/if}
    </div>

  {/if}
</div>
<style lang="scss">

  .cover{
    @apply w-full block;
  }
 
  .info-head{
    @apply font-bold text-gray-900 text-opacity-80 mb-6 text-center text-lg
  }
  .post-cover{
    @apply w-full block lg:grid xl:grid-cols-2 md:gap-3 lg:gap-4 px-2 
     xs:px-10 lg:px-0; xs:grid-cols-2;
  }

  .map{
    @apply mb-5 lg:mb-3 transition ease-in-out delay-150 duration-500 
    grid grid-cols-1 border shadow-sm rounded transform hover:scale-105 
    hover:bg-white hover:shadow;
  }

  .caption-container{
    @apply h-52 sm:h-52 md:h-60 xl:h-64 relative w-full;
  }

  .caption{
    @apply h-full w-full object-fill;
  }

  .lg-texts{
    @apply flex flex-col justify-between place-items-stretch p-5 ;
  }

  .title{
    @apply font-bold text-xl text-opacity-80 leading-6
  }
  .button{
    @apply border-2 border-indigo-300 w-full rounded mb-2 text-black px-5
    transition duration-500 hover:border-indigo-700 hover:rounded
  }

  .link{
    @apply w-full flex justify-center items-center leading-8 tracking-wide 
    transition duration-500 hover:bg-indigo-900 hover:bg-opacity-60
    hover:text-white
  }

  .sub{    
    line-height: 21px;
    color: #888888;
    font-size: 14px;
  }

  .errors{
    @apply text-red-400 text-center text-base my-3
  }
</style>