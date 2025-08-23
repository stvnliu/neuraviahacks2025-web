<script lang="ts">
  import NewDataEntry from "./NewCustomer.svelte";

  const IS_TESTING = true;
  import testData from "../test/data.json";
  type LineGraphPoint = {
    x: string;
    y: number;
  };
  let registeringNewCustomer = $state(false);
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
  import NewCustomer from "./NewCustomer.svelte";
  $effect(() => {
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
  {#if !completedDataCollection}
    {#if registeringNewCustomer}
      <NewCustomer
        setComplete={(v) => {
          completedDataCollection = v;
          registeringNewCustomer = false;
        }}
      ></NewCustomer>
    {:else}
      <div>
        <p>You must log in to see your dashboard!</p>
        <p>If you do not have an account, register with the Profile widget</p>
      </div>
    {/if}
  {:else}
    <canvas id="dashboard"></canvas>
  {/if}
</div>
