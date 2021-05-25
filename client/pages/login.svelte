<script>
  import Input from '../src/ui-library/input.svelte';

  let login;
  let password;
</script>

<svelte:head>
  <title>Login | SSlack</title>
</svelte:head>

<form>
  <label>
    Login:<Input bind:login/>
  </label>
  <label>
    Password:<Input bind:password/>
  </label>

  <button type="button" on:click={() => console.log({login, password})}>Log in</button>
</form>