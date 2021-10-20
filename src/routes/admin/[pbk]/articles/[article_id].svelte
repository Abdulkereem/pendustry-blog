<script context="module">
  import { onMount } from 'svelte';
  import { LAPI, dp_url, banner_url } from './../../../../Utilities/API/endpoints.js';
  export async function load({page, fetch}){
    const {article_id} = page.params;
    const url = `${LAPI}single-published/${article_id}`;
    try {
      
      let res = await fetch(url);
      if(res.ok){
        let {article} = await res.json();
        return{
          props:{
           post: article
          }
        }
      }
      return{
        status: res.status,
        error: new Error("Page Not Found")
      }
    } catch (error) {
      console.log({err:error});
    }
    
  }
</script>
<script>
  import PostDetails from "$lib/Posts/PostDetails.svelte";
  import Comment from '$lib/Forms/Comment.svelte';
  import { toFullMonth } from './../../../../Utilities/Constants/times.js';


  export let post;
  let ready = false;
  $: if(post) {
    console.log({post});  
    onMount(()=>{    
      post.banner = `${banner_url}${post.banner}`;
      post.user.profilePic = `${dp_url}${post.user.profilePic}`;
      post.createdAt = toFullMonth(post.createdAt);
      post.updatedAt = toFullMonth(post.updatedAt);
      post.comments = post.comments.map(c=>({...c,createdAt:toFullMonth(c.createdAt)}));
      ready = true;
    })  

  }

</script>

<div>
  {#if ready}
    <PostDetails post={post}  />
    <Comment id={post.id} />
  {/if}
</div>