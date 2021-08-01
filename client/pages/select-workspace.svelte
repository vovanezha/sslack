<script>
  import Card from '../src/ui-library/card.svelte';
  import Button from '../src/ui-library/button.svelte';
  import Divider from '../src/ui-library/divider.svelte';
  import {buildPageTitle} from '../src/utils/head';
</script>

<svelte:head>
  <title>{buildPageTitle('workspaces')}</title>
</svelte:head>

<Card header="workspaces">
  <h3>you don't have any workspace yet</h3>

  <Button block>create new 🆕</Button>

  <Divider>or</Divider>

  <Button block>join existing 🔎</Button>
</Card>

<style>
  h3 {
    margin: 8px 0;
  }
</style>
