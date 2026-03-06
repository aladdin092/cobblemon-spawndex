"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Pokemon, FilterState } from "@/types";
import {
  getHighestRarity,
  getBestSpawnRate,
  RARITY_ORDER,
} from "@/utils";
import { PokemonCard } from "@/components/PokemonCard";
import { FilterBar } from "@/components/FilterBar";
import { TeamPlanner } from "@/components/TeamPlanner";
import { ItemDex } from "@/components/ItemDex";
import { useTheme } from "@/components/ThemeProvider";

type View = "list" | "team" | "items";
type Lang = "fr" | "en";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  rarity: [],
  time: [],
  weather: [],
  dimension: [],
  sortBy: "name",
};

export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = useState<View>("list");
  const [lang, setLang] = useState<Lang>("fr");
  const BATCH = 48;
  const MAX_DOM = 96; // max cards in DOM at once
  const [range, setRange] = useState({ start: 0, end: BATCH });
  const topSentinel = useRef<HTMLDivElement>(null);
  const bottomSentinel = useRef<HTMLDivElement>(null);

  // Reset range when filters change
  useEffect(() => {
    setRange({ start: 0, end: BATCH });
  }, [filters, lang]);

  // Scroll down → load more
  const onBottom = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setRange((r) => ({
        start: Math.max(0, r.end - MAX_DOM + BATCH),
        end: r.end + BATCH,
      }));
    }
  }, []);

  // Scroll up → load previous
  const onTop = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setRange((r) => ({
        start: Math.max(0, r.start - BATCH),
        end: Math.min(r.start - BATCH + MAX_DOM, r.end),
      }));
    }
  }, []);

  useEffect(() => {
    const bot = bottomSentinel.current;
    const top = topSentinel.current;
    if (!bot || !top) return;
    const obsBot = new IntersectionObserver(onBottom, { rootMargin: "300px" });
    const obsTop = new IntersectionObserver(onTop, { rootMargin: "300px" });
    obsBot.observe(bot);
    obsTop.observe(top);
    return () => { obsBot.disconnect(); obsTop.disconnect(); };
  }, [onBottom, onTop]);


  // Sync lang to sessionStorage so detail page can read it
  useEffect(() => {
    const saved = typeof window !== "undefined" && sessionStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    fetch("/data/pokemon.json")
      .then((r) => r.json())
      .then((data: Pokemon[]) => {
        // Stream display: set data first, then mark loaded
        setAllPokemon(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...allPokemon];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name_en?.toLowerCase().includes(q) ||
          p.name_fr?.toLowerCase().includes(q) ||
          p.name?.toLowerCase().includes(q) ||
          p.types.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.rarity.length)
      list = list.filter((p) => filters.rarity.includes(getHighestRarity(p)));
    if (filters.time.length)
      list = list.filter((p) =>
        p.spawns.some((s) => filters.time.includes(s.time))
      );
    if (filters.weather.length)
      list = list.filter((p) =>
        p.spawns.some((s) => filters.weather.includes(s.weather))
      );
    if (filters.dimension.length)
      list = list.filter((p) =>
        p.spawns.some((s) => filters.dimension.includes(s.dimension))
      );

    if (filters.sortBy === "id")
      list.sort((a, b) => a.id - b.id);
    else if (filters.sortBy === "name")
      list.sort((a, b) => {
        const na = lang === "fr" ? (a.name_fr || a.name_en || a.name) : (a.name_en || a.name);
        const nb = lang === "fr" ? (b.name_fr || b.name_en || b.name) : (b.name_en || b.name);
        return na.localeCompare(nb);
      });
    else if (filters.sortBy === "rarity")
      list.sort(
        (a, b) =>
          RARITY_ORDER[getHighestRarity(b)] - RARITY_ORDER[getHighestRarity(a)]
      );
    else if (filters.sortBy === "spawnRate")
      list.sort((a, b) => getBestSpawnRate(b) - getBestSpawnRate(a));

    return list;
  }, [allPokemon, filters, lang]);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo" onClick={() => setView("list")}>
            <img src="/logo.png" alt="SpawnDex logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div>
              <div className="logo-text">SpawnDex</div>
              <div className="logo-sub">COBBLEMON</div>
            </div>
          </Link>

          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={lang === "fr" ? "Chercher Pokémon, type..." : "Search Pokémon, type..."}
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>

          <div className="header-actions">
            {/* ── Language toggle ── */}
            <div
              style={{
                display: "flex",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {(["fr", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); if (typeof window !== "undefined") sessionStorage.setItem("lang", l); }}
                  style={{
                    padding: "5px 12px",
                    border: "none",
                    background: lang === l ? "var(--accent)" : "transparent",
                    color: lang === l ? "#fff" : "var(--text2)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    transition: "all 0.15s",
                  }}
                >
                  {l === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
                </button>
              ))}
            </div>

            <button
              className={`btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              🗂 Dex
            </button>
            <button
              className={`btn ${view === "team" ? "active" : ""}`}
              onClick={() => setView("team")}
            >
              🤝 Team
            </button>
            <button
              className={`btn ${view === "items" ? "active" : ""}`}
              onClick={() => setView("items")}
            >
              🎒 Items
            </button>
            <button className="btn" onClick={toggle} title="Changer thème">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {view === "team" ? (
        <TeamPlanner allPokemon={allPokemon} />
      ) : view === "items" ? (
        <ItemDex allPokemon={allPokemon} lang={lang} />
      ) : (
        <>
          {/* FILTRES SPAWN */}
          <FilterBar filters={filters} onChange={setFilters} lang={lang} />

          {/* BARRE TRI + COMPTEUR */}
          <div className="sort-bar">
            <span style={{ fontSize: 13, color: "var(--text2)" }}>
              <strong>{filtered.length}</strong> Pokémon
            </span>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text2)", fontWeight: 700 }}>
                {lang === "fr" ? "TRIER:" : "SORT:"}
              </span>
              {(["id", "name", "rarity", "spawnRate"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilters((f) => ({ ...f, sortBy: s }))}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    border: `1px solid ${filters.sortBy === s ? "var(--accent)" : "var(--border)"}`,
                    background: filters.sortBy === s ? "var(--accent)" : "var(--bg3)",
                    color: filters.sortBy === s ? "#fff" : "var(--text2)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {s === "id"
                    ? "№ Dex"
                    : s === "name"
                    ? "A–Z"
                    : s === "rarity"
                    ? (lang === "fr" ? "Rareté" : "Rarity")
                    : "Spawn Rate"}
                </button>
              ))}
            </div>
          </div>

          {/* GRILLE */}
          <div className="grid-container">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    height: 230,
                    animation: "pulse 1.5s ease-in-out infinite",
                    opacity: 0.6,
                  }}
                />
              ))
            ) : filtered.length > 0 ? (
              <>
                {/* top spacer */}
                {range.start > 0 && (
                  <div ref={topSentinel} style={{ gridColumn: "1/-1", height: 1 }} />
                )}
                {filtered.slice(range.start, range.end).map((p) => (
                  <PokemonCard key={p.slug} pokemon={p} lang={lang} />
                ))}
                {/* bottom sentinel */}
                {range.end < filtered.length && (
                  <div ref={bottomSentinel} style={{ gridColumn: "1/-1", height: 1 }} />
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    marginBottom: 8,
                    color: "var(--text)",
                  }}
                >
                  {lang === "fr" ? "Aucun Pokémon trouvé" : "No Pokémon found"}
                </h3>
                <p>
                  {lang === "fr"
                    ? "Essaie d'ajuster ta recherche ou tes filtres"
                    : "Try adjusting your search or filters"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
