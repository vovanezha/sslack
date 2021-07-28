<script>
  export let header = '';
</script>

<main>
  <div class="container">
    <div class="banner">
      <h1>{header}</h1>
    </div>

    <form on:submit|preventDefault>
      <slot name="form" />
    </form>

    {#if $$slots.footer}
      <p class="footer"><slot name="footer" /></p>
    {/if}
  </div>
</main>

<style>
  main {
    position: relative;
    top: 15%;
    display: flex;
    justify-content: center;
  }

  .container {
    margin: 0 20px;
  }

  @media screen and (max-width: 480px) {
    .container {
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

  .footer {
    margin-top: var(--unit);
    margin-bottom: 0;
    color: var(--dark);
    text-align: right;
  }
</style>
