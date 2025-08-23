<script lang="ts">
	import { getContext, setContext } from "svelte";
	import type { UserData } from "./types";
	import { getHealthInfo } from "./fetchTools";
	import { digestMessage } from "./crypto";
	import { profileStore } from "./stores";
	let backend = getContext("backend-url-base");
	let profile: UserData | null = $state(null);
	profileStore.subscribe((v) => {
		console.log(`profile updated: ${v}`);
		profile = v;
	});
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
		onsubmit={(ev) => {
			ev.preventDefault();
			digestMessage(
				(document.getElementById("password") as HTMLInputElement).value
			).then((pwdhash) => {
				fetch(
					`${backend}/auth/login?username=${
						(
							document.getElementById(
								"username"
							) as HTMLInputElement
						).value
					}&password_hash=${pwdhash}`,
					{
						method: "POST",
						mode: "cors",
						headers: {
							"Access-Control-Allow-Origin": "*",
						},
					}
				)
					.then((res) => res.json())
					.then((v) => {
						let value: {
							username: string;
							first_name: string;
							last_name: string;
						} = v;
						console.log(value);

						let health = getHealthInfo(value.username);
						let userData: UserData = {
							firstName: value.first_name,
							lastName: value.last_name,
							healthInfo: health,
						};
						profileStore.set(userData);
					});
			});
			// log in user TODO
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
			<button type="submit" class="btn btn-primary">Log in</button>
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
