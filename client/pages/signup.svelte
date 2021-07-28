<script>
  import AuthorizationForm from '../src/components/authorization-form.svelte';
  import Input from '../src/ui-library/input.svelte';
  import Button from '../src/ui-library/button.svelte';
  import {buildPageTitle} from '../src/utils/head';
  import {ffetch} from '../src/fetch';

  let login = '';
  let password = '';
  let email = '';

  let loading = false;
  let error = null;
  console.log(loading);

  function handleSubmit() {
    const form = {login, password, email};

    ffetch('user', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
  }
</script>

<svelte:head>
  <title>{buildPageTitle('Sign Up')}</title>
</svelte:head>

<AuthorizationForm header="Sign Up to SSlack" on:submit={handleSubmit}>
  <svelte:fragment slot="form">
    <Input label={'Login:'} bind:value={login} size="large" />
    <Input label={'Email:'} bind:value={email} size="large" type="email" />
    <Input label={'Password:'} bind:value={password} size="large" type="password" />

    <Button variant="default" size="large" block>Sign up</Button>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    Already have an account? <a href="/signin">Sign In</a>
  </svelte:fragment>
</AuthorizationForm>
