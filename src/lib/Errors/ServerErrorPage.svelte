<script>
  import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  // export let message;
</script>

<div class="w-full max-w-sm mx-auto flex justify-center">
  <div>
    <div class="w-full h-20">
      <img class="h-20" src="/pen-logo.png" alt="PENDUSRTY" />
    </div>
    <div class="text-red-300 mb-4 text-9xl">500</div>
    <div class="text-red-300 mb-3 items-center flex text-2xl">
      <span class="mr-2"><Fa icon={faFireAlt} /></span>
      <span>Internal Sever Error</span> 
      
    </div>
    <div class="text-white">Something went wrong.</div>
    
    <div class="text-white">We are working on it</div>
    <div class="mb-3 text-white text-base font-normal">You can proceed to our homepage</div>
    <div>
      <button class="button animate-bounce hover:animate-none">
        <a class="link text-white"  href="/" sveltekit:prefetch>
          HOME PAGE
        </a>
      </button>
    </div>


  </div>
</div>

<style lang="scss">
.button{
    @apply border-2 border-indigo-500 w-full rounded mb-2 text-black px-5
    transition duration-500 hover:border-indigo-700 hover:rounded
  }

  .link{
    @apply w-full flex justify-center items-center leading-8 tracking-wide 
    transition duration-500 hover:bg-indigo-900 hover:bg-opacity-60
    hover:text-white
  }
</style>