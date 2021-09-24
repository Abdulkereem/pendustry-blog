<script context="module">
  import {API} from './../../../Utilities/JSONS/endpoints.json';
  export async function load({page, fetch}){
    // const url =`${API}/get-user/${page.params.pbk}`;
		// const res = await fetch(url);

    let tab = page.query.get('tab');
    if(!tab || !['published','draft'].includes(tab)){
      tab = 'published';
      page.query.append('tab', tab);
    }

		if (true) {
      return {
        props: {
					// article: await res.json(),
          tab,
				}
			};
		}
    
		return {
      status: 404,
      error : new Error(`Could not load page`)
		};
  }
  
</script>
<script >
  import Admin from "$lib/Admin/Admin.svelte";

  export let tab;

</script>
<div class="w-full max-w-full">
  <Admin bind:tab />

</div>