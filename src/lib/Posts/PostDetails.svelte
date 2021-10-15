 <script>
	import { readtime, removedReadTime} from './../../Utilities/Constants/responseParser.js';
  import PostOnwer from "./PostOnwer.svelte";

  export let post;
</script>
<svelte:head> 
  
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
  <!-- <script src="https://cdn.tiny.cloud/1/s3aazzg9dsaiza991zpnlsi7to0d5a2lz1sxem0j572jl3d1/tinymce/5/tinymce.min.js"
   referrerpolicy="origin"></script> -->

</svelte:head>
<div sveltekit:navigation-start></div>
<div>  
  <div class="flex justify-center">
    <div class="w-full max-w-3xl px-3 xs:px-8 sm:px-16">
      <div class="hidden mt-2 md:block">
        <PostOnwer user={post.user} />
      </div>
      <!-- Post -->
      <div>
        <!-- head section -->
        <div>
          <div class="title">{post.title}</div>
          <div class="date"> { post.updatedAt}<span class="mx-2">-            
          </span> {readtime(post.description)} </div>
          {#if post.banner}
            <div class="banner">
              <img src="{post.banner}" alt="banner" />        
            </div>            
          {/if}
          <div class="sub">
            {removedReadTime(post.description)? removedReadTime(post.description): 'Description is needed here'}
          </div>
        </div>

        <!-- post content container -->
        <div class="my-10 sun-editor-editable px-0 shadow-sm bg-gray-50"
          style="padding: 0px; background-color: inherit"
        >
            {@html post.content }
        </div>
        <!--
        {#if !readTime}
           <Editor content={post.content} disable={true} bind:readTime /> 
        {/if}
      -->
      </div>      
      <div class="block md:hidden">
        <PostOnwer user={post.user} />
      </div>
    </div>
  </div>
</div>


<style lang="scss">

.title{
  @apply font-bold py-3 sm:py-4 text-xl xs:text-2xl text-opacity-80 leading-6
}

.sub{
  @apply my-4 text-gray-900 text-opacity-80 leading-6;
}

.date{
  font-size: 15px;
  line-height: 22.5px;
  @apply mb-5 text-gray-600;
}

</style>