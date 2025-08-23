<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { UserData } from "./types";
  import { getSHA256Hash } from "boring-webcrypto-sha256";
  let backend = getContext("backend-url-base");
  let profile: UserData = getContext("profile");
  let currentTimeout: number | null = $state(null);
  const invalidate = () => {};
  const renew = () => {
    if (currentTimeout != null) {
    }
  };
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
          fetch(`${backend}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              username: (
                document.getElementById("username") as HTMLInputElement
              ).value,
              passwordHash: getSHA256Hash(
                (document.getElementById("password") as HTMLInputElement).value
              ),
            }),
          })
            .then((res) => res.json())
            .then((v: { token: string; validUntil: number }) => {
              if (currentTimeout != null) {
                clearTimeout(currentTimeout as number);
              }
              setTimeout(invalidate, v.validUntil - Date.now());
            });
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
