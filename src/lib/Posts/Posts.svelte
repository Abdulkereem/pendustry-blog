
<script>
	import { toFullMonth } from './../../Utilities/Constants/times.js';
	// import { fillMage } from './../../Utilities/Constants/posts.js';
  import { onMount } from 'svelte';
  import {banner_url, dp_url} from './../../Utilities/JSONS/endpoints.json'
  // let date = new Date();
  // let tempPost = Array(20).fill(0).map((e,i)=>{
    //   return {
      //     item: e+i,
      //     banner: fillMage(i,0),
      //     title: fillMage(i,1),
      //     updatedAt: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      //     author: 'Firstname and Lastname',
      //     description: fillMage(i,2)
      //   }
      // })

  export let posts;

  let _toMonth;
  onMount(()=>{
    _toMonth = toFullMonth;
    
  })
</script>

<div class="cover">
  <hr class="hr" />
  <div class="post-cover">
    {#each posts as post,i (i)  }
      <div class="map">
        <!-- banner container -->
        <div class="banner-container">
          <a href="/{post.goto}">
            <img class="banner" src="{banner_url}{post.banner}" alt="post" />
          </a>              
        </div>
        <!-- content container -->
        <div class="lg-texts">
          <!-- Title -->
          <div class="self-start">
            <a href="/{post.goto}" class="Title ">{post.title}</a>
          </div>
          <!-- summary -->
          <div class="sub my-3 self-center">
            {post.description}
          </div>
          <!-- User details -->
          <div class="flex self-end">
            <div>
              <a href="#">
                <img src="{dp_url}{post.user.profilePic}" alt="owner" class="h-10 w-10 rounded-full" />
              </a>
            </div>
            <div class="text-sm leading-4 ml-2">
              <div class="text-opacity-80 cursor-pointer">
                <a href="#">{post.user.accName}</a>
              </div>
              <div class="text-opacity-60 ">
                { _toMonth? _toMonth(post.updatedAt): ''}
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
    @apply w-full block py-2 px-9 xs:px-14 sm:px-6 lg:px-14
  }

  .hr{
    @apply my-10
  }
  
  .post-cover{
    @apply w-full block sm:grid  grid-cols-1 gap-3 md:gap-4 lg:gap-5 
    xs:grid-cols-2;

  }

  .map{
    // @apply grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3;
    @apply mb-5 sm:mb-2 transition ease-in-out delay-150 duration-500 grid grid-cols-1 lg:grid-cols-3 border 
    shadow-sm rounded transform hover:scale-105 hover:bg-white hover:shadow;
  }

  .banner-container{
    @apply h-52 sm:h-52 md:h-56 lg:h-full relative lg:w-full lg:flex items-stretch ;
  }

  .banner{
    @apply h-full w-full object-fill;
  }

  .lg-texts{
    @apply lg:col-span-2 p-5 grid place-content-between place-items-stretch;
  }

  .Title{
    @apply font-bold text-xl text-opacity-80 leading-6
  }
  .sub{
    line-height: 21px;
    color: #888888;
    font-size: 14px;
  }
</style>