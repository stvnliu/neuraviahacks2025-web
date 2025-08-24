<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import { Chart } from "chart.js/auto";

	export let labels: string[] = [];
	export let datasets: {
		label: string;
		data: number[];
		borderColor: string;
		fill: boolean;
	}[] = [];

	let chart: Chart | null = null;
	let canvas: HTMLCanvasElement;

	const createChart = () => {
		if (chart) {
			chart.destroy();
		}
		chart = new Chart(canvas, {
			type: "line",
			data: {
				labels,
				datasets,
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	};

	onMount(() => {
		createChart();
	});

	afterUpdate(() => {
		createChart();
	});
</script>

<canvas bind:this={canvas}></canvas>
