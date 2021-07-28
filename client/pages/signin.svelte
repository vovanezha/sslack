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
  <title>{buildPageTitle('Sign In')}</title>
</svelte:head>

<AuthorizationForm header="Sign In to SSlack" on:submit={handleSubmit}>
  <svelte:fragment slot="form">
    <Input label={'Login:'} bind:value={login} size="large" />
    <Input label={'Password:'} bind:value={password} size="large" type="password" />

    <Button variant="default" size="large" block>Sign in</Button>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    Dont have an account yet? <a href="/signup">Sign In</a>
  </svelte:fragment>
</AuthorizationForm>
