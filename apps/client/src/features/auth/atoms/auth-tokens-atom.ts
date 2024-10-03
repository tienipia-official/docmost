import { createJSONStorage, atomWithStorage } from "jotai/utils";
import { ITokens } from "../types/auth.types";

export const authTokensAtom = atomWithStorage<ITokens | null>(
  "authTokens",
  null,
  createJSONStorage<ITokens>(() => {
    return {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: (key) => localStorage.removeItem(key),
    };
  })
);
