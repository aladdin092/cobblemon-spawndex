"use client";
import {
  createContext, useContext, useEffect, useState, ReactNode,
} from "react";
import { Lang } from "@/types";

type Theme = "dark" | "light";

interface AppCtx {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
}

const Ctx = createContext<AppCtx>({
  theme: "dark", toggleTheme: () => {},
  lang: "en",    toggleLang:  () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang,  setLang]  = useState<Lang>("en");

  /* restore from localStorage once on client */
  useEffect(() => {
    const savedTheme = localStorage.getItem("cobblemon-theme") as Theme | null;
    const savedLang  = localStorage.getItem("cobblemon-lang")  as Lang  | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang)  setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cobblemon-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cobblemon-lang", lang);
  }, [lang]);

  return (
    <Ctx.Provider value={{
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      lang,
      toggleLang:  () => setLang((l)  => (l  === "en"   ? "fr"    : "en")),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAppCtx = () => useContext(Ctx);

/** @deprecated use useAppCtx */
export const useTheme = () => {
  const { theme, toggleTheme } = useAppCtx();
  return { theme, toggle: toggleTheme };
};