"use client";
import { useState } from "react";
import Image from "next/image";
import { Pokemon } from "@/types";
import { getAllBiomes } from "@/utils";

interface Props {
  allPokemon: Pokemon[];
  lang?: "fr" | "en";
}

export function TeamPlanner({ allPokemon, lang = "en" }: Props) {
  const [team, setTeam] = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);
  const [picking, setPicking] = useState<number | null>(null);

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
      if (!biomeScores[b].pokemon.includes(p.name)) biomeScores[b].pokemon.push(p.name);
    });
  });
  const results = Object.entries(biomeScores).sort((a, b) => b[1].count - a[1].count).slice(0, 6);

  return (
    <div className="team-view">
      <div className="team-heading">🤝 Team Biome Planner</div>
      <p className="team-sub">Add up to 6 Pokémon to find the best biomes to farm them all at once.</p>

      <div className="team-slots">
        {team.map((p, i) =>
          p ? (
            <div key={i} className="team-slot filled">
              <button className="team-slot-remove" onClick={() => removeFromSlot(i)}>✕</button>
              <Image src={p.sprite} alt={p.name} width={64} height={64} unoptimized />
              <span className="team-slot-name">{p.name}</span>
            </div>
          ) : (
            <div key={i} className="team-slot" onClick={() => setPicking(i)}>
              <span style={{ fontSize: 24, color: "var(--text2)" }}>+</span>
              <span style={{ fontSize: 11, color: "var(--text2)" }}>Add</span>
            </div>
          )
        )}
      </div>

      {results.length > 0 ? (
        <div className="team-result">
          <div className="section-title">🗺️ Best Biomes for Your Team</div>
          {results.map(([biome, data]) => (
            <div key={biome} className="biome-result">
              <div className="biome-score">{data.count}/{members.length}</div>
              <div>
                <div className="biome-name">📍 {biome}</div>
                <div className="biome-mons">Found here: {data.pokemon.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "var(--text2)", textAlign: "center", padding: "40px" }}>
          Add Pokémon to see biome recommendations
        </div>
      )}

      {/* Picker modal */}
      {picking !== null && (
        <div className="selector-modal" onClick={() => setPicking(null)}>
          <div className="selector-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>
                Choose a Pokémon
              </span>
              <button className="btn btn-sm" onClick={() => setPicking(null)}>✕</button>
            </div>
            <div className="selector-grid">
              {allPokemon.map((p) => (
                <div key={p.slug} className="selector-item" onClick={() => addToSlot(picking, p)}>
                  <Image src={p.sprite} alt={p.name} width={50} height={50} unoptimized />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
