<script>
  export let header = '';
</script>

<main>
  <div class="container">
    <div class="banner">
      <h1>{header}</h1>
    </div>

    <div class="body">
      <slot />
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
</style>
