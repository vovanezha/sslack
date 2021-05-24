<h1>Hmmmm, can I import a component from `/src` folder...?</h1>
<button on:click={() => console.log('this is a log from imported component')}>
  click me and I'll print something into console.
</button>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
  }
</style>
