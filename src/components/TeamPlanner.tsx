"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Pokemon } from "@/types";
import { getAllBiomes, RARITY_LABELS, RARITY_BG, TIME_ICONS, WEATHER_ICONS, DIM_ICONS } from "@/utils";
import { TypeBadge } from "./TypeBadge";

interface Props {
  allPokemon: Pokemon[];
  lang?: "fr" | "en";
}

type Step = {
  biome: string;
  dimension: string;
  pokemon: { p: Pokemon; time: string; weather: string; minLv: number; maxLv: number }[];
  score: number;
};

const DIM_LABEL: Record<string, { fr: string; en: string; color: string }> = {
  overworld: { fr: "Overworld", en: "Overworld", color: "#3fb950" },
  nether:    { fr: "Nether",    en: "Nether",    color: "#ff7b4f" },
  end:       { fr: "The End",   en: "The End",   color: "#b39ddb" },
};

export function TeamPlanner({ allPokemon, lang = "en" }: Props) {
  const [team, setTeam] = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);
  const [picking, setPicking] = useState<number | null>(null);
  const [pickerSearch, setPickerSearch] = useState("");
  const [tab, setTab] = useState<"route" | "missing">("route");

  function getName(p: Pokemon) {
    return lang === "fr" ? (p.name_fr || p.name_en || p.name) : (p.name_en || p.name);
  }

  function addToSlot(idx: number, p: Pokemon) {
    setTeam((t) => { const n = [...t]; n[idx] = p; return n; });
    setPicking(null);
    setPickerSearch("");
  }
  function removeFromSlot(idx: number) {
    setTeam((t) => { const n = [...t]; n[idx] = null; return n; });
  }

  const members = team.filter(Boolean) as Pokemon[];

  // Build optimized hunt route
  const { steps, missing } = useMemo(() => {
    if (!members.length) return { steps: [], missing: [] };

    // For each biome, collect which pokemon spawn there + their conditions
    const biomeMap: Record<string, { p: Pokemon; time: string; weather: string; minLv: number; maxLv: number; dimension: string }[]> = {};

    members.forEach((p) => {
      p.spawns?.forEach((s) => {
        s.biomes.forEach((b) => {
          if (!biomeMap[b]) biomeMap[b] = [];
          if (!biomeMap[b].find((x) => x.p.slug === p.slug)) {
            biomeMap[b].push({
              p,
              time: s.time,
              weather: s.weather,
              minLv: s.minLevel,
              maxLv: s.maxLevel,
              dimension: s.dimension,
            });
          }
        });
      });
    });

    // Greedy algorithm: pick biomes that cover most uncovered pokemon first
    const covered = new Set<string>();
    const steps: Step[] = [];
    const allBiomes = Object.entries(biomeMap).sort((a, b) => b[1].length - a[1].length);

    while (covered.size < members.length) {
      // Find biome with most uncovered pokemon
      let best: [string, typeof biomeMap[string]] | null = null;
      let bestUncovered = 0;

      for (const [biome, entries] of allBiomes) {
        const uncovered = entries.filter((e) => !covered.has(e.p.slug)).length;
        if (uncovered > bestUncovered) {
          bestUncovered = uncovered;
          best = [biome, entries];
        }
      }

      if (!best || bestUncovered === 0) break;

      const [biome, entries] = best;
      entries.forEach((e) => covered.add(e.p.slug));

      // Determine dominant dimension for this biome
      const dim = entries[0]?.dimension || "overworld";

      steps.push({
        biome,
        dimension: dim,
        pokemon: entries.map((e) => ({ p: e.p, time: e.time, weather: e.weather, minLv: e.minLv, maxLv: e.maxLv })),
        score: entries.length,
      });
    }

    // Missing = pokemon not found in any biome
    const missing = members.filter((p) => !covered.has(p.slug));

    return { steps, missing };
  }, [members]);

  // Picker filtered list
  const pickerList = useMemo(() => {
    if (!pickerSearch.trim()) return allPokemon;
    const q = pickerSearch.toLowerCase().trim().replace(/[-_''.]/g, " ");
    return allPokemon.filter((p) => {
      const normalize = (s: string) => s.toLowerCase().replace(/[-_''.]/g, " ");
      return normalize(p.name_en || "").includes(q) ||
             normalize(p.name_fr || "").includes(q) ||
             normalize(p.name || "").includes(q);
    });
  }, [allPokemon, pickerSearch]);

  return (
    <div className="team-view">
      <div className="team-heading">
        🗺️ {lang === "fr" ? "Planificateur d'équipe" : "Team Hunt Planner"}
      </div>
      <p className="team-sub">
        {lang === "fr"
          ? "Ajoute jusqu'à 6 Pokémon pour obtenir la route de chasse optimisée."
          : "Add up to 6 Pokémon to get the most optimized hunting route."}
      </p>

      {/* Team slots */}
      <div className="team-slots">
        {team.map((p, i) =>
          p ? (
            <div key={i} className="team-slot filled">
              <button className="team-slot-remove" onClick={() => removeFromSlot(i)}>✕</button>
              <Image src={p.sprite} alt={getName(p)} width={64} height={64} unoptimized
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <span className="team-slot-name">{getName(p)}</span>
              <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                {p.types.map((t) => <TypeBadge key={t} type={t} size="xs" />)}
              </div>
            </div>
          ) : (
            <div key={i} className="team-slot" onClick={() => { setPicking(i); setPickerSearch(""); }}>
              <span style={{ fontSize: 24, color: "var(--text2)" }}>+</span>
              <span style={{ fontSize: 11, color: "var(--text2)" }}>
                {lang === "fr" ? "Ajouter" : "Add"}
              </span>
            </div>
          )
        )}
      </div>

      {/* Results */}
      {members.length > 0 && (
        <>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, margin: "20px 0 16px" }}>
            {(["route", "missing"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "6px 18px", borderRadius: 20, border: "1px solid",
                borderColor: tab === t ? "var(--accent)" : "var(--border)",
                background: tab === t ? "var(--accent)" : "var(--bg3)",
                color: tab === t ? "#fff" : "var(--text2)",
                fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-display)",
                transition: "all 0.15s",
              }}>
                {t === "route"
                  ? `🗺️ ${lang === "fr" ? "Route optimisée" : "Optimized Route"} (${steps.length})`
                  : `❓ ${lang === "fr" ? "Introuvables" : "Not Found"} (${missing.length})`}
              </button>
            ))}
          </div>

          {tab === "route" && (
            <div className="team-result">
              {steps.length === 0 ? (
                <div style={{ color: "var(--text2)", textAlign: "center", padding: 40 }}>
                  {lang === "fr" ? "Aucun spawn trouvé pour cette équipe." : "No spawn data found for this team."}
                </div>
              ) : (
                steps.map((step, idx) => {
                  const dimInfo = DIM_LABEL[step.dimension] || DIM_LABEL.overworld;
                  return (
                    <div key={step.biome} style={{
                      background: "var(--bg2)", border: "1px solid var(--border)",
                      borderRadius: 12, marginBottom: 12, overflow: "hidden",
                    }}>
                      {/* Step header */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 16px",
                        background: "var(--bg3)",
                        borderBottom: "1px solid var(--border)",
                      }}>
                        {/* Step number */}
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: "var(--accent)", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15,
                          flexShrink: 0,
                        }}>
                          {idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
                            📍 {step.biome}
                          </div>
                          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                            <span style={{
                              fontSize: 11, padding: "1px 8px", borderRadius: 10,
                              background: dimInfo.color + "22", color: dimInfo.color,
                              fontWeight: 700, border: `1px solid ${dimInfo.color}44`,
                            }}>
                              {DIM_ICONS[step.dimension]} {lang === "fr" ? dimInfo.fr : dimInfo.en}
                            </span>
                          </div>
                        </div>
                        <div style={{
                          fontFamily: "var(--font-display)", fontWeight: 800,
                          fontSize: 20, color: "var(--accent)",
                        }}>
                          {step.score}/{members.length}
                        </div>
                      </div>

                      {/* Pokemon in this step */}
                      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                        {step.pokemon.map(({ p, time, weather, minLv, maxLv }) => (
                          <div key={p.slug} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "8px 12px", background: "var(--bg3)",
                            borderRadius: 10,
                          }}>
                            <Image src={p.sprite} alt={getName(p)} width={40} height={40} unoptimized
                              style={{ imageRendering: "pixelated" }}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{getName(p)}</div>
                              <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                                {p.types.map((t) => <TypeBadge key={t} type={t} size="xs" />)}
                              </div>
                            </div>
                            {/* Conditions */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                              <div style={{ fontSize: 11, color: "var(--text2)" }}>
                                {TIME_ICONS[time]} {time === "any" ? (lang === "fr" ? "Toute heure" : "Any time") : time}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--text2)" }}>
                                {WEATHER_ICONS[weather]} {weather === "any" ? (lang === "fr" ? "N'importe" : "Any weather") : weather}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--text2)" }}>
                                ⚔️ Lv. {minLv}–{maxLv}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {tab === "missing" && (
            <div className="team-result">
              {missing.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "var(--text2)" }}>
                  ✅ {lang === "fr" ? "Tous les Pokémon sont trouvables !" : "All Pokémon are findable!"}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>
                    {lang === "fr"
                      ? "Ces Pokémon n'ont pas de données de spawn — ils sont probablement obtenus par évolution ou échange."
                      : "These Pokémon have no spawn data — they're likely obtained through evolution or trading."}
                  </p>
                  {missing.map((p) => (
                    <div key={p.slug} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 16px", background: "var(--bg2)",
                      border: "1px solid var(--border)", borderRadius: 10,
                    }}>
                      <Image src={p.sprite} alt={getName(p)} width={40} height={40} unoptimized
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{getName(p)}</div>
                        <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                          {p.types.map((t) => <TypeBadge key={t} type={t} size="xs" />)}
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text2)", fontStyle: "italic" }}>
                        {lang === "fr" ? "Pas de spawn naturel" : "No natural spawn"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {members.length === 0 && (
        <div style={{ color: "var(--text2)", textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>
            {lang === "fr" ? "Ajoute des Pokémon pour commencer" : "Add Pokémon to get started"}
          </div>
        </div>
      )}

      {/* Picker modal */}
      {picking !== null && (
        <div className="selector-modal" onClick={() => setPicking(null)}>
          <div className="selector-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>
                {lang === "fr" ? "Choisir un Pokémon" : "Choose a Pokémon"}
              </span>
              <button className="btn btn-sm" onClick={() => setPicking(null)}>✕</button>
            </div>
            {/* Search in picker */}
            <input
              type="text"
              value={pickerSearch}
              onChange={(e) => setPickerSearch(e.target.value)}
              placeholder={lang === "fr" ? "Chercher..." : "Search..."}
              autoFocus
              style={{
                width: "100%", padding: "8px 12px", marginBottom: 10,
                background: "var(--bg3)", border: "1px solid var(--border)",
                borderRadius: 8, color: "var(--text)", fontSize: 14,
                fontFamily: "var(--font-body)", outline: "none",
              }}
            />
            <div className="selector-grid">
              {pickerList.map((p) => (
                <div key={p.slug} className="selector-item" onClick={() => addToSlot(picking, p)}>
                  <Image src={p.sprite} alt={getName(p)} width={50} height={50} unoptimized
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  <span>{getName(p)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
