<script lang="ts">
	import { onMount } from "svelte";
	import { Chart } from "chart.js/auto";
	import type { Line } from "./types";
	let { templateX, data }: { templateX: string[]; data: Line[] } = $props();
	let chart: Chart;
	$effect(() => {
		if (chart) {
			chart.destroy();
		}
		const ctx = document.getElementById("dashboard") as HTMLCanvasElement;
		chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: templateX,
				datasets: data,
			},
		});
	});
</script>

<div class="vis-canvas">
	<div class="w-60">
		<canvas id="dashboard"></canvas>
	</div>
</div>
