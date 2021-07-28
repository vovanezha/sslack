<script>
  import Input from '../src/ui-library/input.svelte';
  import Button from '../src/ui-library/button.svelte';

  let login = '';
  let password = '';

  function handleSubmit(event) {
    console.log(event, {login, password});
  }
</script>

<svelte:head>
  <title>Login | SSlack</title>
</svelte:head>

<main>
  <div class="login-container">
    <div class="banner">
      <h1>Log in to SSlack</h1>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
      <Input label={"Login:"} bind:value={login} size="large"/>
      <Input label={"Password:"} bind:value={password} size="large" type="password" />

      <Button variant="default" size="large" block>Log in</Button>
    </form>
  </div>
</main>

<style>
  main {
    position: relative;
    top: 15%;
    display: flex;
    justify-content: center;
  }

  .login-container {
      margin: 0 20px;
  }

  @media screen and (max-width: 480px) {
    .login-container {
      flex: 1;
    }
  }

  .banner {
    display: flex;
    align-items: flex-end;
    margin-bottom: calc(3 * var(--unit));
  }

  h1 {
    margin: 0;
    font-size: calc(2 * var(--base-font-size));
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  form > :global(label) {
    margin-bottom: calc(2 * var(--unit));
  }
  form > :global(label:last-of-type) {
    margin-bottom: calc(3 * var(--unit));
  }

  @media screen and (max-width: 480px) {
    form > :global(label) {
      width: 100%;
    }
  }
  @media screen and (min-width: 481px) {
    form > :global(label) {
      width: 350px;
    }
  }
</style>
