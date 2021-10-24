<script>
	import ChangeEmail from './../Forms/ChangeEmail.svelte';
	import Modal  from '$lib/Modal.svelte';
  import UpdatePassword from "$lib/Forms/UpdatePassword.svelte";
  import EditProfile from "$lib/Forms/EditProfile.svelte";
  import { faFile, faBookmark, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
  import { page } from "$app/stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import UploadDp from '$lib/Forms/UploadDP.svelte';
import VerifyEmail from '$lib/Forms/VerifyEmail.svelte';

  export let  profile;
  export let tabToDraft;
  let show = false;
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
        <div class="pl-3 text-lg text-opacity-40">{profile.accName.toUpperCase()}</div>
        <hr class="my-2" />
        <!-- Profile details -->
        <div class="pl-1">
          <button class="button" on:click={()=>show=true}>
            <span class="link" >
              
              <span class="text-indigo-800 text-xl"><Fa icon={faUser} /> </span>
              <span class="ml-2">Profile </span> 
            </span>            
          </button>
        </div>
        <!-- Article types -->
        <!-- <div class="text-base pl-2 mb-2 xs:mb-0 font-semibold">ARTICLES:</div> -->
        <!-- ACCOUNT MUST BE VERIFIED AND USERNAME SET -->
        {#if profile?.verified && profile?.userName}
          <div class="pl-1">
            <button class="button">
              <a class="link" disabled="{profile.totalPublished?'':'disabled'}"
              href="/{profile.id}/articles" 
              >
                <span class="text-indigo-800 text-xl"><Fa icon={faBookmark} /></span>
                <span class="ml-2">Published {profile.totalPublished}</span> 
              </a>
            </button>
          </div>
          <div class="pl-1">
            <button class="button">
              <span class="link"  on:click={()=>tabToDraft('draft')} 
              >
                <span class="text-indigo-800 text-xl"><Fa icon={faFile} /></span>
                <span class="ml-2">Draft {profile.totalDraft} </span> 
              </span>            
            </button>
          </div>
          <div class="pl-1">
            <button class="button">
              <a sveltekit:prefetch class="link" href="{path}/editor-new" >
                
                <span class="text-indigo-800 text-xl"><Fa icon={faPen} /> </span>
                <span class="ml-2">Create new </span> 
              </a>            
            </button>
          </div>
        {:else}
          <div class="mt-2 text-base">
            Verify your email and set your username.
            <br />
            Click on profile above
          </div>
        {/if}
      </div>
    </div>
    <Modal bind:show side="right" bottomClose={true} title="Profile Details">
      {#if !profile.verified}
      <div class="shadow">
        <VerifyEmail bind:profile />
      </div>
      {/if}
      <div  class="shawdow">
        
      </div>
      <div class="shadow">
        <EditProfile bind:profile  />
      </div>
      <div class="shadow  my-5">
        <UploadDp bind:profile />
      </div>
      <div class="shadow  my-6">
        <ChangeEmail bind:profile />
      </div>
      <div class="shadow">
        <UpdatePassword />
      </div>
    </Modal>

<style lang="scss">

  .profile{
    @apply block rounded-md h-full ml-0 sm:ml-5 md:ml-12 lg:ml-20 shadow-md
    border-indigo-200 border transition duration-500 hover:shadow-md 
    hover:border-indigo-300 py-2 sm:pb-6 mb-10 sm:mb-0;
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

  a[disabled="disabled"] {
    pointer-events: none;
  }

</style>