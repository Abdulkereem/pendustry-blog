
<script>	
	import { bannerPic, hToken, parseReadTime, removedReadTime } from './../../Utilities/Constants/responseParser.js';
  import { onMount } from "svelte";  
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faImage, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';
  import { LAPI } from './../../Utilities/API/endpoints.js';
  import Editor from "$lib/Forms/Editor.svelte";

  export let draft;
  let content='';
  let bannerPreview=null;  
  let title="First Article";
  let titleError =false;
  let description ="First article by beyond";
  let descriptionError = false;
  let banner;
  let bannerError = false;
  let contentError = false;
  let submitting= false;
  let responseData;
  let saving= false;
  let readTime;



  $: if(draft) {
    onMount(()=>{
      title = draft.title;
      description = removedReadTime(draft.description);
      bannerPreview = bannerPic(draft.banner);
      content = draft.content;
    })
  }

  const getBanner=({target:{files}})=>{
    banner = files[0];
    bannerPreview = URL.createObjectURL(banner);
    bannerError = false;
  }

  const validate=()=>{
    titleError = !title.trim()?true:false;
    descriptionError = !description.trim()?true:false;
    contentError = !content.trim()? true: false;
    return (titleError || descriptionError || contentError)? false: true;
  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'description'){
      return descriptionError = !value.trim()? true : false;
    }else{
      return titleError = !value.trim()? true : false;
    }
  }

 $: if(content.trim()){
   console.log('\n\n changes ',{content}, '\n\n chnges');
    (async()=>{
      saving = true;
      await setTimeout(()=>saving = false, 500)
  })()

 }


  const submit=async()=>{
    if(submitting) return;
    if(!validate()) return;
    if(!draft && !banner){
      return bannerError = true;
    }
    submitting = true;
    responseData= null; 
    let data;
    const url = draft? `${LAPI}update-draft/${draft.id}`:`${LAPI}post-article`;
    const method= draft?"PUT":"POST";
    if(!draft){
      data = new FormData();
      data.append('title', title);
      data.append('description', parseReadTime(description,readTime));
      data.append('banner', banner);
      data.append('content', content);
    }else{
      data={ description: parseReadTime(description,readTime), title, content }
      console.log({data}, 'see description');
    }
    console.log({content}, 'leaving');
    // let headers= {...hToken()};
    // if(!draft) headers['content-type'] ='multipart/form-data'}
    try {
      let response = await axios({url, method, data,  headers:hToken()});
      console.log(response);
      responseData = {staus: 1, message: 'Content successfully published'};
    } catch (err) {
      console.log({err});
      responseData = {staus: 0, message: 'Oops! Something went wrong.'};
    }
    submitting = false;
  }
  
</script>

<div class="w-full min-w-full max-w-full block">
  <div class="flex justify-center w-full">
    <div class="w-full max-w-4xl px-3 xs:px-6 sm:px-10">
      <!-- Title -->
      <div class="">        
        <label for="title" class="label">TITLE* </label>
        <div class="w-full">
          <input id="title" name="title" bind:value={title} 
            class="inputs" placeholder="Title" on:blur={checkBlur}
          />
        </div>
        {#if titleError}
            <div class="errors">
              Title is required
            </div>
          {/if}
      </div>
      <!-- Brief -->
      <div class="my-3">
        <label for="description"  class="label">DESCRIPTION*</label>
        <div class="w-full">
          <input id="description" on:blur={checkBlur} bind:value={description} name="Summary" 
            class="inputs" placeholder="Description" 
          />
          {#if descriptionError}
            <div class="errors">
              Description is required
            </div>
          {/if}
        </div>
      </div>
      <!-- banner -->
      <div class="my-3">
        <div class="w-full bg-white rounded-md py-2">
          <label for="banner" class="label">
            <div class="flex items-center">
              <span class="mx-4">Cover photo</span>
              <span class=" text-indigo-900 text-3xl"> <Fa icon={faImage} /></span>
            </div>
            <input id="banner" on:change={getBanner} accept="image/*" type="file" hidden />
          </label>
        </div>
        {#if bannerError}
            <div class="errors">
              Upload cover image
            </div>
          {/if}
      </div>
      <!-- banner preview -->
      {#if bannerPreview }
        <div class="w-full h-48 mb-3 flex justify-center px-2">
          <img src={bannerPreview} alt="banner"
            class="h-full max-h-full rounded border max-w-md"
          />
        </div>        
      {/if}
      <!-- Content -->
      <div>
        <div class="text-lg flex justify-between font-medium ml-2 mb-1">
          <span>CONTENT*</span> 

          <span class="flex items-center mr-2">          
            {#if !saving}
              <span class=" text-green-500"><Fa icon={faCheck} /></span>
            {:else }
              <span class="mr-4 animate-pulse">Saving...</span>
              <span class="animate-spin text-indigo-900"> <Fa icon={faSpinner} /> </span>
            {/if}
          </span> 
        </div>
        <!-- Suneditor container -->
        <div class="w-full max-w-full" ><Editor bind:readTime  bind:content /></div>

        <!-- Validation message -->
        {#if contentError}
          <div class="errors">
            Content is required
          </div>
        {/if}
      </div>
      <!-- Response message -->
      {#if responseData}
        <div class="mb-3" class:success={responseData.staus} class:errors={!responseData.staus}>
            {responseData.message}
        </div>        
      {/if}

      <!-- Create button container -->
      <div class="flex my-6 px-2 justify-end">
        <button class="button" on:click={submit}>
          <div class="flex justify-center items-center">
            {#if !submitting}
              <span class="">{draft? 'Update':'Create'}</span>
            {:else }
              <span class="mr-4">Processing...</span>
              <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
            {/if}
          </div>
        </button>        
      </div>
      
    </div>
  </div>
</div>
<style lang="scss">
  #editor{
    // height: 375px;
    @apply h-56 xs:h-60 sm:h-64 md:h-72 lg:h-80;
  }

  .inputs{
    font-size: 18px;
    font-family: roboto;
    line-height: 32px;
    @apply rounded-md w-full py-1 px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    @apply block pl-1 mb-1 font-medium;
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-2 
    hover:shadow
  }
  .errors{
    @apply text-red-800 mx-1 text-center text-base bg-red-200;
  }

  .success{
    @apply text-center text-base;
  }

  .insert{
    @apply mr-2 bg-green-50 border ring-gray-200 rounded-full px-2 text-base tracking-wider 
    transition duration-500 transform delay-100 hover:bg-red-50 bg-opacity-40
    hover:text-black hover:scale-110 hover:bg-opacity-20;
  }
</style>