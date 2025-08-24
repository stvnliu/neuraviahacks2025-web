import { profileStore } from "./stores";
import type { BMIData, UserData } from "./types";

function getHealthInfo(username: string): BMIData[] {
	// TODO: write out getHealthInfo
	return [];
}
function setStore(v: any) {
	let value: {
		username: string;
		first_name: string;
		last_name: string;
		token: string;
	} = v;
	console.log(value);

	let health = getHealthInfo(value.username);
	let userData: UserData = {
		userName: value.username,
		token: value.token,
		firstName: value.first_name,
		lastName: value.last_name,
		healthInfo: health,
	};
	profileStore.set(userData);
}
export { getHealthInfo, setStore };
