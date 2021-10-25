<script>
	import { UAPI } from './../../Utilities/API/endpoints.js';
  import axios from "axios";
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import { hToken, parseError } from './../../Utilities/Constants/responseParser.js';

  export let profile;
  
  let sendingEmail = false;
  let otpSent = null;
  let disable = true; // watch otp is neric and min of 6;
  let otp="", otpError= null, processing=false;

  $: disable = (isNaN(otp) || otp.trim().length < 6)? true : false;

  /** To resent OTP*/
  const receiveEmail = async()=>{
    try {
      if(sendingEmail) return;
      sendingEmail = true
      const payload = {email: profile.email};
      let res = await axios.post(`${UAPI}resend-email-confirmation-otp`, payload, {headers: hToken()});
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
      let payload = {email:profile.email, OTP:otp}
      let {data} = await axios.post(`${UAPI}confirm-email-otp`, payload , {headers: hToken()});
      otpError = {error:0, message: data.message}
      setTimeout(()=>profile.verified = 1, 4000);
    } catch (error) {
      otpError = {error: 1, message: parseError(error)};
    }
    processing = false;
  }

</script>


<div class="w-full px-3 mb-6  py-2">
  <div class="text-2xl mb-3">
    Verify your account
  </div>
  <div class="text-base mb-4">
    Enter the OTP sent to your email to validate your account.
    You can as well check your mail spam if not found in inbox.
  </div>

  <div>
    {#if otpSent == true}
      <div class="text-sm text-right text-blue-600">
        OTP sent
      </div>
    {/if}
    <label for="otp" class="label mb-1">
      <div class="flex justify-between items-center">
        <span>Enter OTP* </span>
        <div on:click={receiveEmail} 
          class="flex cursor-pointer px-2 items-center mt-2
          "
        >   
          {#if sendingEmail}
            <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
          {:else}
            <span class="font-bold text-indigo-700">
                Resend OTP
            </span>
          {/if}
        </div>
      </div>
      
    </label>
    <div class="w-full">
      <input id="otp" name="otp" bind:value={otp} 
        class="inputs" placeholder="Enter OTP sent to you email"
      />
    </div>
    {#if otpError}
       <div class="{otpError.error?'errors':'success'}">
         {otpError.message}
       </div>
    {/if}
  </div>

  <div class="flex mt-4 px-2 justify-center">
    <button disabled={disable} class="button" on:click={proceed}>
      <div class="flex justify-center items-center">
        {#if !processing}
          <span class="">Proceed</span>
        {:else }
          <span class="mr-4">Processing...</span>
          <span class="animate-spin"> <Fa icon={faSpinner} /> </span>
        {/if}
      </div>
    </button>        
  </div>

  <div class="text-center text-base px-2 my-4">
    Note: You can change your email in Change Email section below.
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