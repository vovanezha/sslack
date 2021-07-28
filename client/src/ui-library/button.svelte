<script>
  export let variant = 'default';
  export let size = 'medium';
  export let block = false;
</script>

<button on:click class={`${variant} ${size}`} class:block>
  <slot></slot>
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 calc(var(--unit) * 2);
    font-size: var(--base-font-size);
    cursor: pointer;
    border: 1px solid var(--dark);
    border-radius: 4px;
  }

  button.default {
    background: white;
    box-shadow: 2px 2px 4px -1px var(--dark);
  }

  button.small {
    height: calc(var(--unit) * 3);
    font-size: 16px;
  }
  button.medium {
    height: calc(var(--unit) * 4);
  }
  button.large {
    height: calc(var(--unit) * 5);
    font-size: 20px;
  }

  button.block {
    width: 100%;
  }

  button:active {
    transform: translateY(1px);
  }
</style>