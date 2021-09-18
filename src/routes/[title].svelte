<script context="module">
  import { details, POST } from './../Utilities/Constants/posts.js';
  export async function load({ page, context }) {
    
    // console.log(page.params.title)
    // if (res.ok) {
      let {title} = page.params;
      let index = details.findIndex((e)=>e == title);

      if(index > -1){
      const post = POST(index)
      // console.log('found', post);
      return {
        props:{
          post,
        }
      }
    }
    
    // console.log('not found');
		return {
      status: 404,
			error: new Error(`Resources not found`)
		};
  }
</script>
<script>
	import Comment  from '$lib/Forms/Comment.svelte';
  import PostDetails from "$lib/Posts/PostDetails.svelte";
  // import { toFullMonth } from './../Utilities/Constants/times.js';
  import { onMount } from 'svelte';
  export let post;

  $: if(post) {
    console.log(post);  
    onMount(()=>{
      
    // post = {...post, date: toFullMonth(post.date)}
    //  console.log(toFullMonth(post.date));

    })  

  }
</script>
<div>
   <PostDetails post={post} />
   <Comment />
</div>
<style lang="scss">

</style>