<script lang="ts">
	import bmiData from "../test/bmi.json";
	import { getContext, onMount } from "svelte";
	import { type Line, type UserData } from "./types";
	import DataVisTool from "./dataVisTools";
	import { profileStore } from "./stores";
	import { digestMessage } from "./crypto";
	import { setStore } from "./fetchTools";
	import VisualCanvas from "./VisualCanvas.svelte";
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
	const ageRanges: { max: number; min: number }[] =
		bmiData.bmi_table_flat.map((v) => {
			const numbers = v.age_range.split("-");
			const range = {
				max: Number.parseInt(numbers[1]),
				min: Number.parseInt(numbers[0]),
			};
			return range;
		});
	let customerAgeRange = $state("18-24");
	const formRegistrationHandler = async (
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		event.preventDefault();
		const username = (
			document.getElementById("username-register") as HTMLInputElement
		).value;
		const password = (
			document.getElementById("password-register") as HTMLInputElement
		).value;
		const passwordRepeat = (
			document.getElementById(
				"password-register-repeat"
			) as HTMLInputElement
		).value;
		const firstName = (
			document.getElementById("firstname-register") as HTMLInputElement
		).value;
		const lastName = (
			document.getElementById("lastname-register") as HTMLInputElement
		).value;
		const age = (
			document.getElementById("age-register") as HTMLInputElement
		).value;
		digestMessage(password).then((p) => {
			if (password == passwordRepeat) {
				const submitData = {
					UserName: username,
					PasswordHash: p,
					FirstName: firstName,
					LastName: lastName,
					Age: Number.parseInt(age),
				};
				fetch(`${backend}/auth/register`, {
					method: "POST",
					mode: "cors",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(submitData),
				}).then((response) => {
					if (response.ok) {
						fetch(
							`${backend}/auth/login?username=${username}&password_hash=${p}`,
							{
								method: "POST",
								mode: "cors",
								headers: {
									"Access-Control-Allow-Origin": "*",
								},
							}
						)
							.then((response) => response.json())
							.then((v) => {
								setStore(v);
							});
					}
				});
			}
		});
	};
	let profile: UserData | null = $state(null);
	let currentDataSet: Line[] | null = $state(null);
	profileStore.subscribe((p) => {
		if (p === null || p === undefined) {
			console.log("no profile");
			return;
		}
		const matching = ageRanges.find(
			(v) => p.age >= v.min && p.age <= v.max
		);
		if (!matching) {
			console.error("Your user is too young or too old.");
			return;
		}
		customerAgeRange = `${matching.min}-${matching.max}`;
		console.log(customerAgeRange);
		profile = p;

		const tool = new DataVisTool();
		const line: Line = {
			label: "My BMI",
			fill: false,
			borderColor: "black",
			data: tool.metadataToBMIs(p),
			tension: 0.1,
		};
		let set = [line].concat(
			tool.generateLines(
				bmiData.bmi_table_flat.filter(
					(v) => v.age_range === customerAgeRange
				),
				templateX,
				line
			)
		);

		console.log(set);

		currentDataSet = set;
		console.log($state.snapshot(currentDataSet));
	});

	let backend = getContext("backend-url-base");
</script>

<div class="datavis-tool">
	{#if profile === null}
		<div>
			<p>Start recording your health & fitness progress today!</p>
			<p>&darr; Register an account</p>
			<form
				onsubmit={(ev) => {
					formRegistrationHandler(ev);
				}}
			>
				<input
					type="text"
					class="form-control"
					id="username-register"
					name="username-register"
					placeholder="Username"
				/>
				<div class="input-group">
					<input
						type="password"
						class="form-control"
						id="password-register"
						name="password-register"
						placeholder="Password"
					/><input
						type="password"
						class="form-control"
						id="password-register-repeat"
						name="password-register-repeat"
						placeholder="Repeat password"
					/>
				</div>
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						id="firstname-register"
						name="firstname-register"
						placeholder="First Name"
					/><input
						type="text"
						class="form-control"
						id="lastname-register"
						name="lastname-register"
						placeholder="Last Name"
					/>
					<input
						type="number"
						class="form-control"
						id="age-register"
						name="age-register"
						placeholder="Your age"
					/>
				</div>
				<button type="submit" class="btn btn-primary"
					>Create an account</button
				>
			</form>
		</div>
	{:else}
		<VisualCanvas
			{templateX}
			data={$state.snapshot(currentDataSet) as Line[]}
		/>
	{/if}
</div>
