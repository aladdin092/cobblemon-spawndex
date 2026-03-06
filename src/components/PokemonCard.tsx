"use client";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";
import {
  getHighestRarity,
  getAllBiomes,
  TIME_ICONS,
  WEATHER_ICONS,
  DIM_ICONS,
} from "@/utils";
import { TypeBadge } from "./TypeBadge";
import { RarityBadge } from "./RarityBadge";

interface Props {
  pokemon: Pokemon;
  lang?: "fr" | "en";
}

export function PokemonCard({ pokemon, lang = "fr" }: Props) {
  const rarity = getHighestRarity(pokemon);
  const biomes = getAllBiomes(pokemon).slice(0, 1);
  const timeIcons = [
    ...new Set(pokemon.spawns.map((s) => TIME_ICONS[s.time] ?? "")),
  ].join("");
  const weatherIcons = [
    ...new Set(
      pokemon.spawns
        .map((s) => (s.weather !== "any" ? WEATHER_ICONS[s.weather] ?? "" : ""))
        .filter(Boolean)
    ),
  ].join("");
  const dim = pokemon.spawns[0]?.dimension;

  const displayName = lang === "fr"
    ? (pokemon.name_fr || pokemon.name_en || pokemon.name)
    : (pokemon.name_en || pokemon.name);

  return (
    <Link
      href={`/pokemon/${pokemon.slug}`}
      className="poke-card group"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Image area */}
      <div className="card-image-wrap">
        <span className="card-num">#{String(pokemon.id).padStart(4, "0")}</span>
        <div style={{ position: "absolute", top: 8, right: 10 }}>
          <RarityBadge rarity={rarity} />
        </div>
        <Image
          src={pokemon.image}
          alt={displayName}
          width={100}
          height={100}
          className="card-img"
          unoptimized
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = pokemon.sprite;
          }}
        />
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-name">{displayName}</div>
        <div className="types-row">
          {pokemon.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
        <div className="card-meta">
          <span title="Time">{timeIcons || "🕐"}</span>
          {weatherIcons && <span title="Weather">{weatherIcons}</span>}
          {dim && <span title="Dimension">{DIM_ICONS[dim] ?? ""}</span>}
          {biomes.length > 0 ? (
            <span className="card-biome">📍 {biomes[0]}</span>
          ) : (
            <span className="card-biome">📍 Form change</span>
          )}
        </div>
      </div>
    </Link>
  );
}
