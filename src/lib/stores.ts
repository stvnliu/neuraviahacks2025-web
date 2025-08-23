import { writable, type Writable } from "svelte/store";
import type { BMIData, UserData } from "./types";

export const profileStore: Writable<UserData | null> = writable(null);
