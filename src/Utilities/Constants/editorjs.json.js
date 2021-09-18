/**
 * <script>
import { onMount } from "svelte";



  let editor;

  onMount(()=>{
    if(window.EditorJS){
    //   alert();
      editor = new EditorJS({
        holder: 'editorjs',
        tools: { 
          header:  {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3
            }
          }, 
          list: { 
            class: List, 
            inlineToolbar: true 
          },
          linkTool:LinkTool,
          raw: RawTool,
          image: SimpleImage,
          class: ImageTool,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          quote: Quote,
          table: Table,

        },
        onReady: () => {
          console.log('Editor.js is ready to work!')
        },
      })
    }
  })

</script>
<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/link@2.1.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/raw"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/image@2.3.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
  <script src="https://unpkg.com/editorjs-table"></script>
</svelte:head>
<div>
  <div id="editorjs" class="bg-white">

  </div>

</div>
<style lang="scss">
  
</style>
 */