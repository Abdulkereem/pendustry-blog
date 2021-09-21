<script>
	import { quillTools, quillTable } from './../../Utilities/Constants/quillConstants.js';
  import { onMount } from "svelte";  
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faImage, faTable, faSpinner } from '@fortawesome/free-solid-svg-icons';


  let quill;
  let options = {
    // debug: 'info',
    modules: {
      table:true,
      toolbar: quillTools,
      'better-table': quillTable,
    },
    placeholder: 'Write your content here...',
    // readOnly: true,
    theme: 'snow'
  }

  onMount(()=>{
    if(window.Quill && window.quillBetterTable){
      Quill.register({
        'modules/better-table': quillBetterTable
      }, true)
      quill = new Quill("#editor", options);
    }
  })

  let captionPreview=null;  
  let title="hghghgh";
  let titleError =false;
  let description ="hghghg";
  let descriptionError = false;
  let caption;
  let duration;
  let contentError = false;
  let submitting= false;



  const getCaption=({target:{files}})=>{
    caption = files[0];
    captionPreview = URL.createObjectURL(caption);
  }

  const validate=()=>{
    titleError = !title.trim()?true:false;
    descriptionError = !description.trim()?true:false;
    contentError = !quill.root.innerHTML? true: false;
    return (titleError || descriptionError || contentError)? false: true;
  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'description'){
      return descriptionError = !value.trim()? true : false;
    }else{
      return titleError = !value.trim()? true : false;
    }
  }

  const addTable=()=>{
    if(!window.quillBetterTable) return;
    let tableModule = quill.getModule('better-table')
    console.log(tableModule);
    tableModule.insertTable(3, 3)
  }


  const submit=()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;

    let formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('caption', caption);
    formdata.append('content', quill.root.innerHTML);

    let payload={
      title, description, caption, content: quill.root.innerHTML
    }

    let diss = new Quill('#dis', {modules:{toolbar:false}, theme:'bubble', readOnly:true})
    diss.setContents(quill.getContents())
    setTimeout(()=>{
      submitting = false;

    }, 500)


  }
  
</script>
<svelte:head>  
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <link href="https://unpkg.com/quill-better-table@1.2.8/dist/quill-better-table.css" rel="stylesheet">
  <!-- <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.js" ></script>
  <!-- <script src="https://unpkg.com/quill-better-table@1.2.10/dist/quill-better-table.js"></script> -->
</svelte:head>
<div>
  <div id="dis" class="border-0 hover:scale-110"> </div>
  <div class="flex justify-center">
    <div class="w-full max-w-3xl px-3 xs:px-6 sm:px-10">
      <!-- Title -->
      <div class="">        
        <label for="title" class="label">TITLE*</label>
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
          <input id="description" on:blur={checkBlur} bind:value={description} name="description" 
            class="inputs" placeholder="Description" 
          />
          {#if descriptionError}
            <div class="errors">
              Description is required
            </div>
          {/if}
        </div>
      </div>
      <!-- Duration -->
      <div class="my-3">
        <label for="duration"  class="label">Duration</label>
        <div class="w-full">
          <input id="duration" bind:value={duration} name="duration" 
            class="inputs" placeholder="Duration" type="number" min="1"
          />
        </div>
      </div>
      <!-- Caption -->
      <div class="my-3">
        <div class="w-full bg-white rounded-md py-2">
          <label for="caption" class="label">
            <div class="flex items-center">
              <span class="mx-4">Caption</span>
              <span class=" text-indigo-900 text-3xl"> <Fa icon={faImage} /></span>
            </div>
            <input id="caption" on:change={getCaption} accept="image/*" type="file" hidden />
          </label>
        </div>
      </div>
      <!-- Caption preview -->
      {#if captionPreview }
        <div class="w-full h-48 mb-3 flex justify-center px-2">
          <img src={captionPreview} alt="caption"
            class="h-full max-h-full rounded border max-w-md"
          />
        </div>        
      {/if}
      <!-- Content -->
      <div>
        <div class="text-lg flex justify-between font-medium ml-2 mb-1">
          <span>CONTENT*</span> 
          <!-- Insert table button part -->
          <button class="insert" on:click={addTable}>
            <span class="flex items-center">
              <span class="mr-2">Insert table </span> <Fa icon={faTable} />
            </span>            
          </button>
        </div>
        <!-- Quill container -->
        <div id="editor"></div>
        <!-- Validation message -->
        {#if descriptionError}
          <div class="errors">
            Content is required
          </div>
        {/if}
      </div>

      <!-- Create button container -->
      <div class="flex my-6 px-2 justify-end">
        <button class="button" on:click={submit}>
          <div class="flex justify-center items-center">
            {#if !submitting}
              <span class="">Create</span>
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
    font-size: 16px;
    font-family: roboto;
    line-height: 28px;
    @apply rounded-md w-full py-1 px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    @apply block pl-1 font-medium;
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-2 
    hover:shadow
  }
  .errors{
    @apply text-red-400 text-center text-base
  }

  .insert{
    @apply mr-2 bg-green-50 border ring-gray-200 rounded-full px-2 text-base tracking-wider 
    transition duration-500 transform delay-100 hover:bg-red-50 bg-opacity-40
    hover:text-black hover:scale-110 hover:bg-opacity-20;
  }
</style>