 <script>
	import { toFullMonth } from './../../Utilities/Constants/times.js';
  import { onMount } from "svelte";
  import PostOnwer from "./PostOnwer.svelte";

  export let post;
  let content='';
  onMount(()=>{
  })


  let user={
    fullname: 'Gert Svaiko',
    profilepicture: 'im1.pgn',
    about: 'Gert Svaiko is a writer passionate about digital marketing and everything related to creating websites'
  }

  $: if(post){
    onMount(()=>{
      post={...post, date: toFullMonth(post.date)}
    })
  }

 


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
        <PostOnwer user={user} />
      </div>
      <!-- Post -->
      <div>
        <!-- head section -->
        <div>
          <div class="title">{post.title}</div>
          <div class="date"> { post.date}<span class="mx-2">-</span> {post.duration} min read</div>
          {#if post.caption}
            <div class="caption">
              <img src={post.caption} alt="caption" />            
            </div>            
          {/if}
          <div class="sub">{post.description}</div>
        </div>

        <!-- post content container -->
        <div class="my-10 sun-editor-editable"> {@html content }</div>
      </div>      
      <div class="block md:hidden">
        <PostOnwer bind:user />
      </div>
    </div>
  </div>
</div>


<style lang="scss">

.title{
    @apply font-bold py-3 sm:py-4 text-xl xs:text-2xl text-opacity-80 leading-6
  }

.sub{
  @apply my-4 text-gray-700 text-lg leading-6;
}

.date{
  font-size: 15px;
  line-height: 22.5px;
  @apply mb-5 text-gray-600;
}

</style>