<script>
  import { page } from "$app/stores";
  import { faFile, faBookmark, faPen } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  export let  profile;
  
  let {path} = $page;
</script>
    <div class="profile">
      <!-- Image -->
      <div class="flex justify-center p-4">
        <img class="profile-dp"  src="{profile.profilePic}" alt="user" />
      </div>
      <!-- MenuListBox -->
      <div class="px-5">
        <!-- Admin Name -->
        <div class="text-medium font-medium pl-2">NAME:</div>
        <div class="pl-3 text-lg text-opacity-40">{profile.accName}</div>
        <hr class="my-2" />

        <!-- Article types -->
        <div class="text-medium pl-2 mb-2 font-medium">ARTICLES:</div>
        <div class="pl-1">
          <button class="button">
            <a class="link" href="{path}/articles" >
              <span class="text-indigo-800 text-xl"><Fa icon={faBookmark} /></span>
               <span class="ml-2">Published {profile.totalPublished}</span> 
            </a>
          </button>
        </div>
        <div class="pl-1">
          <button class="button">
            <a class="link" href="{path}/drafts" >
              <span class="text-indigo-800 text-xl"><Fa icon={faFile} /></span>
               <span class="ml-2">Draft {profile.totalDraft} </span> 
            </a>            
          </button>
        </div>
        <div class="pl-1">
          <button class="button">
            <a sveltekit:prefetch class="link" href="{path}/editor" >
              
              <span class="text-indigo-800 text-xl"><Fa icon={faPen} /> </span>
              <span class="ml-2">Create new </span> 
            </a>            
          </button>
        </div>
      </div>
    </div>

<style lang="scss">

  .profile{
    @apply block rounded-md h-full ml-0 sm:ml-5 md:ml-12 lg:ml-20 shadow-md
    border-indigo-200 border transition duration-500 hover:shadow-md 
    hover:border-indigo-300 py-2 sm:pb-6;
  }

  .profile-dp{
    @apply rounded-full h-44 w-44 border border-gray-200 p-px;
  }

  .button{
    @apply border-2 border-indigo-300 w-full mb-2 text-black 
    transition duration-500 hover:border-indigo-700 hover:rounded
  }

  .link{
    @apply w-full flex justify-center items-center leading-8 tracking-wide 
    transition duration-500 hover:bg-indigo-900 hover:bg-opacity-60
    hover:text-white
  }

</style>