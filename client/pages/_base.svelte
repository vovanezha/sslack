<style>
  @font-face {
    font-family: 'Bureausans';
    src: url('assets/bureausans.woff') format('woff');
  }
  @font-face {
    font-family: 'Bureausans Light';
    src: url('assets/bureausans_light.woff') format('woff');
  }
  @font-face {
    font-family: 'Bureausans Bold';
    src: url('assets/bureausans_bold.woff') format('woff');
  }

  :global(*) {
    --base-font: 'Bureausans', sans-serif;
    --light-font: 'Bureausans Light', sans-serif;
    --bold-font: 'Bureausans Bold', sans-serif;

    --base-font-size: 18px;
    --unit: 8px;

    --dark: #444;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    font-family: var(--base-font);

    margin: 0;
    height: 100vh;
    width: 100%;
  }
</style>
