
<script>
	import { page } from '$app/stores';
	import NoArticleTemplate from './NoArticleTemplate.svelte';
	import { fillMage } from './../../Utilities/Constants/posts.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  export let drafts;

  
  let {path} = $page; 
</script>

<div class="cover">
  {#if !drafts}
    <!-- No post message -->
    <NoArticleTemplate message="You have no article saved to Draft" />
  {:else}
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
              {draft.description}
            </div>
            <!--Updated date-->
            <div class="text-opacity-80 text-gray-900 ">
              Upadted On: {draft.updatedAt}
            </div>
            <!-- Created date -->
            <div class="text-opacity-80 text-gray-900 ">
             Created On: {draft.createdAt}
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
    @apply h-52 sm:h-52 md:h-56 relative w-full;
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
  .sub{
    
    line-height: 21px;
    color: #888888;
    font-size: 14px;
  }
</style>