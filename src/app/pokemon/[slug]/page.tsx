"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";
import {
  getHighestRarity,
  generateCaptureGuide,
  TIME_ICONS,
  WEATHER_ICONS,
  DIM_ICONS,
  statColor,
} from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";
import { BiomeModal } from "@/components/BiomeModal";
import { RarityBadge } from "@/components/RarityBadge";
import { useTheme } from "@/components/ThemeProvider";
import type { Lang } from "@/types";

const STAT_NAMES: Record<string, string> = {
  hp: "HP", atk: "ATK", def: "DEF", spa: "SP.A", spd: "SP.D", spe: "SPE",
};

function ItemThumb({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const mcSlug = name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "_");
  if (failed) return <span style={{ fontSize: 20 }}>🎒</span>;
  return (
    <img src={`/items/${mcSlug}.png`} alt={name} width={24} height={24}
      style={{ objectFit: "contain", imageRendering: "pixelated", flexShrink: 0 }}
      onError={() => setFailed(true)} />
  );
}

export default function PokemonDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggle } = useTheme();

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [activeBiome, setActiveBiome] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    // Restore lang from sessionStorage so it stays in sync with main page
    const saved = (typeof window !== "undefined" && sessionStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);

  useEffect(() => {
    fetch("/data/pokemon.json")
      .then((r) => r.json())
      .then((data: Pokemon[]) => {
        setAllPokemon(data);
        const found = data.find((p) => p.slug === slug);
        setPokemon(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const router = useRouter();
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  function toggleLang(l: Lang) {
    setLang(l);
    if (typeof window !== "undefined") sessionStorage.setItem("lang", l);
  }

  function copyGuide() {
    if (!pokemon) return;
    navigator.clipboard
      .writeText(generateCaptureGuide(pokemon))
      .then(() => showToast("📋 Guide copié !"))
      .catch(() => showToast("❌ Copie échouée"));
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "var(--text2)", fontFamily: "var(--font-display)", fontSize: 24 }}>
        Chargement...
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 8 }}>
          Pokémon introuvable
        </h2>
        <button onClick={() => router.back()} className="btn btn-primary" style={{ display: "inline-flex", marginTop: 16, cursor: "pointer" }}>
          ← Retour au Dex
        </button>
      </div>
    );
  }

  const rarity = getHighestRarity(pokemon);

  // Navigation prev/next by dex number
  const sortedByDex = [...allPokemon].sort((a, b) => a.id - b.id);
  const currentIdx = sortedByDex.findIndex((p) => p.slug === slug);
  const prevPokemon = currentIdx > 0 ? sortedByDex[currentIdx - 1] : null;
  const nextPokemon = currentIdx < sortedByDex.length - 1 ? sortedByDex[currentIdx + 1] : null;

  const displayName = lang === "fr"
    ? (pokemon.name_fr || pokemon.name_en || pokemon.name)
    : (pokemon.name_en || pokemon.name);

  // Build evo chain
  const evoChain: string[] = [];
  const base = pokemon.evolutions.find((e) => e.method === "base");
  if (base) evoChain.push(base.to);
  pokemon.evolutions.forEach((e) => {
    if (e.method !== "base" && !evoChain.includes(e.to)) evoChain.push(e.to);
  });

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <img src="/logo.png" alt="SpawnDex logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <div>
              <div className="logo-text">SpawnDex</div>
              <div className="logo-sub">COBBLEMON</div>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            {/* Language toggle — same as main page */}
            <div style={{ display: "flex", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              {(["fr", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => toggleLang(l)}
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
            <button onClick={() => router.back()} className="btn" style={{ cursor: "pointer" }}>
              ← {lang === "fr" ? "Retour" : "Back"}
            </button>
            <button className="btn" onClick={toggle} title="Toggle theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* ── NAV PREV/NEXT (floating sides) ── */}
      {prevPokemon && (
        <Link href={`/pokemon/${prevPokemon.slug}`} style={{
          position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "12px 10px", textDecoration: "none",
          color: "var(--text)", transition: "all 0.15s", zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)", maxWidth: 80,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-50%) scale(1.05)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-50%) scale(1)"; }}
        >
          <span style={{ fontSize: 18 }}>←</span>
          <img src={prevPokemon.sprite} alt="" width={40} height={40} style={{ objectFit: "contain" }} />
          <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display)", textAlign: "center", lineHeight: 1.2, wordBreak: "break-word" }}>
            {lang === "fr" ? (prevPokemon.name_fr || prevPokemon.name_en || prevPokemon.name) : (prevPokemon.name_en || prevPokemon.name)}
          </div>
        </Link>
      )}

      {nextPokemon && (
        <Link href={`/pokemon/${nextPokemon.slug}`} style={{
          position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "12px 10px", textDecoration: "none",
          color: "var(--text)", transition: "all 0.15s", zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)", maxWidth: 80,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-50%) scale(1.05)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-50%) scale(1)"; }}
        >
          <span style={{ fontSize: 18 }}>→</span>
          <img src={nextPokemon.sprite} alt="" width={40} height={40} style={{ objectFit: "contain" }} />
          <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display)", textAlign: "center", lineHeight: 1.2, wordBreak: "break-word" }}>
            {lang === "fr" ? (nextPokemon.name_fr || nextPokemon.name_en || nextPokemon.name) : (nextPokemon.name_en || nextPokemon.name)}
          </div>
        </Link>
      )}

      {/* ── HERO ── */}
      <div className="detail-hero">
        <div className="detail-hero-bg" />
        <Image
          src={pokemon.image}
          alt={displayName}
          width={180}
          height={180}
          style={{ objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))", flexShrink: 0 }}
          unoptimized
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = pokemon.sprite; }}
        />
        <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
          <div style={{ fontSize: 14, color: "var(--text2)", fontFamily: "var(--font-display)", marginBottom: 4 }}>
            #{String(pokemon.id).padStart(4, "0")}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
            {displayName}
          </h1>
          {lang === "fr" && pokemon.name_en && pokemon.name_en !== displayName && (
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, fontStyle: "italic" }}>
              {pokemon.name_en}
            </div>
          )}
          <div className="types-row" style={{ marginBottom: 10 }}>
            {pokemon.types.map((t) => <TypeBadge key={t} type={t} size="md" lang={lang} />)}
          </div>
          <RarityBadge rarity={rarity} size="md" />
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--text2)", maxWidth: 480, lineHeight: 1.6 }}>
            {pokemon.notes}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn btn-primary" onClick={copyGuide}>
              📋 {lang === "fr" ? "Copier le guide" : "Copy Capture Guide"}
            </button>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>
              {lang === "fr" ? "Taux de capture" : "Catch Rate"} :{" "}
              <strong style={{ color: "var(--text)" }}>{pokemon.catchRate}/255</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="detail-body">

        {/* BASE STATS */}
        <div className="section-title">⚔️ {lang === "fr" ? "Stats de base" : "Base Stats"}</div>
        <div className="stats-grid">
          {Object.entries(pokemon.baseStats).map(([key, val]) => (
            <div key={key} className="stat-item">
              <div className="stat-name">{STAT_NAMES[key] ?? key}</div>
              <div className="stat-val" style={{ color: statColor(val) }}>{val}</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${Math.min(100, (val / 180) * 100)}%`, background: statColor(val) }} />
              </div>
            </div>
          ))}
        </div>

        {/* SPAWN TABLE */}
        <div className="section-title">📍 {lang === "fr" ? "Conditions de spawn" : "Spawn Conditions"}</div>
        {pokemon.spawns.length > 0 ? (
          <div className="spawn-table-wrap">
            <table className="spawn-table">
              <thead>
                <tr>
                  <th>{lang === "fr" ? "Biomes" : "Biomes"}</th>
                  <th>{lang === "fr" ? "Moment" : "Time"}</th>
                  <th>{lang === "fr" ? "Météo" : "Weather"}</th>
                  <th>{lang === "fr" ? "Niveaux" : "Levels"}</th>
                  <th>Rate</th>
                  <th>Dimension</th>
                  <th>Structures</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.spawns.map((spawn, i) => (
                  <tr key={i}>
                    <td>
                      {spawn.biomes.map((b) => (
                        <span key={b} onClick={() => setActiveBiome(b)} style={{ background: "var(--bg3)", padding: "2px 6px", borderRadius: 4, fontSize: 11, margin: "1px", display: "inline-block", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLSpanElement).style.color = "var(--accent)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.borderColor = "transparent"; (e.currentTarget as HTMLSpanElement).style.color = ""; }}>
                          🗺️ {b}
                        </span>
                      ))}
                    </td>
                    <td>{TIME_ICONS[spawn.time] ?? ""} {spawn.time}</td>
                    <td>{WEATHER_ICONS[spawn.weather] ?? ""} {spawn.weather}</td>
                    <td>{spawn.minLevel}–{spawn.maxLevel}</td>
                    <td>
                      <strong style={{ color: spawn.spawnRate > 3 ? "#3fb950" : spawn.spawnRate > 1 ? "#f8d030" : "#ff7330" }}>
                        {spawn.spawnRate != null ? `${spawn.spawnRate}%` : "—"}
                      </strong>
                    </td>
                    <td>{DIM_ICONS[spawn.dimension] ?? ""} {spawn.dimension}</td>
                    <td>{spawn.structures?.length > 0 ? spawn.structures.join(", ") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "var(--text2)", marginBottom: 24, padding: "16px", background: "var(--bg3)", borderRadius: 8 }}>
            {lang === "fr"
              ? "Ce Pokémon ne se trouve pas dans la nature. Voir la méthode d'évolution ci-dessous."
              : "This Pokémon cannot be found in the wild. See the evolution method below."}
          </p>
        )}

        {/* DROPS */}
        {pokemon.drops && pokemon.drops.length > 0 && (() => {
          // Group by item name
          const grouped: Record<string, typeof pokemon.drops> = {};
          for (const d of pokemon.drops) {
            if (!d.item) continue;
            if (!grouped[d.item]) grouped[d.item] = [];
            grouped[d.item].push(d);
          }

          const cleanCond = (cond: string) =>
            cond.replace(/biome:/gi, "").replace(/,\s*/g, ", ").trim();

          const chanceColor = (chance: string) => {
            const n = parseFloat(chance);
            if (chance.match(/^\d+-\d+$/)) return "#58a6ff";
            if (n >= 25) return "#3fb950";
            if (n >= 10) return "#f8d030";
            if (n >= 5)  return "#ff9d00";
            return "#ff7b7b";
          };

          return (
            <>
              <div className="section-title">🎁 {lang === "fr" ? "Objets droppés" : "Item Drops"}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {Object.entries(grouped).map(([itemName, drops]) => {
                  const allSame = drops.every(d => d.chance === drops[0].chance);
                  const showVariants = drops.length > 1 && !allSame;
                  const d = drops[0];
                  return (
                    <div key={itemName} style={{
                      background: "var(--bg3)",
                      border: `1px solid ${showVariants ? "rgba(248,208,48,0.3)" : "var(--border)"}`,
                      borderRadius: 12, padding: "12px 16px",
                      display: "flex", flexDirection: "column", gap: 6,
                      minWidth: 150,
                    }}>
                      {/* Item image + name */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ItemThumb name={itemName} />
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>
                          {itemName}
                        </div>
                      </div>

                      {/* Single drop */}
                      {!showVariants && (
                        <div style={{ fontSize: 12, color: "var(--text2)" }}>
                          Chance : <strong style={{ color: chanceColor(d.chance) }}>{d.chance}</strong>
                        </div>
                      )}
                      {!showVariants && (d as any).conditions && (
                        <div style={{ fontSize: 10, color: "var(--text2)" }}>
                          📍 {cleanCond((d as any).conditions)}
                        </div>
                      )}

                      {/* Variants */}
                      {showVariants && drops.map((drop, di) => (
                        <div key={di} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <strong style={{ fontSize: 12, color: chanceColor(drop.chance) }}>{drop.chance}</strong>
                          {(drop as any).conditions && (
                            <span style={{ fontSize: 10, color: "var(--text2)" }}>
                              📍 {cleanCond((drop as any).conditions)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

        {/* HUNT TIPS */}
        <div className="section-title">💡 {lang === "fr" ? "Méthodes de chasse" : "Hunt Methods"}</div>
        <div className="tips-grid">
          {pokemon.huntTips.map((tip, i) => (
            <div key={i} className="tip-item">{tip}</div>
          ))}
        </div>

        {/* EVOLUTIONS */}
        {pokemon.evolutions.length > 1 && (
          <>
            <div className="section-title">🔄 {lang === "fr" ? "Chaîne d'évolution" : "Evolution Chain"}</div>
            <div className="evo-chain">
              {evoChain.map((name, i) => {
                const evoMon = allPokemon.find((p) => p.name === name || p.name_en === name);
                const evoEntry = pokemon.evolutions.find((e) => e.to === name && e.method !== "base");
                return (
                  <div key={name} className="evo-step">
                    {i > 0 && (
                      <div className="evo-arrow">
                        <span style={{ fontSize: 18 }}>→</span>
                        {evoEntry && <span className="evo-method">{evoEntry.detail}</span>}
                      </div>
                    )}
                    {evoMon ? (
                      <Link href={`/pokemon/${evoMon.slug}`} className="evo-mon">
                        <Image src={evoMon.sprite} alt={evoMon.name} width={60} height={60} style={{ objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }} unoptimized />
                        <span className="evo-mon-name">
                          {lang === "fr" ? (evoMon.name_fr || evoMon.name_en || evoMon.name) : (evoMon.name_en || evoMon.name)}
                        </span>
                      </Link>
                    ) : (
                      <div className="evo-mon">
                        <span style={{ fontSize: 12, color: "var(--text2)" }}>{name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* BIOMES */}


        {/* BACK */}
        <Link href="/" className="btn" style={{ display: "inline-flex" }}>
          ← {lang === "fr" ? "Retour au Dex" : "Back to Dex"}
        </Link>
      </div>

      {/* BIOME MODAL */}
      {activeBiome && <BiomeModal biomeName={activeBiome} lang={lang} onClose={() => setActiveBiome(null)} />}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
