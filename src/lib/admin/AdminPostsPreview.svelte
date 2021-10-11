
<script>
	import NoArticleTemplate from './NoArticleTemplate.svelte';
	import { fillMage } from './../../Utilities/Constants/posts.js';
  let date = new Date();
  export let posts;
  // let tempPost = Array(20).fill(0).map((e,i)=>{
  //   return {
  //     item: e+i,
  //     caption: fillMage(i,0),
  //     title: fillMage(i,1),
  //     date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
  //     author: 'Firstname and Lastname',
  //     summary: fillMage(i,2)
  //   }
  // })
</script>

<div class="cover">
  {#if !posts}
    <!-- No post message -->
    <NoArticleTemplate message="You're yet to publish an article" />
  {:else}
    <div class="post-cover">
      {#each posts as post,i (post.id)}
        <div class="map">
          <!-- caption container -->
          <div class="caption-container">
            <a href="/{post.goto}">
              <img class="caption" src="{post.banner}" alt="post" />
            </a>              
          </div>
          <!-- content container -->
          <div class="lg-texts">
            <!-- title -->
            <div class="self-start">
              <a href="/{post.goto}" class="title ">{post.title}</a>
            </div>
            <!-- description -->
            <div class="sub my-3 self-center">
              {post.description}
            </div>
            <!-- User details -->
            <div class="flex self-end">
                <div class="text-opacity-60 ">
                  {post.updatedAt}
                </div>
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
     xs:px-10 lg:px-0;
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
    @apply place-items-stretch p-5;
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