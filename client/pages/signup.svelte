<script>
  import AuthorizationForm from '../src/components/authorization-form.svelte';
  import Input from '../src/ui-library/input.svelte';
  import Button from '../src/ui-library/button.svelte';

  import {buildPageTitle} from '../src/utils/head';
  import {ffetch} from '../src/utils/http/fetch';

  let login = '';
  let password = '';
  let email = '';

  let loading = false;
  let error = null;

  function handleSubmit() {
    const form = {login, password, email};

    loading = true;

    ffetch
      .post('user', form)
      .then(() => {
        loading = false;
        error = null;
      })
      .catch((serverError) => {
        loading = false;
        error = serverError.message;
      });
  }
</script>

<svelte:head>
  <title>{buildPageTitle('sign up')}</title>
</svelte:head>

<AuthorizationForm header="sign up to sslack" on:submit={handleSubmit} {error}>
  <svelte:fragment slot="form">
    <Input label={'login:'} bind:value={login} size="large" autocomplete="username" />
    <Input label={'email:'} bind:value={email} size="large" type="email" autocomplete="email" />
    <Input
      label={'password:'}
      bind:value={password}
      size="large"
      type="password"
      autocomplete="new-password"
    />

    <Button variant="default" size="large" block {loading}>sign up</Button>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    already have an account? <a href="/signin">sign In</a>
  </svelte:fragment>
</AuthorizationForm>
