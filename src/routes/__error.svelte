<script context="module">
	import { onMount } from 'svelte';
	export function load({ error, status }) {

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
</script>

<div>
  {#if status == 404 }
    <NotFoundPage />
  {:else if (status == 500 || status == 400) }
    <ServerErrorPage />
  {:else}
    <UnauthorizedPage />
  {/if}
</div>
