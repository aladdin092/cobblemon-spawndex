import { Pokemon, Rarity, PokemonType } from "@/types";

export const RARITY_ORDER: Record<Rarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  ultra_rare: 4,
  legendary_rare: 5,
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  ultra_rare: "Ultra Rare",
  legendary_rare: "Legendary",
};

export const RARITY_BG: Record<Rarity, string> = {
  common: "#78c850",
  uncommon: "#a890f0",
  rare: "#4890d0",
  ultra_rare: "#f8d030",
  legendary_rare: "#ff7330",
};

export const RARITY_TEXT: Record<Rarity, string> = {
  common: "#fff",
  uncommon: "#fff",
  rare: "#fff",
  ultra_rare: "#111",
  legendary_rare: "#fff",
};

export const TYPE_COLORS: Record<PokemonType, string> = {
  Normal: "#A8A878",
  Fire: "#F08030",
  Water: "#6890F0",
  Electric: "#F8D030",
  Grass: "#78C850",
  Ice: "#98D8D8",
  Fighting: "#C03028",
  Poison: "#A040A0",
  Ground: "#E0C068",
  Flying: "#A890F0",
  Psychic: "#F85888",
  Bug: "#A8B820",
  Rock: "#B8A038",
  Ghost: "#705898",
  Dragon: "#7038F8",
  Dark: "#705848",
  Steel: "#B8B8D0",
  Fairy: "#EE99AC",
};

export const TIME_ICONS: Record<string, string> = {
  any: "🕐",
  day: "☀️",
  night: "🌙",
  morning: "🌅",
  dawn: "🌄",
  dusk: "🌆",
};

export const WEATHER_ICONS: Record<string, string> = {
  any: "🌤",
  clear: "☀️",
  rain: "🌧️",
  snow: "❄️",
  thunderstorm: "⛈️",
  fog: "🌫️",
  wind: "💨",
};

export const DIM_ICONS: Record<string, string> = {
  overworld: "🌿",
  nether: "🔥",
  end: "⭐",
};

export function getHighestRarity(pokemon: Pokemon): Rarity {
  if (!pokemon.spawns.length) return "legendary_rare";
  return pokemon.spawns.reduce<Rarity>((highest, spawn) => {
    return RARITY_ORDER[spawn.rarity] > RARITY_ORDER[highest]
      ? spawn.rarity
      : highest;
  }, pokemon.spawns[0].rarity);
}

export function getBestSpawnRate(pokemon: Pokemon): number {
  if (!pokemon.spawns.length) return 0;
  return Math.max(...pokemon.spawns.map((s) => s.spawnRate));
}

export function getAllBiomes(pokemon: Pokemon): string[] {
  return [...new Set(pokemon.spawns.flatMap((s) => s.biomes))];
}

export function statColor(value: number): string {
  if (value >= 100) return "#3fb950";
  if (value >= 70) return "#58a6ff";
  if (value >= 50) return "#f8d030";
  return "#ff7330";
}

export function generateCaptureGuide(pokemon: Pokemon): string {
  const r = getHighestRarity(pokemon);
  let g = `=== CAPTURE GUIDE: ${pokemon.name.toUpperCase()} ===\n\n`;
  g += `Types: ${pokemon.types.join(" / ")}\n`;
  g += `Rarity: ${RARITY_LABELS[r]}\n`;
  g += `Catch Rate: ${pokemon.catchRate}/255\n\n`;

  if (pokemon.spawns.length) {
    g += `SPAWN LOCATIONS:\n`;
    pokemon.spawns.forEach((s, i) => {
      g += `\n[Spawn ${i + 1}]\n`;
      g += `• Biomes: ${s.biomes.join(", ")}\n`;
      g += `• Time: ${s.time}\n`;
      g += `• Weather: ${s.weather}\n`;
      g += `• Levels: ${s.minLevel}–${s.maxLevel}\n`;
      g += `• Dimension: ${s.dimension}\n`;
      if (s.structures.length) g += `• Structures: ${s.structures.join(", ")}\n`;
      g += `• ${s.conditions}\n`;
    });
  }

  g += `\nHUNT TIPS:\n`;
  pokemon.huntTips.forEach((t) => (g += `  ${t}\n`));

  if (pokemon.evolutions.length > 1) {
    g += `\nEVOLUTION CHAIN:\n`;
    pokemon.evolutions.forEach((e) => {
      if (e.method !== "base") g += `  ${e.from} → ${e.to}: ${e.detail}\n`;
    });
  }

  g += `\nNotes: ${pokemon.notes}\n\n--- Cobblemon Spawn Dex ---`;
  return g;
}

export async function fetchAllPokemon(): Promise<Pokemon[]> {
  const res = await fetch("/data/pokemon.json");
  if (!res.ok) throw new Error("Failed to load pokemon.json");
  return res.json();
}
