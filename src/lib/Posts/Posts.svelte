
<script>
	import { fillMage } from './../../Utilities/Constants/posts.js';
  let date = new Date();
</script>

<div class="cover">
  <hr class="hr" />
  <div class="post-cover">
    {#each Array(20).fill(0).map((e,i)=>e+i) as item, i  }
      <div class="map">
        <!-- caption container -->
        <div class="caption-container">
          <a href="/{fillMage(i,1)}">
            <img class="caption" src="{fillMage(i,0)}.png" alt="post" />
          </a>              
        </div>
        <!-- summary container -->
        <div class="lg-texts">
          <!-- title -->
          <div class="self-start">
            <a href="/{fillMage(i,1)}" class="title ">{fillMage(i,1)}</a>
          </div>
          <!-- summary -->
          <div class="sub my-3 self-center">
            {fillMage(i,2)}
          </div>
          <!-- User details -->
          <div class="flex self-end">
            <div>
              <a href="#">
                <img src="{fillMage(i,0)}.png" alt="owner" class="h-10 w-10 rounded-full" />
              </a>
            </div>
            <div class="text-sm leading-4 ml-2">
              <div class="text-opacity-80 cursor-pointer">
                <a href="#">First name amd last name {item}</a>
              </div>
              <div class="text-opacity-60 ">
                {date.getFullYear()}/{date.getMonth()}/{date.getDate()}
              </div>
            </div>
          </div>
        </div>
        <!-- / summary end -->
      </div>    
    {/each }

  </div>

</div>
<style lang="scss">

  .cover{
    @apply w-full block py-2 px-9 xs:px-14 sm:px-6 lg:px-14
  }

  .hr{
    @apply my-10
  }
  
  .post-cover{
    @apply w-full block sm:grid  grid-cols-1 gap-3 md:gap-4 lg:gap-5 
    xs:grid-cols-2;

  }

  .map{
    // @apply grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3;
    @apply mb-5 sm:mb-2 transition ease-in-out delay-150 duration-500 grid grid-cols-1 lg:grid-cols-3 border 
    shadow-sm rounded transform hover:scale-105 hover:bg-white hover:shadow;
  }

  .caption-container{
    @apply h-52 sm:h-52 md:h-56 lg:h-full relative lg:w-full bg-red-50 lg:flex items-stretch ;
  }

  .caption{
    @apply h-full w-full object-fill;
  }

  .lg-texts{
    @apply lg:col-span-2 p-5 grid place-content-between place-items-stretch;
  }

  .title{
    @apply font-bold text-xl text-opacity-80 leading-6
  }
  .sub{
    line-height: 21px;
    color: #888888;
    font-size: 14px;
  }

</style>

