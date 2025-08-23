<script lang="ts">
    type ViewProps = {
        type: string,
        span: string, 
    };
    let {type, span}: ViewProps = $props();
</script>
<div class="view-switcher">
    <button></button>
    <button></button>
    <button></button>
</div>