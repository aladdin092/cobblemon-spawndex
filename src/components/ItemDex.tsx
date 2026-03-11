"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Pokemon } from "@/types";
import type { Lang } from "@/types";
import { TypeBadge } from "./TypeBadge";
import { getHighestRarity } from "@/utils";

interface Props {
  allPokemon: Pokemon[];
  lang: Lang;
}

function getItemImageUrls(itemName: string): string[] {
  const pokeSlug = itemName.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
  // Minecraft items: lowercase with underscores (feather, raw_chicken, blaze_rod...)
  const mcSlug = itemName.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "");
  return [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokeSlug}.png`,
    `https://mcasset.cloud/1.21/assets/minecraft/textures/item/${mcSlug}.png`,
    `https://mcasset.cloud/1.20.1/assets/minecraft/textures/item/${mcSlug}.png`,
  ];
}

function chanceToNum(chance: string): number {
  if (!chance) return 0;
  const pct = chance.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) return parseFloat(pct[1]);
  if (chance.match(/^\d+-\d+$/)) return 100;
  return 0;
}

function chanceStyle(chance: string): { color: string; bg: string } {
  const n = chanceToNum(chance);
  if (chance.match(/^\d+-\d+$/) && !chance.includes("%")) return { color: "#58a6ff", bg: "rgba(88,166,255,0.15)" };
  if (n >= 25)  return { color: "#3fb950", bg: "rgba(63,185,80,0.15)" };
  if (n >= 10)  return { color: "#f8d030", bg: "rgba(248,208,48,0.15)" };
  if (n >= 5)   return { color: "#ff9d00", bg: "rgba(255,157,0,0.15)" };
  return { color: "#ff7b7b", bg: "rgba(255,123,123,0.15)" };
}

function ItemImage({ name, size = 56 }: { name: string; size?: number }) {
  const [idx, setIdx] = useState(0);
  const urls = getItemImageUrls(name);
  if (idx >= urls.length) {
    return (
      <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5 }}>
        🎒
      </div>
    );
  }
  return (
    <img
      src={urls[idx]}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: "contain", imageRendering: "pixelated" }}
      onError={() => setIdx(i => i + 1)}
    />
  );
}

export function ItemDex({ allPokemon, lang }: Props) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sortDroppers, setSortDroppers] = useState<"chance" | "dex" | "name">("chance");

  const itemIndex = useMemo(() => {
    const index: Record<string, { pokemon: Pokemon; chance: string; minQty: number; maxQty: number; conditions?: string }[]> = {};
    for (const p of allPokemon) {
      for (const d of p.drops || []) {
        if (!d.item) continue;
        if (!index[d.item]) index[d.item] = [];
        index[d.item].push({ pokemon: p, chance: d.chance, minQty: d.minQty, maxQty: d.maxQty, conditions: (d as any).conditions });
      }
    }
    return index;
  }, [allPokemon]);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return Object.keys(itemIndex)
      .filter(item => !q || item.toLowerCase().includes(q))
      .sort((a, b) => itemIndex[b].length - itemIndex[a].length);
  }, [itemIndex, search]);

  const droppers = useMemo(() => {
    if (!selectedItem || !itemIndex[selectedItem]) return [];
    const list = [...itemIndex[selectedItem]];
    list.sort((a, b) => {
      if (sortDroppers === "chance") return chanceToNum(b.chance) - chanceToNum(a.chance);
      if (sortDroppers === "dex") return a.pokemon.id - b.pokemon.id;
      const na = lang === "fr" ? (a.pokemon.name_fr || a.pokemon.name_en) : a.pokemon.name_en;
      const nb = lang === "fr" ? (b.pokemon.name_fr || b.pokemon.name_en) : b.pokemon.name_en;
      return na.localeCompare(nb);
    });
    return list;
  }, [selectedItem, itemIndex, sortDroppers, lang]);

  // ── Detail view ──
  if (selectedItem) {
    const bestChance = droppers.length
      ? droppers.reduce((best, r) => chanceToNum(r.chance) > chanceToNum(best.chance) ? r : best, droppers[0])
      : null;

    return (
      <div style={{ padding: "24px 28px" }}>
        <button
          onClick={() => setSelectedItem(null)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--bg2)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "8px 16px", cursor: "pointer",
            color: "var(--text)", fontSize: 14, fontFamily: "var(--font-display)",
            fontWeight: 700, marginBottom: 28, transition: "all 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          ← {lang === "fr" ? "Tous les items" : "All items"}
        </button>

        {/* Hero */}
        <div style={{
          display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "28px 32px", marginBottom: 32,
        }}>
          <div style={{
            width: 100, height: 100, flexShrink: 0,
            background: "var(--bg3)", borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ItemImage name={selectedItem} size={76} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-display)", marginBottom: 4 }}>
              {lang === "fr" ? "Objet" : "Item"}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, margin: "0 0 12px" }}>
              {selectedItem}
            </h1>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>
                🐾 <strong style={{ color: "var(--text)" }}>{droppers.length}</strong> Pokémon
              </span>
              {bestChance && (
                <span style={{ fontSize: 13, color: "var(--text2)" }}>
                  ⭐ {lang === "fr" ? "Meilleure chance" : "Best chance"} :{" "}
                  <strong style={{ color: chanceStyle(bestChance.chance).color }}>{bestChance.chance}</strong>
                  {" "}{lang === "fr" ? "via" : "from"}{" "}
                  <strong style={{ color: "var(--text)" }}>
                    {lang === "fr" ? (bestChance.pokemon.name_fr || bestChance.pokemon.name_en) : bestChance.pokemon.name_en}
                  </strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--text2)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
            {lang === "fr" ? "TRIER :" : "SORT:"}
          </span>
          {(["chance", "dex", "name"] as const).map(s => (
            <button key={s} onClick={() => setSortDroppers(s)} style={{
              padding: "5px 14px", borderRadius: 20, cursor: "pointer",
              border: `1px solid ${sortDroppers === s ? "var(--accent)" : "var(--border)"}`,
              background: sortDroppers === s ? "var(--accent)" : "var(--bg3)",
              color: sortDroppers === s ? "#fff" : "var(--text2)",
              fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s",
            }}>
              {s === "chance" ? "Chance" : s === "dex" ? "№ Dex" : "A–Z"}
            </button>
          ))}
        </div>

        {/* Droppers grid — grouped by pokemon, variants only when stats differ */}
        {(() => {
          const grouped: Record<string, typeof droppers> = {};
          for (const r of droppers) {
            if (!grouped[r.pokemon.slug]) grouped[r.pokemon.slug] = [];
            grouped[r.pokemon.slug].push(r);
          }

          const cleanCond = (cond: string) =>
            cond.replace(/biome:/gi, "").replace(/,\s*/g, ", ").trim();

          return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 14 }}>
              {Object.values(grouped).map(group => {
                const r = group[0];
                const displayName = lang === "fr"
                  ? (r.pokemon.name_fr || r.pokemon.name_en || r.pokemon.name)
                  : (r.pokemon.name_en || r.pokemon.name);
                const allSame = group.every(d => d.chance === r.chance);
                const showVariants = group.length > 1 && !allSame;

                return (
                  <Link key={r.pokemon.slug} href={`/pokemon/${r.pokemon.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 14,
                      padding: "14px 16px", background: "var(--bg2)",
                      border: `1px solid ${showVariants ? "rgba(248,208,48,0.25)" : "var(--border)"}`,
                      borderRadius: 14, transition: "all 0.15s", cursor: "pointer",
                    }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--accent)"; d.style.transform = "translateY(-2px)"; d.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = showVariants ? "rgba(248,208,48,0.25)" : "var(--border)"; d.style.transform = "none"; d.style.boxShadow = "none"; }}
                    >
                      <div style={{ width: 60, height: 60, flexShrink: 0, background: "var(--bg3)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={r.pokemon.sprite} alt={displayName} width={52} height={52}
                          style={{ objectFit: "contain", imageRendering: "pixelated" }}
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: "var(--text2)", fontFamily: "var(--font-display)", marginBottom: 2 }}>
                          #{String(r.pokemon.id).padStart(4, "0")}
                        </div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 4 }}>
                          {displayName}
                        </div>
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: showVariants ? 8 : 0 }}>
                          {r.pokemon.types.map(t => <TypeBadge key={t} type={t} size="xs" lang={lang} />)}
                        </div>

                        {/* Variants with different chances */}
                        {showVariants && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            {group.map((drop, di) => {
                              const { color, bg } = chanceStyle(drop.chance);
                              return (
                                <div key={di} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{ padding: "3px 8px", borderRadius: 6, background: bg, border: `1px solid ${color}40`, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, color, minWidth: 44, textAlign: "center" }}>
                                    {drop.chance}
                                  </div>
                                  {drop.conditions && (
                                    <span style={{ fontSize: 10, color: "var(--text2)" }}>
                                      📍 {cleanCond(drop.conditions)}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Single drop condition */}
                        {!showVariants && r.conditions && (
                          <div style={{ fontSize: 10, color: "#f8d030", marginTop: 3 }}>⚠️ {cleanCond(r.conditions)}</div>
                        )}
                      </div>

                      {/* Chance badge — only when no variants */}
                      {!showVariants && (() => {
                        const { color, bg } = chanceStyle(r.chance);
                        return (
                          <div style={{ flexShrink: 0, padding: "6px 10px", borderRadius: 8, background: bg, border: `1px solid ${color}40`, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color, minWidth: 52, textAlign: "center" }}>
                            {r.chance}
                          </div>
                        );
                      })()}
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })()}
      </div>
    );
  }

  // ── Grid view ──
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
          🎒 {lang === "fr" ? "Items Droppés" : "Item Drops"}
          <span style={{ fontSize: 14, color: "var(--text2)", fontWeight: 400 }}>
            {filteredItems.length} items
          </span>
        </h2>
        <div style={{ position: "relative", maxWidth: 480 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === "fr" ? "Rechercher un item..." : "Search an item..."}
            style={{
              width: "100%", padding: "12px 40px 12px 42px",
              background: "var(--bg2)", border: "2px solid var(--border)",
              borderRadius: 14, color: "var(--text)", fontSize: 15,
              fontFamily: "var(--font-body)", outline: "none",
              transition: "border-color 0.2s", boxSizing: "border-box",
            }}
            onFocus={e => (e.target.style.borderColor = "var(--accent)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: 20 }}>×</button>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text2)" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
            {lang === "fr" ? "Aucun item trouvé" : "No items found"}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 18 }}>
          {filteredItems.map(item => {
            const count = itemIndex[item].length;
            const bestDrop = itemIndex[item].reduce((best, r) =>
              chanceToNum(r.chance) > chanceToNum(best.chance) ? r : best, itemIndex[item][0]);
            const { color } = chanceStyle(bestDrop.chance);

            return (
              <button key={item} onClick={() => setSelectedItem(item)} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 10, padding: "20px 14px 16px",
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 16, cursor: "pointer", transition: "all 0.18s",
                textAlign: "center", position: "relative",
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--accent)"; b.style.transform = "translateY(-4px)"; b.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; b.style.background = "var(--bg3)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--border)"; b.style.transform = "none"; b.style.boxShadow = "none"; b.style.background = "var(--bg2)"; }}
              >
                {/* Count badge */}
                <div style={{ position: "absolute", top: 10, right: 10, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, padding: "2px 7px", fontSize: 10, fontWeight: 700, color: "var(--text2)", fontFamily: "var(--font-display)" }}>
                  🐾 {count}
                </div>

                {/* Image */}
                <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ItemImage name={item} size={64} />
                </div>

                {/* Name */}
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--text)", lineHeight: 1.3, wordBreak: "break-word" }}>
                  {item}
                </div>

                {/* Best rate */}
                <div style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "var(--font-display)" }}>
                  ↑ {bestDrop.chance}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
