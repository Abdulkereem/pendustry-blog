<script>
  import {faFolderOpen, faPen } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  export let message;
</script>

<div class="relative">
  <div class="empty">
    <span class="icon-span">
      <Fa icon={faFolderOpen} />
    </span>
    <div class="message">{message}</div>
  </div>
  <div class="add-icon">
    <a href="#" class="pen-wrap">
      <span>.....</span>
      <span class="flex items-center"><Fa icon={faPen} /></span>
    </a>
  </div>
</div>

<style lang="scss">

  .empty{
    @apply w-full h-full flex flex-col justify-center items-center border-2 h-80 
    sm:py-40 md:py-56 rounded;
  }

  .icon-span{
    @apply text-9xl text-indigo-500 text-opacity-60 animate-pulse animate-bounce;
  }

  .message{
    @apply text-xl text-gray-900 font-semibold;
  }

  .add-icon{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    @apply text-3xl transition duration-300 hover:text-pink-900 hover:animate-none;
  }

  .pen-wrap{
    @apply flex h-20 w-20 cursor-pointer border-l-2 border-t-2 border-b-2 p-5 
    rounded-full transition duration-500 hover:border-blue-500;
  }

</style>