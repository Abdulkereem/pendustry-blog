<script context="module">
  import { toFullMonth } from './../Utilities/Constants/times.js';
	import { dpPic, bannerPic } from './../Utilities/Constants/responseParser.js';
  import {LAPI} from './../Utilities/JSONS/endpoints.json';
  
  export async function load({ page, fetch }) {
    console.log(page.params);
      let {id} = page.params;
      id= id.split("-").slice(-1);
      let url = `${LAPI}single-published/${id}`
      let res = await fetch(url);
      if(res.ok){
        let result = await res.json();
        // console.log(result);
       let post = result.article;
       post.user.profilePic = dpPic(post.user.profilePic);
       post.banner = bannerPic(post.banner);
      return {
        props:{
          post,
          id,
        }
      }
    }
    
    // console.log('not found');
		return {
      status: res.status,
			error: new Error(`Resources not found`)
		};
  }
</script>
<script>
  import Comment  from '$lib/Forms/Comment.svelte';
  import PostComments from '$lib/Posts/PostComments.svelte';
  import PostDetails from "$lib/Posts/PostDetails.svelte";
  // import { toFullMonth } from './../Utilities/Constants/times.js';
  import { onMount } from 'svelte';
  export let post;
  export let id;
  export let goto;
  let comments=[];

  $: if(post) {
    onMount(()=>{      
      post.createdAt = toFullMonth(post.createdAt);
      // console.log({post});  
      post.updatedAt = toFullMonth(post.updatedAt);
      comments = post.comments.map(c=>({...c,createdAt:toFullMonth(c.createdAt)}))
    })
  }

  $: console.log(comments, 'from parent');

</script>
<div>
   <PostDetails post={post}  goto={goto} />
   <Comment bind:comments id={post.id} />
   <PostComments id={post.id} comments={comments} total={post.totalComments} />
</div>
<style lang="scss">

</style>