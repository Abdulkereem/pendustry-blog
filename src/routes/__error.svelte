<script context="module">
	export function load({ error, status }) {
    console.log({error, status});
		return {
			props: {
				status,
			}
		};
	}
</script>

<script>
import NotFoundPage from "$lib/Errors/NotFoundPage.svelte";
import ServerErrorPage from "$lib/Errors/ServerErrorPage.svelte";
import UnauthorizedPage from "$lib/Errors/UnauthorizedPage.svelte";

	export let status;
 $: console.log(status, '\n\n is status');
</script>

<div class="cover bg-gradient">
<div class="contain">
  {#if status == 404 }
    <NotFoundPage />
  {:else if (status == 500 || status == 503 || status == 400) }
    <ServerErrorPage />
  {:else}
    <UnauthorizedPage />
  {/if}
</div>
</div>

<style lang="scss">

  .cover{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    bottom: 0px;
    z-index: 10000;
  }

  .contain{
    @apply h-full w-full flex justify-center items-center;
  }

</style>