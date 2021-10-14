<script>
	import AccountArticles from './AccountArticles.svelte';
  import HeadCover from "./HeadCover.svelte";
  import User from "./User.svelte";


  export let pagination;
  export let user;
  export let articles;

$: console.log(user);
</script>

<div> 
  <HeadCover user={user} total={pagination && pagination.total} />
  <div>
    <User user={user} total={pagination && pagination.total} />
    <AccountArticles pagination={pagination} articles={articles} />
  </div>
</div>

<style>

</style>