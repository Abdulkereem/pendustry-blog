<script>
	import { hToken, parseError } from './../../Utilities/Constants/responseParser.js';
	import { UAPI, dp_url } from './../../Utilities/API/endpoints.js';
  import Fa from "svelte-fa/src/fa.svelte";
  import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons";
  import axios from "axios";


  export let profile;
  let IMG, disable=true, uploading=false, responseData;

  $: disable = (!IMG || uploading);

  const processImage=({target:{files}})=>{
    IMG=files[0];
    document.getElementById('cap').src = URL.createObjectURL(IMG);
  }

  const uploadNow=async()=>{
    try {
      uploading = true;
      responseData = null;
      let formData = new FormData();
      formData.append('profileimage', IMG);
      let {data:{filename}} = await axios.post(`${UAPI}upload-profile-image`, formData, {headers: hToken()});
      // console.log(filename); 
      profile.profilePic = `${dp_url}${filename}`;
      responseData = {status: 1, message: "Profile picture successfully uploaded"};
    } catch (err) {      
      responseData = {status: 0, message: parseError(err)};
    }
    uploading = false;
    setTimeout(()=> responseData= null, 5000);
  }

</script>

<div class="w-full px-3 mt-6 ">
  <div class="text-2xl text-center mt-2 font-medium mb-4">
    Upload Profile Picture
  </div>

  <div class="mt-4 flex justify-center">
    <img id="cap" src="{profile.profilePic}" class="w-52 border-2 h-52" 
      alt="profile-picture"
    >
  </div>

  <div class="form-cover">
    <label for="banner" class="label">
      <div class="flex items-center">
        <span class="text-sm">Upload</span>
        <span class="pl-2 text-indigo-900 text-3xl"> <Fa icon={faImage} /></span>
      </div>
      <input id="banner" on:change={processImage} accept="image/*" type="file" hidden />
    </label>
    <button disabled={disable} on:click={uploadNow}
      class="bg-indigo-900 text-center py-2 px-5 text-white rounded-2xl hover:shadow"
    >
      {#if !uploading}
        <span>
          Save
        </span>
      {:else}
        <span class="text-2xl px-3 flex items-center justify-center">
          <Fa icon={faSpinner}  spin/>
        </span>
      {/if}
    </button>
  </div>

  <!-- Response message -->
  {#if responseData}
  <div  class:success={responseData.status} class:errors={!responseData.status}>
      {responseData.message}
  </div>        
{/if}

</div>

<style>
  .label{
    @apply max-w-max block  rounded-2xl px-2 border-2 py-1 mb-1 font-medium
    cursor-pointer;
  }
  .form-cover{
    @apply w-full space-x-2 bg-white items-start flex justify-center 
    mt-3 rounded-md py-2
  }

  .button{
    @apply w-40 bg-indigo-900 text-white text-lg rounded py-2 
    hover:shadow
  }
  .errors{
    @apply text-red-800 mx-1 text-center text-sm bg-red-200;
  }

  .success{
    @apply text-center text-sm text-indigo-600;
  }
</style>