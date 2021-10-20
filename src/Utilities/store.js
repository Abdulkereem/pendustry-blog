import { writable } from "svelte/store";
import { getAU } from "./Constants/responseParser";

export const USER = writable(getAU());
