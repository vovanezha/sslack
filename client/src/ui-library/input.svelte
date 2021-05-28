<script>
  export let label;
  export let value;
  export let size = 'medium';
</script>

{#if label !== undefined}
  <label class={size}>
    <span>{label}</span>
    <input {...$$restProps} class={size} bind:value>
  </label>

{:else}
  <input {...$$restProps} class={size} bind:value>
{/if}

<style>
  input {
    border-radius: 4px;
    border: 1px solid black;
    font-family: var(--light-font);
  }

  input.small {
    height: calc(4 * var(--unit));
    font-size: 1.1em;
  }
  input.medium {
    height: calc(5 * var(--unit));
    font-size: 1.2em;
  }
  input.large {
    height: calc(6 * var(--unit));
    font-size: 1.3em;
  }

  label {
    display: inline-flex;
    flex-direction: column;
    font-family: var(--light-font);
    color: var(--dark);
  }

  label.small {
    font-size: 1em;
  }
  label.medium {
    font-size: 1.2em;
  }
  label.large {
    font-size: 1.3em;
  }
</style>