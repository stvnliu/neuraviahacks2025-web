<script lang="ts">
	const IS_TESTING = true;
	import testData from "../test/data.json";
	type LineGraphPoint = {
		x: string;
		y: number;
	};
	let completedDataCollection = $state(false);
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
	let { type, span }: ViewProps = $props();
	// import { Chart } from "chart.js/auto";
	import { getContext, onMount } from "svelte";
    import { type TimeSeriesBMI } from "./types";
	$effect(() => {
		if (completedDataCollection) {
			getData(type, span).then((v) => {
				const ctx = document.getElementById("dashboard");
				const chart = new Chart(ctx as HTMLCanvasElement, {
					type: "line",
					data: {
						labels: v.xLabels,
						datasets: [
							{
								label: type,
								data: v.yLabels,
								fill: false,
								borderColor: "rgb(0, 0, 0)",
								tension: 0.1,
							},
						],
					},
				});
			});
		}
	});
</script>

<div class="datavis-tool">
	<p class="dashboard-title">My data</p>
	{#if !completedDataCollection}
		<div>
			<p>We need some more info.</p>
		</div>
	<form action={`${backend}/data`}
	onsubmit={async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const plainObject = Object.fromEntries(formData.entries());
		const body = JSON.stringify(plainObject);
		console.log(body);
		const parsedBody: TimeSeriesBMI = { 
			fname: plainObject.fname as string, 
			lname: plainObject.lname as string,
			age: Number.parseInt(plainObject.age as string),
			heightMetre:Number.parseFloat(plainObject.heightMetre as string),
			weightKg:Number.parseFloat(plainObject.weightKg as string),
			timestamp: Date.now() 
		}
		console.log(parsedBody);
		const response = await fetch(form.action, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(parsedBody),
		});
		if (response.ok) {
			completedDataCollection = true;
		}
	}}>
		<div class="mb-3">
			<label for="fname" class="form-label">First name: </label>
			<input type="text" class="form-control" id="fname" name="fname" />
		</div>
		<div class="mb-3">
			<label for="lname" class="form-label">Last name: </label>
			<input type="text" class="form-control" id="lname" name="lname" />
		</div>
		<div class="mb-3">
			<label for="age" class="form-label">Age: </label>
			<input type="number" class="form-control" id="age" name="age" />
		</div>
		<div class="mb-3">
			<label for="height" class="form-label">Height (m): </label>
		<input type="text" class="form-control" id="height" name="heightMetre" />
		</div>
		<div class="mb-3">
			<label for="weight" class="form-label">Weight (kg): </label>
			<input type="text" class="form-control" id="weight" name="weightKg" />
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
	{:else}
		<canvas id="dashboard"></canvas>
	{/if}
</div>
