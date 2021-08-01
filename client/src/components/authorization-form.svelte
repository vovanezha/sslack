<script>
  import Card from '../ui-library/card.svelte';

  export let header = null;
  export let error = null;
</script>

<Card {header}>
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
</Card>

<style>
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
