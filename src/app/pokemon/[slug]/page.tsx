"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";
import {
  getHighestRarity,
  getAllBiomes,
  generateCaptureGuide,
  TIME_ICONS,
  WEATHER_ICONS,
  DIM_ICONS,
  RARITY_LABELS,
  statColor,
} from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";
import { BiomeModal } from "@/components/BiomeModal";
import { RarityBadge } from "@/components/RarityBadge";
import { useTheme } from "@/components/ThemeProvider";

type Lang = "fr" | "en";

const STAT_NAMES: Record<string, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spa: "SP.A",
  spd: "SP.D",
  spe: "SPE",
};

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
  const biomes = getAllBiomes(pokemon);
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
            {pokemon.types.map((t) => <TypeBadge key={t} type={t} size="md" />)}
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
        {pokemon.drops && pokemon.drops.length > 0 && (
          <>
            <div className="section-title">🎁 {lang === "fr" ? "Objets droppés" : "Item Drops"}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {pokemon.drops.map((drop, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg3)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "10px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    minWidth: 140,
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>
                    🎒 {drop.item}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>
                    {lang === "fr" ? "Chance" : "Chance"} :{" "}
                    <strong style={{ color: "var(--accent)" }}>
                      {drop.chance.includes("%") ? drop.chance : `${drop.minQty}–${drop.maxQty}`}
                    </strong>
                  </div>
                  {drop.minQty !== drop.maxQty && !drop.chance.includes("%") === false && (
                    <div style={{ fontSize: 11, color: "var(--text2)" }}>
                      {lang === "fr" ? "Qté" : "Qty"} : {drop.minQty === drop.maxQty ? drop.minQty : `${drop.minQty}–${drop.maxQty}`}
                    </div>
                  )}
                  {(drop as any).conditions && (
                    <div style={{ fontSize: 10, color: "var(--text2)", fontStyle: "italic" }}>
                      ⚠️ {(drop as any).conditions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

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
