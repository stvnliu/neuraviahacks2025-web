<script lang="ts">
  import { setContext } from "svelte";
    import Avatar from "./lib/Avatar.svelte";  
import DataVis from "./lib/DataVis.svelte";
setContext('backend-url-base', 'http://localhost:8000');
</script>

<main>
  <div class="app-container">
    <Avatar />
    <DataVis type="bmi" span="weekly"/>
  </div>
</main>

<style>
</style>
