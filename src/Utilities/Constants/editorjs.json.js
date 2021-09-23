/**
 * Quill Extracted from post 
 * import { quillTools, quillTable } from './../../Utilities/Constants/quillConstants.js';
 *   let quill;
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

   const addTable=()=>{
    if(!window.quillBetterTable) return;
    let tableModule = quill.getModule('better-table')
    console.log(tableModule);
    tableModule.insertTable(3, 3)
  }

  
  <!-- Insert table button part -->
  <button class="insert" on:click={addTable}>
    <span class="flex items-center">
      <span class="mr-2">Insert table </span> <Fa icon={faTable} />
    </span>            
  </button>

  
<!-- Quill container -->
<div id="editor"></div>

 * <svelte:head>  
  <!-- <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"> -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css" rel="stylesheet">

  <link href="https://unpkg.com/quill-better-table@1.2.8/dist/quill-better-table.css" rel="stylesheet">
  <!-- <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/quill-better-table@1.2.10/dist/quill-better-table.min.js" ></script>
  <!-- <script src="https://unpkg.com/quill-better-table@1.2.10/dist/quill-better-table.js"></script> -->
</svelte:head>
 * 
 *  <script>
import { onMount } from "svelte";




 */