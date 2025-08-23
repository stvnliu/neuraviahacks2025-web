import type Profile from "./Profile.svelte";
import type { BMIAgeGroup, Line, UserData } from "./types";

class DataVisTool {
	metadataToBMIs(p: UserData): number[] {
		return p.healthInfo.map(
			(info) => info.weightKg / info.heightMetre ** 2
		);
	}
	collectExtremes(l: Line): { max: number; min: number } {
		let index = 0;
		let max = l.data[index];
		let min = l.data[index];
		while (index < l.data.length) {
			max = l.data[index + 1] > max ? l.data[index + 1] : max;
			min = l.data[index + 1] < min ? min : l.data[index + 1];
			index++;
		}
		return { max, min };
	}
	createTestSineWaveData(length: number): Line {
		let high = 50;
		let low = 20;
		let dataset = [];
		const amplitude = ((high - low) / 2) * 0.1;
		let rotation = 0.8 * Math.PI;
		for (let index = 0; index < length; index++) {
			dataset.push(low + Math.sin(index * rotation) * amplitude);
		}
		return {
			label: "test curve",
			data: dataset,
			fill: false,
			borderColor: "black",
			tension: 0.5,
		};
	}
	generateLines(
		groups: BMIAgeGroup[],
		templateX: string[],
		userLine: Line
	): Line[] {
		let { max, min } = this.collectExtremes(userLine);
		let datasets: Line[] = [];
		let redness: number = 255;
		const rednessStep: number = 16;
		groups.forEach((group) => {
			if (group.min > min) {
				// the user has a BMI less than this data group's minimum; line shown;
				datasets.push({
					label: `min ${group.category} BMI for people aged ${group.age_range}`,
					data: templateX.map((_) => group.min),
					fill: false,
					borderColor: "rgb(255, 0, 0)",
					tension: 0.1,
				});
			}
			redness -= rednessStep;
			if (group.max !== null && group.max < max + 5) {
				datasets.push({
					label: `max ${group.category} BMI for people aged ${group.age_range}`,
					data: templateX.map((_) => group.max as number),
					fill: false,
					borderColor: `rgb(${redness}, 0, 0)`,
					tension: 0.1,
				});
				redness -= rednessStep;
			}
		});
		return datasets;
	}
}
export default DataVisTool;
