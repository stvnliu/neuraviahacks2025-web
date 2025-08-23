<script lang="ts">
	import { setContext } from "svelte";
	import DataVis from "./lib/DataVis.svelte";
	import Nav from "./lib/Nav.svelte";
	import Profile from "./lib/Profile.svelte";
	import type { BMIData, UserData } from "./lib/types";
	const IS_TESTING = true;
	function generateTestingData(length: number): BMIData[] {
		let data: BMIData[] = [];
		let baseHeight = 1.7;
		const hVariation = 0.01;
		let baseWeight = 60;
		const wVariation = 1;

		let index = 0;
		let currentDate = new Date(2000, index, 1);
		while (index < length) {
			baseHeight = baseHeight + hVariation * Math.random();
			baseWeight = baseWeight + wVariation * Math.random();
			currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
			data.push({
				heightMetre: baseHeight,
				weightKg: baseWeight,
				timestamp: currentDate.getTime(),
			});
			index++;
		}
		console.log(data);

		return data;
	}
	const TESTING_USER: UserData = {
		firstName: "Testing",
		lastName: "User",
		healthInfo: generateTestingData(12),
	};
	setContext("backend-url-base", "http://localhost:8000");
	setContext("profile", IS_TESTING ? TESTING_USER : null);
</script>

<main>
	<Nav />
	<div class="app-container">
		<Profile />
		<DataVis type="Your BMI" span="weekly" />
	</div>
</main>

<style>
</style>
