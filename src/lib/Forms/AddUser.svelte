<script>  
	import { hToken, parseError } from './../../Utilities/Constants/responseParser.js';
  import { UAPI } from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';

  let firstName ='';
  let lastName = '';
  let lastNameError = false;
  let email='';
  let password='';
  let firstNameError= false;
  let emailError=false;
  let passwordError = false;
  let submitting=false;
  let responseData;


  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 

  const validate=()=>{
    firstNameError = !firstName.trim()?true:false;
    emailError = !regex(email)?true:false;
    lastNameError = !lastName.trim()?true:false;
    passwordError = (password.trim().length < 8)?true:false;
    return (firstNameError || emailError || lastNameError || passwordError )? false: true;
  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'email'){
      return emailError = !regex(value)? true : false;
    }else if(name == 'firstName'){
      return firstNameError = !value.trim()? true : false;
    }else if(name == 'lastName'){
      return lastNameError = !value.trim()? true : false;
    }else{
      return passwordError = (password.trim().length < 8)?true:false;
    }
  }

  const addUserNow=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseData=null;
    let payload={
      firstName, email, password, lastName
    }
    try {
      let data = await axios.post(`${UAPI}/register-user`, payload, {headers: hToken()});
      // console.log(data);
    
      responseData = {
        status: 1,
        message: 'User successfully created. Usere can proceed to login to verify new account.'
      };
    } catch (err) {
      console.log({err});
      responseData = {status: 0, message: parseError(err)};
    }
    submitting = false;
    setTimeout(()=>{responseData=null},6000);
  }

</script>

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

  <!-- firstName -->
  <div class="">        
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
  <!-- Email -->
  <div class="my-3">
    <label for="email"  class="label">Email *</label>
    <div class="w-full">
      <input id="email" on:blur={checkBlur} bind:value={email} name="email" 
        class="inputs" type="email" placeholder="Email" 
      />
      {#if emailError}
        <div class="errors">
          Valid email is required
        </div>
      {/if}
    </div>
  </div>
  <!-- Password -->
  <div class="my-3">
    <label for="password"  class="label">Password*</label>
    <div class="w-full">
      <input id="password" on:blur={checkBlur} bind:value={password} name="password" 
        class="inputs" placeholder="Enter password" type="password" 
      />
      {#if passwordError}
        <div class="errors">
          Password of minimum 8 charaters is required
        </div>
      {/if}
    </div>
  </div>
  <!-- Api Response Continer -->
  {#if responseData}
    <div  class:success={responseData.status} class:errors={!responseData.status}>
        {responseData.message}
    </div>        
  {/if}

  <!-- Create button container -->
  <div class="flex my-6 px-2 justify-end">
    <button class="button" on:click={addUserNow}>
      <div class="flex justify-center items-center">
        {#if !submitting}
          <span class="">Add User</span>
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
    font-size: 16px;
    line-height: 28px;
    @apply outline-none rounded-md w-full py-1 px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    @apply block pl-1 font-medium text-lg;
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-1
    hover:shadow
  }
  .errors{
    @apply text-red-400 text-center text-base
  }

  .success{
    @apply py-2 rounded bg-indigo-900 text-center text-white text-sm
    mx-2 xs:mx-5 sm:mx-10 md:mx-20 bg-opacity-90
  }
  
</style>