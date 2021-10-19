<script>
	import { page } from '$app/stores';
  export let path, current_page_total, total, length, search,  limit, current, movement, range, last_page;

  /**
   * 
   * @param c The current page. Optional, default is 1 
   * @param m The offset movement when current page go up or down. Optional default is 3
   * @param r The range of displayed pages link e. 1 2 3 >> or << 4 5 6 7 8 or << 4 5 6 7 >>. Optional, default is 5 
   * @param t The initial length of estimated pages from server from offest and limit. Required.
   * @param l The limit search query .Optional, Optional, default is 20
   */
  const makePages=(c=1, m=3, r=5, t, l=20)=> {
    r= t<r?t:r;
    let arr= Array(r).fill(1).map((e,i)=>e+i);
    console.log(arr);
    let d = c-m;
    if(d < 1) return arr.map((e)=>({
      text:(e),
      link: `${path?path:$page.path}?page=${e}&limit=${limit?limit:l}&search=${search?search:''}`
    }));
    // alert();
    d= d+r >t? t-r: d;
    return arr.map((e)=>({
      text:(e+d),
      link: `${path?path:$page.path}?page=${e+d}&limit=${limit?limit:l}&search=${search?search:''}`
    })); 
  }

  let links = makePages(current,movement,range,length,limit)
  // $: console.log(links, '\n \n links');


</script>
<div class="w-full block mb-5 py-2 px-9 xs:px-14 sm:px-6 lg:px-14">
  <!-- <div>{last_page} -{length}- {limit}- {current} ---{path} -={total}</div> -->
  <div class=" text-base block bg-white py-3 xs:flex justify-between items-center">

    <div class="w-full flex font-mono justify-center text-gray-900 text-opacity-80 font-medium pl-4">
      <span>{(limit*(current-1))+1} - {limit*(current-1)+current_page_total} of {total}</span>
      <span class="ml-4">Page {current} of {length}</span>

    </div>
      <div class=" w-full flex justify-center">
        <!-- Show initial page -->
        <a class="link tracking-tighter" sveltekit:prefetch 
          disabled={(current-(movement||3)) > 0?'enabled':'disabled'}
          href={`${path?path:$page.path}?page=1&limit=${limit?limit:20}&search=${search?search:''}`}          
        >
          &lt;&lt;
        </a>
        <!-- {#if (current-(movement||3)) > 0}
        {/if} -->
        <!-- The inbetween pages -->
        {#each links as link, i (i)}
          <a class="link" href={link.link} class:current={link.text==current} sveltekit:prefetch
            disabled={link.text==current?'disabled':'enabled'} 
          >
            {link.text}
          </a>
        {/each}
        <!-- Show last page -->
        <!-- {#if (length-(current)) > (movement||3)}
        {/if} -->
        <a class="link tracking-tighter" sveltekit:prefetch 
          disabled={(length-(current)) > (movement||3)?'enabled':'disabled'}
          href={`${path?path:$page.path}?page=${length}&limit=${limit?limit:20}&search=${search?search:''}`}
        >
          &gt;&gt;
        </a>
      </div>

  </div>
</div>
<style lang="scss">
  .link{
    @apply text-indigo-900 px-2 text-lg font-medium
  }

  a[disabled="disabled"] {
    pointer-events: none;
    @apply text-opacity-40;
  }


  .current{
    @apply bg-indigo-900 text-white rounded py-0 bg-opacity-80 text-opacity-90
  }
</style>