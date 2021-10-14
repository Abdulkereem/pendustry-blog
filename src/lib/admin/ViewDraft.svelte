<script>
	import { readtime } from './../../Utilities/Constants/responseParser.js';
  import { onMount } from "svelte";

  export let draft;
  onMount(()=>{
  })

  let ss=(e)=>{
    console.log({e});
  }

</script>


<svelte:head>  
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
</svelte:head>
<svelte:window on:sveltekit:navigation-start={ss}></svelte:window>
<div>  
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
        <!--
        {#if !readTime}
           <Editor content={draft.content} disable={true} bind:readTime /> 
        {/if}
      -->
      </div>      
      <div class="block md:hidden">
        <!-- <PostOnwer user={draft.user} /> -->
      </div>
    </div>
  </div>
</div>


<style lang="scss">

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

</style>