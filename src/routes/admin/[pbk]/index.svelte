<script >
  
  import { page } from "$app/stores";
  import axios from "axios";
  import { onMount } from 'svelte';
  import {LAPI, banner_url, dp_url } from './../../../Utilities/API/endpoints.js';
  import {hToken} from './../../../Utilities/Constants/responseParser';
  import { toFullMonth } from "./../../../Utilities/Constants/times";

  export let payload;
  let error=false;
  let loaded=false;

  const fetchUser=async()=>{
    try {
      //equilvalent data.data
      let pbk = $page.params.pbk.split('?')[0];
      let {data:{data}} = await axios.get(`${LAPI}prefetch-user/${pbk}`, {headers: hToken()});
      // parse date to readable and set route for view
      const mapper=(data, type="published")=>{        
        return data.map(d=>{
          let createdAt = toFullMonth(d.createdAt);
          let updatedAt = toFullMonth(d.updatedAt);
          // console.log({createdAt, updatedAt});
          let banner = `${banner_url}${d.banner}`;
          if (type=="draft") return  {...d, createdAt, updatedAt, banner};
          let go = d.title.replaceAll(/ /g,'-').replaceAll(/--/g, '-').toLowerCase();
          go = `${go}/${d.id}`;
          return {...d, createdAt, updatedAt, banner, goto:go};
        })
      }
  
      data.posts = mapper(data.published);
      data.drafts= mapper(data.drafts, 'draft');
      data.profilePic = `${dp_url}${data.profilePic}`;
      payload = data;
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
    <Admin payload={payload} />

  </div>
{/if}