<script>
  import { onMount } from "svelte";



  export let show=false;
  export let side;
  export let closeButton=true;
  export let showFootClose = true;
  export let manual = true;

  const toggleModal=({target})=>{
    if(show){
      let modal = document.getElementById('modal');
      if( target == modal && !manual) show = false;
    }
  }

  const closeModal=()=>{
    show = false;
  }

  onMount(()=>{
    window.addEventListener('click', toggleModal);
  })

  // $: console.log(show)

</script>
{#if show}
  <div class="modal" id='modal'>
    <div id="cover"  class="{side}">
      <!-- visible white body -->
      <div class="content-{side}"  id="content">
        <!-- Top close icon section -->
        {#if closeButton}
          <div class="top-close-{side}">
            <button on:click={closeModal} class="top-close-button-{side}">X</button>
          </div>       
        {/if}
        <!-- Children slot -->
        <div class="">
          <slot></slot>
        </div>
        <!-- Bottom close button -->
        {#if showFootClose && side}
          <div class="bottom-close">
            <button on:click={closeModal} 
              class="top-close-outside bottom-close-button "
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
  $all-sides: left, right, top, bottom, center;
  @mixin modal-side($sides){    
    @each $side in $sides{
      .#{$side}{
        box-sizing: border-box;
        @if $side == center{
          box-sizing: border-box;          
          position: absolute;          
          width: 90%;
          height: 80%;
          left: 50%;
          max-width: 500px;
          top: 50%;
          transform: translate(-50%, -50%);
          @media only screen and (min-width: 900px) {
            max-width: 650px;
          }
        }
        @else{
          #{$side}: 0;
          position: fixed;
          @if $side == right or $side == left{ 
            width: 90%; max-width:380px;  height: 100%;
          }
          @else{
            width: 100%;
            max-height: 380px;
            height: 90%;
          }
        }
        @include modal-content-container($side)
      }
    }
  }
  
  @mixin modal-content-container($side) {
    .content-#{$side}{
      background-color: white;
      padding: 15px;
      width: 100%;
      height: 100%;
      @if $side == center{
        border-radius: 5px;
      }
      max-width: 100%; max-height: 100%;
      animation: #{$side} 1s ;
    }
  }

  @mixin modal-cover-slide($sides){
    @each $side in $sides{
      @if $side == center{
        @keyframes #{$side}{
          from{transform: scale(0.5); -webkit-transform: scale(0.5);}
          to{transform: scale(1); -webkit-transform: scale(1); }
	      }
      }
      @else if $side == left {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateX(-275px); opacity: 0 } 
          100% { -webkit-transform: translateX(0px); opacity:1 } 
        }
      }
      @else if $side == right {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateX(275px); opacity: 0 } 
          100% { -webkit-transform: translateX(0px); opacity:1 } 
        }
      }
      @else if $side == top {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateY(-275px); opacity: 0 } 
          100% { -webkit-transform: translateY(0px); opacity:1 } 
        }
      }
      @else if $side == bottom {
        @keyframes #{$side} {        
          0% { -webkit-transform: translateY(275px); opacity: 0 } 
          100% { -webkit-transform: translateY(0px); opacity:1 } 
        }
      }
    }
  }
  #modal{
    box-sizing: border-box;
    position: fixed;
    top:0;
    height: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background:rgba(0,0,0, 0);
    background:rgba(0,20,75, 0.4);
    z-index: 1000;
    	animation: modal 0.5s ease;
		-webkit-animation: modal 0.6s ease;

    @include modal-side($all-sides)
	}

  @keyframes modal{
    0%{
    	transform: scale(0);
    	-webkit-transform: scale(0);
    }
    100%{
    	transform: scale(1);
    	-webkit-transform: scale(1);
    }
	}

  @include modal-cover-slide($all-sides);

  .bottom-close{
    display: block;
    position: absolute;
    bottom: 0;
    right:0;
    left:0;
    padding: 5px 15px;
    text-align: right;
  }

  @mixin top-close-position($poss){
    @each $pos in $poss{
      .top-close-#{$pos}{
        display: block;
        position: absolute;
        top: 0;
        text-align: right;
        @if $pos == center{          
          right: 2%;
        }
        @else if $pos == right{
          right: 7.5%
        }@else{
          right: 3%;
        }
      }
    }
  }

  @include top-close-position($all-sides);

  .bottom-close-button{
    @apply ring-1 rounded-full text-blue-900 bg-indigo-900 bg-opacity-20 px-3;
  }

  @mixin top-close-button($poss){
    @each $pos in $poss{
      .top-close-button-#{$pos}{        
        position:absolute;
        border: 1px solid rgba(10,43,106,0.2);
        text-align: center;
        background-color: white;
        padding: 0px 8px;
        border-radius: 100%;
        color:rgba(30,58,103, 0.84);
        @if $pos == center or $pos == bottom {
          margin-top: -30px;
        }
      }
    }
  }

  @include top-close-button($all-sides)




</style>