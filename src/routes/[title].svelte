<script context="module">
  import {API} from './../Utilities/JSONS/endpoints.json';

  export async function load({ page, fetch }) {
      let {title} = page.params;
      let url = `${API}article/${title}`
      let res = await fetch(url);
      if(res.ok){
        let result = await res.json();
        console.log(result);
      return {
        props:{
          post: result.article
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