<script>
  export let variant = 'default';
  export let size = 'medium';
  export let block = false;
  export let loading = false;
</script>

<button on:click class={`${variant} ${size}`} class:block disabled={loading}>
  {#if loading}
    <span class="text-container">
      <span class="spinner">♻️</span>
      loading...
    </span>
  {:else}
    <slot />
  {/if}
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 calc(var(--unit) * 2);
    font-family: var(--base-font);
    font-size: var(--base-font-size);
    cursor: pointer;
    border: 1px solid var(--dark);
    border-radius: 4px;
  }

  button.default {
    background: white;
    box-shadow: 1px 1px 2px -1px var(--dark);
  }

  button.small {
    height: calc(var(--unit) * 3);
    font-size: 16px;
    line-height: calc(var(--unit) * 3);
  }
  button.medium {
    height: calc(var(--unit) * 4);
    line-height: calc(var(--unit) * 4);
  }
  button.large {
    height: calc(var(--unit) * 5);
    font-size: 20px;
    line-height: calc(var(--unit) * 5);
  }

  button.block {
    width: 100%;
  }

  button:active {
    transform: translateY(1px);
  }

  .text-container {
    display: inline-flex;
    align-items: center;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    margin-right: 4px;
    animation-name: rotate;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
</style>
