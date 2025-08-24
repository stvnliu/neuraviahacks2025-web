<script lang="ts">
	import { getContext } from "svelte";
	import type { UserData } from "./types";
	import Login from "./Login.svelte";
	import { profileStore } from "./stores";

	let userContext: UserData | null = $state(null);
	let backend = getContext("backend-url-base");
	profileStore.subscribe((user) => {
		userContext = user;
	});
</script>

<div class="container">
	<h2>Your profile</h2>
	{#if userContext === null}
		<Login />
	{:else}
		<div>
			<p>
				Good {new Date().getHours() > 12 ? "afternoon" : "morning"}, {userContext.firstName}!
			</p>
			<p>
				You currently have {userContext.healthInfo.length} records securely
				stored in our system
			</p>
			<p>Logged in with {userContext.token}</p>

			<h3>Record a new data point</h3>
			<form
				onsubmit={(ev) => {
					ev.preventDefault();
					const height = Number.parseFloat(
						(document.getElementById("height") as HTMLInputElement)
							.value
					);
					const weight = Number.parseFloat(
						(document.getElementById("weight") as HTMLInputElement)
							.value
					);
					fetch(
						`${backend}/data/upload?token=${userContext?.token}`,
						{
							mode: "cors",
							method: "POST",
							headers: {
								"Access-Control-Allow-Origin": "*",
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								UserName: userContext?.userName,
								Height: height,
								Weight: weight,
								Timestamp: new Date()
									.toISOString()
									.slice(0, 19)
									.replace("T", " "),
							}),
						}
					);
				}}
			>
				<div class="mb-3">
					<input
						type="text"
						class="form-control"
						id="height"
						name="height"
						placeholder="Height (cm)"
					/>
					<input
						type="password"
						class="form-control"
						id="weight"
						name="weight"
						placeholder="Weight (kg)"
					/>
					<button type="submit" class="btn btn-primary">Upload</button
					>
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
</style>
