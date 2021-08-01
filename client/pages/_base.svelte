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
    --red: #ff4e4e;

    box-sizing: border-box;
  }

  :global(body) {
    width: 100%;
    height: 100vh;

    margin: 0;
    font-family: var(--base-font);
  }
</style>
