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
  }

  :global(*) {
    box-sizing: border-box;

    font-family: var(--base-font);
  }

  :global(body) {
    margin: 0;
  }
</style>
