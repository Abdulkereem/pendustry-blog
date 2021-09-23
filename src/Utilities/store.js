import { writable } from "svelte/store";

const getUser = ()=>{
  return localStorage.AU? JSON.parse(atob(localStorage.AU)): null;
}

export const user = writable(getUser());