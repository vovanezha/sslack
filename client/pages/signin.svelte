<script>
  import AuthorizationForm from '../src/components/authorization-form.svelte';
  import Input from '../src/ui-library/input.svelte';
  import Button from '../src/ui-library/button.svelte';
  import {buildPageTitle} from '../src/utils/head';

  let login = '';
  let password = '';

  function handleSubmit(event) {
    console.log(event, {login, password});
  }
</script>

<svelte:head>
  <title>{buildPageTitle('sign in')}</title>
</svelte:head>

<AuthorizationForm header="sign in to sslack" on:submit={handleSubmit}>
  <svelte:fragment slot="form">
    <Input label={'login:'} bind:value={login} size="large" autocomplete="username" />
    <Input
      label={'password:'}
      bind:value={password}
      size="large"
      type="password"
      autocomplete="current-password"
    />

    <Button variant="default" size="large" block>sign up</Button>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    dont have an account yet? <a href="/signup">sign up</a>
  </svelte:fragment>
</AuthorizationForm>
