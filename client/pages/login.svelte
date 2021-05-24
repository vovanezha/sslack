<script>
  import App from '../src/App.svelte';
</script>

<svelte:head>
  <title>Login | SSlack</title>
</svelte:head>

<form>
  <label>
    Login:
    <input />
  </label>
  <label>
    Password:
    <input />
  </label>

  <button type="button" on:click={() => console.log("I've hydrated, motherfucker!")}>Log in</button>
</form>

<App />
