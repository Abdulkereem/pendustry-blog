<script>
  import {faLock } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  export let status;
  $: console.log(status);
</script>
<div class="cover bg-gradient">
  <div class="contain">
    <div class="w-full max-w-sm mx-auto flex justify-center">
      <div>
        <div class="w-full h-20">
          <img class="h-20" src="/pen-logo.png" alt="PENDUSRTY" />
        </div>
        {#if status == 403 || status == 401}
        <div class="text-red-300 mb-4 text-9xl">401</div>
        <div class="text-red-300 mb-3 items-center flex text-2xl">
          <span class="mr-2"><Fa icon={faLock} /></span>
          <span>Unauthorized Action </span> 
          
        </div>
        <div class="text-white text-center">You are not authorized</div>
        <div class="mb-3 text-white text-base font-normal text-center">
          Please login
        </div>
        <div>
          <button class="button animate-bounce hover:animate-none">
            <a class="link text-white"  href="/account/login" sveltekit:prefetch>
              LOGIN
            </a>
          </button>
        </div>
        {:else}
          <div class="text-red-300 mb-4 text-9xl">502</div>
          <div class="text-red-300 text-2xl">Oops! Something went wrong.</div>
          <div class="text-white text-center">It will be resolved soon.</div>
          <div class="mb-3 text-white text-base font-normal text-center">
            You can proceed to our homepage
          </div>
          <div>
            <button class="button animate-bounce hover:animate-none">
              <a class="link text-white"  href="/" sveltekit:prefetch>
                HOME PAGE
              </a>
            </button>
          </div>
        {/if}
      </div>
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

  .cover{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    bottom: 0px;
    z-index: 10000;
  }

  .contain{
    @apply h-full w-full flex justify-center items-center;
  }
</style>