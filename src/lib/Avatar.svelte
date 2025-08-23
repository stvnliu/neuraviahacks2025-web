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
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center;
  }

  .avatar {
    @apply rounded-full object-cover;
  }

  .avatar-placeholder {
    @apply bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-gray-200 rounded-full;
  }
</style>

<div class="container">
  
</div>
