type TimeSeriesBMI = {
  fname: string;
  lname: string;
  age: number;
  heightMetre: number;
  weightKg: number;
  timestamp: number;
};
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
  heightMetre: number;
  weightKg: number;
  timestamp: number;
};
type UserData = {
  firstName: string;
  lastName: string;
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
export {
  type BMIBaseline,
  type BMIAgeGroup,
  type UserData,
  type BMIData,
  type TimeSeriesBMI,
  type FormInputData,
};
