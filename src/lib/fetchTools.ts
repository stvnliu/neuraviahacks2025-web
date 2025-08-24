import { profileStore } from "./stores";
import type { BMIData, UserData } from "./types";

async function getHealthInfo(
	username: string,
	token: string,
	url_base: string
): Promise<BMIData[]> {
	const result: BMIData[] = await (
		await fetch(
			`${url_base}/data/bmi?username=${username}&token=${token}`,
			{
				method: "GET",
				mode: "cors",
				headers: { "Access-Control-Allow-Origin": "*" },
			}
		)
	).json();
	return result;
}
function setStore(v: any) {
	let value: {
		username: string;
		first_name: string;
		last_name: string;
		token: string;
		age: number;
	} = v;
	console.log(value);

	getHealthInfo(value.username, value.token, "https://dev.stvnliu.me").then(
		(health) => {
			let userData: UserData = {
				userName: value.username,
				token: value.token,
				firstName: value.first_name,
				lastName: value.last_name,
				healthInfo: health,
				age: value.age,
			};
			console.log(userData);

			profileStore.set(userData);
		}
	);
}
export { getHealthInfo, setStore };
