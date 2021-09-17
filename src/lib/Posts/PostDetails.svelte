<script context="module">

</script>
<script>
import { onMount } from "svelte";




onMount(()=>{
  if(window.Quill){
      quill = new Quill("#details", options);
      // let vals = quill.root.innerHTML;
  }
})

</script>


<svelte:head> 
  <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
</svelte:head>
<div>  
  <div class="flex justify-center">
    <div class="w-full max-w-3xl px-3 xs:px-6 sm:px-10">
      <!-- Quill container -->
      <div id="details"></div>
    </div>
  </div>
</div>


<style lang="scss">

</style>