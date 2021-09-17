<script>
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from "svelte";

  export let barHeight = 60;
  let showSearch= false;
  let searchKey="";

  const toggleSearch=()=>{
    if(showSearch && searchKey.trim()){
     return alert(searchKey)
    }    
    barHeight = showSearch? 60:100;
    showSearch = !showSearch;
  }

  
  const monitorScreen=()=>{
    if(showSearch){
      showSearch = window.innerWidth > 640? false: true;
      barHeight = showSearch? 100:60;
    }
  }
 

  onMount(()=>{
    window.addEventListener('resize', monitorScreen)
  });

  
  const easeEvent=()=>{
    window.removeEventListener('resize', monitorScreen)
  };
  


</script>
<nav class="nav" style={`height: ${barHeight}px;`}>
  <div class="w-full">
  <!-- Top flex container -->
    <div class="flex h-full self-stretch items-center">
      <div class="flex h-full self-stretch">
        <img src="pen-logo.png" width="120" height="100" alt="LOGO" />
        <strong class="blog">
          BLOG
        </strong>
      </div>
      <div class=" w-full flex">
        <div class="w-1/2 sm:w-5/6 ">
          <div class="flex hidden sm:flex justify-center">
            <input bind:value={searchKey} class="input-lg w-3/5 lg:w-2/5" />
            <span class="spanicon flex hover:motion-safe:animate-spin">
              <Fa icon={faSearch} />
            </span>
          </div>
          <div class="h-full flex justify-center">
            <span on:click={toggleSearch} 
              class="spanicon h-full flex sm:hidden"
            >
              <Fa icon={faSearch} />
            </span>
          </div>
        </div> 
        <div class="justify-end flex items-center w-1/2 sm:w-1/6">
          <button class="sign-in-anim ">
            <span class="md:px-1 lg:px-4">SIGN IN</span>
          </button>
        </div>     
      </div>
    </div>
    <!-- mobile scale search -->
    {#if showSearch}
    <hr class=" text-black my-1" />
      <div class="w-full py-1 bg-gray-50 rounded">
        <div class="w-full px-2 md:px-12">
          
          <input bind:value={searchKey} 
            class="input-mob placeholder-gray-500" 
            placeholder="Enter word and click on search icon"
          />
        </div>    

      </div>
    {/if}
  </div>
</nav>

<svelte:window on:beforeunload={easeEvent}/>

<style lang="scss">
  /* $col: blue;*/
  .nav{
    width: 100%;
    z-index: 100;
    background: white;
    position: fixed;
    top: 0;
    @apply shadow-md px-2 md:px-10 flex items-center;
  }

  .spanicon{
    @apply self-stretch items-center cursor-pointer hover:shadow rounded-full text-2xl p-2;
  }

  .input-lg{
    @apply border p-1 ring-0 rounded-lg focus:border-indigo-900;
  }

  .input-mob{
    @apply border p-1 ring-0 w-full border-indigo-100 rounded-lg focus:border-indigo-900;
  }

  .sign-in-anim{
    @apply transition duration-500 delay-100 ease-in-out ring-1 rounded 
    py-1 px-2 font-semibold transform hover:bg-gradient-to-r from-gray-800 to-gray-900 
    hover:text-white ring-gray-800 hover:shadow 
    ;
  }

  .blog{
    @apply transition duration-500 ease-in-out self-center animate-pulse ml-4 sm:ml-8 md:ml-16 md:text-xl 
    hidden sm:inline font-bold transform hover:scale-105 hover:text-blue-900 ;
  }


</style>