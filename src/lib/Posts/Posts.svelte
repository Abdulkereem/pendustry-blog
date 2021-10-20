
<script>
	import { removedReadTime, readtime } from './../../Utilities/Constants/responseParser.js';
	import { toFullMonth } from './../../Utilities/Constants/times.js';
  import { onMount } from 'svelte';
  import {banner_url, dp_url} from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
import { faComment } from '@fortawesome/free-solid-svg-icons';

  export let posts;
  removedReadTime
  let _toMonth;
  onMount(()=>{
    _toMonth = toFullMonth;
    
  })
</script>

<div class="cover">
  <div class="font-bold text-xl text-indigo-900 text-opacity-70 animate-pulse">
    TRENDING ARTICLES
  </div>
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
            {removedReadTime(post.description).slice(0,80)} 
            {removedReadTime(post.description).length > 80?'...':''}
          </div>
          <!-- User details -->
          <div class="flex self-end items-center">
            <div>
              <a href="/{post.user.username|| post.user.id}/articles">
                <img src="{dp_url}{post.user.profilePic}" alt="owner" 
                  class="w-12 h-12 xs:h-14 xs:w-14 rounded-full" 
                />
              </a>
            </div>
            <div class="text-sm leading-4 ml-2">
              <div class="text-opacity-80 font-medium cursor-pointer">
                <a href="/{post.user.username|| post.user.id}/articles">
                  {post.user.accName}
                </a>
              </div>
              <div class="text-opacity-80 text-sm mt-2 font-medium text-gray-900  ">
                { _toMonth? _toMonth(post.updatedAt): ''} - {readtime(post.description)}
              </div>
              <div class="flex items-center mt-1 ml-3">
                <span class="text-gray-900 text-xl"><Fa icon={faComment} size="" /></span>
                <span class="ml-1 text-base text-gray-900 font-medium text-opacity-70">
                  {post.totalComments}
                </span>
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
    @apply mb-10 mt-1 border
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