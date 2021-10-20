<script>
	import { saveAU, saveTK } from './../../../Utilities/Constants/responseParser.js';
	import { parseError } from './../../../Utilities/Constants/responseParser';
  import { UAPI } from './../../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';  
  import { onMount } from 'svelte';
import { goto } from '$app/navigation';

  let email='';
  let password='';
  let emailError=false;
  let passwordError = false;
  let submitting = false;
  let responseData;
  const checkBlur=({target:{value, name}})=>{
    if(name == 'email'){
      return emailError = (!/\w+@\w+\.\w+$/.test(value))? true : false;
    }else{
      return passwordError = (value.trim().length < 8)? true : false;
    }
  }

  const validate=()=>{
    emailError = (!/\w+@\w+\.\w+$/.test(email))?true:false;
    passwordError = (password.trim().length < 8)?true:false;
    return (emailError || passwordError)? false: true;
  }

  const submit=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseData= null;
    const formdata= {
      email,
      password,
    }    
    try {
      let {data} = await axios.post(`${UAPI}login`, formdata);
      // console.log(data);
      await saveAU(data.data);
      await saveTK(data.token)
      return goto(`/admin/${data.data.id}`);
      // responseData = {staus: 1, message: 'Content successfully published'};
    } catch (err) {
      console.log({err});
      responseData = {status: 0, message: parseError(err)};
    }

    submitting = false;
  }


  onMount(async () => {
  });

</script>

<div class="cover">
    <div class="form-cover card bg-white px-4 md px-7 py-8">
      <div>
        <div class='flex justify-center'>
          <img height="50" width="100" src="/pen-logo.png" alt="PEN LOGO" />
        </div>
        <div class="welcome">
          
          Dear Admin, Login Here
        </div>
      </div>
      <div class="">        
        <label for="email" class="label">Email* </label>
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
      <!-- Brief -->
      <div class="my-3">
        <label for="password"  class="label">Password*</label>
        <div class="w-full">
          <input id="password" on:blur={checkBlur} bind:value={password} name="password" 
            class="inputs" placeholder="Enter password" 
          />
          {#if passwordError}
            <div class="errors">
              Password of minimum 8 charaters is required
            </div>
          {/if}
        </div>
      </div>    
      <!-- Response message -->
      {#if responseData}
        <div class="mb-3" class:success={responseData.status} class:errors={!responseData.status}>
            {responseData.message}
        </div>        
      {/if}

      <!-- Login button container -->
      <div class="flex my-6 px-2 justify-end">
        <button class="button" on:click={submit}>
          <div class="flex justify-center items-center">
            {#if !submitting}
              <span class="">Sign in</span>
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