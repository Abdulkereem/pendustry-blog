<script>  
	import { hToken, saveAU } from './../../Utilities/Constants/responseParser.js';
	import { onMount } from 'svelte';
  import { UAPI, dp_url } from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';
  export let profile;
  let firstName =profile?.firstName ||'';
  let lastName =profile?.lastName || '';
  let userName =profile?.userName || '';
  let about =profile?.about || '';
  let firstNameError= false;
  let lastNameError=false;
  let userNameError=false;
  let aboutError=false;
  let submitting=false;
  let responseError;


  const validate=()=>{
    firstNameError = !firstName.trim()?true:false;
    lastNameError = !lastName.trim()?true:false;
    userNameError = userName.trim().length < 3?true:false;
    aboutError = about.trim().length > 200?true:false;
    return (firstNameError || lastNameError || userNameError || aboutError)? false: true;
  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'lastName'){
      return lastNameError = !value.trim()? true : false;
    }else if(name == 'firstName'){
      return firstNameError = !value.trim()? true : false;
    }else if(name == 'userName'){
      return userNameError = value.trim().length < 3? true : false;
    }else{
      return aboutError = value.trim().length > 200? true : false;
    }
  }

  const updateNow=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseError=null;
    let payload={
      firstName:firstName.trim(),
      lastName: lastName.trim(), 
      userName: userName.trim(), 
      about: about.trim(),
    }
    try {
      let {data:{data}} = await axios.put(`${UAPI}update-user`, payload, {headers:hToken()});
      console.log(data);
      data.profilePic = `${dp_url}${data.profilePic}`;
      profile = data;
       /** Save user to local storage*/
      await saveAU(profile);
      responseError=false;
    } catch (error) {
      console.log({error});
      responseError = true;
    }
    submitting = false;
    setTimeout(()=>{responseError=null},5000);
  }

</script>
<div class="flex justify-center py-1 mt-2">
  <div class="w-full px-3">
    <!-- Comment Header -->
    <div class="text-2xl font-medium mb-4">Update Basic Details</div>
    <!-- Form part  -->
    <div class=" w-full">
      <!-- firstName -->
      <div class="mb-3">        
        <label for="firstName" class="label">First name*</label>
        <div class="w-full">
          <input id="firstName" name="firstName" bind:value={firstName} 
            class="inputs" placeholder="First name" on:blur={checkBlur}
          />
        </div>
        {#if firstNameError}
            <div class="errors">
              First name is required
            </div>
          {/if}
      </div>

      <!-- lastName -->
      <div class="mb-3">        
        <label for="lastName" class="label">Last name*</label>
        <div class="w-full">
          <input id="lastName" name="lastName" bind:value={lastName} 
            class="inputs" placeholder="Last name" on:blur={checkBlur}
          />
        </div>
        {#if lastNameError}
            <div class="errors">
              Last name is required
            </div>
          {/if}
      </div>

      <!-- userName -->
      <div class="mb-3">        
        <label for="userName" class="label">Username*</label>
        <div class="w-full">
          <input id="userName" name="userName" bind:value={userName} 
            class="inputs" placeholder="Username" on:blur={checkBlur}
          />
        </div>
        {#if userNameError}
            <div class="errors">
              Username of minimum length 3 is required
            </div>
          {/if}
      </div>

      <!-- about -->
      <div class="mb-3">        
        <label for="about" class="label">About me  <span></span></label>
        <div class="w-full">
          <textarea id="about" maxlength="200" name="about" bind:value={about} 
            class="inputs" placeholder="About me" on:blur={checkBlur}
          />
        </div>
        {#if aboutError}
            <div class="errors">
              Maximum length expected is 200.
            </div>
          {/if}
      </div>
      <!-- Api Response Continer -->
      <div class="mb-2">
        {#if responseError == true}
          <div class="errors">
            Oops! Something went wrong, please retry.
          </div>
        {/if}
        {#if responseError == false}
          <div class="successful">
            Details sucessfully updated.
          </div>
        {/if}

      </div>

      <!-- Create button container -->
      <div class="flex my-6 px-2 justify-end">
        <button class="button" on:click={updateNow}>
          <div class="flex justify-center items-center">
            {#if !submitting}
              <span class="">Update</span>
            {:else }
              <span class="mr-4">Processing...</span>
              <span class="animate-spin"> <Fa icon={faSpinner} /> </span>

            {/if}
          </div>
        </button>        
      </div>

    </div>
  </div>
  <!-- Form end -->
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

  .successful{
    box-sizing: border-box;
    @apply text-center py-2 text-sm  bg-indigo-200
  }
</style>