<script>
	import { toFullMonth } from './../../Utilities/Constants/times.js';
  import { onMount } from "svelte";
  import PostOnwer from "./PostOnwer.svelte";

  export let post;
  let quill;


  onMount(()=>{
    if(window.Quill){
      quill = new Quill("#details",  {modules:{toolbar:false}, theme:'bubble', readOnly:true});
      quill.setContents(JSON.parse(post.content))
        // let vals = quill.root.innerHTML;
    }
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
  <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
  
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
</svelte:head>
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

        <!-- Quill content container -->
        <div id="details"></div>
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