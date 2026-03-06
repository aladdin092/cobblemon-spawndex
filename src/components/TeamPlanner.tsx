"use client";
import { useState } from "react";
import Image from "next/image";
import { Pokemon, Lang } from "@/types";
import { getAllBiomes } from "@/utils";

export function TeamPlanner({ allPokemon, lang }: { allPokemon: Pokemon[]; lang: Lang }) {
  const [team, setTeam]       = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);
  const [picking, setPicking] = useState<number | null>(null);

  const displayName = (p: Pokemon) => lang === "fr" ? p.name_fr : p.name_en;

  function addToSlot(idx: number, p: Pokemon) {
    setTeam((t) => { const n = [...t]; n[idx] = p; return n; });
    setPicking(null);
  }
  function removeFromSlot(idx: number) {
    setTeam((t) => { const n = [...t]; n[idx] = null; return n; });
  }

  const members = team.filter(Boolean) as Pokemon[];

  const biomeScores: Record<string, { count: number; pokemon: string[] }> = {};
  members.forEach((p) => {
    getAllBiomes(p).forEach((b) => {
      if (!biomeScores[b]) biomeScores[b] = { count: 0, pokemon: [] };
      biomeScores[b].count++;
      if (!biomeScores[b].pokemon.includes(displayName(p))) biomeScores[b].pokemon.push(displayName(p));
    });
  });
  const results = Object.entries(biomeScores).sort((a, b) => b[1].count - a[1].count).slice(0, 6);

  return (
    <div className="team-view">
      <div className="team-heading">
        🤝 {lang === "fr" ? "Planificateur de Biomes" : "Team Biome Planner"}
      </div>
      <p className="team-sub">
        {lang === "fr"
          ? "Ajoutez jusqu'à 6 Pokémon pour trouver les meilleurs biomes pour tous les farmer en même temps."
          : "Add up to 6 Pokémon to find the best biomes to farm them all at once."}
      </p>

      <div className="team-slots">
        {team.map((p, i) =>
          p ? (
            <div key={i} className="team-slot filled">
              <button className="team-slot-remove" onClick={() => removeFromSlot(i)}>✕</button>
              <Image src={p.sprite} alt={displayName(p)} width={64} height={64} unoptimized />
              <span className="team-slot-name">{displayName(p)}</span>
            </div>
          ) : (
            <div key={i} className="team-slot" onClick={() => setPicking(i)}>
              <span style={{ fontSize: 24, color: "var(--text2)" }}>+</span>
              <span style={{ fontSize: 11, color: "var(--text2)" }}>
                {lang === "fr" ? "Ajouter" : "Add"}
              </span>
            </div>
          )
        )}
      </div>

      {results.length > 0 ? (
        <div className="team-result">
          <div className="section-title">
            🗺️ {lang === "fr" ? "Meilleurs Biomes pour votre Équipe" : "Best Biomes for Your Team"}
          </div>
          {results.map(([biome, data]) => (
            <div key={biome} className="biome-result">
              <div className="biome-score">{data.count}/{members.length}</div>
              <div>
                <div className="biome-name">📍 {biome}</div>
                <div className="biome-mons">
                  {lang === "fr" ? "Trouvé ici : " : "Found here: "}{data.pokemon.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "var(--text2)", textAlign: "center", padding: 40 }}>
          {lang === "fr"
            ? "Ajoutez des Pokémon pour voir les recommandations de biomes"
            : "Add Pokémon above to see biome recommendations"}
        </div>
      )}

      {picking !== null && (
        <div className="selector-modal" onClick={() => setPicking(null)}>
          <div className="selector-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>
                {lang === "fr" ? "Choisir un Pokémon" : "Choose a Pokémon"}
              </span>
              <button className="btn btn-sm" onClick={() => setPicking(null)}>✕</button>
            </div>
            <div className="selector-grid">
              {allPokemon.map((p) => (
                <div key={p.slug} className="selector-item" onClick={() => addToSlot(picking, p)}>
                  <Image src={p.sprite} alt={displayName(p)} width={50} height={50} unoptimized />
                  <span>{displayName(p)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}