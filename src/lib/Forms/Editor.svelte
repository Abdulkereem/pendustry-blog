<script>
  // import 'suneditor/dist/css/suneditor.min.css';
  // import suneditor from 'suneditor';
  // import plugins from 'suneditor/src/plugins';
  import katex from 'katex'
  import 'katex/dist/katex.min.css';  
  import { onMount } from 'svelte';
  // import en from 'suneditor/src/lang/en';

  let editor;
  let errors =false;
  export let content="";

  const loadEditor=()=>{
    try {
      if(window.SUNEDITOR && window.CodeMirror ){
        editor = SUNEDITOR.create('sample',{
          katex: katex,
          codeMirror:  window.CodeMirror?window.CodeMirror:null,      
          height: 300,
          resizingBar: true,
          charCounter  :true,
          imageMultipleFile: true,
          placeholder: "Write your content here",
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            '/', // Line break
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio', 'math'], // You must add the 'katex' library at options to use the 'math' plugin.
            /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print'],
            ['save', /*'template'*/]
          ],
          // lang: en
        });
  
          // editor = editor.create('sample', {});
        editor.onChange = function (contents, core) {
          
           console.log('onChange', contents) 
          content = contents;
        }
      }  
      errors = false    
    } catch (error) {
      errors = true
      console.error(error)
    }
  }
  onMount(()=>{
    
    loadEditor();

    let interval = setInterval(()=>{
      if(!editor){
       return loadEditor()
      }

      clearInterval(interval);
      console.log('inter');
      content && editor.setContents(content);
    }, 500)

  })

</script>
<svelte:head>
  <!-- <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/assets/css/suneditor.css" rel="stylesheet"> -->
  <!-- <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/assets/css/suneditor-contents.css" rel="stylesheet"> -->
  <!-- languages (Basic Language: English/en) -->
  <!-- <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/htmlmixed/htmlmixed.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/xml/xml.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/css/css.js"></script> -->
</svelte:head>
<div class="w-full max-w-full min-w-full flex items-stretch">
  <textarea class="place-self-stretch justify-self-stretch" 
    style="width: 100%; min-width-100%" id="sample" 
  >
</textarea>
</div>