<script>  
	import { hToken } from './../../Utilities/Constants/responseParser.js';
	import { onMount } from 'svelte';
  import { UAPI, dp_url } from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';

  let oldPassword = "";
  let newPassword = "";
  let confirmPassword = "";
  let oldPasswordError = false;
  let newPasswordError = false;
  let confirmPasswordError = false;
  let submitting = false;
  let responseData;

  const checkBlur=({target:{value, name}})=>{
    if(name == "oldPassword"){
      return oldPasswordError = !value.trim()? true : false;
    }else if(name == 'newPassword'){
      return newPasswordError = (value.trim().length < 8)? true : false;
    }else{
      return confirmPasswordError = newPassword === value.trim()? false : true;
    }
  }

  const validate=()=>{
    oldPasswordError = !oldPassword.trim()? true : false;
    newPasswordError = (newPassword.trim().length < 8)? true : false;
    confirmPasswordError = confirmPassword && newPassword === confirmPassword? false : true;
    return (oldPasswordError || newPasswordError || confirmPasswordError)? false: true;
  }

  const submit=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseData= null;
    const formdata= {
      oldPassword: oldPassword.trim(),
      newPassword: newPassword.trim(),
    }    
    try {
      let {data} = await axios.put(`${UAPI}change-password`, formdata, {headers:hToken()});
      console.log(data);
      responseData = {status: 1, message: data.message};
    } catch (err) {
      console.log({err});
      responseData = {status: 0, message: parseError(err)};
    }
    console.log(responseData);
    submitting = false;
  }


  onMount(async () => {
  });

</script>


<div class="flex justify-center mt-6">
  <div class="w-full px-3">
    <div class="text-2xl mt-2 font-medium mb-4">          
      Change Password
    </div>
    <!-- Old password -->
    <div class="my-3">
      <label for="oldPassword"  class="label">Old password*</label>
      <div class="w-full">
        <input id="oldPassword" on:blur={checkBlur} bind:value={oldPassword} name="oldPassword" 
          class="inputs" placeholder="Enter old password" 
        />
        {#if oldPasswordError}
          <div class="errors">
            Old password is required
          </div>
        {/if}
      </div>
    </div>   
      
    <!-- New password -->
    <div class="my-3">
      <label for="newPassword"  class="label">New password*</label>
      <div class="w-full">
        <input id="newPassword" on:blur={checkBlur} bind:value={newPassword} name="newPassword" 
          class="inputs" placeholder="Enter new password" 
        />
        {#if newPasswordError}
          <div class="errors">
            Password of minimum 8 chars is required
          </div>
        {/if}
      </div>
    </div>  

    <!-- Confirm password -->
    <div class="my-3">
      <label for="confirmPassord"  class="label">Confirm new password*</label>
      <div class="w-full">
        <input id="confirmPassord" on:blur={checkBlur} bind:value={confirmPassword} name="confirmPassword" 
          class="inputs" placeholder="Enter password" 
        />
        {#if confirmPasswordError}
          <div class="errors">
            Password does not match
          </div>
        {/if}
      </div>
    </div>  
    <!-- Response message -->
    {#if responseData}
      <div  class:success={responseData.status} class:errors={!responseData.status}>
          {responseData.message}
      </div>        
    {/if}

    <!-- Update button container -->
    <div class="flex my-6 px-2 justify-end">
      <button class="button" on:click={submit}>
        <div class="flex justify-center items-center">
          {#if !submitting}
            <span class="">Change Password</span>
          {:else }
            <span class="mr-4">Processing...</span>
            <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
          {/if}
        </div>
      </button>        
    </div>
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