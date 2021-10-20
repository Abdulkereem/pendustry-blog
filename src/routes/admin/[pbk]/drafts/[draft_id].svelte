<script>
  import { onMount } from 'svelte';
  import { hToken } from './../../../../Utilities/Constants/responseParser.js';
  import { LAPI, banner_url } from './../../../../Utilities/API/endpoints.js';
  import ViewDraft from "$lib/Admin/ViewDraft.svelte";
  import { toFullMonth } from './../../../../Utilities/Constants/times.js';
  import { removedReadTime } from './../../../../Utilities/Constants/responseParser';
  import { page } from '$app/stores';
import axios from 'axios';
import { goto } from '$app/navigation';


  
  export let draft;
  let ready = false;
  let error = false;

  const fetchDraft=async()=>{
    try {
      let {draft_id} = $page.params;
      let {data} = await axios.get(`${LAPI}single-draft/${draft_id}`, {headers: hToken()});
      draft = data.draft;
      console.log({draft}); 
      draft.banner = `${banner_url}${draft.banner}`;
      draft.createdAt = toFullMonth(draft.createdAt);
      draft.updatedAt = toFullMonth(draft.updatedAt);
      draft.description = removedReadTime(draft.description);
    } catch (err) {
      console.log({err})
      error = true;
      return goto('/__error')
    }
    ready = true;
  }

  onMount(async()=>{
     await fetchDraft();
  })


</script>
  {#if ready}
    <ViewDraft draft={draft} />
  {/if}
<div>

    
</div>