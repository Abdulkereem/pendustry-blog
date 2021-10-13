
<script>
	import { page } from '$app/stores';
	import NoArticleTemplate from './NoArticleTemplate.svelte';
	import { fillMage } from './../../Utilities/Constants/posts.js';
  import Fa from 'svelte-fa/src/fa.svelte';

  export let drafts;
  export let total;
  
  let {path} = $page; 
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
              <a href="{path}/editor-{draft.id}" sveltekit:prefetch>
                {draft.title}
              </a>
            </div>
            <!-- description -->
            <div class="sub my-3">
              { draft.description.slice(0,80)}{draft.description.length > 80 && '...'}
            </div>
            <!--Updated date-->
            <div class="text-opacity-80 text-sm text-gray-900 ">
              Updated On: {draft.updatedAt}
            </div>
            <!-- Created date -->
            <div class="text-opacity-70 text-sm text-gray-900 ">
             Created On: {draft.createdAt}
            </div>
            <!-- Action buttons -->
            <div class="flex justify-between items-center mt-3">
              <div class="w-full mr-1">
                <button class="button ">                  
                    <a class="link" href="{path}/drafts" >
                      <span class="">Preview </span> 
                    </a> 
                </button>
              </div>
              <div class="w-full ml-1"> 
                <button class="button">
                <a class="link" href="{path}/editor-{draft.id}" sveltekit:prefetch>
                  Edit
                </a>
              </button></div>
            </div>
          </div>
          <!-- / summary end -->
        </div>    
      {/each }
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
</style>