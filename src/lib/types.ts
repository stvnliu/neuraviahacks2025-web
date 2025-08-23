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
export { type UserData, type BMIData, type TimeSeriesBMI, type FormInputData };
