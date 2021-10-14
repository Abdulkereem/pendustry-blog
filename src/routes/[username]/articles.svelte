<script >
  
  import { page } from "$app/stores";
  import axios from "axios";
  import { onMount } from 'svelte';
  import {LAPI, banner_url, dp_url } from './../../Utilities/JSONS/endpoints.json'; 
  import { toFullMonth } from "./../../Utilities/Constants/times";
import AccountPostCover from "$lib/AccountPosts/AccountPostCover.svelte";

  export let user, pagination, articles;
  let error=false;
  let loaded=false;

  $: console.log({user, pagination, articles});
  const fetchUser=async()=>{
    try {
      //equilvalent data.data
      let {username} = $page.params;
      let {data} = await axios.get(`${LAPI}user-articles/${username}`);
      // parse date to readable and set route for view

      const mapper=(data, type="published")=>{        
        return data.map(d=>{
          let createdAt = toFullMonth(d.createdAt);
          let updatedAt = toFullMonth(d.updatedAt);
          // console.log({createdAt, updatedAt});
          let banner = `${banner_url}${d.banner}`;
          if (type=="draft") return  {...d, createdAt, updatedAt, banner};
          let go = d.title.replace(/ /g,'-').replace(/--/g, '-').toLowerCase();
          go = `${go}/${d.id}`;
          return {...d, createdAt, updatedAt, banner, goto:go};
        })
      }
      data.user.profilePic = `${dp_url}${data.user.profilePic}`;
      user = data.user;
      pagination = data.pagination,  
      articles = await mapper(data.articles);
      // console.log({data});
    } catch (err) {
      console.log({err})
      error = true;
    }
  
    loaded = true;
  }

  onMount(async()=>{
     await fetchUser();
  })
</script>
{#if !error && loaded}
  <div class="w-full max-w-full">
    <AccountPostCover articles={articles} user={user} pagination={pagination} />
  </div>
{/if}