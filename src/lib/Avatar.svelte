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

<div class="card">
  {#if avatarUrl}
    <img
      src="{avatarUrl}"
      alt="Avatar of {name}"
      width="{size}"
      height="{size}"
      class="avatar w-{size} h-{size}"
    />
  {:else}
    <div
      class="avatar-placeholder w-{size} h-{size}"
      aria-label="Avatar placeholder"
    >
      {initials}
    </div>
  {/if}

  <h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">{name}</h3>
  {#if role}
    <p class="text-sm text-gray-500 dark:text-gray-400">{role}</p>
  {/if}
</div>
