
<script context="module">
	import AdminPostsPreview from './AdminPostsPreview.svelte';
  import {API} from './../../Utilities/jsons/endpoints.json'
  export async function load({page, fetch, session, stuff}){
    const url = `${API}/get-user/${page.params.pbk}`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					article: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
  }

</script>
<script>
  import { session } from "$app/stores";
  import { faFile, faBookmark, faFileAlt, faUser, faFolderOpen, faPen } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

 export let  articles;
  
  const menuList = ['name', 'Published', 'Draft'];
</script>
<div class="cover">
  <!--Right Profile box -->
  <div class="profile-cover">
    <div class="profile">
      <!-- Image -->
      <div class="flex justify-center p-4">
        <img class="profile-dp"  src="/im2.png" alt="user" />
      </div>
      <!-- MenuListBox -->
      <div class="px-5">
        <!-- Admin Name -->
        <div class="text-medium font-medium pl-2">NAME:</div>
        <div class="pl-3">Full Name</div>
        <hr class="my-2" />

        <!-- Article types -->
        <div class="text-medium pl-2 mb-2 font-medium">ARTICLES:</div>
        <div class="pl-1">
          <button class="button">
            <a class="link" href="#" >
              <span class="text-indigo-800 text-xl"><Fa icon={faBookmark} /></span>
               <span class="ml-2">Published</span> 
            </a>
          </button>
        </div>
        <div class="pl-1">
          <button class="button">
            <a class="link" href="#" >
              <span class="text-indigo-800 text-xl"><Fa icon={faFile} /></span>
               <span class="ml-2">Draft </span> 
            </a>            
          </button>
        </div>
        <div class="pl-1">
          <button class="button">
            <a class="link" href="#" >
              
              <span class="text-indigo-800 text-xl"><Fa icon={faPen} /> </span>
              <span class="ml-2">Create new </span> 
            </a>            
          </button>
        </div>
        <div></div>
      </div>
    </div>
  </div>

  <!-- Articles -->
  <div class="articles">

    {#if articles}
      <div class="relative">
        <div class="empty">
          <span class="icon-span">
            <Fa icon={faFolderOpen} />
          </span>
          <div class="no-text">You're yet to publish an article</div>
        </div>
        <div class="add-icon">
          <a href="#" class="pen-wrap">
            <span>.....</span>
            <span class="flex items-center"><Fa icon={faPen} /></span>
          </a>
        </div>
      </div>
    {:else}
      <div>
        <AdminPostsPreview />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .cover{
    box-sizing: border-box;
    @apply w-full block p-4 xs:px-16 sm:px-10 lg:px-32;
  }

  .profile-cover{ 
    box-sizing: border-box;
   @apply mr-20 block sm:fixed sm:left-0 w-full sm:w-64  md:w-80 lg:w-96 mb-5 sm:mb-0;
  }

  .profile{
    @apply block rounded-md h-full ml-0 sm:ml-5 md:ml-12 lg:ml-20 shadow 
    border-indigo-200 border transition duration-500 hover:shadow-md 
    hover:border-indigo-300 py-2 sm:pb-6;
  }

  .articles{
    @apply box-border block  max-w-full sm:ml-64 md:ml-72 md:ml-96;
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

  .empty{
    @apply w-full h-full flex flex-col justify-center items-center border-2 h-80  sm:py-40 md:py-56
    rounded
  }

  .icon-span{
    @apply text-9xl text-indigo-500 text-opacity-60 animate-pulse animate-bounce
  }
  .no-text{
    @apply text-xl text-gray-900 font-semibold
  }

  .add-icon{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    @apply text-3xl transition duration-300 hover:text-pink-900 hover:animate-none
  }

  .pen-wrap{
    @apply flex h-20 w-20 cursor-pointer border-l-2 border-t-2 border-b-2 p-5 rounded-full
    transition duration-500 hover:border-blue-500
    
  }
</style>