"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";
import { TypeBadge } from "./TypeBadge";

type Lang = "fr" | "en";
type SortMode = "chance_desc" | "chance_asc" | "name_az" | "name_za" | "dex_asc" | "dex_desc";

interface Props {
  allPokemon: Pokemon[];
  lang: Lang;
}

// Parse chance string to a number for sorting
function chanceToNum(chance: string): number {
  if (!chance) return 0;
  // percentage
  const pct = chance.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) return parseFloat(pct[1]);
  // quantity range like "0-1", "1-3" — treat as average * 100 (always drops)
  const range = chance.match(/^(\d+)-(\d+)$/);
  if (range) return 100; // guaranteed drop, sort high
  // "100%"
  if (chance === "100%") return 100;
  return 0;
}

function chanceLabel(chance: string): { label: string; color: string; bg: string } {
  const n = chanceToNum(chance);
  if (chance.includes("-") && !chance.includes("%")) {
    // quantity drop (0-1, 1-3 etc)
    return { label: chance, color: "#58a6ff", bg: "rgba(88,166,255,0.12)" };
  }
  if (n >= 100) return { label: "100%", color: "#3fb950", bg: "rgba(63,185,80,0.12)" };
  if (n >= 25)  return { label: chance, color: "#3fb950", bg: "rgba(63,185,80,0.12)" };
  if (n >= 10)  return { label: chance, color: "#f8d030", bg: "rgba(248,208,48,0.12)" };
  if (n >= 5)   return { label: chance, color: "#ff9d00", bg: "rgba(255,157,0,0.12)" };
  return { label: chance, color: "#ff7b7b", bg: "rgba(255,123,123,0.12)" };
}

const SORT_OPTIONS: { value: SortMode; label_fr: string; label_en: string }[] = [
  { value: "chance_desc", label_fr: "Chance ↓",  label_en: "Chance ↓" },
  { value: "chance_asc",  label_fr: "Chance ↑",  label_en: "Chance ↑" },
  { value: "name_az",     label_fr: "Nom A–Z",   label_en: "Name A–Z" },
  { value: "name_za",     label_fr: "Nom Z–A",   label_en: "Name Z–A" },
  { value: "dex_asc",     label_fr: "№ Dex ↑",   label_en: "№ Dex ↑" },
  { value: "dex_desc",    label_fr: "№ Dex ↓",   label_en: "№ Dex ↓" },
];

export function ItemDex({ allPokemon, lang }: Props) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("chance_desc");
  const [condFilter, setCondFilter] = useState(false); // show biome-conditional drops

  // Build item index: item -> [{pokemon, drop}]
  const itemIndex = useMemo(() => {
    const index: Record<string, { pokemon: Pokemon; chance: string; minQty: number; maxQty: number; conditions?: string }[]> = {};
    for (const p of allPokemon) {
      for (const d of p.drops || []) {
        if (!d.item) continue;
        if (!index[d.item]) index[d.item] = [];
        index[d.item].push({
          pokemon: p,
          chance: d.chance,
          minQty: d.minQty,
          maxQty: d.maxQty,
          conditions: (d as any).conditions,
        });
      }
    }
    return index;
  }, [allPokemon]);

  // Filtered item list for autocomplete
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return Object.keys(itemIndex)
      .filter(item => item.toLowerCase().includes(q))
      .sort((a, b) => a.localeCompare(b));
  }, [itemIndex, search]);

  // Results for selected item
  const results = useMemo(() => {
    if (!selectedItem || !itemIndex[selectedItem]) return [];
    let list = [...itemIndex[selectedItem]];
    if (!condFilter) {
      list = list.filter(r => !r.conditions);
    }
    list.sort((a, b) => {
      const na = lang === "fr" ? (a.pokemon.name_fr || a.pokemon.name_en) : a.pokemon.name_en;
      const nb = lang === "fr" ? (b.pokemon.name_fr || b.pokemon.name_en) : b.pokemon.name_en;
      switch (sort) {
        case "chance_desc": return chanceToNum(b.chance) - chanceToNum(a.chance);
        case "chance_asc":  return chanceToNum(a.chance) - chanceToNum(b.chance);
        case "name_az":     return na.localeCompare(nb);
        case "name_za":     return nb.localeCompare(na);
        case "dex_asc":     return a.pokemon.id - b.pokemon.id;
        case "dex_desc":    return b.pokemon.id - a.pokemon.id;
        default:            return 0;
      }
    });
    return list;
  }, [selectedItem, itemIndex, sort, condFilter, lang]);

  // Stats for selected item
  const stats = useMemo(() => {
    if (!results.length) return null;
    const total = results.length;
    const guaranteed = results.filter(r => r.chance === "100%" || (!r.chance.includes("%") && r.minQty > 0)).length;
    const best = results.reduce((best, r) => chanceToNum(r.chance) > chanceToNum(best.chance) ? r : best, results[0]);
    const types = [...new Set(results.flatMap(r => r.pokemon.types))];
    return { total, guaranteed, best, types };
  }, [results]);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 20px" }}>

      {/* ── SEARCH BAR ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 13,
          color: "var(--text2)",
          marginBottom: 8,
          fontFamily: "var(--font-display)",
          letterSpacing: 1,
          textTransform: "uppercase",
        }}>
          {lang === "fr" ? "🔍 Rechercher un objet" : "🔍 Search an item"}
        </div>
        <div style={{ position: "relative", maxWidth: 520 }}>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); if (selectedItem && !e.target.value.toLowerCase().includes(selectedItem.toLowerCase())) setSelectedItem(null); }}
            placeholder={lang === "fr" ? "Ex: Feather, Raw Chicken, Dragon's Breath..." : "e.g. Feather, Raw Chicken, Dragon's Breath..."}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "var(--bg2)",
              border: "2px solid var(--border)",
              borderRadius: 12,
              color: "var(--text)",
              fontSize: 15,
              fontFamily: "var(--font-body)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "var(--accent)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setSelectedItem(null); }}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: 18,
              }}
            >×</button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        {search && !selectedItem && filteredItems.length > 0 && (
          <div style={{
            position: "absolute",
            zIndex: 50,
            maxWidth: 520,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            marginTop: 4,
            maxHeight: 280,
            overflowY: "auto",
            boxShadow: "var(--shadow)",
          }}>
            {filteredItems.slice(0, 30).map(item => (
              <button
                key={item}
                onClick={() => { setSelectedItem(item); setSearch(item); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg3)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <span>🎒 {item}</span>
                <span style={{
                  fontSize: 11,
                  color: "var(--text2)",
                  background: "var(--bg3)",
                  padding: "2px 8px",
                  borderRadius: 10,
                }}>
                  {itemIndex[item].length} Pokémon
                </span>
              </button>
            ))}
            {filteredItems.length > 30 && (
              <div style={{ padding: "8px 16px", fontSize: 12, color: "var(--text2)", textAlign: "center" }}>
                +{filteredItems.length - 30} {lang === "fr" ? "autres items..." : "more items..."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── NO ITEM SELECTED: show all items grid ── */}
      {!selectedItem && !search && (
        <>
          <div style={{
            fontSize: 13,
            color: "var(--text2)",
            marginBottom: 12,
            fontFamily: "var(--font-display)",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}>
            {lang === "fr" ? `📦 ${Object.keys(itemIndex).length} items disponibles` : `📦 ${Object.keys(itemIndex).length} available items`}
          </div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}>
            {Object.keys(itemIndex).sort().map(item => (
              <button
                key={item}
                onClick={() => { setSelectedItem(item); setSearch(item); }}
                style={{
                  padding: "6px 14px",
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  color: "var(--text)",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                🎒 {item}
                <span style={{ fontSize: 11, color: "var(--text2)" }}>×{itemIndex[item].length}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── RESULTS ── */}
      {selectedItem && results.length > 0 && (
        <>
          {/* Stats banner */}
          {stats && (
            <div style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
              padding: "16px 20px",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                  {lang === "fr" ? "Droppé par" : "Dropped by"}
                </div>
                <div style={{ fontSize: 28, fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--accent)" }}>
                  {stats.total}
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>Pokémon</div>
              </div>

              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                  {lang === "fr" ? "Meilleur drop" : "Best drop"}
                </div>
                <div style={{ fontSize: 18, fontFamily: "var(--font-display)", fontWeight: 800, color: "#3fb950" }}>
                  {stats.best.chance}
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>
                  {lang === "fr"
                    ? (stats.best.pokemon.name_fr || stats.best.pokemon.name_en)
                    : stats.best.pokemon.name_en}
                </div>
              </div>

              <div style={{ flex: 2, minWidth: 180 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  {lang === "fr" ? "Types porteurs" : "Carrier types"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {stats.types.slice(0, 8).map(t => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>
              <strong style={{ color: "var(--text)" }}>{results.length}</strong>{" "}
              {lang === "fr" ? "résultat(s)" : "result(s)"}
            </span>

            {/* Sort buttons */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginLeft: "auto" }}>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    border: `1px solid ${sort === opt.value ? "var(--accent)" : "var(--border)"}`,
                    background: sort === opt.value ? "var(--accent)" : "var(--bg3)",
                    color: sort === opt.value ? "#fff" : "var(--text2)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {lang === "fr" ? opt.label_fr : opt.label_en}
                </button>
              ))}
            </div>

            {/* Conditional drops toggle */}
            <button
              onClick={() => setCondFilter(v => !v)}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                border: `1px solid ${condFilter ? "#f8d030" : "var(--border)"}`,
                background: condFilter ? "rgba(248,208,48,0.15)" : "var(--bg3)",
                color: condFilter ? "#f8d030" : "var(--text2)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
              title={lang === "fr" ? "Afficher les drops conditionnels (biome spécifique)" : "Show conditional drops (biome specific)"}
            >
              ⚠️ {lang === "fr" ? "Drops conditionnels" : "Conditional drops"}
            </button>
          </div>

          {/* Results grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
          }}>
            {results.map((r, i) => {
              const { label, color, bg } = chanceLabel(r.chance);
              const displayName = lang === "fr"
                ? (r.pokemon.name_fr || r.pokemon.name_en)
                : r.pokemon.name_en;

              return (
                <Link
                  key={`${r.pokemon.slug}-${i}`}
                  href={`/pokemon/${r.pokemon.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      transition: "all 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLDivElement).style.transform = "none";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Sprite */}
                    <div style={{
                      width: 56,
                      height: 56,
                      flexShrink: 0,
                      background: "var(--bg3)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Image
                        src={r.pokemon.sprite}
                        alt={displayName}
                        width={48}
                        height={48}
                        style={{ objectFit: "contain", imageRendering: "pixelated" }}
                        unoptimized
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 10, color: "var(--text2)", fontFamily: "var(--font-display)" }}>
                          #{String(r.pokemon.id).padStart(4, "0")}
                        </span>
                        <div style={{ display: "flex", gap: 3 }}>
                          {r.pokemon.types.map(t => (
                            <TypeBadge key={t} type={t} size="xs" />
                          ))}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--text)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {displayName}
                      </div>
                      {r.conditions && (
                        <div style={{ fontSize: 10, color: "#f8d030", marginTop: 2 }}>
                          ⚠️ {r.conditions}
                        </div>
                      )}
                    </div>

                    {/* Chance badge */}
                    <div style={{
                      flexShrink: 0,
                      padding: "6px 12px",
                      borderRadius: 10,
                      background: bg,
                      border: `1px solid ${color}30`,
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 16,
                      color,
                      minWidth: 60,
                      textAlign: "center",
                    }}>
                      {label}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* No results */}
      {selectedItem && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text2)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
            {lang === "fr" ? "Aucun Pokémon ne drop cet item" : "No Pokémon drops this item"}
          </div>
        </div>
      )}
    </div>
  );
}
