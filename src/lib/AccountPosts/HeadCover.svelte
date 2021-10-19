<script>
import Modal from "$lib/Modal.svelte";

export let user, total;
let show = true;
</script>
<div >
  <div class="img-cover" 
    style=" postion:relative;
      background-position: center; background:url({user.profilePic}); 
      background-repeat: no-repeat; background-size: 100% 100% "
    >
    <div class="stack flex  bg-red-200 justify-center items-center">
      <div class="name-case">
        {user.accName}
      </div>
    </div>
  </div>
  <div class="options px-4">
    <div class="w-full xs:mx-4 sm:mx-10 md:mx-14 mb-4 xs mb-0 lg:mx-24">
      <h2 class="hh">ABOUT</h2>
      <hr />
    </div>
    <div class="w-full xs:mx-4 sm:mx-10 md:mx-14 lg:mx-24">
      <h2 class="hh">STATS</h2>
      <hr class="hr" />
      <div class="px-1 ">
        <div class="stats">
          <span class="text-sm font-semibold">ARTICLES</span>
          <span>{total} </span>         
        </div>
        <hr class="hr" />
        <div class="stats">
          <span class="text-sm font-semibold">FOLLOWERS</span>
          <span>{total} </span>         
        </div>
        <hr class="hr" />
        <div class="stats">
          <span class="text-sm font-semibold">LIKES</span>
          <span>{Math.floor(Math.random()*1000)} </span>         
        </div>
        <hr class="hr" />
        <div class="mt-3 text-right">
          <button class="follow">Follow</button>  
        </div>
      </div>

    </div>
  </div>
  <hr />

  <Modal bind:show >jnjnjnj</Modal>
</div>

<style lang="scss">
  .hr{
    @apply border-indigo-100
  }
  .follow{
    @apply ring-1 ring-indigo-900 rounded-full text-indigo-900 align-middle  
    px-8 py-1 transition duration-500 hover:ring-gray-200 hover:ring-2 
    ease-in-out delay-100 transform hover:bg-indigo-900 hover:text-white 
    hover:scale-110;
  }
  
  .options{
    @apply  py-4 block xs:flex justify-end
  }
  .img-cover{
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: 100%;
    @apply w-full h-56 sm:h-72;
  }

  .stack{
    position: absolute;
    left: 0;
    top:inherit;
    width:100%;
    height: inherit;
    background-color:rgba(0,0,0, 0.5);
  }
  .name-case{
    @apply text-white flex justify-center items-center w-full h-full text-2xl
    font-medium  text-opacity-80;
  }
  
  .hh{
    @apply text-gray-900 text-opacity-70 font-bold tracking-widest
  }

  .stats{
    @apply text-gray-900 text-opacity-80 ml-2 font-medium
    flex justify-between mb-1 mt-2
  }

</style>