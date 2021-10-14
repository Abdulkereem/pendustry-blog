<script context="module">
  import {LAPI} from './../Utilities/JSONS/endpoints.json';
   export async function load({page, fetch}){

    let url = `${LAPI}published-articles`
    let response = await fetch(url);
    if (response.ok){
      let result = await response.json();
      // console.log(Object.keys(result));
      let posts = result.articles.map(data=>{
        let goto = data.title.toLowerCase().replace(/ /g,'-').replace(/--/g, '-');
        goto = `${goto}-${data.id}`;
        return {...data, goto}
      })
      console.log(posts);
      return{
        props:{
          posts,
          pagination: result.pagination
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
  export let pagination



</script>
<div>
  <Posts pagination={pagination} posts={posts}/>
</div>
