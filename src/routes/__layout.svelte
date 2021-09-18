<script>
  import "../app.postcss";
  import AppBar from "$lib/AppBar.svelte";
  import PostDetails from "$lib/Posts/PostDetails.svelte";
  import Comment from "$lib/Forms/Comment.svelte";

  let barHeight;
  let mobile;
</script>

<AppBar bind:barHeight bind:mobile />

<div class="bg-gray-50" style="margin-top: {barHeight+10}px;">
<!-- <Comment />
<PostDetails post={{title:'', fullname:'',about:'', content:'{}'}} /> -->
  <slot></slot>

</div>

<style global lang="scss">
  input{
    outline: none;
    &:focus{
      outline: none;
    }
  }
  *{
    @apply box-border
  }
</style>