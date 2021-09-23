
<script>
	import { fillMage } from './../../Utilities/Constants/posts.js';
  let date = new Date();
  export let posts;
  let tempPost = Array(20).fill(0).map((e,i)=>{
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
  <hr class="hr" />
  <div class="post-cover">
    {#each tempPost as post,i (i)}
      <div class="map">
        <!-- caption container -->
        <div class="caption-container">
          <a href="/{post.title}">
            <img class="caption" src="{post.caption}.png" alt="post" />
          </a>              
        </div>
        <!-- content container -->
        <div class="lg-texts">
          <!-- title -->
          <div class="self-start">
            <a href="/{post.title}" class="title ">{post.title}</a>
          </div>
          <!-- summary -->
          <div class="sub my-3 self-center">
            {post.summary}
          </div>
          <!-- User details -->
          <div class="flex self-end">
            <div>
              <a href="#">
                <img src="{post.caption}.png" alt="owner" class="h-10 w-10 rounded-full" />
              </a>
            </div>
            <div class="text-sm leading-4 ml-2">
              <div class="text-opacity-80 cursor-pointer">
                <a href="#">{post.author} {post.item}</a>
              </div>
              <div class="text-opacity-60 ">
                {post.date}
              </div>
            </div>
          </div>
        </div>
        <!-- / summary end -->
      </div>    
    {/each }

  </div>

</div>
<style lang="scss">

  .cover{
    @apply w-full block;
  }

  .hr{
    @apply my-3
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
    @apply place-items-stretch;
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