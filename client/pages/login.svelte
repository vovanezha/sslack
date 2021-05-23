<svelte:head>
  <title>Login | Sslack</title>
</svelte:head>

<form>
  <label>
    Login:
    <input>
  </label>
  <label>
    Password:
    <input>
  </label>

  <button type="submit" on:click={console.log}>Log in</button>
</form>