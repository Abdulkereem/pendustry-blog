<script>
import Follow from "$lib/Forms/Follow.svelte";
import Modal from "$lib/Modal.svelte";


 export let user;
 let show = false
 

</script>
<div>
  <div class="block pl-2 xs:pl-0 xs:flex xs:items-center p-2" >
    <!-- image -->
    <div class="h-20 w-20 mr-8">
      <a href="/{user.username||user.id}/articles">
        <img src="{user.profilePic}" alt="user" class="user-dp" />
      </a>
    </div>
    <!-- details -->
    <div class="flex-1">
      <div>
        <a href="/{user.username||user.id}/articles" class="name">{user.accName}</a> 
        <button class="follow" on:click={()=>show=true}>Follow</button>
      </div>
      <div>{user.about}</div>
    </div>
  </div>
</div>

<Modal side="right" bind:show title="Follow {user.accName}" bottomClose={true}>
  <div class="px-1 shadow">
    <Follow user={user} />
  </div>
</Modal>

<style lang="scss">
  .user-dp{
    @apply rounded-full w-full h-full object-fill;
  }
  .name{
    @apply font-medium text-opacity-80 text-gray-900;
  }
  .follow{
    @apply ring-1 ring-indigo-900 rounded-full text-indigo-900 align-middle ml-2 
    px-4 py-0.5 transition duration-500 hover:ring-gray-200 hover:ring-2 
    ease-in-out delay-100 transform hover:bg-indigo-900 hover:text-white 
    hover:scale-110;
  }
  .about{    
    line-height: 21px;
    color: #888888;
    font-size: 14px;
  }
</style>

<!-- Gert Svaiko 
Gert Svaiko is a writer passionate about digital 
marketing and everything related to creating websites. -->