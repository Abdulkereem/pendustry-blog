<script>
  import "../app.postcss";
  import AppBar from "$lib/AppBar.svelte";
  import Posts from "$lib/Posts/Posts.svelte"
import Post from "$lib/Forms/Post.svelte";

  let barHeight;
</script>

<AppBar bind:barHeight />

<div class="bg-gray-50" style="margin-top: {barHeight+10}px;">
  <Post />
  <Posts />
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