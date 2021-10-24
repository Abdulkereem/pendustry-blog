<script>
  import "../app.postcss";
  import AppBar from "$lib/AppBar.svelte";
  // import PostDetails from "$lib/Posts/PostDetails.svelte";
  // import Comment from "$lib/Forms/Comment.svelte";
  // import Modal from "$lib/Modal.svelte";

  let barHeight;
  let mobile;
  // let show = false;

  // $: console.log(show)

  // let side = 'center';
  // const sides=()=>{
  //   let all = ["left", "right", "top", "bottom", "center", 'full'];
  //   side = all[Math.floor(Math.random()* all.length)];
    // console.log(side);
  // } 

  // $: console.log(show)


</script>
<svelte:head>
  <link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet'>
  <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.css">
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/lib/codemirror.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/htmlmixed/htmlmixed.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/xml/xml.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/codemirror@5.49.0/mode/css/css.js"></script>
</svelte:head>

<AppBar bind:barHeight bind:mobile />

<div class="bg-gray-50 w-full max-w-full" style="margin-top: {barHeight+10}px;">
  <!-- <button on:click={()=>{ sides(); show = true}}>Modal</button>
  <Modal bind:show bind:side body_class="tt"> -->
    <!-- <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    <div style="w-full h-52">Here</div>
    Here -->
  <!-- </Modal> -->
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

  .round-card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
  }



  .card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  body{
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    font-weight: normal;
    @apply bg-gray-50
  }



  .bg-gradient{
    background-image:  linear-gradient(180deg, rgba(43,39,98, 0.5) 30%, rgba(34,145,227, 0)),
    linear-gradient(120deg, rgba(50,123,220, 0.8), rgba(79, 94, 149, 0.7) 40%),
    linear-gradient(230deg, rgba(19, 166, 255, 0.6) 35%, rgba(255,255,255,0) 30%),
    linear-gradient(-35deg, rgba(50, 50, 200, 0.5) 40%, rgba(255,255,255,0) 31%);
  }
</style>