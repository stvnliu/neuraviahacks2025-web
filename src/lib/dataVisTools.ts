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
		const colors = [
			"rgb(230, 25, 75)", // Red
			"rgb(60, 180, 75)", // Green
			"rgb(0, 130, 200)", // Blue
			"rgb(245, 130, 48)", // Orange
			"rgb(145, 30, 180)", // Purple
			"rgb(70, 240, 240)", // Cyan
			"rgb(240, 50, 230)", // Magenta
			"rgb(210, 245, 60)", // Lime
		];

		let { max, min } = this.collectExtremes(userLine);
		let datasets: Line[] = [];
		let index = 0;
		groups.forEach((group) => {
			if (group.min > min) {
				// the user has a BMI less than this data group's minimum; line shown;
				datasets.push({
					label: `min ${group.category} BMI for people aged ${group.age_range}`,
					data: templateX.map((_) => group.min),
					fill: false,
					borderColor: colors[index],
					tension: 0.1,
				});
				index++;
			}
			if (group.max !== null && group.max < max + 5) {
				datasets.push({
					label: `max ${group.category} BMI for people aged ${group.age_range}`,
					data: templateX.map((_) => group.max as number),
					fill: false,
					borderColor: colors[index],
					tension: 0.1,
				});
				index++;
			}
		});
		return datasets;
	}
}
export default DataVisTool;
