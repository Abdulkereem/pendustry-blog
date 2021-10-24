<script>
	import { saveAU, saveTK } from './../../Utilities/Constants/responseParser.js';
	import { parseError } from './../../Utilities/Constants/responseParser';
  import { UAPI } from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';  
  import { goto } from '$app/navigation';

  let email='';
  let emailError=false;
  let sendingEmail = false;
  let otpSent = null;
  let otp = '';
  let disable = true; // watch otp is neric and min of 6;
  let processing = false;
  let otpError= null;


  $: disable = (isNaN(otp) || otp.trim().length < 6)? true : false;
  
  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 
  const checkEmail=({target:{value}})=>{
    return emailError = !regex(value)? true : false;
  }

  const receiveEmail = async()=>{
    try {
      if(sendingEmail) return;
      // revalidate email 
      if(!regex(email))  return emailError = true;
      sendingEmail = true
      let res = await axios.post(`${UAPI}forgot-password`, {email});
      otpSent = true;
    } catch (error) {
      // use checker for message to limit variable
      otpSent = {error: 1, message: parseError(error)};

    }
    sendingEmail = false;
  }

  const proceed =async()=>{
    try {
      if(processing) return;
      processing = true;
      otpError = null;
      let data = await axios.post(`${UAPI}confirm-password-otp`, {email, OTP:otp});

      return goto(`/account/reset-password?otp=${otp}&email=${email}`)
    } catch (error) {
      otpError = {error: 1, message: parseError(error)};
    }

    processing = false;
  }
  

</script>

<div class="cover">
    <div class="form-cover card bg-white px-4 md:px-7 py-8">
      <div>
        <div class='flex justify-center'>
          <img height="50" width="100" src="/pen-logo.png" alt="PEN LOGO" />
        </div>
        <div class=" text-center my-3">
          
         Provide your account email to receive OTP which lasted for 10 minutes.
        </div>
      </div>
      <div class="">        
        <label for="email" class="label">Email* </label>
        <div class="w-full">
          <input id="email" name="email" bind:value={email} 
            class="inputs" placeholder="Enter email" on:blur={checkEmail}
          />
        </div>
        {#if emailError}
          <div class="errors">
            Enter a valid Email address
          </div>
        {/if}
        {#if otpSent?.message}
           <div class="errors">
             {otpSent.message}
           </div>
        {/if}
      </div>
      <div on:click={receiveEmail} 
        class="flex cursor-pointer px-2 items-center mt-2
          {otpSent == true?'justify-between':'justify-end'}
        "
      >
        {#if otpSent == true}
          <span class="text-sm text-blue-600">
            OTP sent
          </span>
        {/if}
        <span class="text-right">
          <span class="font-bold text-indigo-700">
             {otpSent?'Resend OTP': 'Receive OTP'}
           </span>
          {#if sendingEmail}
           <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
          {/if}

        </span>
      </div>

      {#if otpSent}
        <div class=" mt-4">

          <div>
            <label for="otp" class="label">OTP* </label>
            <div class="w-full">
              <input id="otp" name="otp" bind:value={otp} 
                class="inputs" placeholder="Enter email"
              />
            </div>
            {#if otpError}
               <div class="errors">
                 {otpError.message}
               </div>
            {/if}
          </div>
          <!-- Login button container -->
          <div class="flex my-6 px-2 justify-center">
            <button class="button" disabled={disable} on:click={proceed}>
              <div class="flex justify-center items-center">
                {#if !processing}
                   <span>Proceed</span>
                {:else}
                   <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
                {/if}
            </button>        
          </div>
          
        </div>
      {/if}


      <div class="text-center">
        Go back to <a class="text-indigo-500" href="/login">login</a>
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