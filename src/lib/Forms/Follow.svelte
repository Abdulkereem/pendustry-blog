<script>  
	import { onMount } from 'svelte';
  import { UAPI } from './../../Utilities/API/endpoints.js';
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';
  let email='';
  let emailError=false;
  let submitting=false;
  let responseError;
  export let id, user;

  onMount(()=>{
    console.log(user);
    if(localStorage._cun_){
      try {
        let cun = JSON.parse(atob(localStorage._cun_));
        if(cun.email) email = cun.email;
        if(cun.name) fullName = cun.name;
      } catch (error) {
        
        return;
      }
    }
  })

  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 

  const validate=()=>{
    emailError = !regex(email)?true:false;
    return !emailError

  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'email'){
      return emailError = !regex(value)? true : false;
    }
  }

  const followNow=async()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;
    responseError=null;
    let payload={ email }
    try {
      let { data }= await axios.post(`${UAPI}follow/${user.id}`, payload);
      console.log({data});
      localStorage._cun_= btoa(JSON.stringify({email}))
      responseError=false;
    } catch (error) {
      console.log({error});
      responseError = true;
    }
    submitting = false;
    setTimeout(()=>{responseError=null},6000);
  }

</script>
<div class=" w-full px-2 py-5">
  <div class="mb-2 text-base font-base">
    Receive email notifications about new articles from {user.accName}.
  </div>
  <p  class="mb-5 text-base font-base">Your email would not be exposed</p>

  <!-- Email -->
  <div class="my-2">
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
  
  <!-- Api Response Continer -->
  <div class="mb-2">
    {#if responseError == true}
      <div class="errors">
        Oops! Something went wrong, please retry.
      </div>
    {/if}
    {#if responseError == false}
      <div class="successful">
        Congrats! You have successfully subscribed to email 
        notification whenever {user.accName} posts new articles.
      </div>
    {/if}

  </div>

  <!-- Create button container -->
  <div class="flex my-6 px-2 justify-end">
    <button class="button" on:click={followNow}>
      <div class="flex justify-center items-center">
        {#if !submitting}
          <span class="">Follow</span>
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
    line-height: 22px;
    @apply outline-none rounded-md w-full py-2 px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    @apply block pl-1 font-medium;
  }

  .button{
  @apply w-40 bg-indigo-900 text-white text-lg rounded py-1
    hover:shadow;
  }
  .errors{
    @apply text-red-600 text-center text-base py-2 px-1
  }

  .successful{
    box-sizing: border-box;
    @apply text-center py-2  text-base px-1  bg-indigo-200
  }
</style>