<h1>Hmmmm, can I import a component from `/src` folder...?</h1>
<button on:click={() => console.log('from imported component')}>
  I can reload only if you refresh the page
</button>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
  }
</style>
