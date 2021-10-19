<script>
  import { onMount } from "svelte";



  export let show=false;
  export let delay= false;
  export let side='center';
  export let closeButton=true;
  export let bottomClose = false;
  export let manual = false;
  export let title="";
  export let zIndex = 101;
  let document;
  const toggleModal=({target})=>{
    if(show){
      let modal = document.getElementById('modal');
      if( target == modal && !manual){
          show = false;          
          setTimeout(()=> delay= false, 450);
      } 
    }
  }

  const closeModal=()=>{
    if(!show){
      show=true;
      delay = true;
    }else{
      show = false;
      setTimeout(()=> delay= false, 1000);
    }
  }
  const escapeModal=(evt)=>{
    // console.log(evt.key);
    if (evt.key == "Escape") {
      if(manual || !delay) return;       
      show = false;          
      setTimeout(()=> delay= false, 450);
    }
  }

  onMount(()=>{
    document= window.document;

    return function(){
      window.document.body.style.overflow = "auto";
    }
  })

  $:{
    let m=document?.body
    if(show){
      if(m) m.style.overflow = "hidden";
    }else{
      if(m)m.style.overflow = "auto";
    }
  }


  $: {
    // console.log({"foromlog":show});
    if(!show) setTimeout(()=>delay= false, 450);
    if(show)delay=true;
  }

</script>

<svelte:window on:click={toggleModal} on:keydown={escapeModal} />
{#if delay}
  <div class={show?'modal':'modal-leaving'} style="z-index: {zIndex};" id='modal'>
    <div id="cover"  class={side} style="background: {show?'white':'transparent'}">
      <!-- visible white body -->
      <div class={show?`content-${side}`:`content-${side}-leaving`}  id="content" style="">
        <!-- Top Header Section -->
        <div class="relative flex items-center p-4 h-20  text-lg ">
          <!-- Tile -->
          <div class="flex items-center w-full h-14">{title}</div>
          <!-- Close Icon -->
          {#if closeButton}
            <div class="absolute rounded-full top-50 right-4">
              <button on:click={closeModal} 
                class="px-3 text-2xl text-opacity-70 text-gray-900" 
              >
                &times;
              </button>
            </div>       
          {/if}
        </div>
        <hr />
        <!-- Children slot -->
        <div class="" style="padding: 15px;">
          <slot></slot>
        </div>
        <!-- Bottom close button -->
        {#if bottomClose && side}
          <hr />
          <div class="bottom-close">
            <button on:click={closeModal} 
              class="top-close-outside text-sm bottom-close-button "
            >
              Close
            </button>
          </div>          
        {/if}
      </div>
    </div>
  </div>  
{/if}

<style lang="scss">
  $all-sides: left, right, top, bottom, center, 'full';


  @mixin modal-side($sides){    
    @each $side in $sides{
      .#{$side}{
        box-sizing: border-box;
        background: white;
        position: absolute;          
        @if $side == center{         
          width: 90%;
          height: 80%;
          max-width: 500px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          @media only screen and (min-width: 900px) {
            max-width: 650px;
          }
        }
        @else if $side == 'full'{         
          width: 98%;
          height: 98%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        @else{
          #{$side}: 0;
          @if $side == right or $side == left{ 
            width: 96%; top:0; max-width:380px; max-height: 100%;  height: 100%;
          }
          @else{
            width: 100%;
            max-height: 380px;
            height: 90%;
          }
        }
      }

    }
  }

  @include modal-side($all-sides)

  /** The visible white part*/  
  @mixin modal-content-container($sides) {    
    @each $side in $sides{
      .content-#{$side}{
        margin:0%;     
        box-sizing: border-box;
        background-color: white;
        width: 100%;
        height: 100%;
        @if $side == center or $side == 'full'{
          border-radius: 5px;
        }
        max-width: 100%; max-height: 100%;
        overflow-y: auto; 
        animation: #{$side} 0.4s ease;
      }

      .content-#{$side}-leaving{
        background-color: white;
        width: 100%;
        height: 100%;
        @if $side == center{
          border-radius: 5px;
        }
        max-width: 100%; max-height: 100%;
        animation: #{$side}-leaving 0.45s ease-out;
      }
    }
  }

  @include modal-content-container($all-sides)

  /** Animation mixin for the visible white part*/
  @mixin modal-cover-slide($sides){
    @each $side in $sides{
      @if $side == center or $side == 'full'{
        @keyframes #{$side}{
          from{transform: scale(0.5); -webkit-transform: scale(0.5);}
          to{transform: scale(1); -webkit-transform: scale(1); }
	      }

        @keyframes #{$side}-leaving{
          from{transform: scale(1); -webkit-transform: scale(1);}
          to{transform: scale(0); -webkit-transform: scale(0); }
	      }
      }
      @else if $side == left {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateX(-275px); opacity: 0.8 } 
          100% { -webkit-transform: translateX(0px); opacity:1 } 
        }

        @keyframes #{$side}-leaving {        
          0% { -webkit-transform: translateX(0px);} 
          100% { -webkit-transform: translateX(-350px);} 
        }
      }
      @else if $side == right {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateX(275px); opacity: 0.8 } 
          100% { -webkit-transform: translateX(0px); opacity:1 } 
        }

        @keyframes #{$side}-leaving {        
          0% { -webkit-transform: translateX(0px); } 
          100% { -webkit-transform: translateX(350px); } 
        }
      }
      @else if $side == top {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateY(-275px); opacity: 0.8 } 
          100% { -webkit-transform: translateY(0px); opacity:1 } 
        }

        @keyframes #{$side}-leaving {        
          0% { -webkit-transform: translateY(0px); } 
          100% { -webkit-transform: translateY(-350px); } 
        }
      }
      @else if $side == bottom {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateY(275px); opacity: 0.8 } 
          100% { -webkit-transform: translateY(0px); opacity:1 } 
        }

        @keyframes #{$side}-leaving {        
          0% { -webkit-transform: translateY(0px); } 
          100% { -webkit-transform: translateY(350px); } 
        }
      }
    }
  }
  @include modal-cover-slide($all-sides);


  .modal{
    box-sizing: border-box;
    position: fixed;
    margin: 0px;
    top:0%;
    left: 0%;
    height: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background:rgba(0,0,0, 0.4);
    animation: modal 0.5s ease;
		-webkit-animation: modal 0.5s ease;
  }
  

  .modal-leaving{
    box-sizing: border-box;
    position: fixed;
    top:0;
    height: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background:rgba(0,0,0, 0.4);
    animation: modal-leaving-kf 0.5s ease-out;
		-webkit-animation: modal-leaving-kf 0.5s ease-out;
  }
  


  @keyframes modal-leaving-kf{
    0%{
    	transform: scale(1);
    	-webkit-transform: scale(1);
      opacity: 1;
    }
    100%{
    	transform: scale(0.98);
    	// -webkit-transform: scale(0.9); 
      opacity: 0.8;     
    }
	}

  @keyframes modal{
    0%{
    	transform: scale(0.9);
    	-webkit-transform: scale(0.9);
    }
    100%{
    	transform: scale(1);
    	-webkit-transform: scale(1);
    }
	}

  

  .bottom-close{
    @apply w-full flex justify-center py-2
  }



  .bottom-close-button{
    @apply ring-1 rounded text-blue-900 bg-indigo-900 bg-opacity-20 p-2 w-24
    transition duration-500 hover:text-white hover:bg-indigo-900 hover:bg-opacity-70;
  }


</style>