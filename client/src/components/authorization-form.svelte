<script>
  export let header = '';
  export let error = null;
</script>

<main>
  <div class="container">
    <div class="banner">
      <h1>{header}</h1>
    </div>

    <div class="body">
      <form on:submit|preventDefault>
        <slot name="form" />

        {#if error}
          <p class="error">
            ⛔️{error}
          </p>
        {/if}
      </form>

      {#if $$slots.footer}
        <p class="footer"><slot name="footer" /></p>
      {/if}
    </div>
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
    border: 1px solid #000;
  }

  @media screen and (max-width: 480px) {
    .container {
      flex: 1;
    }
  }

  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    background: #dcdcdc;
    border-bottom: 1px solid #000;
  }

  h1 {
    display: inline;
    padding: 0 16px;
    margin: 0;
    font-size: 24px;
    background-color: #fff;
  }

  .body {
    padding: 16px;
    margin: 0 4px 4px;
    border: 1px solid #000;
    border-top: none;
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

  .error {
    display: inline-flex;
    align-items: center;
    margin: var(--unit) 0;
    color: var(--red);
  }

  .error > :global(svg) {
    width: 350px;
    margin-right: 5px;
  }

  .footer {
    margin-top: var(--unit);
    margin-bottom: 0;
    color: var(--dark);
    text-align: right;
  }
</style>
