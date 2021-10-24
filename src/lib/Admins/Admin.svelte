
<script>
	import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import AdminPostsPreview from './AdminPostsPreview.svelte';
  import AdminDraftPreview from './AdminDraftPreview.svelte';
  import AdminProfile from './AdminProfile.svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
  import AddUser from '$lib/Forms/AddUser.svelte';
  import Modal from '$lib/Modal.svelte';

  export let  payload;
  let show = false;
  let tab = $page.query.get('tab');

  $: { 
    // console.log(payload);
    onMount(()=>{

      if(localStorage._tbs_){
        try {        
          let tbs = JSON.parse(atob(localStorage._tbs_))
          if(!['published','draft'].includes(tbs)){
            tab = 'published';
          }
          tab = tbs;
        } catch (error) {
          tab = 'published';
        }
      }else{
        tab = 'published';
      }
    })
  }

  const switchTab=(_tab)=>{
    if(tab == _tab) return; 
    tab = _tab 
    localStorage._tbs_ = btoa(JSON.stringify(_tab));

  }

  
</script>
<div class="cover">
  <!--Right Profile box -->
  <div class="profile-cover">
    <!-- Imported profile Component-->
    <AdminProfile profile={payload}  tabToDraft={switchTab}/>
  </div>

  <!-- Articles -->
  <div class="articles">
    <!-- Head tab  on:click={()=>tab='published'}-->
    <div class="grid cursor-pointer grid-cols-2">
      <span on:click={()=>switchTab('published')} sveltekit:noscroll class:tab={tab=='published'} class="text-center" >
        Published 
      </span>
      <span  on:click={()=>switchTab('draft')} sveltekit:noscroll class:tab={tab=='draft'} class="text-center">
        Draft
      </span>
    </div>      
    <hr class="hr" />
    <!-- Tab section -->
    {#if payload?.verified  && payload?.userName}
      <div>
        {#if tab == 'published'}
          <AdminPostsPreview total={payload.totalPublished} posts={payload.posts} />
        {:else}
          <AdminDraftPreview total={payload.totalDraft} drafts={payload.drafts} />
        {/if}
      </div>
    {/if}
  </div>

  {#if payload?.type == 1 && payload?.userName}
    <div class="fixed left-2 top-16 p-2 bg-white rounded-full" 
      style="z-index:99"
    >
      <span class="text-3xl cursor-pointer rounded-full text-indigo-300"
        on:click={()=>show=true}
      >
        <Fa icon={faUserPlus} />

      </span>
    </div>
    <Modal bind:show side="right" bottomClose={true} title="Add New User">
      <div class="shadow px-3 py-4">
        <AddUser />
      </div>
    </Modal>
  {/if}
</div>

<style lang="scss">
  .cover{
    box-sizing: border-box;
    @apply w-full block p-4 xs:px-16 sm:px-10 lg:px-32;
  }

  .profile-cover{ 
    // box-sizing: border-box;
    z-index: 100;
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