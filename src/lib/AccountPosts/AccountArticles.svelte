
<script>
	import Fa from 'svelte-fa/src/fa.svelte';
  import { faComment } from '@fortawesome/free-solid-svg-icons';
	import { removedReadTime, readtime } from './../../Utilities/Constants/responseParser.js';


  export let articles, name;

</script>

<div class="cover">
  <div class="heady">
    Articles by {name}
  </div>
  <hr class="hr" />
  <div class="post-cover">
    {#each articles as post,i (i)  }
      <div class="map">
        <!-- banner container -->
        <div class="banner-container">
          <a href="/{post.goto}">
            <img class="banner" src="{post.banner}" alt="post" />
          </a>              
        </div>
        <!-- content container -->
        <div class="lg-texts">
          <!-- Date -->
          <div class="text-opacity-80 tracking-tighter text-base text-gray-900 ">
            {post.updatedAt} - {readtime(post.description)}
          </div>
          <!-- Title -->
          <div class="self-start">
            <a href="/{post.goto}" class="Title ">{post.title}</a>
          </div>
          <!-- description -->
          <div class="sub my-3 self-center">
            {removedReadTime(post.description).slice(0,80)} 
            {removedReadTime(post.description).length > 80?'...':''}
          </div>
          <!-- Comment -->
          <div class="flex justify-end items-center pr-4">
            <span class="text-gray-900 text-xl"><Fa icon={faComment} size="" /></span>
            <span class="ml-1 text-lg text-gray-900 font-medium text-opacity-70">
              {post.totalComments}
            </span>
          </div>
        </div>
      </div>    
    {/each }

  </div>

</div>
<style lang="scss">

  .cover{
    @apply w-full block py-2 px-9 xs:px-14 sm:px-6 lg:px-14
  }

  .hr{
    @apply mb-10
  }
  
  .post-cover{
    @apply w-full block sm:grid  grid-cols-1 gap-3 md:gap-4 lg:gap-5 
    xs:grid-cols-2;

  }

  .map{
    // @apply grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3;
    @apply mb-5 sm:mb-2 transition ease-in-out delay-150 duration-500 
    grid grid-cols-1 lg:grid-cols-3 border 
    shadow-sm rounded transform hover:scale-105 hover:bg-white hover:shadow;
  }

  .banner-container{
    @apply h-52 sm:h-52 md:h-56 lg:h-full relative lg:w-full lg:flex items-stretch ;
  }

  .banner{
    @apply h-full w-full object-fill;
  }

  .lg-texts{
    @apply lg:col-span-2 p-5 pt-1 grid place-items-stretch;
  }

  .Title{
    @apply font-bold text-xl text-opacity-80 leading-6
  }
  .sub{
    line-height: 21px;
    color: #888888;
    font-size: 15px;
  }

  .heady{
    @apply mt-4 font-bold tracking-tighter text-lg text-indigo-900
     text-opacity-90 animate-pulse pl-2 xs:pl-4
  }
</style>