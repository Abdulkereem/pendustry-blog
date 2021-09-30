<script context="module">
  import {API} from './../Utilities/JSONS/endpoints.json';
   export async function load({page, fetch}){

    let url = `${API}articles`
    let response = await fetch(url);
    if (response.ok){
      let result = await response.json();
      // console.log(Object.keys(result));
      console.log(result);
      return{
        props:{
          posts: result.articles
        }
      }
    }else{
      return{
        status: response.status,
        error: new Error(`Something went wrong, ${response}`)
      }
    }

   }
</script>
<script>
  import Posts from "$lib/Posts/Posts.svelte";
  export let posts;



</script>
<div>
  <Posts posts={posts}/>
</div>
