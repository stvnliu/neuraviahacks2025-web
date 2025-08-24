type FormInputData = {
	fname: string;
	lname: string;
	age: number;
	heightMetre: number;
	weightKg: number;
	timestamp: number;
	situation: string;
};
type BMIData = {
	Height: number;
	Weight: number;
	Timestamp: number;
};
type UserData = {
	userName: string;
	token: string;
	firstName: string;
	lastName: string;
	age: number;
	healthInfo: BMIData[];
};
type BMIAgeGroup = {
	age_range: string;
	category: string;
	min: number;
	max: number | null;
};
type BMIBaseline = {
	bmi_table_flat: BMIAgeGroup[];
};
type Line = {
	label: string;
	data: number[];
	fill: boolean;
	borderColor: string;
	tension: number;
};
export {
	type Line,
	type BMIBaseline,
	type BMIAgeGroup,
	type UserData,
	type BMIData,
	type FormInputData,
};
