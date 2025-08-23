<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { UserData } from "./types";
  let backend = getContext("backend-url-base");
  let profile: UserData = getContext("profile");
</script>

<div class="login-component">
  {#if profile === null}
    <p style="color: red;">You are not logged in!</p>
  {/if}
  <form
    onsubmit={async (ev) => {
      const result: UserData = await (
        await fetch(`${backend}/login`, {
          method: "post",
          body: JSON.stringify({}),
        })
      ).json();
      setContext("profile", {});
    }}
  >
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        id="username"
        name="username"
        placeholder="Username"
      />
      <input
        type="password"
        class="form-control"
        id="password"
        name="password"
        placeholder="Password"
      />
      <button
        type="submit"
        onclick={(ev) => {
          // log in user TODO
        }}
        class="btn btn-primary">Log in</button
      >
      <button
        type="submit"
        onclick={(ev) => {
          // register new user TODO
        }}
        class="btn btn-primary">Create account</button
      >
    </div>
  </form>
</div>
