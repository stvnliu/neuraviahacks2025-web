<script lang="ts">
	const IS_TESTING = true;
	import testData from "../test/data.json";
	type LineGraphPoint = {
		x: string;
		y: number;
	};
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
	onMount(() => {
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
	});
</script>

<div class="datavis-tool">
	<p class="dashboard-title">My data</p>
	<canvas id="dashboard"></canvas>
</div>
