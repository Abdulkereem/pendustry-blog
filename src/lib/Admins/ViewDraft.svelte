<script>
	import { page } from '$app/stores';
	import { hToken, readtime } from './../../Utilities/Constants/responseParser.js';
  import { onMount } from "svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faBook, faSpinner } from '@fortawesome/free-solid-svg-icons';
  import { LAPI } from './../../Utilities/API/endpoints.js';
  import axios from 'axios';
  import { goto } from '$app/navigation';
  
  export let draft;
  let processing, returned=false, successful=false;
  const publish=async()=>{
    if(processing) return;
    processing = true;
    returned = false;
    try {
      await axios.get(`${LAPI}publish/${draft.id}`, {headers: hToken()});
      successful  = true;
      setTimeout(()=>{
        goto(`${$page.path.replace('drafts', 'articles')}`, {replaceState:true});
      },1500) 
    } catch (error) {
      successful = false;
      setTimeout(()=>{returned = false}, 1500)
    }
    processing= false;
    returned = true;
  }

  let ss=(e)=>{
    console.log({e});
  }

</script>


<svelte:head>  
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
</svelte:head>
<svelte:window on:sveltekit:navigation-start={ss}></svelte:window>
<!-- <div>   -->
  <div class="flex justify-center">
    <div class="w-full max-w-3xl px-3 xs:px-8 sm:px-16">
      <!-- Post -->
      <div>
        <h2 class="text-center mb-3 text-lg tracking-widest font-mono">DRAFT PREVIEW</h2>
        <hr />
        <div class="date mt-3"> 
          <div class="mb-2">LAST UPDATED ON:  &nbsp; { draft.updatedAt}</div>
          <div>CREATED ON: &nbsp; {draft.createdAt} </div>
          {#if readtime(draft.description) }
            <div>ESTIMATED READ TIME: {readtime(draft.description)} </div>              
          {/if}
        </div>
        <!-- head section -->
        <div>
          <div class="title">{draft.title}</div>
          {#if draft.banner}
            <div class="banner">
              <img src="{draft.banner}" alt="banner" />        
            </div>            
          {/if}
          <div class="sub">
            {draft.description? draft.description: 'Not added'}
          </div>
        </div>

        <!-- draft content container -->
        <div class="my-10 sun-editor-editable px-0 shadow-sm bg-gray-50"
          style="padding: 0px; background-color: inherit"
        >
            {@html draft.content }
        </div>
      
    </div>
  </div>
  {#if !successful}
    <div class="publish">
      <div class="pr-4 pb-2">
        <button class="button" on:click={publish}>
          {#if processing}
            <span class="flex text-lg items-center py-1 px-6">
              <span><Fa icon={faSpinner} size="lg" /></span>
              <span class="ml-3">Processing...</span>
            </span>
          {:else}
            <span class="flex text-lg items-center py-1 px-6">
              <span><Fa icon={faBook} size="lg" /></span>
              <span class="ml-3">Publish</span>
            </span>
          {/if}
        </button>
      </div>
    </div>
  {/if}
  {#if returned}
    <div class="to-article bg-white w-full max-w-sm">
      
      {#if successful == false}
        <div class="text-red-500 font-medium">
          Oops! Something went wrong, please retry.
        </div>
      {:else}
        <div >
          <div class="pl-2 font-medium text-indigo-900 pb-1"> Successfully published</div>
          <div class=" flex items-center">
            <span class="mr-2"><Fa icon={faSpinner} spin size="lg" /></span>
            <span>
              Proceeding to published article....
            </span>
    
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>


<style lang="scss">

  .publish{
    position: fixed;
    right: 0;
    bottom: 0;
  }
  .to-article{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    @apply p-3
  }

.title{
    @apply font-bold py-3 sm:py-4 text-xl xs:text-2xl text-opacity-80 leading-6
  }

.sub{
  @apply my-4 text-gray-700 text-lg leading-6;
}

.date{
  font-size: 15px;
  line-height: 22.5px;
  font-weight: 500;
  @apply mb-5 text-opacity-70 text-gray-900;
}

.button{
    @apply border-2 border-indigo-700 bg-indigo-900 text-white w-full mb-2  
    transition duration-500 hover:border-indigo-300 hover:bg-white rounded
    hover:text-indigo-900
  }

</style>