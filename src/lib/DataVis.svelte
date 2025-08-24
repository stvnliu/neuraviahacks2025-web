<script lang="ts">
	const IS_TESTING = true;
	import testData from "../test/data.json";
	import bmiData from "../test/bmi.json";
	import { getContext, onMount } from "svelte";
	import {
		type BMIAgeGroup,
		type BMIBaseline,
		type Line,
		type UserData,
	} from "./types";
	import NewCustomer from "./NewCustomer.svelte";
	import DataVisTool from "./dataVisTools";
	import { profileStore } from "./stores";
	type LineGraphPoint = {
		x: string;
		y: number;
	};
	const templateX = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let profile: UserData | null = $state(null);
	profileStore.subscribe((p) => (profile = p));
	let registeringNewCustomer = $state(false);
	let completedDataCollection = $state(false);
	let customerAgeRange = "18-24";
	const bmiBaseline: BMIBaseline = bmiData;
	type Data = {
		data: LineGraphPoint[];
	};
	let backend = getContext("backend-url-base");
	async function getData(
		type: string,
		span: string
	): Promise<{ xLabels: string[]; yLabels: number[] }> {
		const data: Data = IS_TESTING
			? testData
			: await (
					await fetch(`${backend}/data?type=${type}&span=${span}`, {
						mode: "cors",
						headers: {
							"Access-Control-Allow-Origin": "*",
						},
					})
				).json();
		const xs: string[] = [];
		const ys: number[] = [];
		data.data.forEach((point) => {
			xs.push(point.x);
			ys.push(point.y);
		});
		return { xLabels: xs, yLabels: ys };
	}
	import { Chart } from "chart.js/auto";
	type ViewProps = {
		type: string;
		span: string;
	};
	// import { Chart } from "chart.js/auto";

	$effect(() => {
		if (profile === null || profile === undefined) {
			console.log("no profile");

			return;
		}
		const ctx = document.getElementById("dashboard");
		const tool = new DataVisTool();
		const line: Line = {
			label: "My BMI",
			fill: false,
			borderColor: "black",
			data: tool.metadataToBMIs(profile),
			tension: 0.1,
		};
		const set = [line].concat(
			tool.generateLines(
				bmiData.bmi_table_flat.filter(
					(v) => v.age_range === customerAgeRange
				),
				templateX,
				line
			)
		);
		console.log(set);

		const chart = new Chart(ctx as HTMLCanvasElement, {
			type: "line",
			data: {
				labels: templateX,
				datasets: set,
			},
		});
	});
</script>

<div class="datavis-tool">
	{#if profile === null}
		{#if registeringNewCustomer}
			<NewCustomer
				setComplete={(v) => {
					completedDataCollection = v;
					registeringNewCustomer = false;
				}}
			></NewCustomer>
		{:else}
			<div>
				<p>Start recording your health & fitness progress today!</p>
				<p>&darr; Register an account</p>
				<form
					onsubmit={(ev) => {
						ev.preventDefault();
					}}
				>
					<input
						type="text"
						class="form-control"
						id="username"
						name="username"
						placeholder="Username"
					/>
					<div class="input-group">
						<input
							type="password"
							class="form-control"
							id="password"
							name="password"
							placeholder="Password"
						/><input
							type="password"
							class="form-control"
							id="password-repeat"
							name="password-repeat"
							placeholder="Repeat password"
						/>
					</div>
					<div class="input-group">
						<input
							type="password"
							class="form-control"
							id="firstname"
							name="firstname"
							placeholder="First Name"
						/><input
							type="password"
							class="form-control"
							id="lastname"
							name="lastname"
							placeholder="Last Name"
						/>
					</div>
					<button>Create an account</button>
				</form>
			</div>
		{/if}
	{:else}
		<canvas id="dashboard"></canvas>
	{/if}
</div>
