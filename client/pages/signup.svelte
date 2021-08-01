<script>
  import AuthorizationForm from '../src/components/authorization-form.svelte';
  import Input from '../src/ui-library/input.svelte';
  import Button from '../src/ui-library/button.svelte';

  import AlertIcon from '../assets/alert-icon.svg';

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
  <title>{buildPageTitle('Sign Up')}</title>
</svelte:head>

<AuthorizationForm header="Sign Up to SSlack" on:submit={handleSubmit}>
  <svelte:fragment slot="form">
    <Input label={'Login:'} bind:value={login} size="large" autocomplete="username" />
    <Input label={'Email:'} bind:value={email} size="large" type="email" autocomplete="email" />
    <Input
      label={'Password:'}
      bind:value={password}
      size="large"
      type="password"
      autocomplete="new-password"
    />

    <Button variant="default" size="large" block {loading}>Sign up</Button>

    {#if error}
      <p class="error">
        <AlertIcon width="28" height="28" fill="var(--red)" />
        {error}
      </p>
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="footer">
    Already have an account? <a href="/signin">Sign In</a>
  </svelte:fragment>
</AuthorizationForm>

<style>
  .error {
    display: inline-flex;
    align-items: center;
    margin: var(--unit) 0;
    color: var(--red);
  }

  .error > :global(svg) {
    margin-right: 5px;
  }
</style>
