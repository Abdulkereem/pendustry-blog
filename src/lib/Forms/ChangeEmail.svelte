<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { UAPI } from './../../Utilities/API/endpoints.js';
  import axios from 'axios';
	import { hToken, parseError } from './../../Utilities/Constants/responseParser.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';

  export let profile;
  let email='';
  let emailError=false;
  let submitting = false;
  let responseData;

  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 

  const checkBlur=({target:{value}})=>{
    emailError = !regex(value)
  }

  onMount(()=>{
    email = profile?.email || '';
  })

  const submit=async()=>{
    if(submitting) return;
    if(!regex(email)) return;
    if(email == profile.email) return;
    submitting = true;
    responseData= null;   
    try {
      let {data} = await axios.put(`${UAPI}change-email`, {email}, {headers: hToken()} );
      responseData = {status: 1, message:data.message};
      profile.email = email;
      profile.verified = 0;
    } catch (err) {
      // console.log({err});
      responseData = {status: 0, message: parseError(err)};
    }
    submitting = false;
    setTimeout(()=>{
      localStorage.removeItem('AU');
      goto('/account/login', {replaceState: true});

    }
      , 4000);
  }

</script>


<div class="w-full px-3 mb-6  py-3">
  <div class="text-2xl mb-4">
    Change Your Account Email
  </div>

  <div class="">        
    <label for="email" class="label mb-2">Email* </label>
    <div class="w-full">
      <input id="email" name="email" bind:value={email} 
        class="inputs" placeholder="Enter email" on:blur={checkBlur}
      />
    </div>
    {#if emailError}
        <div class="errors">
          Enter a valid Email address
        </div>
      {/if}
  </div>

  {#if responseData}
    <div class="mb-3 {responseData.status?'success':'errors'}">
        {responseData.message}
    </div>        
  {/if}

  <div class="flex my-6 px-2 justify-end">
    <button class="button" on:click={submit}>
      <div class="flex justify-center items-center">
        {#if !submitting}
          <span class="">Change Email</span>
        {:else }
          <span class="mr-4">Processing...</span>
          <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
        {/if}
      </div>
    </button>        
  </div>
  
</div>

<style lang="scss">

  .inputs{
    line-height: 24px; 
    font-size: 16px;
    @apply py-2 outline-none rounded w-full px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    font-weight: 500;
    font-size: 16px;
    @apply block pl-1 text-opacity-70;
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-1 
    hover:shadow
  }

  .errors{

    @apply text-red-500 text-center text-base
  }

  .success{
    box-sizing: border-box;
    @apply text-center py-2 text-sm  bg-indigo-200 
  }
</style>