
<script>
	import { page } from '$app/stores';
	import { parseError } from './../../Utilities/Constants/responseParser.js';
	import { goto } from '$app/navigation';
  import { UAPI } from './../../Utilities/API/endpoints.js';
  import axios from "axios";
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';

  let email= $page.query.get('email') || null;
  let newPassword = "";
  let confirmPassword = "";
  let newPasswordError = false;
  let confirmPasswordError = false;
  let submitting = false;
  let responseData;

  const checkBlur=({target:{value, name}})=>{
   if(name == 'newPassword'){
      return newPasswordError = (value.trim().length < 8)? true : false;
    }else{
      return confirmPasswordError = newPassword === value.trim()? false : true;
    }
  }

  const validate=()=>{
    newPasswordError = (newPassword.trim().length < 8)? true : false;
    confirmPasswordError = confirmPassword && newPassword === confirmPassword? false : true;
    return (newPasswordError || confirmPasswordError)? false: true;
  }

  const submit=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseData= null;
    const formdata= {
      password: newPassword.trim(), email
    }    
    try {
      let {data} = await axios.post(`${UAPI}reset-password`, formdata);
      console.log(data);
      responseData = {status: 1, message: "Password successfuly change"};
      setTimeout(()=> goto('/account/login', {replaceState:true}) ,5000);      
    } catch (err) {
      console.log({err});
      responseData = {status: 0, message: parseError(err)};
      submitting = false;
    }
  }

</script>

<div class="cover">
  <div class="form-cover card bg-white px-4 md:px-7 py-8">
    <div>
      <div class='flex justify-center'>
        <img height="50" width="100" src="/pen-logo.png" alt="PEN LOGO" />
      </div>
      <div class=" text-center my-3">
        
       Reset your password here.
      </div>

      <!-- New password -->
      <div class="my-3">
        <label for="newPassword"  class="label">New password*</label>
        <div class="w-full">
          <input id="newPassword" on:blur={checkBlur} bind:value={newPassword} name="newPassword" 
            class="inputs" placeholder="Enter new password" type="password"
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
            class="inputs" placeholder="Enter password" type="password" 
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
</div>


<style lang="scss">
  .cover{
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    background-image:  linear-gradient(180deg, rgba(43,39,98, 0.5) 30%, rgba(34,145,227, 0)),
      linear-gradient(120deg, rgba(50,123,220, 0.8), rgba(79, 94, 149, 0.7) 40%),
      linear-gradient(230deg, rgba(19, 166, 255, 0.6) 35%, rgba(255,255,255,0) 30%),
      linear-gradient(-35deg, rgba(50, 50, 200, 0.5) 40%, rgba(255,255,255,0) 31%);
    @apply flex place-items-center justify-center px-2 xs:px-10
     sm:px-20;
  }
  .form-cover{
    width:100%;
    max-width: 500px;
    @apply grid grid-cols-1 rounded
  }
  
  .inputs{
      font-size: 18px;
      font-family: roboto;
      line-height: 32px;
      @apply rounded-md w-full py-1 px-2 border transition duration-500 transform 
      delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
      hover:border-indigo-200 hover:ring-opacity-10;
    }
  
    .label{
      @apply block pl-1 mb-1 font-medium;
    }
  
    .button{
      @apply w-40 bg-indigo-900 text-white text-lg rounded py-2 
      hover:shadow
    }
    .errors{
      @apply text-red-800 mx-1 text-center text-base bg-red-200;
    }
  
    .success{
      @apply text-center text-base;
    }
  
    .welcome{
      @apply font-bold text-center animate-pulse text-lg text-indigo-900 mb-5;
    }
  </style>