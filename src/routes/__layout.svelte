<script>
  import "../app.postcss";
  import AppBar from "$lib/AppBar.svelte";
  import PostDetails from "$lib/Posts/PostDetails.svelte";
  import Comment from "$lib/Forms/Comment.svelte";
  import Modal from "$lib/Modal.svelte";

  let barHeight;
  let mobile;
  let show = false;

  // $: console.log(show)

  let side = 'center';
  const sides=()=>{
    let all = ["left", "right", "top", "bottom", "center"];
    side = all[Math.floor(Math.random()* all.length)];
    console.log(side);
  } 

  // $: console.log(side)


</script>

<AppBar bind:barHeight bind:mobile />

<div class="bg-gray-50 w-full max-w-full" style="margin-top: {barHeight+10}px;">
  <button on:click={()=>{ sides(); show = true}}>Modal</button>
  <Modal bind:show bind:side body_class="tt" >
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    Here
  </Modal>
  <slot></slot>

</div>

<style global lang="scss">
  input{
    outline: none;
    &:focus{
      outline: none;
    }
  }

  .tt{
    background-color: red;
  }
  *{
    @apply box-border 
  }
  body{
    @apply bg-gray-50
  }
</style>