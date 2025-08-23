<script lang="ts">
  import { setContext } from "svelte";
    import Avatar from "./lib/Avatar.svelte";  
import DataVis from "./lib/DataVis.svelte";
    import Nav from "./lib/Nav.svelte";
setContext('backend-url-base', 'http://localhost:8000');
</script>

<main>
  <Nav />
  <div class="app-container">
    <Avatar />
    <DataVis type="bmi" span="weekly"/>
  </div>
</main>

<style>
</style>
