
<script>
	import { removedReadTime} from './../../Utilities/Constants/responseParser.js';
	import { page } from '$app/stores';
	import NoArticleTemplate from './NoArticleTemplate.svelte';
  
	// import { fillMage } from './../../Utilities/Constants/posts.js';
  // let date = new Date();
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

  export let posts;
  let {path} = $page;

</script>

<div class="cover">
  {#if !posts || !posts.length}
    <!-- No post message -->
    <NoArticleTemplate message="You're yet to publish an article" />
  {:else}
    <div class="post-cover">
      {#each posts as post,i (post.id)}
        <div class="map">
          <!-- caption container -->
          <div class="caption-container">
            <a href="{path}/articles/{post.id}">
              <img class="caption" src="{post.banner}" alt="post" />
            </a>              
          </div>
          <!-- content container -->
          <div class="lg-texts">
            <!-- title -->
            <div class="self-start">
              <a href="{path}/articles/{post.id}" class="title ">{post.title}</a>
            </div>
            <!-- description -->
            <div class="sub my-3 self-center">              
              { removedReadTime(post.description).slice(0,80)} 
              {removedReadTime(post.description).length > 80?'...':''}
            </div>
            <!-- published date -->
            <div class="flex self-end">
              <div class="text-opacity-80 text-sm font-medium text-gray-900 ">
                {post.updatedAt}
              </div>
            </div>
            <!-- Action buttons -->
            <div class="flex justify-between items-center mt-3">
              <div class="w-full mr-1">
                <!-- <button class="button " on:click={()=>deleteArticle(post.id)}>                  
                  <span class="link">Delete </span> 
                </button> -->
              </div>
              <div class="w-full ml-1"> 
                <button class="button">
                  <a class="link" href="{path}/articles/{post.id}" sveltekit:prefetch>
                    View
                  </a>
                </button>
              </div>
            </div>
            <!-- / container end -->
          </div>
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

  .button{
    @apply border-2 border-indigo-300 w-full rounded mb-2 text-black 
    transition duration-500 hover:border-indigo-700 hover:rounded
  }

  .link{
    @apply w-full flex justify-center items-center leading-8 tracking-wide 
    transition duration-500 hover:bg-indigo-900 hover:bg-opacity-60
    hover:text-white
  }
</style>