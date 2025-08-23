<!-- UserAvatarCard.svelte -->
<script>
  export let name = "User Name";
  export let role = "User Role";
  export let avatarUrl = "";
  export let size = 48; // Avatar size in pixels

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
</script>

<style>

</style>

<div class="container">
  
</div>
