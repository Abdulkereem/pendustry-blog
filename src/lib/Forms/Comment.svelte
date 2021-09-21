<script>  
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';

  let fullName ='';
  let email='';
  let content='';
  let fullNameError= false;
  let emailError=false;
  let contentError=false;
  let submitting=false;

  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 

  const validate=()=>{
    fullNameError = !fullName.trim()?true:false;
    emailError = !regex(email)?true:false;
    contentError = !content.trim()?true:false;
    return (fullNameError || emailError || contentError)? false: true;
  }

  const checkBlur=({target:{value, name}})=>{
    if(name == 'email'){
      return emailError = !regex(value)? true : false;
    }else if(name == 'fullName'){
      return fullNameError = !value.trim()? true : false;
    }else{
      return contentError = !value.trim()? true : false;
    }
  }

  const comment=()=>{
    if(submitting) return;
    if(!validate()) return;
    submitting = true;

    
    let payload={
      fullName, email, content
    }

    setTimeout(()=>{
      submitting = false;

    }, 500)


  }

</script>
<div class="flex justify-center mt-5">
  <div class="w-full max-w-3xl px-3 xs:px-10 sm:px-14 ">
    <!-- Comment Header -->
    <div class="text-2xl font-medium mb-2">Comment here</div>
    <!-- Form part  -->
    <div class=" w-full">
      <!-- fullName -->
      <div class="">        
        <label for="fullName" class="label">Full name*</label>
        <div class="w-full">
          <input id="fullName" name="fullName" bind:value={fullName} 
            class="inputs" placeholder="Full name" on:blur={checkBlur}
          />
        </div>
        {#if fullNameError}
            <div class="errors">
              Full name is required
            </div>
          {/if}
      </div>
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
      <!-- Content -->
      <div class="mb-3">
        <label for="content"  class="label">Comment *</label>
        <div class="w-full">
          <textarea id="content" on:blur={checkBlur} bind:value={content} name="content" 
            class="inputs" placeholder="Write your comment here" rows="5" 
          />
          {#if contentError}
            <div class="errors">
              Comment is required
            </div>
          {/if}
        </div>
      </div>

      <!-- Create button container -->
      <div class="flex my-6 px-2 justify-end">
        <button class="button" on:click={comment}>
          <div class="flex justify-center items-center">
            {#if !submitting}
              <span class="">Comment</span>
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
    font-size: 16px;
    font-family: roboto;
    line-height: 28px;
    @apply outline-none rounded-md w-full py-1 px-2 border transition duration-500 transform 
    delay-100 focus:ring-1 ring-indigo-900 focus:border-indigo-900 ring-opacity-40 
    hover:border-indigo-200 hover:ring-opacity-10;
  }

  .label{
    @apply block pl-1 font-medium;
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-2 
    hover:shadow
  }
  .errors{
    @apply text-red-400 text-center text-base
  }
</style>