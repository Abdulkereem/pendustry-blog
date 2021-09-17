<script>
	import { quillTools } from './../../Utilities/Constants/quillConstants.js';
  import { onMount } from "svelte";  
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons'


  let quill;
  let options = {
    // debug: 'info',
    modules: {
      toolbar: quillTools
    },
    placeholder: 'Write your content here...',
    // readOnly: true,
    theme: 'snow'
  }

  onMount(()=>{
    if(window.Quill){
      console.log(document.getElementById('editor'));
      quill = new Quill("#editor", options);
      // let vals = quill.root.innerHTML;
    }
  })

  let captionPreview=null;  
  let title="hghghgh";
  let titleError =false;
  let description ="hghghg";
  let descriptionError = false;
  let caption;
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

    // let diss = new Quill('#dis', {modules:{toolbar:false}, theme:'bubble', readOnly:true})
    // diss.setContents(quill.getContents())
    submitting = false;


  }
  
</script>
<svelte:head>  
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
</svelte:head>
<div>
  <!-- <div id="dis" class="border-0 hover:scale-110"> </div> -->
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
        <div class="text-lg font-medium ml-2 mb-1">CONTENT*</div>
        <!-- Quill container -->
        <div id="editor"></div>
      </div>

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
  .cover{
    @apply w-full px-2 xs:px-4 sm:px-10 md:px-16 lg:px-20
  }
  #editor{
    // height: 375px;
    @apply h-56 xs:h-60 sm:h-64 md:h-72 lg:h-80;
  }

  .inputs{
    font-size: 16px;
    font-family: roboto;
    line-height: 28px;
    @apply rounded-md w-full py-1 px-2 border transition duration-500 transform delay-100 focus:ring-1 ring-indigo-900 
    focus:border-indigo-900 ring-opacity-40;
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
</style>