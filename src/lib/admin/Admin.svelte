
<script>
	import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import AdminPostsPreview from './AdminPostsPreview.svelte';
  import AdminDraftPreview from './AdminDraftPreview.svelte';

  export let  payload;
  let tab = $page.query.get('tab');

  let {path} = $page;
  $: {
    
    
 
      if(!['published','draft'].includes($page.query.get('tab'))){
        tab = 'published';
        $page.query.append('tab', tab);
      }else{
        tab = $page.query.get('tab');
      }
  }

  
import AdminProfile from './AdminProfile.svelte';
</script>
<div class="cover">
  <!--Right Profile box -->
  <div class="profile-cover">
    <!-- Imported profile Component-->
    <AdminProfile profile={payload} />
  </div>

  <!-- Articles -->
  <div class="articles">
    <!-- Head tab  on:click={()=>tab='published'}-->
    <div class="grid grid-cols-2">
      <a href="{path}?tab=published" class:tab={tab=='published'} class="text-center" >
        Published 
      </a>
      <a  href="{path}?tab=draft" class:tab={tab=='draft'} class="text-center">
        Draft
      </a>
    </div>      
    <hr class="hr" />
    <!-- Tab section -->
    <div>
      {#if tab == 'published'}
        <AdminPostsPreview total={payload.totalPublished} posts={payload.posts} />
      {:else}
        <AdminDraftPreview total={payload.totalDraft} drafts={payload.drafts} />
      {/if}
    </div>
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
  .articles{
    @apply box-border block  max-w-full sm:ml-64 md:ml-72 md:ml-96;
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

  .tab{
    @apply rounded-t  py-1 text-lg font-medium border-l-2 border-t-2 border-r-2 border-indigo-300
  }

  .hr{
    @apply my-3
  }
</style>