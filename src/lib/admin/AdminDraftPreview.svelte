
<script>
	import NoArticleTemplate from './NoArticleTemplate.svelte';
	import { fillMage } from './../../Utilities/Constants/posts.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  let date = new Date();
  export let drafts;
  let tempDraft = Array(20).fill(0).map((e,i)=>{
    return {
      item: e+i,
      caption: fillMage(i,0),
      title: fillMage(i,1),
      date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      author: 'Firstname and Lastname',
      summary: fillMage(i,2)
    }
  })
</script>

<div class="cover">
  {#if drafts}
    <!-- No post message -->
    <NoArticleTemplate message="You have no article saved to Draft" />
  {:else}
    <div class="post-cover">
      {#each tempDraft as draft,i (i)}
        <div class="map">
          <!-- caption container -->
          <div class="caption-container">
            <img class="caption" src="{draft.cover?draft.cover:'/ino'}.png" alt="draft" />
          </div>
          <!-- content container -->
          <div class="lg-texts">
            <!-- title -->
            <div class="self-start">
              {draft.title? draft.title: 'No title'}
            </div>
            <!-- summary -->
            <div class="sub my-3">
              {draft.summary? draft.summary: 'No summary'}
            </div>
            <!-- Date -->
            <div class="text-opacity-60 ">
              {draft.date}
            </div>
            <!-- content -->
            <div>
              {draft.content?draft.content:'No content'} 
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
    @apply w-full block lg:grid lg:grid-cols-2 md:gap-3 lg:gap-4; 
    xs:grid-cols-2;
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