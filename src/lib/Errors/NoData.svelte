<script>
  import {faFolderOpen, faPen } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  export let message;
</script>

<div class="cover bg-gradient">
  <div class="contain">    
    <div class="relative flex justify-center w-full max-w-md">
      <div class="empty mx-3">
        <span class="icon-span">
          <Fa icon={faFolderOpen}/>
        </span>
        <div class="add-icon">
          <span class="pen-wrap">
            <span>.....</span>
            <span class="flex items-center"><Fa icon={faPen} /></span>
          </span>
        </div>
        <div class="message">
          <div>Dear,</div>
          <div>No {message} is found.</div>
          <div>Kindly check back later, thanks.</div>  
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">

.cover{
    position: absolute;
    top: inherit;
    left: 0px;
    width: 100%;
    height: 100%;
    bottom: 0px;
  }
  .contain{
    @apply h-full w-full flex justify-center items-center;
  }

  .empty{
    @apply w-full h-full flex flex-col justify-center items-center h-80 
    sm:py-40 md:py-56 rounded-lg bg-white bg-opacity-90 shadow-md;
  }

  .icon-span{    
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    @apply text-9xl -mx-14 -mt-14 text-opacity-60 text-indigo-500 
    animate-pulse animate-bounce;
  }

  .message{
    position:absolute;
    bottom: 0;
    margin-bottom: 50px;
    @apply text-xl text-gray-900 text-opacity-80 font-semibold;
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