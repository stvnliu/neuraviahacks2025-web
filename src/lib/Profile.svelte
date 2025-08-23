<script lang="ts">
	import { getContext } from "svelte";
	import type { UserData } from "./types";
	import Login from "./Login.svelte";
	import { profileStore } from "./stores";

	let userContext: UserData | null = $state(null);
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
		</div>
	{/if}
</div>

<style>
</style>
