import { atom } from "nanostores";

type DisplayMode = "deuda" | "equity";
export const displayMode = atom<DisplayMode>("deuda");
